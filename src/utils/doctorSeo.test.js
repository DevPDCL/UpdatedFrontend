import test from "node:test";
import assert from "node:assert/strict";
import {
  clampText,
  doctorTitle,
  doctorDescription,
  DESC_MAX,
  DESC_MIN,
  TITLE_MAX,
} from "./doctorSeo.js";

const doctor = {
  name: "Prof. Dr. M. Nazrul Islam",
  degree: "MBBS, FCPS, FRCP (London), FACC, FESC.",
  specialists: [{ specialist_name: "Cardiology" }],
  branches: [{ name: "DHANMONDI" }],
};

// Real record with a 190-character run-on degree field.
const longDegreeDoctor = {
  name: "Prof. Dr. A. A. Shafi Majumder",
  degree:
    "MBBS, D.Card, MD (Card), FACC, FSGC, FRCP. Research Fellow, NCVC 9Japam), " +
    "WHO Fellow in Cardiology,USA Director & Professor of Cardiology (Retd) " +
    "National Institute of Cardiovascular Diseases, Dhaka.",
  specialists: [{ specialist_name: "Cardiology" }],
  branches: [{ name: "DHANMONDI" }],
};

test("clampText leaves short text untouched", () => {
  assert.equal(clampText("hello", 20), "hello");
});

test("clampText never exceeds the maximum", () => {
  const out = clampText("a".repeat(50) + " " + "b".repeat(50), 40);
  assert.ok(out.length <= 40, `got ${out.length}`);
});

test("doctorTitle front-loads name and specialty before the brand when it fits TITLE_MAX", () => {
  // Short enough that the full "name - specialty, branch | brand" variant
  // fits without any degradation.
  const shortDoctor = {
    name: "Dr. A. Rahman",
    specialists: [{ specialist_name: "ENT" }],
    branches: [{ name: "SAVAR" }],
  };
  const out = doctorTitle(shortDoctor);
  assert.equal(out, "Dr. A. Rahman - ENT Specialist, Savar | Popular Diagnostic Centre");
  assert.ok(out.length <= TITLE_MAX, `too long: ${out.length}`);
});

test("doctorTitle degrades past specialty and branch when the full title doesn't fit, keeping the full name intact", () => {
  // "Prof. Dr. M. Nazrul Islam - Cardiology Specialist, Dhanmondi | Popular
  // Diagnostic Centre" is 89 chars (over TITLE_MAX); dropping the branch
  // still leaves 78; dropping the specialty too lands at 53, which fits —
  // and the name itself was never touched.
  const out = doctorTitle(doctor);
  assert.equal(out, "Prof. Dr. M. Nazrul Islam | Popular Diagnostic Centre");
  assert.ok(out.length <= TITLE_MAX, `too long: ${out.length}`);
  assert.ok(out.startsWith(doctor.name), "name must survive intact, untruncated");
});

test("doctorTitle drops the specialty clause when absent", () => {
  assert.equal(
    doctorTitle({ name: "Dr. X", specialists: [], branches: [{ name: "MIRPUR" }] }),
    "Dr. X - Mirpur | Popular Diagnostic Centre"
  );
});

test("doctorTitle stays within TITLE_MAX for a very long name, specialty, and branch combination", () => {
  // Modeled on a real 143-char title that shipped unbudgeted before this fix.
  const longDoctor = {
    name: "Associate Prof. Dr. Iftekhar Ahmed Swapan ( Mornig)",
    specialists: [{ specialist_name: "Skin/Dermatology" }],
    branches: [{ name: "UTTARA GARIB E NEWAZ (SECTOR-13)" }],
  };
  const out = doctorTitle(longDoctor);
  assert.ok(out.length <= TITLE_MAX, `too long: ${out.length}`);
});

test("doctorTitle only truncates the name once every droppable clause is already gone", () => {
  // Even "name | Popular Diagnostic Centre" (no specialty, no branch) is
  // over TITLE_MAX here, so this is the one case where the name itself must
  // be clamped — the last resort, not the first.
  const veryLongName = {
    name: "Prof. Dr. Mohammad Abdul Karim Chowdhury Bin Rashid Al-Amin Hasan Uddin",
    specialists: [{ specialist_name: "Cardiology" }],
    branches: [{ name: "DHANMONDI" }],
  };
  const out = doctorTitle(veryLongName);
  assert.ok(out.length <= TITLE_MAX, `too long: ${out.length}`);
  assert.ok(out.length < veryLongName.name.length, "name should have been clamped");
});

test("doctorDescription includes name, degrees, specialty and branch", () => {
  const out = doctorDescription(doctor);
  assert.ok(out.startsWith("Prof. Dr. M. Nazrul Islam, MBBS"), out);
  assert.ok(out.includes("Cardiology specialist"), out);
  assert.ok(out.includes("Dhanmondi"), out);
});

test("doctorDescription stays within the SERP budget", () => {
  const out = doctorDescription(doctor);
  assert.ok(out.length <= DESC_MAX, `too long: ${out.length}`);
  assert.ok(out.length >= DESC_MIN, `too short: ${out.length}`);
});

test("doctorDescription truncates a 190-character degree field", () => {
  const out = doctorDescription(longDegreeDoctor);
  assert.ok(out.length <= DESC_MAX, `too long: ${out.length}`);
  assert.ok(out.includes("Cardiology specialist"), out);
});

