// Pure SEO metadata generators for doctor profile pages.
// MUST NOT import secrets.js or use import.meta.env — the site origin is
// always passed in as a parameter so plain Node can import this module.

import { primaryBranch, primarySpecialty, titleCase } from "./doctorUrl.js";

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
