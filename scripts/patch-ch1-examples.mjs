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
function step(title, ...lines) {
  return { _type: "exampleStep", _key: randomUUID(), stepTitle: title, content: blocks(...lines) };
}

const examples = [
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "Ex1",
    questionText: blocks("A piece of metal is 3 inch long. What is its length in cm?"),
    answer: blocks(
      "We know that 1 in = 2.54 cm",
      "Using the unit factor: 3 in × (2.54 cm / 1 in)",
      "= 3 × 2.54 cm = 7.62 cm"
    ),
    steps: [
      step("Identify the conversion factor", "1 in = 2.54 cm\nThis gives us two unit factors: (1 in / 2.54 cm) = 1 and (2.54 cm / 1 in) = 1"),
      step("Choose the unit factor that cancels 'in'", "To get cm, we use (2.54 cm / 1 in) so that 'in' cancels"),
      step("Multiply and cancel units", "3 in × (2.54 cm / 1 in) = 3 × 2.54 cm = 7.62 cm"),
    ],
    explanation: blocks("The unit factor method (dimensional analysis) works because multiplying by 1 doesn't change the value of a quantity. Since 2.54 cm = 1 in, the ratio (2.54 cm / 1 in) equals exactly 1. Choose whichever form puts the unwanted unit in the denominator so it cancels."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "Ex2",
    questionText: blocks("A jug contains 2 L of milk. Calculate the volume of the milk in m³."),
    answer: blocks(
      "1 L = 1000 cm³  and  1 m = 100 cm",
      "So: 1 m³ = (100 cm)³ = 10⁶ cm³",
      "2 L = 2 × 1000 cm³ = 2000 cm³",
      "2000 cm³ × (1 m³ / 10⁶ cm³) = 2 × 10⁻³ m³"
    ),
    steps: [
      step("Convert litres to cm³", "1 L = 1000 cm³\n2 L = 2000 cm³"),
      step("Find the unit factor for cm³ → m³", "1 m = 100 cm → 1 m³ = 10⁶ cm³\nUnit factor: (1 m³ / 10⁶ cm³)"),
      step("Apply the unit factor", "2000 cm³ × (1 m³ / 10⁶ cm³) = 2000/10⁶ m³ = 2 × 10⁻³ m³"),
    ],
    explanation: blocks("When converting volume units, you must cube the length conversion factor. Since 1 m = 100 cm, 1 m³ = (100)³ cm³ = 10⁶ cm³. A common mistake is to use 100 instead of 10⁶ — always cube the linear factor for volume conversions."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "Ex3",
    questionText: blocks("How many seconds are there in 2 days?"),
    answer: blocks(
      "2 days × (24 h / 1 day) × (60 min / 1 h) × (60 s / 1 min)",
      "= 2 × 24 × 60 × 60 s",
      "= 172800 s"
    ),
    steps: [
      step("List the conversion chain", "days → hours → minutes → seconds\n1 day = 24 h, 1 h = 60 min, 1 min = 60 s"),
      step("Set up unit factors in series", "2 days × (24 h/1 day) × (60 min/1 h) × (60 s/1 min)"),
      step("Cancel units and compute", "All intermediate units cancel, leaving seconds:\n2 × 24 × 60 × 60 = 172800 s"),
    ],
    explanation: blocks("Chain conversions by multiplying unit factors in series. At each step, write the unit factor so the unwanted unit is in the denominator. This method is powerful because you can extend it to as many conversions as needed in one calculation."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.1",
    questionText: blocks("Calculate the molecular mass of glucose (C₆H₁₂O₆) molecule."),
    answer: blocks(
      "Molecular mass of glucose (C₆H₁₂O₆)",
      "= 6(12.011 u) + 12(1.008 u) + 6(16.00 u)",
      "= 72.066 u + 12.096 u + 96.00 u",
      "= 180.162 u"
    ),
    steps: [
      step("Identify atoms and their count", "C₆H₁₂O₆ has: 6 carbon atoms, 12 hydrogen atoms, 6 oxygen atoms"),
      step("Look up atomic masses", "C = 12.011 u, H = 1.008 u, O = 16.00 u"),
      step("Multiply count × atomic mass for each element", "C: 6 × 12.011 = 72.066 u\nH: 12 × 1.008 = 12.096 u\nO: 6 × 16.00 = 96.00 u"),
      step("Add all contributions", "72.066 + 12.096 + 96.00 = 180.162 u"),
    ],
    explanation: blocks("Molecular mass is simply the sum of all atomic masses in one molecule. The subscripts tell you how many of each atom are present. This value (180.162 u) means one glucose molecule is 180.162 times heavier than 1/12 of a ¹²C atom. Numerically, the molar mass of glucose is 180.162 g/mol."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.2",
    questionText: blocks("A compound contains 4.07% hydrogen, 24.27% carbon and 71.65% chlorine. Its molar mass is 98.96 g. What are its empirical and molecular formulas?"),
    answer: blocks(
      "Step 1: Assume 100 g sample → H = 4.07 g, C = 24.27 g, Cl = 71.65 g",
      "Step 2: Moles: H = 4.07/1.008 = 4.04, C = 24.27/12.01 = 2.021, Cl = 71.65/35.453 = 2.021",
      "Step 3: Divide by smallest (2.021): H = 2, C = 1, Cl = 1",
      "Empirical formula: CH₂Cl (mass = 49.48 g)",
      "Step 4: n = 98.96/49.48 = 2",
      "Molecular formula: C₂H₄Cl₂"
    ),
    steps: [
      step("Convert mass percent to grams (assume 100 g)", "H = 4.07 g, C = 24.27 g, Cl = 71.65 g"),
      step("Convert grams to moles", "Moles H = 4.07/1.008 = 4.04\nMoles C = 24.27/12.01 = 2.021\nMoles Cl = 71.65/35.453 = 2.021"),
      step("Find the simplest whole number ratio", "Divide all by the smallest (2.021):\nH: 4.04/2.021 = 2, C: 1, Cl: 1\nEmpirical formula = CH₂Cl"),
      step("Calculate empirical formula mass", "12.01 + 2(1.008) + 35.453 = 49.48 g"),
      step("Find n and write molecular formula", "n = molar mass / empirical mass = 98.96/49.48 = 2\nMolecular formula = C₂H₄Cl₂"),
    ],
    explanation: blocks("This is the standard 5-step procedure for finding formulas from mass percent data. The 100 g assumption is a clever trick — it converts percentages directly to grams. The empirical formula gives the simplest ratio; the molecular formula is always a whole-number multiple of it (here n = 2, so C₂H₄Cl₂ is dichloroethane)."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.3",
    questionText: blocks("Calculate the amount of water (g) produced by the combustion of 16 g of methane."),
    answer: blocks(
      "Balanced equation: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)",
      "16 g CH₄ = 16/16 = 1 mol CH₄",
      "1 mol CH₄ produces 2 mol H₂O (from equation)",
      "Mass of 2 mol H₂O = 2 × 18 = 36 g"
    ),
    steps: [
      step("Write the balanced equation", "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)"),
      step("Convert given mass to moles", "Molar mass of CH₄ = 12 + 4(1) = 16 g/mol\n16 g CH₄ = 16/16 = 1 mol CH₄"),
      step("Use stoichiometry to find moles of water", "From equation: 1 mol CH₄ → 2 mol H₂O\nSo 1 mol CH₄ gives 2 mol H₂O"),
      step("Convert moles of water to grams", "Molar mass of H₂O = 18 g/mol\n2 mol × 18 g/mol = 36 g H₂O"),
    ],
    explanation: blocks("Stoichiometry always follows: grams → moles (÷ molar mass) → use equation ratio → moles of product → grams (× molar mass). The coefficients in a balanced equation are mole ratios. Here, the 1:2 ratio between CH₄ and H₂O is the key relationship."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.4",
    questionText: blocks("How many moles of methane are required to produce 22 g CO₂(g) after combustion?"),
    answer: blocks(
      "Balanced equation: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)",
      "Moles of CO₂ = 22 g / 44 g mol⁻¹ = 0.5 mol",
      "From equation: 1 mol CO₂ comes from 1 mol CH₄",
      "Therefore 0.5 mol CH₄ is required"
    ),
    steps: [
      step("Write the balanced equation", "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)\nRatio CH₄ : CO₂ = 1 : 1"),
      step("Convert mass of CO₂ to moles", "Molar mass of CO₂ = 12 + 2(16) = 44 g/mol\nMoles CO₂ = 22/44 = 0.5 mol"),
      step("Apply mole ratio", "1 mol CH₄ produces 1 mol CO₂\nSo 0.5 mol CO₂ requires 0.5 mol CH₄"),
    ],
    explanation: blocks("This is the reverse of P1.3 — starting from the product and working back. Because the CH₄:CO₂ ratio is 1:1 in the equation, the moles required equal the moles produced. Always check the stoichiometric ratio first before assuming a 1:1 relationship."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.5",
    questionText: blocks("50.0 kg of N₂(g) and 10.0 kg of H₂(g) are mixed to produce NH₃(g). Calculate the amount of NH₃(g) formed. Identify the limiting reagent in the production of NH₃ in this situation."),
    answer: blocks(
      "Balanced equation: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      "Moles of N₂ = 50000 g / 28.0 g mol⁻¹ = 1786 mol",
      "Moles of H₂ = 10000 g / 2.016 g mol⁻¹ = 4960 mol",
      "N₂ needs: 1786 × 3 = 5358 mol H₂, but only 4960 mol available → H₂ is limiting",
      "NH₃ from 4960 mol H₂: 4960 × (2/3) = 3307 mol",
      "Mass of NH₃ = 3307 × 17.0 = 56219 g ≈ 56.1 kg"
    ),
    steps: [
      step("Write balanced equation and calculate moles of each reactant", "N₂ + 3H₂ → 2NH₃\nMoles N₂ = 50000/28.0 = 1786 mol\nMoles H₂ = 10000/2.016 = 4960 mol"),
      step("Identify the limiting reagent", "1 mol N₂ requires 3 mol H₂\n1786 mol N₂ would require 1786 × 3 = 5358 mol H₂\nBut only 4960 mol H₂ available → H₂ is the limiting reagent"),
      step("Calculate NH₃ from the limiting reagent", "3 mol H₂ → 2 mol NH₃\n4960 mol H₂ → 4960 × (2/3) = 3307 mol NH₃"),
      step("Convert moles of NH₃ to mass", "Molar mass of NH₃ = 14 + 3(1) = 17 g/mol\n3307 × 17 = 56219 g ≈ 56.1 kg"),
    ],
    explanation: blocks("The limiting reagent is the reactant that runs out first and stops the reaction. The key is to check how much of the other reactant is needed and compare it to what's available. Here H₂ runs short even though N₂ is in excess — which is why in industrial Haber process, H₂ supply is carefully controlled."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.6",
    questionText: blocks("A solution is prepared by adding 2 g of a substance A to 18 g of water. Calculate the mass per cent of the solute."),
    answer: blocks(
      "Mass of solution = 2 g + 18 g = 20 g",
      "Mass per cent of A = (mass of A / mass of solution) × 100",
      "= (2 g / 20 g) × 100",
      "= 10%"
    ),
    steps: [
      step("Find the total mass of solution", "Mass of solution = mass of solute + mass of solvent = 2 + 18 = 20 g"),
      step("Apply the mass percent formula", "Mass % = (mass of solute / mass of solution) × 100"),
      step("Calculate", "(2 / 20) × 100 = 10%"),
    ],
    explanation: blocks("Mass percent tells you how many grams of solute are present per 100 g of solution. A 10% solution means 10 g of A in every 100 g of solution (or 90 g water + 10 g A). Note: the denominator is total solution mass, not solvent mass."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.7",
    questionText: blocks("Calculate the molarity of NaOH in the solution prepared by dissolving its 4 g in enough water to form 250 mL of the solution."),
    answer: blocks(
      "Molar mass of NaOH = 23 + 16 + 1 = 40 g mol⁻¹",
      "Moles of NaOH = 4 g / 40 g mol⁻¹ = 0.1 mol",
      "Volume of solution = 250 mL = 0.250 L",
      "Molarity = 0.1 mol / 0.250 L = 0.4 M"
    ),
    steps: [
      step("Find moles of NaOH", "Molar mass of NaOH = 23 (Na) + 16 (O) + 1 (H) = 40 g/mol\nMoles = 4 g / 40 g/mol = 0.1 mol"),
      step("Convert volume to litres", "250 mL = 0.250 L"),
      step("Apply the molarity formula", "Molarity (M) = moles of solute / volume in litres\n= 0.1 mol / 0.250 L = 0.4 M"),
    ],
    explanation: blocks("Molarity (M) is moles per litre. The key step most students miss: convert mL to L before dividing. Note that molarity depends on temperature (because volume changes), while molality (moles per kg solvent) does not."),
  },
  {
    _type: "workedExample",
    _key: randomUUID(),
    questionNumber: "P1.8",
    questionText: blocks("The density of 3 M solution of NaCl is 1.25 g mL⁻¹. Calculate the molality of the solution."),
    answer: blocks(
      "M = 3 mol L⁻¹, so 1 L solution contains 3 mol NaCl",
      "Mass of NaCl = 3 × 58.5 = 175.5 g",
      "Mass of 1 L solution = 1000 mL × 1.25 g/mL = 1250 g",
      "Mass of water = 1250 - 175.5 = 1074.5 g = 1.0745 kg",
      "Molality = 3 mol / 1.0745 kg = 2.79 m"
    ),
    steps: [
      step("Take a basis of 1 L solution", "3 M means 3 mol NaCl in 1 L of solution"),
      step("Find mass of NaCl and total solution", "Mass of NaCl = 3 × 58.5 g/mol = 175.5 g\nMass of 1 L solution = 1000 mL × 1.25 g/mL = 1250 g"),
      step("Find mass of water (solvent)", "Mass of water = mass of solution - mass of NaCl\n= 1250 - 175.5 = 1074.5 g = 1.0745 kg"),
      step("Calculate molality", "Molality = moles of solute / mass of solvent in kg\n= 3 mol / 1.0745 kg = 2.79 m"),
    ],
    explanation: blocks("This problem connects molarity (mol/L solution) to molality (mol/kg solvent). Density is the bridge — it lets you find the mass of the solution. Then subtracting solute mass gives solvent mass. Note: molality (2.79 m) is slightly higher than molarity (3 M) because 1 L of solution has less than 1 kg of water when solute is dissolved in it."),
  },
];

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]'
);
if (!doc) { console.error("Document not found"); process.exit(1); }
console.log(`Found document: ${doc._id}`);

// Fix Q27: patch questionText and steps to say "15.15 pm" not "15.15 µs"
const idx27 = doc.questions.findIndex(q => q.questionNumber === "27");
if (idx27 === -1) {
  console.warn("Q27 not found — skipping Q27 fix");
} else {
  console.log(`Q27 is at index ${idx27}`);
}

const setPatch = {};

if (idx27 !== -1) {
  // Fix questionText blocks — replace µs with pm
  const fixedText = (doc.questions[idx27].questionText || []).map(b => ({
    ...b,
    children: (b.children || []).map(s => ({
      ...s,
      text: (s.text || "").replace(/15\.15\s*µs/g, "15.15 pm").replace(/15\.15\s*μs/g, "15.15 pm"),
    })),
  }));
  setPatch[`questions[${idx27}].questionText`] = fixedText;

  // Fix answer blocks
  const fixedAnswer = (doc.questions[idx27].answer || []).map(b => ({
    ...b,
    children: (b.children || []).map(s => ({
      ...s,
      text: (s.text || "")
        .replace(/15\.15\s*µs/g, "15.15 pm")
        .replace(/15\.15\s*μs/g, "15.15 pm")
        .replace(/µs \(microsecond\)/g, "pm (picometer)")
        .replace(/μs \(microsecond\)/g, "pm (picometer)")
        .replace(/10⁻⁶ s/g, "10⁻¹² m")
        .replace(/1\.515 × 10⁻⁵ s/g, "1.515 × 10⁻¹¹ m"),
    })),
  }));
  setPatch[`questions[${idx27}].answer`] = fixedAnswer;

  // Replace steps entirely with corrected version
  const { randomUUID: uuid } = await import("crypto");
  setPatch[`questions[${idx27}].steps`] = [
    {
      _type: "step", _key: uuid(),
      stepTitle: "Identify the prefix and its power of 10",
      content: [
        { _type: "block", _key: uuid(), style: "normal", markDefs: [], children: [{ _type: "span", _key: uuid(), text: "pm (picometer) = 10⁻¹²\npm (picometer) = 10⁻¹²\nmg (milligram) = 10⁻³", marks: [] }] },
      ],
    },
    {
      _type: "step", _key: uuid(),
      stepTitle: "Convert to SI base units",
      content: [
        { _type: "block", _key: uuid(), style: "normal", markDefs: [], children: [{ _type: "span", _key: uuid(), text: "(i) 28.7 pm = 28.7 × 10⁻¹² m = 2.87 × 10⁻¹¹ m\n(ii) 15.15 pm = 15.15 × 10⁻¹² m = 1.515 × 10⁻¹¹ m\n(iii) 25365 mg = 25365 × 10⁻³ g = 25.365 g = 0.025365 kg", marks: [] }] },
      ],
    },
  ];
  setPatch[`questions[${idx27}].explanation`] = [
    { _type: "block", _key: randomUUID(), style: "normal", markDefs: [], children: [{ _type: "span", _key: randomUUID(), text: "SI base units are m, s, kg. To convert, replace the prefix with its power of 10. All three values here use picometers (pm = 10⁻¹² m) for (i) and (ii), and milligrams for (iii). Note that kg is the SI base unit for mass, so milligrams need two conversions: mg → g → kg.", marks: [] }] },
  ];
}

// Commit the Q27 fix first
if (Object.keys(setPatch).length > 0) {
  await client.patch(doc._id).set(setPatch).commit();
  console.log("Q27 fixed.");
}

// Add examples
await client.patch(doc._id).set({ examples }).commit();
console.log(`Added ${examples.length} worked examples.`);
console.log("Done.");