test("doctorDescription keeps only whole credentials", () => {
  const out = doctorDescription(longDegreeDoctor);
  const degreePart = out.slice(longDegreeDoctor.name.length + 2, out.indexOf(" - "));
  const originals = longDegreeDoctor.degree.split(",").map((part) => part.trim());
  for (const kept of degreePart.split(",").map((part) => part.trim())) {
    assert.ok(originals.includes(kept), `"${kept}" is not a whole credential`);
  }
});

test("doctorDescription works with no degree field", () => {
  const out = doctorDescription({
    name: "Dr. Y",
    specialists: [{ specialist_name: "Neurology" }],
    branches: [{ name: "UTTARA" }],
  });
  assert.ok(out.length <= DESC_MAX);
  assert.ok(out.includes("Neurology specialist"), out);
});

test("doctorDescription with long name exhausts budget, leaving no room for degrees", () => {
  const longName = "Dr. Very Long Name That Takes Up Most Of The Description Character Budget So No Degrees Fit";
  const out = doctorDescription({
    name: longName,
    degree: "MBBS, FCPS, MD, PhD",
    specialists: [{ specialist_name: "Cardiology" }],
    branches: [{ name: "DHAKA" }],
  });
  assert.ok(out.length <= DESC_MAX, `too long: ${out.length}`);
  assert.ok(out.length >= DESC_MIN, `too short: ${out.length}`);
  assert.ok(!out.includes("MBBS"), "no degrees should be included when budget exhausted");
});

test("doctorTitle with no specialty and no branch falls back to name only", () => {
  assert.equal(
    doctorTitle({ name: "Dr. Z", specialists: [], branches: [] }),
    "Dr. Z | Popular Diagnostic Centre"
  );
});

import {
  to24Hour,
  openingHours,
  doctorJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "./doctorSeo.js";

const scheduled = {
  name: "Prof. Dr. M. Nazrul Islam",
  image: "https://old.populardiagnostic.com/x.jpeg",
  mobile: "01711563450",
  specialists: [{ specialist_name: "Cardiology" }],
  branches: [{ name: "DHANMONDI", phone: "09666 787801" }],
  schedule: [{ day: "Sunday", start_time: "2:00 pm", end_time: "5:00 pm" }],
};

test("to24Hour converts afternoon times", () => {
  assert.equal(to24Hour("2:00 pm"), "14:00");
  assert.equal(to24Hour("5:30 pm"), "17:30");
});

test("to24Hour converts morning times", () => {
  assert.equal(to24Hour("9:00 am"), "09:00");
  assert.equal(to24Hour("11:45 am"), "11:45");
});

test("to24Hour handles the noon and midnight edge cases", () => {
  assert.equal(to24Hour("12:00 pm"), "12:00");
  assert.equal(to24Hour("12:30 am"), "00:30");
});

test("to24Hour returns null for unparseable input", () => {
  assert.equal(to24Hour("closed"), null);
  assert.equal(to24Hour(""), null);
  assert.equal(to24Hour(null), null);
});

test("openingHours maps a schedule to schema.org shape", () => {
  assert.deepEqual(openingHours(scheduled.schedule), [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "https://schema.org/Sunday",
      opens: "14:00",
      closes: "17:00",
    },
  ]);
});

test("openingHours drops entries with unparseable times", () => {
  assert.deepEqual(
    openingHours([{ day: "Monday", start_time: "n/a", end_time: "5:00 pm" }]),
    []
  );
});

test("doctorJsonLd uses the branch phone, never the personal mobile", () => {
  const ld = doctorJsonLd(scheduled, "https://www.populardiagnostic.com/x");
  assert.equal(ld.telephone, "09666 787801");
  assert.notEqual(ld.telephone, scheduled.mobile);
  assert.ok(!JSON.stringify(ld).includes("01711563450"));
});

test("doctorJsonLd emits a Physician node with specialty and address", () => {
  const ld = doctorJsonLd(scheduled, "https://www.populardiagnostic.com/x");
  assert.equal(ld["@type"], "Physician");
  assert.equal(ld.medicalSpecialty, "Cardiology");
  assert.equal(ld.address.addressLocality, "Dhanmondi");
  assert.equal(ld.address.addressCountry, "BD");
  assert.equal(ld.worksFor.name, "Popular Diagnostic Centre Limited");
});

test("doctorJsonLd omits telephone when no branch phone exists", () => {
  const ld = doctorJsonLd(
    { name: "Dr. Z", mobile: "0170000000", branches: [{ name: "SAVAR" }] },
    "https://www.populardiagnostic.com/y"
  );
  assert.equal("telephone" in ld, false);
});

test("jsonLdScript escapes </script> breakout while staying valid, round-tripping JSON", () => {
  const value = { name: "</script><img src=x>" };
  const out = jsonLdScript(value);
  assert.ok(!out.includes("<"), out);
  assert.deepEqual(JSON.parse(out), value);
});

test("breadcrumbJsonLd builds a four-level trail", () => {
  const ld = breadcrumbJsonLd(
    scheduled,
    "https://www.populardiagnostic.com",
    "/doctors/cardiology/prof-dr-m-nazrul-islam/2094"
  );
  assert.equal(ld["@type"], "BreadcrumbList");
  assert.equal(ld.itemListElement.length, 4);
  assert.equal(ld.itemListElement[2].name, "Cardiology");
  assert.equal(
    ld.itemListElement[2].item,
    "https://www.populardiagnostic.com/doctors/cardiology"
  );
  assert.equal(ld.itemListElement[3].position, 4);
});
