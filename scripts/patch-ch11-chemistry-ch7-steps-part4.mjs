import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const docId = process.argv[2];
if (!docId) {
  console.error("Usage: node scripts/patch-ch11-chemistry-ch7-steps-part4.mjs <docId>");
  process.exit(1);
}

function block(text) {
  return String(text)
    .split("\n")
    .filter(Boolean)
    .map((line) => ({
      _type: "block",
      _key: randomUUID(),
      style: "normal",
      children: [{ _type: "span", _key: randomUUID(), text: line, marks: [] }],
      markDefs: [],
    }));
}
function equation(latex) {
  return { _type: "equation", _key: randomUUID(), latex };
}
function rich(parts) {
  const out = [];
  for (const part of parts) {
    if (typeof part === "string") out.push(...block(part));
    else out.push(equation(part.eq));
  }
  return out;
}
function step(title, parts) {
  return { _type: "step", _key: randomUUID(), stepTitle: title, content: rich(parts) };
}

const data = {
  "56": {
    steps: [
      step("Find molarity of KOH", [{ eq: "[KOH] = \\frac{0.561}{56\\times0.2} = 0.05\\ M" }]),
      step("Find [OH⁻], [H⁺] and pH", [{ eq: "[H^+] = \\frac{10^{-14}}{0.05} = 2\\times10^{-13}\\ M \\Rightarrow pH = 12.70" }]),
    ],
    exp: "KOH is a strong, monoacidic base, so [OH⁻] equals the formal concentration directly — no equilibrium expression needed, same as Q48.",
  },
  "57": {
    steps: [
      step("Find molarity and ion concentrations", [{ eq: "[Sr(OH)_2] = 0.1581\\ M \\Rightarrow [OH^-] = 0.3162\\ M" }]),
      step("Find [H⁺] and pH", [{ eq: "[H^+] = 3.2\\times10^{-14}\\ M \\Rightarrow pH = 13.50" }]),
    ],
    exp: "Sr(OH)₂ being dibasic means [OH⁻] is DOUBLE the salt's molarity — the same factor-of-2 trap as Ca(OH)₂ in Q49.",
  },
  "58": {
    steps: [
      step("Set up the ICE table and solve for α without HCl", [{ eq: "\\alpha = \\sqrt{\\frac{1.32\\times10^{-5}}{0.05}} = 1.63\\times10^{-2}" }]),
      step("Find [H₃O⁺] and pH", [{ eq: "[H_3O^+] = 8.15\\times10^{-4}\\ M \\Rightarrow pH = 3.09" }]),
      step("Find α with 0.01 M HCl", [{ eq: "\\alpha' = 1.32\\times10^{-3}" }]),
    ],
    exp: "Yet another instance of the common-ion effect (see Q52) — the same pattern repeats across every weak acid in this chapter.",
  },
  "59": {
    steps: [
      step("Find [H⁺] from pH", [{ eq: "[H^+] = 4.5\\times10^{-3}\\ M" }]),
      step("Find α, then Ka", [{ eq: "\\alpha = 0.045 \\Rightarrow K_a = 2.025\\times10^{-4}" }]),
    ],
    exp: "Unlike Q46, here α and Ka are found FROM a measured pH rather than the other way around — the same relationship, run in reverse.",
  },
  "60": {
    steps: [
      step("Set up the hydrolysis equilibrium and find Kh", [{ eq: "K_h = \\frac{K_w}{K_a} = 2.2\\times10^{-11}" }]),
      step("Solve for y, then pH", [{ eq: "y = 9.3\\times10^{-7} \\Rightarrow pH = 7.96" }]),
      step("Find the degree of hydrolysis", [{ eq: "h = \\frac{y}{0.04} = 2.325\\times10^{-5}" }]),
    ],
    exp: "NaNO₂ is the salt of a weak acid and strong base, so its anion hydrolyses to make the solution basic — the salt-hydrolysis mirror of the common-ion-effect problems above.",
  },
  "61": {
    steps: [
      step("Find [H⁺] from pH, then Kh", [{ eq: "K_h = \\frac{(3.63\\times10^{-4})^2}{0.02} = 6.6\\times10^{-6}" }]),
      step("Convert Kh to Ka of pyridine", [{ eq: "K_a = \\frac{10^{-14}}{6.6\\times10^{-6}} = 1.51\\times10^{-9}" }]),
    ],
    exp: "Here it's the CATION that hydrolyses (a weak base's conjugate acid), making the solution acidic — the opposite of Q60's anion hydrolysis.",
  },
  "62": {
    steps: [step("Identify the parent acid and base of each salt", ["Strong+strong → neutral (NaCl, KBr); weak acid+strong base → basic (NaCN, NaNO₂, KF); strong acid+weak base → acidic (NH₄NO₃)."])],
    exp: "The general rule: strong+strong → neutral, weak acid+strong base → basic, strong acid+weak base → acidic — every one of these six salts fits one of those three cases.",
  },
  "63": {
    steps: [
      step("Find pH of the acid alone", [{ eq: "[H^+] = 0.0116\\ M \\Rightarrow pH = 1.94" }]),
      step("Find Kh and solve for pH of the sodium salt solution", [{ eq: "K_h = 7.40\\times10^{-12} \\Rightarrow pH = 7.94" }]),
    ],
    exp: "The acid solution is markedly more acidic (pH 1.94) than its conjugate-base salt solution is basic (pH 7.94), because chloroacetic acid, while 'weak', is still far stronger than water is as an acid for the reverse hydrolysis.",
  },
  "64": {
    steps: [step("Set [H⁺]=[OH⁻]=y and solve Kw=y²", [{ eq: "y = \\sqrt{2.7\\times10^{-14}} = 1.64\\times10^{-7} \\Rightarrow pH = 6.78" }])],
    exp: "Neutral water's pH isn't always exactly 7 — it's exactly 7 only at 298 K, because Kw itself is temperature-dependent (Kw increases with temperature, as it does here at 310 K).",
  },
  "65": {
    steps: [
      step("Solve for the solubility of Ag₂CrO₄", [{ eq: "4x^3 = 1.1\\times10^{-12} \\Rightarrow x = 0.65\\times10^{-4}\\ M" }]),
      step("Solve for the solubility of AgBr", [{ eq: "y^2 = 5.0\\times10^{-13} \\Rightarrow y = 7.07\\times10^{-7}\\ M" }]),
      step("Take the ratio", [{ eq: "\\frac{x}{y} = 91.9" }]),
    ],
    exp: "Even though AgBr has the smaller Ksp, it isn't necessarily less soluble in molarity terms — Ag₂CrO₄'s 2:1 stoichiometry changes how Ksp translates into solubility (a cube-root, not a square-root, relationship).",
  },
  "66": {
    steps: [
      step("Find diluted concentrations after mixing", [{ eq: "[IO_3^-] = [Cu^{2+}] = 0.001\\ M" }]),
      step("Compute the ionic product and compare to Ksp", [{ eq: "[Cu^{2+}][IO_3^-]^2 = 1.0\\times10^{-9} < K_{sp} = 7.4\\times10^{-8}" }]),
    ],
    exp: "Precipitation is governed by comparing the ionic product (using actual concentrations) to Ksp — the same Qc-vs-Kc logic from earlier in the chapter, applied to a solubility equilibrium.",
  },
  "67": {
    steps: [
      step("Find the ratio [HA]/[A⁻] at the buffer pH", [{ eq: "\\frac{[C_6H_5COOH]}{[C_6H_5COO^-]} = 10" }]),
      step("Solve for solubility in the buffer", [{ eq: "y^2 = 27.5\\times10^{-13} \\Rightarrow y = 1.66\\times10^{-6}\\ mol\\ L^{-1}" }]),
      step("Solve for solubility in pure water and take the ratio", [{ eq: "x = 5.0\\times10^{-7}\\ mol\\ L^{-1} \\Rightarrow \\frac{y}{x} = 3.32" }]),
    ],
    exp: "The acidic buffer pulls benzoate ion out of solution as un-ionized benzoic acid, letting more silver benzoate dissolve to compensate — a solubility boost driven entirely by Le Chatelier's principle on the acid-base equilibrium.",
  },
  "68": {
    steps: [step("Halve the concentrations on mixing and apply Ksp", [{ eq: "\\frac{y^2}{4} = 6.3\\times10^{-18} \\Rightarrow y = 5.02\\times10^{-9}\\ M" }])],
    exp: "This is the concentration threshold below which two solutions can be safely mixed without a precipitate forming — a real design constraint in qualitative-analysis group separations.",
  },
  "69": {
    steps: [
      step("Find molar solubility from Ksp", [{ eq: "x = \\sqrt{9.1\\times10^{-6}} = 3.02\\times10^{-3}\\ mol\\ L^{-1}" }]),
      step("Convert to g/L, then find the required volume", [{ eq: "0.41\\ g\\ L^{-1} \\Rightarrow V = \\frac{1}{0.41} = 2.44\\ L" }]),
    ],
    exp: "CaSO₄'s modest Ksp is why gypsum (its hydrate) is only sparingly soluble in water, despite dissolving noticeably more than something like AgCl.",
  },
  "70": {
    steps: [
      step("Find diluted [S²⁻] and [M²⁺] after mixing", [{ eq: "[S^{2-}] = 6.67\\times10^{-20}\\ M,\\quad [M^{2+}] = 1.33\\times10^{-2}\\ M" }]),
      step("Compute the (identical) ionic product for all four salts", [{ eq: "[M^{2+}][S^{2-}] = 8.87\\times10^{-22}" }]),
    ],
    exp: "Because all four metal ions are diluted identically, the deciding factor is purely each metal sulphide's own Ksp — exactly how H₂S is used in qualitative analysis to selectively precipitate Zn²⁺ and Cd²⁺ while leaving Fe²⁺ and Mn²⁺ in solution.",
  },
};

const existingQuestions = await client.fetch(`*[_id == $id][0].questions[]{_key, questionNumber}`, { id: docId });
const keyByNumber = Object.fromEntries(existingQuestions.map((q) => [q.questionNumber, q._key]));

let patch = client.patch(docId);
let count = 0;
for (const [n, { steps, exp }] of Object.entries(data)) {
  const key = keyByNumber[n];
  if (!key) {
    console.warn(`No matching question found for n=${n}, skipping`);
    continue;
  }
  patch = patch.set({
    [`questions[_key=="${key}"].steps`]: steps,
    [`questions[_key=="${key}"].explanation`]: rich([exp]),
  });
  count++;
}

await patch.commit();
console.log(`✓ Patched steps + explanation onto ${count} questions (Q56-70)`);
