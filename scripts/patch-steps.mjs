import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]'
);

const q2index = doc.questions.findIndex((q) => q.questionNumber === "2");

function block(text) {
  return {
    _type: "block",
    _key: randomUUID(),
    style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
    markDefs: [],
  };
}

function step(title, ...lines) {
  return { _type: "step", _key: randomUUID(), stepTitle: title, content: lines.map(block) };
}

const steps = [
  step(
    "Write down the formula and identify the elements",
    "Na2SO4 contains three elements: Sodium (Na), Sulfur (S), and Oxygen (O). Note the subscripts — 2 Na atoms, 1 S atom, 4 O atoms per formula unit."
  ),
  step(
    "Find the molar mass of Na2SO4",
    "Add up the atomic masses of all atoms in the formula:",
    "Na: 2 × 23 = 46 g/mol",
    "S:  1 × 32 = 32 g/mol",
    "O:  4 × 16 = 64 g/mol",
    "Total molar mass = 46 + 32 + 64 = 142 g/mol"
  ),
  step(
    "Apply the mass percent formula",
    "Mass % of element = (mass of element in 1 mol / molar mass of compound) × 100",
    "This formula works because molar mass tells us the mass of exactly 1 mole of the compound."
  ),
  step(
    "Calculate mass % for each element",
    "Mass % of Na = (46 / 142) × 100 = 32.38%",
    "Mass % of S  = (32 / 142) × 100 = 22.57%",
    "Mass % of O  = (64 / 142) × 100 = 45.05%"
  ),
  step(
    "Verify: percentages must sum to 100%",
    "32.38 + 22.57 + 45.05 = 100.00% ✓",
    "If your numbers don't add up to 100%, recheck your atomic masses or arithmetic."
  ),
];

const patch = {};
patch[`questions[${q2index}].steps`] = steps;

await client.patch(doc._id).set(patch).commit();
console.log("Patched question 2 with steps.");
