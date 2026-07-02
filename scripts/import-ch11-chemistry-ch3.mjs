import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function block(text) {
  return {
    _type: "block", _key: randomUUID(), style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
    markDefs: [],
  };
}
function blocks(...lines) { return lines.map(block); }
function step(title, ...lines) {
  return { _type: "exampleStep", _key: randomUUID(), stepTitle: title, content: blocks(...lines) };
}
function toBlocks(text) {
  return text.split("\n").filter(Boolean).map((line) => block(line));
}

// ─── 10 in-text problems ───────────────────────────────────────────────────────
const examples = [
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.1",
    questionText: blocks("What would be the IUPAC name and symbol for the element with atomic number 120?"),
    answer: blocks(
      "Atomic number 120 → digits: 1, 2, 0",
      "Roots: 1 = un, 2 = bi, 0 = nil",
      "Combined name: un + bi + nil + ium = unbinilium",
      "Symbol: U + b + n = Ubn",
      "IUPAC name: Unbinilium, Symbol: Ubn"
    ),
    steps: [
      step("Break the atomic number into digits", "120 → 1, 2, 0"),
      step("Apply IUPAC roots for each digit", "0 = nil, 1 = un, 2 = bi, 3 = tri, 4 = quad, 5 = pent, 6 = hex, 7 = sept, 8 = oct, 9 = en"),
      step("Combine roots and add -ium suffix", "un + bi + nil + ium = unbinilium"),
      step("Form symbol from first letters", "U (un) + b (bi) + n (nil) = Ubn"),
    ],
    explanation: blocks("IUPAC uses Latin/Greek numerical roots to name undiscovered or newly synthesised elements: nil(0), un(1), bi(2), tri(3), quad(4), pent(5), hex(6), sept(7), oct(8), en(9). The symbol is formed from the first letter of each root, with the first letter capitalised."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.2",
    questionText: blocks("How would you justify the presence of 18 elements in the 5th period of the Periodic Table?"),
    answer: blocks(
      "For the 5th period, n = 5.",
      "Subshells filled in order of increasing energy: 5s, 4d, 5p",
      "5s: 1 orbital → 2 electrons",
      "4d: 5 orbitals → 10 electrons",
      "5p: 3 orbitals → 6 electrons",
      "Total electrons = 2 + 10 + 6 = 18",
      "Hence the 5th period contains 18 elements."
    ),
    steps: [
      step("Identify subshells filling in Period 5", "Aufbau order: 5s fills first, then 4d (lower energy than 5p), then 5p"),
      step("Count electrons in each subshell", "5s: 2 electrons, 4d: 10 electrons, 5p: 6 electrons"),
      step("Total", "2 + 10 + 6 = 18 electrons → 18 elements in Period 5"),
    ],
    explanation: blocks("The 4f subshell does not fill in Period 5 because its energy is higher than 5d and 6s. The 4f filling begins in Period 6 (lanthanoids). The subshells filling across Period 5 are 5s, 4d, and 5p only, giving a total of 18 elements."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.3",
    questionText: blocks("The elements with atomic numbers 117 and 120 have not yet been discovered. In which family/group would you place these elements and also give the electronic configuration of these elements."),
    answer: blocks(
      "Element Z = 117:",
      "Configuration: [Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵",
      "Valence electrons: 7s²7p⁵ → same as halogens (Group 17)",
      "Family: Halogens (Group 17), Period 7",
      "",
      "Element Z = 120:",
      "Configuration: [Uuo] 8s²",
      "Valence electrons: 8s² → same as alkaline earth metals (Group 2)",
      "Family: Alkaline earth metals (Group 2), Period 8"
    ),
    steps: [
      step("Find configuration for Z = 117", "After [Rn](Z=86): 5f¹⁴(14e) + 6d¹⁰(10e) + 7s²(2e) + 7p⁵(5e) = 86+14+10+2+5 = 117 ✓\nConfig: [Rn]5f¹⁴6d¹⁰7s²7p⁵"),
      step("Identify group for Z = 117", "7p⁵ → ns²np⁵ like F, Cl, Br, I, At → Group 17 (halogen family)"),
      step("Find configuration for Z = 120", "After [Uuo](Z=118): next 2 electrons enter 8s → [Uuo]8s²"),
      step("Identify group for Z = 120", "8s² → ns² like Be, Mg, Ca, Sr, Ba, Ra → Group 2 (alkaline earth metals)"),
    ],
    explanation: blocks("Elements are placed in groups based on their valence shell configuration. Z=117 ends with 7p⁵ just like other halogens (Group 17). Z=120 has 8s² configuration like other alkaline earth metals (Group 2). The period number equals the highest principal quantum number of the element."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.4",
    questionText: blocks("Considering the atomic number and position in the periodic table, arrange the following elements in the increasing order of metallic character: Si, Be, Mg, Na, P."),
    answer: blocks(
      "Metallic character increases: down a group, right-to-left across a period.",
      "",
      "Positions:",
      "P (Z=15): Period 3, Group 15 — non-metal",
      "Si (Z=14): Period 3, Group 14 — metalloid",
      "Be (Z=4): Period 2, Group 2 — metal (small, high charge density)",
      "Mg (Z=12): Period 3, Group 2 — metal (larger than Be)",
      "Na (Z=11): Period 3, Group 1 — metal (most easily loses electron)",
      "",
      "Increasing metallic character: P < Si < Be < Mg < Na"
    ),
    steps: [
      step("Establish trend rules", "Metallic character: increases down a group (atomic size ↑, IE ↓), increases right-to-left across a period"),
      step("Rank the non-metals and metalloids first", "P (Group 15) < Si (Group 14): both Period 3, P is further right → less metallic"),
      step("Compare metals", "Be (Period 2, Group 2) < Mg (Period 3, Group 2) because Mg is below Be → larger, lower IE\nMg < Na because Na is in Group 1 (Period 3), one step left of Mg → lower IE, stronger metallic character"),
      step("Final order", "P < Si < Be < Mg < Na"),
    ],
    explanation: blocks("Metallic character correlates with the ease of losing electrons (low ionisation enthalpy) and large atomic radius. Group 1 elements are most metallic in their periods. Going down a group increases metallic character because ionisation enthalpy decreases with increasing atomic radius."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.5",
    questionText: blocks("Which of the following species will have the largest and the smallest size?\nMg, Mg²⁺, Al, Al³⁺"),
    answer: blocks(
      "All species have electrons in the same principal shells, so we compare based on nuclear charge and electron count.",
      "",
      "Mg (Z=12): 12 protons, 12 electrons → neutral atom, largest Mg species",
      "Mg²⁺ (Z=12): 12 protons, 10 electrons → smaller (lost 2e⁻)",
      "Al (Z=13): 13 protons, 13 electrons → similar size to Mg but higher nuclear charge",
      "Al³⁺ (Z=13): 13 protons, 10 electrons → same electrons as Mg²⁺ but higher nuclear charge → smallest",
      "",
      "Largest: Mg (12 electrons, 12 protons)",
      "Smallest: Al³⁺ (10 electrons, 13 protons)"
    ),
    steps: [
      step("Compare neutral atoms", "Mg (Z=12) vs Al (Z=13): Al has higher nuclear charge → Al is smaller than Mg"),
      step("Compare ions", "Mg²⁺ and Al³⁺ are isoelectronic (both have 10 electrons). Al³⁺ has higher Z=13 → smaller than Mg²⁺"),
      step("Compare across (neutral vs ion)", "Neutral atoms are always larger than their cations: Mg > Mg²⁺; Al > Al³⁺"),
      step("Rank all four", "Mg > Al > Mg²⁺ > Al³⁺\nLargest: Mg; Smallest: Al³⁺"),
    ],
    explanation: blocks("For isoelectronic species (same number of electrons), size decreases as nuclear charge increases — the same electrons are pulled more tightly. Mg²⁺ and Al³⁺ both have 10 electrons, but Al³⁺ has Z=13 vs Mg²⁺'s Z=12, so Al³⁺ is smaller."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.6",
    questionText: blocks("The first ionization enthalpy (ΔᵢH) values of the third period elements, Na, Mg and Si are respectively 496, 737 and 786 kJ mol⁻¹. Predict whether the first ΔᵢH value for Al will be more close to 575 or 760 kJ mol⁻¹? Justify your answer."),
    answer: blocks(
      "The first ionization enthalpy of Al is closer to 575 kJ mol⁻¹.",
      "",
      "Reasoning:",
      "Al (Z=13): configuration [Ne]3s²3p¹",
      "Mg (Z=12): configuration [Ne]3s²",
      "",
      "Al has a lower ΔᵢH than Mg because:",
      "1. The electron being removed from Al is a 3p electron (higher energy, farther from nucleus than 3s)",
      "2. The 3p electron is shielded by the two 3s electrons of Al, reducing effective nuclear charge",
      "3. Even though Al has a higher nuclear charge (Z=13) than Mg (Z=12), the 3p electron's greater shielding and higher energy makes it easier to remove",
      "",
      "Actual value: ΔᵢH(Al) = 577 kJ mol⁻¹ ≈ 575 kJ mol⁻¹"
    ),
    steps: [
      step("Identify the electron being removed", "From Al: the 3p¹ electron\nFrom Mg: a 3s² electron\nFrom Si: a 3p² electron"),
      step("Apply shielding argument", "Al's 3p electron is shielded by its two 3s electrons. The effective nuclear charge experienced by the 3p electron is lower than for Mg's 3s electron."),
      step("Conclude", "ΔᵢH(Al) < ΔᵢH(Mg) = 737, and should be moderate between Na(496) and Mg(737)\nNearest to 575 kJ mol⁻¹"),
    ],
    explanation: blocks("This is the classic 'anomaly' of Period 3: Al has a lower ionization enthalpy than Mg despite having a higher atomic number. It arises because Al loses a 3p electron (which is higher in energy and better shielded) rather than a 3s electron. A similar anomaly exists in Period 2 between Be and B."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.7",
    questionText: blocks("Which of the following will have the most negative electron gain enthalpy and which the least negative?\nP, S, Cl, F\nExplain your answer."),
    answer: blocks(
      "Most negative electron gain enthalpy: Cl",
      "Least negative electron gain enthalpy: P",
      "",
      "Explanation:",
      "Cl: Large nucleus (Z=17), 3p subshell has enough space, added electron experiences little repulsion. ΔₑgH = −349 kJ/mol (most negative)",
      "",
      "F: Despite high nuclear charge, the 2p orbital is very small/compact. Adding an electron to such a crowded orbital causes significant electron-electron repulsion. ΔₑgH = −328 kJ/mol (less negative than Cl)",
      "",
      "S: ΔₑgH = −200 kJ/mol",
      "",
      "P: Has exactly half-filled 3p³ configuration (extra stability). Adding an electron disrupts this stable arrangement. ΔₑgH = −74 kJ/mol (least negative)"
    ),
    steps: [
      step("Establish general trend", "Electron gain enthalpy becomes more negative across a period (left to right) due to increasing nuclear charge"),
      step("Identify the anomaly for F vs Cl", "F has smaller atomic radius → added electron goes into compact 2p orbital → more electron-electron repulsion → less negative ΔₑgH than Cl"),
      step("Identify the anomaly for P", "P has half-filled 3p³ (all orbitals singly occupied) — extra stability. Adding an electron means pairing it with an existing electron in a 3p orbital, requiring extra energy → least negative ΔₑgH"),
      step("Final ranking (most to least negative)", "Cl > F > S > P"),
    ],
    explanation: blocks("Two important exceptions to trends: (1) F has less negative ΔₑgH than Cl because its tiny 2p orbitals are too crowded. (2) P has less negative ΔₑgH than S because the half-filled 3p³ configuration is specially stable. These same principles explain why O has less negative ΔₑgH than N."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.8",
    questionText: blocks("Using the Periodic Table, predict the formulas of compounds which might be formed by the following pairs of elements:\n(a) silicon and bromine\n(b) aluminium and sulphur"),
    answer: blocks(
      "(a) Silicon and Bromine:",
      "Si is in Group 14 → valency 4",
      "Br is in Group 17 → valency 1",
      "Formula: SiBr₄ (silicon tetrabromide)",
      "",
      "(b) Aluminium and Sulphur:",
      "Al is in Group 13 → valency 3",
      "S is in Group 16 → valency 2",
      "Cross multiply: Al₂S₃ (aluminium sulphide)",
      "Check: 2 × 3 (Al) = 3 × 2 (S) = 6 ✓"
    ),
    steps: [
      step("Determine valencies from group numbers", "Si (Group 14): valency = 4; Br (Group 17): valency = 1; Al (Group 13): valency = 3; S (Group 16): valency = 2"),
      step("Apply cross-valency rule for (a)", "SiBr₄: Si valency 4 → needs 4 Br atoms"),
      step("Apply cross-valency rule for (b)", "Al₂S₃: cross multiply → 2 Al atoms (valency 3) + 3 S atoms (valency 2) → total charge balance: 2×(+3) = 3×(−2) = 6"),
    ],
    explanation: blocks("The formula of a binary compound can be predicted from the group numbers (which give valency) using the cross-multiplication method. The valency of the element equals the group number for main group elements (with Group 18 = 0 and Group 17 = 1, etc.)"),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.9",
    questionText: blocks("Are the oxidation state and covalency of Al in [AlCl(H₂O)₅]²⁺ same?"),
    answer: blocks(
      "No, the oxidation state and covalency of Al in [AlCl(H₂O)₅]²⁺ are NOT the same.",
      "",
      "Oxidation state of Al:",
      "Charge of complex = +2",
      "Cl contributes −1; each H₂O contributes 0",
      "Al + (−1) + 5(0) = +2",
      "Al = +2 + 1 = +3",
      "Oxidation state of Al = +3",
      "",
      "Covalency of Al:",
      "Al is bonded to: 1 Cl atom + 5 H₂O molecules = 6 bonds total",
      "Covalency of Al = 6",
      "",
      "Oxidation state = +3; Covalency = 6 → They are NOT equal."
    ),
    steps: [
      step("Calculate oxidation state", "Overall charge = +2; Cl = −1; H₂O = 0\nAl + (−1) + 0 = +2 → Al = +3"),
      step("Calculate covalency", "Al forms coordinate bonds with: 1 Cl + 5 H₂O = 6 bonds\nCovalency = 6"),
      step("Compare", "Oxidation state (+3) ≠ Covalency (6)"),
    ],
    explanation: blocks("Oxidation state represents the formal charge on an atom assuming ionic bonding. Covalency (or coordination number) is the actual number of bonds formed. These are different concepts and are equal only by coincidence. For transition metals and complexes, they commonly differ."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P3.10",
    questionText: blocks("Show by a chemical reaction with water that Na₂O is a basic oxide and Cl₂O₇ is an acidic oxide."),
    answer: blocks(
      "Na₂O is a basic oxide — it reacts with water to produce a base (NaOH):",
      "Na₂O(s) + H₂O(l) → 2NaOH(aq)",
      "NaOH is a strong base → confirms Na₂O is basic oxide.",
      "",
      "Cl₂O₇ is an acidic oxide — it reacts with water to produce an acid (HClO₄):",
      "Cl₂O₇(l) + H₂O(l) → 2HClO₄(aq)",
      "HClO₄ (perchloric acid) is a strong acid → confirms Cl₂O₇ is acidic oxide."
    ),
    steps: [
      step("Write the reaction for Na₂O with water", "Na₂O + H₂O → 2NaOH\nNaOH is a strong base → Na₂O is a basic oxide"),
      step("Write the reaction for Cl₂O₇ with water", "Cl₂O₇ + H₂O → 2HClO₄ (perchloric acid)\nHClO₄ is a strong acid → Cl₂O₇ is an acidic oxide"),
      step("General rule", "Metal oxides → basic oxides; Non-metal oxides → acidic oxides\nNa is a metal (Group 1); Cl is a non-metal (Group 17)"),
    ],
    explanation: blocks("The acidic or basic nature of oxides depends on the electronegativity and nature of the central element. Metal oxides are basic (react with water to give bases or react with acids). Non-metal oxides are acidic (react with water to give acids or react with bases). This is a periodic trend: metallic character and basic oxide character both decrease left to right across a period."),
  },
];

// ─── Import questions from JSON file ──────────────────────────────────────────
const raw = JSON.parse(await readFile(
  new URL("./data/ch11-chemistry-ch3-questions.json", import.meta.url),
  "utf-8"
));

const questions = raw.map((q) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: String(q.questionNumber),
  questionText: toBlocks(q.questionText),
  answer: toBlocks(q.answer),
  ...(q.explanation ? { explanation: toBlocks(q.explanation) } : {}),
  ...(q.steps ? { steps: q.steps } : {}),
}));

const doc = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 3,
  chapterTitle: "Classification of Elements and Periodicity in Properties",
  questions,
  examples,
};

console.log("Importing Class 11 Chemistry Chapter 3: Classification of Elements and Periodicity in Properties");
console.log(`Questions: ${questions.length}`);
console.log(`Examples:  ${examples.length}`);

const result = await client.create(doc);
console.log(`✓ Created document: ${result._id}`);
