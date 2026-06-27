import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]'
);

const q2index = doc.questions.findIndex((q) => q.questionNumber === "2");

const lines = [
  "Mass percent answers a simple question: out of every 100 grams of this compound, how many grams belong to each element?",
  "The trick is to think in terms of 1 mole. One mole of Na2SO4 weighs 142 g. Inside that 142 g, sodium contributes 46 g (2 atoms × 23), sulfur contributes 32 g, and oxygen contributes 64 g (4 atoms × 16). Those three numbers add up to exactly 142 — a good sanity check.",
  "Then mass % is just each element's share expressed as a percentage of the total. Na gets 46/142 of the pie, which is 32.38%. Notice the three percentages always sum to 100% — if they don't, you made an arithmetic error somewhere.",
];

const explanation = lines.map((text) => ({
  _type: "block",
  _key: randomUUID(),
  style: "normal",
  children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
  markDefs: [],
}));

const patch = {};
patch[`questions[${q2index}].explanation`] = explanation;

await client.patch(doc._id).set(patch).commit();
console.log("Patched question 2 with explanation.");
