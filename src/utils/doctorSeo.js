// Pure SEO metadata generators for doctor profile pages.
// MUST NOT import secrets.js or use import.meta.env — the site origin is
// always passed in as a parameter so plain Node can import this module.

import { primaryBranch, primarySpecialty, slugify, titleCase } from "./doctorUrl.js";
import { cityForBranch } from "./branchCity.js";

const ORG = "Popular Diagnostic Centre";
export const DESC_MAX = 160;
export const DESC_MIN = 70;
export const TITLE_MAX = 70;

export const resolveDoctorMeta = (doctor) => ({
  name: doctor?.name?.trim() || "Doctor",
  specialty: primarySpecialty(doctor),
  branch: titleCase(primaryBranch(doctor)),
});

export const clampText = (text, max) => {
  const value = String(text || "");
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${base.replace(/[\s,.-]+$/, "")}…`;
};

// Degrades progressively, dropping the least valuable clause first, until
// the title fits TITLE_MAX. The doctor's name is the highest-value part and
// is only ever truncated as a last resort, once every droppable clause is
// already gone.
export const doctorTitle = (doctor) => {
  const { name, specialty, branch } = resolveDoctorMeta(doctor);
  const specialtyClause = specialty ? `${specialty} Specialist` : null;
  const withMiddle = (middle) => (middle ? `${name} - ${middle} | ${ORG}` : `${name} | ${ORG}`);

  const variants = [
    withMiddle([specialtyClause, branch || null].filter(Boolean).join(", ")), // 1: name - specialty, branch
    withMiddle(specialtyClause), // 2: drop branch
    withMiddle(null), // 3: drop specialty too -> name | ORG
    clampText(name, TITLE_MAX), // 4: last resort, clamp the name itself
  ];

  return (
    variants.find((variant) => variant.length <= TITLE_MAX) ||
    variants[variants.length - 1]
  );
};

// Fit as many comma-separated credentials as the remaining budget allows,
// always cutting on a comma boundary. Degree fields run up to 190 characters.
const fitDegrees = (degree, budget) => {
  if (!degree || budget <= 0) return "";
  const parts = String(degree)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const kept = [];
  let length = 0;
  for (const part of parts) {
    const addition = kept.length ? part.length + 2 : part.length;
    if (length + addition > budget) break;
    kept.push(part);
    length += addition;
  }
  return kept.join(", ");
};

export const doctorDescription = (doctor) => {
  const { name, specialty, branch } = resolveDoctorMeta(doctor);
  const role = specialty ? `${specialty} specialist` : "Consultant";
  const where = branch ? `${ORG}, ${branch}` : ORG;
  const tail = `${role} at ${where}. View chamber schedule and book an appointment online.`;

  const base = `${name} - ${tail}`;
  const degrees = fitDegrees(doctor?.degree, DESC_MAX - base.length - 2);
  const full = degrees ? `${name}, ${degrees} - ${tail}` : base;
  return clampText(full, DESC_MAX);
};

const ORG_FULL = "Popular Diagnostic Centre Limited";

// Schedules store "2:00 pm"; schema.org requires "14:00".
export const to24Hour = (value) => {
  const match = /^\s*(\d{1,2}):(\d{2})\s*([ap])\.?m\.?\s*$/i.exec(String(value || ""));
  if (!match) return null;
  const hour = (Number(match[1]) % 12) + (match[3].toLowerCase() === "p" ? 12 : 0);
  return `${String(hour).padStart(2, "0")}:${match[2]}`;
};

export const openingHours = (schedule) =>
  (schedule || [])
    .map((slot) => {
      const opens = to24Hour(slot?.start_time);
      const closes = to24Hour(slot?.end_time);
      if (!opens || !closes || !slot?.day) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${slot.day}`,
        opens,
        closes,
      };
    })
    .filter(Boolean);

export const doctorJsonLd = (doctor, url) => {
  const { name, specialty, branch } = resolveDoctorMeta(doctor);
  // Never doctor.mobile — that is a personal cell number.
  const telephone = doctor?.branches?.[0]?.phone || "";
  const hours = openingHours(doctor?.schedule);

  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    url,
    ...(doctor?.image ? { image: doctor.image } : {}),
    ...(specialty ? { medicalSpecialty: specialty } : {}),
    worksFor: { "@type": "MedicalOrganization", name: ORG_FULL },
    ...(branch
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: branch,
            addressCountry: "BD",
          },
        }
      : {}),
    ...(telephone ? { telephone } : {}),
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
  };
};

// react-helmet-async assigns <script> children via innerHTML, not textContent
// (lib/index.esm.js:473-520), and JSON.stringify escapes neither "<" nor "/".
// A doctor field containing "</script" would close the tag and break the head.
export const jsonLdScript = (value) =>
  JSON.stringify(value).replace(/</g, "\\u003c");

// Specialties whose practitioners are not physicians. Prefixing "Dr." for these
// would misrepresent them on a healthcare site.
const NON_PHYSICIAN_SPECIALTIES = new Set([
  "nutritionist",
  "dietician",
  "foodnutrition",
  "physiotherapydepartment",
]);

const TITLE_TOKENS =
  /\b(dr|prof|professor|assoc|asso|assis|asst|asstt|assistant|assistan|consultant|nutritionist|dietician)\b/i;

// 58 of ~3,386 names carry no professional title. 27 of those are genuinely
// non-physician (nutritionists, dieticians, physiotherapists); the rest are doctors
// whose record simply omits the title. Only the latter get "Dr." added.
export const displayName = (doctor) => {
  const name = doctor?.name?.trim() || "Doctor";
  if (TITLE_TOKENS.test(name)) return name;
  const key = primarySpecialty(doctor).toLowerCase().replace(/[^a-z]+/g, "");
  if (NON_PHYSICIAN_SPECIALTIES.has(key)) return name;
  return `Dr. ${name}`;
};

// "[Specialty] & [Subspecialty] in [City]", degrading as data allows.
// Only ~6% of doctors have a second specialty.
export const doctorHeadline = (doctor) => {
  const specialties = (doctor?.specialists || [])
    .map((entry) => entry?.specialist?.name || entry?.specialist_name || "")
    .filter(Boolean);
  const city = cityForBranch(primaryBranch(doctor));
  const subject = specialties.slice(0, 2).join(" & ");
  if (subject && city) return `${subject} in ${city}`;
  if (subject) return subject;
  return "Specialist";
};

export const breadcrumbJsonLd = (doctor, origin, path) => {
  const { name, specialty } = resolveDoctorMeta(doctor);
  const specialtySlug = slugify(specialty);
  const trail = [
    { name: "Home", item: `${origin}/` },
    { name: "Doctors", item: `${origin}/our-doctors` },
    ...(specialty
      ? [{ name: specialty, item: `${origin}/doctors/${specialtySlug}` }]
      : []),
    { name, item: `${origin}${path}` },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
};
