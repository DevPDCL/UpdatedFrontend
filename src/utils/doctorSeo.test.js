import test from "node:test";
import assert from "node:assert/strict";
import {
  clampText,
  doctorTitle,
  doctorDescription,
  DESC_MAX,
  DESC_MIN,
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

test("doctorTitle front-loads name and specialty before the brand", () => {
  assert.equal(
    doctorTitle(doctor),
    "Prof. Dr. M. Nazrul Islam - Cardiology Specialist, Dhanmondi | Popular Diagnostic Centre"
  );
});

test("doctorTitle drops the specialty clause when absent", () => {
  assert.equal(
    doctorTitle({ name: "Dr. X", specialists: [], branches: [{ name: "MIRPUR" }] }),
    "Dr. X - Mirpur | Popular Diagnostic Centre"
  );
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
