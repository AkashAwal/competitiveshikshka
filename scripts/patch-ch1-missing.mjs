import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function block(text) {
  return { _type: "block", _key: randomUUID(), style: "normal", children: [{ _type: "span", _key: randomUUID(), text, marks: [] }], markDefs: [] };
}
function blocks(...lines) { return lines.map(block); }
function step(title, ...lines) { return { _type: "step", _key: randomUUID(), stepTitle: title, content: blocks(...lines) }; }

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]'
);

if (!doc) { console.error("Document not found"); process.exit(1); }
console.log(`Found document: ${doc._id} with ${doc.questions.length} questions`);

const q22 = {
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: "22",
  questionText: blocks("If the speed of light is 3.0 × 10⁸ m s⁻¹, calculate the distance covered by light in 2.00 ns."),
  answer: blocks(
    "Speed of light, c = 3.0 × 10⁸ m s⁻¹",
    "Time, t = 2.00 ns = 2.00 × 10⁻⁹ s",
    "Distance = speed × time",
    "= 3.0 × 10⁸ × 2.00 × 10⁻⁹",
    "= 6.0 × 10⁻¹ m = 0.60 m"
  ),
  steps: [
    step("Identify the given values", "Speed of light c = 3.0 × 10⁸ m s⁻¹\nTime t = 2.00 ns (nanoseconds)"),
    step("Convert nanoseconds to seconds", "nano = 10⁻⁹\n2.00 ns = 2.00 × 10⁻⁹ s"),
    step("Apply the distance formula", "Distance = speed × time\n= 3.0 × 10⁸ m s⁻¹ × 2.00 × 10⁻⁹ s"),
    step("Calculate using index laws", "= (3.0 × 2.00) × 10⁸⁺⁽⁻⁹⁾\n= 6.0 × 10⁻¹ m\n= 0.60 m"),
  ],
  explanation: blocks("This question tests unit conversion (nanoseconds → seconds) and basic kinematics. The key step is converting 2.00 ns to 2.00 × 10⁻⁹ s before multiplying. Light travels 0.60 m (60 cm) in just 2 nanoseconds — this illustrates how incredibly fast light moves."),
};

const q30 = {
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: "30",
  questionText: blocks("What will be the mass of one ¹²C atom in g?"),
  answer: blocks(
    "By definition, 1 mole of ¹²C has a mass of exactly 12 g.",
    "1 mole contains 6.022 × 10²³ atoms (Avogadro's number).",
    "Mass of 1 atom = 12 g mol⁻¹ ÷ 6.022 × 10²³ atoms mol⁻¹",
    "= 1.993 × 10⁻²³ g"
  ),
  steps: [
    step("Recall the molar mass of ¹²C", "By definition, 1 mole of ¹²C = exactly 12 g (this is the reference standard)"),
    step("State Avogadro's number", "1 mole = 6.022 × 10²³ atoms"),
    step("Calculate mass of one atom", "Mass = molar mass ÷ Avogadro's number\n= 12 g ÷ 6.022 × 10²³"),
    step("Final answer", "= 1.993 × 10⁻²³ g"),
  ],
  explanation: blocks("¹²C (carbon-12) is the very standard used to define atomic mass units. One mole of ¹²C is defined as exactly 12 g, which means dividing by Avogadro's number gives the mass of a single atom. This is historically important: before 2019, the kilogram itself was defined via this chain of definitions."),
};

const questions = [...doc.questions];
const idx21 = questions.findIndex(q => q.questionNumber === "21");
const idx29 = questions.findIndex(q => q.questionNumber === "29");

if (idx21 === -1) { console.error("Q21 not found in document"); process.exit(1); }
if (idx29 === -1) { console.error("Q29 not found in document"); process.exit(1); }

console.log(`Q21 is at index ${idx21}, Q29 is at index ${idx29}`);

// Insert Q30 at higher index first to avoid shifting idx29 when we insert Q22
questions.splice(idx29 + 1, 0, q30);
// Q21 is at a lower index, unaffected by the Q30 insertion
questions.splice(idx21 + 1, 0, q22);

console.log(`New question count: ${questions.length}`);
console.log("Question numbers:", questions.map(q => q.questionNumber).join(", "));

await client.patch(doc._id).set({ questions }).commit();
console.log("Done. Q22 and Q30 added successfully.");
