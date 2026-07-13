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
  console.error("Usage: node scripts/patch-ch11-chemistry-ch7-steps-part3.mjs <docId>");
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
  "41": {
    steps: [step("Apply pH = −log[H⁺]", [{ eq: "pH = -\\log(3.8\\times10^{-3}) = 2.42" }])],
    exp: "1 unit of pH corresponds to a 10× change in [H⁺] — going from pH 2 to pH 3 means ten times less acidic, not just 'a bit less'.",
  },
  "42": {
    steps: [step("Rearrange pH = −log[H⁺] for [H⁺]", [{ eq: "[H^+] = \\text{antilog}(-3.76) = 1.78\\times10^{-4}\\ M" }])],
    exp: "Going from pH to [H⁺] is just inverting the log — raise 10 to the power of −pH.",
  },
  "43": {
    steps: [step("Apply Kb = Kw/Ka to each acid", [{ eq: "K_b(F^-) = 1.5\\times10^{-11},\\ K_b(HCOO^-) = 5.6\\times10^{-11},\\ K_b(CN^-) = 2.08\\times10^{-6}" }])],
    exp: "The stronger the acid (larger Ka), the weaker its conjugate base (smaller Kb) — Ka×Kb=Kw is a fixed product, so one always trades off against the other.",
  },
  "44": {
    steps: [
      step("Solve for x without added salt", [{ eq: "x^2 = 5\\times10^{-12} \\Rightarrow x = 2.2\\times10^{-6}\\ M" }]),
      step("Solve degree of ionization with added sodium phenolate", [{ eq: "\\alpha = \\frac{y}{c} = 1\\times10^{-8}" }]),
    ],
    exp: "Adding the salt (a source of the conjugate base) suppresses phenol's own ionization by the common-ion effect — α drops from about 4×10⁻⁵ to 1×10⁻⁸, a thousand-fold decrease.",
  },
  "45": {
    steps: [
      step("Solve the first dissociation without HCl", [{ eq: "x^2 = 9.1\\times10^{-9} \\Rightarrow x = 9.54\\times10^{-5}\\ M" }]),
      step("Solve the first dissociation with 0.1 M HCl", [{ eq: "y = 9.1\\times10^{-8}\\ M" }]),
      step("Find [S²⁻] in both cases from the second dissociation", [{ eq: "[S^{2-}]_{\\text{no HCl}} = 1.2\\times10^{-13}\\ M,\\quad [S^{2-}]_{\\text{with HCl}} = 1.092\\times10^{-19}\\ M" }]),
    ],
    exp: "Adding a strong acid suppresses BOTH dissociation steps of H₂S — [S²⁻] drops by six orders of magnitude, exactly the trick used to control sulphide precipitation in qualitative analysis.",
  },
  "46": {
    steps: [
      step("Find the degree of dissociation", [{ eq: "\\alpha = \\sqrt{\\frac{1.74\\times10^{-5}}{0.05}} = 0.0187" }]),
      step("Find [H⁺] and pH", [{ eq: "[H^+] = 9.33\\times10^{-4}\\ M \\Rightarrow pH = 3.03" }]),
    ],
    exp: "For a weak acid, α = √(Ka/C) shows dissociation increases as concentration decreases — dilute solutions of weak acids ionize proportionally MORE, not less.",
  },
  "47": {
    steps: [
      step("Find [H⁺] from pH, then [A⁻]", [{ eq: "[H^+] = \\text{antilog}(-4.15) = 7.08\\times10^{-5}\\ M" }]),
      step("Compute Ka and pKa", [{ eq: "K_a = 5.0\\times10^{-7} \\Rightarrow pK_a = 6.301" }]),
    ],
    exp: "Since HA is monoprotic and starts with no A⁻, [H⁺] and [A⁻] must be equal at equilibrium — that equality is what makes this a one-step calculation.",
  },
  "48": {
    steps: [step("Apply pH/pOH definitions to each strong acid or base", [{ eq: "(a)\\ pH=2.52,\\ (b)\\ pH=11.70,\\ (c)\\ pH=2.70,\\ (d)\\ pH=11.30" }])],
    exp: "Because all four are strong electrolytes assumed to dissociate completely, [H⁺] or [OH⁻] is read directly off the given concentration — no equilibrium expression is needed.",
  },
  "49": {
    steps: [
      step("Convert each mass to molarity", [{ eq: "[TlOH]=4.52\\times10^{-3}\\ M,\\ [Ca(OH)_2]=8.11\\times10^{-3}\\ M,\\ [NaOH]=3.75\\times10^{-2}\\ M" }]),
      step("Convert to pH", [{ eq: "pH: 11.66,\\ 12.21,\\ 12.57,\\ 1.87" }]),
    ],
    exp: "TlOH and NaOH are monobasic (1 OH⁻ per formula unit) while Ca(OH)₂ is dibasic (2 OH⁻) — that factor of 2 is the easiest place to make an error in part (II).",
  },
  "50": {
    steps: [step("Find Ka from Ka = Cα², then pKa", [{ eq: "K_a = 1.74\\times10^{-3} \\Rightarrow pK_a = 2.76" }])],
    exp: "[H⁺] = Cα gives an internally consistent pH here (1.88) using the same α, cross-checking the pKa figure.",
  },
  "51": {
    steps: [
      step("Find degree of ionization and [OH⁻]", [{ eq: "\\alpha = 6.53\\times10^{-4} \\Rightarrow [OH^-] = 6.53\\times10^{-7}\\ M" }]),
      step("Convert to pH", [{ eq: "pOH = 6.187 \\Rightarrow pH = 7.813" }]),
      step("Find Ka of the conjugate acid", [{ eq: "K_a = \\frac{10^{-14}}{4.27\\times10^{-10}} = 2.34\\times10^{-5}" }]),
    ],
    exp: "The anilinium ion (C₆H₅NH₃⁺) is the conjugate acid here — its Ka being fairly large just reflects that aniline is a fairly weak base.",
  },
  "52": {
    steps: [
      step("Find Ka from pKa, then α with no HCl", [{ eq: "K_a = 1.82\\times10^{-5} \\Rightarrow \\alpha = 1.908\\times10^{-2}" }]),
      step("Find α with 0.01 M HCl", [{ eq: "\\alpha = 1.82\\times10^{-3}" }]),
      step("Find α with 0.1 M HCl", [{ eq: "\\alpha = 1.82\\times10^{-4}" }]),
    ],
    exp: "This is the common-ion effect in its clearest form — each ten-fold increase in added [H⁺] suppresses acetic acid's own ionization by roughly the same factor.",
  },
  "53": {
    steps: [
      step("Find α with no NaOH added", [{ eq: "\\alpha = \\sqrt{\\frac{5.4\\times10^{-4}}{0.02}} = 0.1643" }]),
      step("Find α with 0.1 M NaOH added", [{ eq: "\\alpha = 5.4\\times10^{-3} = 0.54\\%" }]),
    ],
    exp: "The OH⁻ from NaOH is the 'common ion' here (shared with the base's own equilibrium), suppressing dimethylamine's ionization the same way added H⁺ suppresses an acid's.",
  },
  "54": {
    steps: [step("Convert each pH to [H⁺]", [{ eq: "6.4\\to3.98\\times10^{-7},\\ 1.2\\to6.3\\times10^{-2},\\ 6.83\\to1.48\\times10^{-7},\\ 7.38\\to4.17\\times10^{-8}" }])],
    exp: "Blood's pH (7.38) sits in the very narrow physiological range the body works hard to maintain — the acidic extreme, stomach fluid, spans nearly six orders of magnitude in [H⁺] by comparison.",
  },
  "55": {
    steps: [step("Convert each pH to [H⁺] via antilog", [{ eq: "6.8\\to1.5\\times10^{-7},\\ 5.0\\to10^{-5},\\ 4.2\\to6.31\\times10^{-5},\\ 2.2\\to6.31\\times10^{-3},\\ 7.8\\to1.58\\times10^{-8}" }])],
    exp: "Egg white being most basic (pH 7.8) and lemon juice most acidic (pH 2.2) corresponds to a roughly million-fold difference in [H⁺] between the two.",
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
console.log(`✓ Patched steps + explanation onto ${count} questions (Q41-55)`);
