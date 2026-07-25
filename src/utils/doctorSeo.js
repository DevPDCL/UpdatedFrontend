// Pure SEO metadata generators for doctor profile pages.
// MUST NOT import secrets.js or use import.meta.env — the site origin is
// always passed in as a parameter so plain Node can import this module.

import { primaryBranch, primarySpecialty, slugify, titleCase } from "./doctorUrl.js";

const ORG = "Popular Diagnostic Centre";
export const DESC_MAX = 160;
export const DESC_MIN = 70;

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

export const doctorTitle = (doctor) => {
  const { name, specialty, branch } = resolveDoctorMeta(doctor);
  const middle = [specialty ? `${specialty} Specialist` : null, branch || null]
    .filter(Boolean)
    .join(", ");
  return middle ? `${name} - ${middle} | ${ORG}` : `${name} | ${ORG}`;
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
const SPECIALTY_FALLBACK = "general-practice";

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

export const breadcrumbJsonLd = (doctor, origin, path) => {
  const { name, specialty } = resolveDoctorMeta(doctor);
  const specialtySlug = slugify(specialty) || SPECIALTY_FALLBACK;
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
