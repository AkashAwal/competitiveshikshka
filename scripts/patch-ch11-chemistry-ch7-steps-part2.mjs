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
  console.error("Usage: node scripts/patch-ch11-chemistry-ch7-steps-part2.mjs <docId>");
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
  "21": {
    steps: [step("Compute Qc from the given concentrations", [{ eq: "Q_c = \\frac{(0.5)^2}{(3.0)(2.0)^3} = 0.0104" }])],
    exp: "Same one-step comparison as Q12/Q20 — Qc vs Kc is the universal test for which way a reaction will shift.",
  },
  "22": {
    steps: [
      step("Set up the ICE table and Kc expression", [{ eq: "\\frac{x\\times x}{(3.3\\times10^{-3}-2x)^2} = 32" }]),
      step("Solve for x using the square-root shortcut", [{ eq: "5.66 = \\frac{x}{3.3\\times10^{-3}-2x} \\Rightarrow x = 1.5\\times10^{-3}" }]),
      step("Find equilibrium concentrations", [{ eq: "[BrCl] = 0.3\\times10^{-3}\\ M,\\quad [Br_2]=[Cl_2]=1.5\\times10^{-3}\\ M" }]),
    ],
    exp: "The same square-root shortcut as Q16 works here, since Br₂ and Cl₂ both have coefficient 1, cancelling neatly against the squared BrCl term.",
  },
  "23": {
    steps: [
      step("Convert mass percentages to moles and partial pressures", [{ eq: "n_{CO} = 3.234\\ mol,\\quad n_{CO_2} = 0.215\\ mol" }, { eq: "p_{CO} = 0.938\\ atm,\\quad p_{CO_2} = 0.062\\ atm" }]),
      step("Compute Kp, then convert to Kc", [{ eq: "K_p = 14.19 \\Rightarrow K_c = \\frac{14.19}{0.082\\times1127} = 0.154" }]),
    ],
    exp: "Note R = 0.082 L atm K⁻¹mol⁻¹ (atm units) is used here, not the bar-based 0.0831 — always match R's units to whatever pressure unit Kp is expressed in.",
  },
  "24": {
    steps: [
      step("Compute ΔG° from formation energies", [{ eq: "\\Delta G^\\circ = 52.0-87.0 = -35.0\\ kJ\\ mol^{-1}" }]),
      step("Convert ΔG° to Kc", [{ eq: "\\log K_c = \\frac{35.0\\times10^3}{2.303\\times8.314\\times298} = 6.134 \\Rightarrow K_c = 1.36\\times10^6" }]),
    ],
    exp: "ΔG° < 0 here (spontaneous) is exactly why Kc turns out to be a huge number — a very negative ΔG° always corresponds to K ≫ 1, meaning the reaction goes essentially to completion.",
  },
  "25": {
    steps: [step("Apply Le Chatelier's principle to each equilibrium", ["Decreasing pressure shifts each equilibrium toward the side with more moles of gas: forward in (a), backward in (b), unchanged in (c)."])],
    exp: "Reducing pressure by expanding volume always pushes equilibrium toward the side with MORE moles of gas — that's the entire content of Le Chatelier's principle applied here.",
  },
  "26": {
    steps: [step("Count gas moles on each side and compare", ["Reactions where gas-mole counts differ across the equation shift when pressure changes; (II), with equal moles on both sides, doesn't."])],
    exp: "The mirror image of Q25's logic — increasing pressure favours the side with FEWER moles of gas.",
  },
  "27": {
    steps: [
      step("Find Kp for the reverse (decomposition) reaction", [{ eq: "K_p' = \\frac{1}{1.6\\times10^5} = 6.25\\times10^{-6}" }]),
      step("Set up the ICE table and solve for p", [{ eq: "\\frac{p\\times p}{(10-2p)^2} = 6.25\\times10^{-6} \\Rightarrow p = 2.49\\times10^{-2}\\ bar" }]),
    ],
    exp: "Since the container starts with pure HBr, the reverse (decomposition) Kp is the relevant one to use directly — no need to write forward expressions with zero initial H₂/Br₂.",
  },
  "28": {
    steps: [
      step("Write the Kp expression", [{ eq: "K_p = \\frac{p_{CO}\\times p_{H_2}^3}{p_{CH_4}\\times p_{H_2O}}" }]),
      step("Apply Le Chatelier's principle to (i), (ii), (iii)", ["Higher pressure shifts backward (fewer gas moles); higher temperature shifts forward (endothermic); a catalyst changes neither, only the rate of reaching equilibrium."]),
    ],
    exp: "A catalyst changes the RATE at which equilibrium is reached but never its POSITION — that's fixed by thermodynamics (ΔG°), which a catalyst doesn't touch.",
  },
  "29": {
    steps: [step("Apply Le Chatelier's principle to each perturbation", ["Adding a species shifts equilibrium away from it; removing one shifts equilibrium toward replacing it."])],
    exp: "Adding a species always shifts equilibrium away from it, and removing one always shifts it toward replacing it — that symmetric rule covers all four parts here.",
  },
  "30": {
    steps: [
      step("Write the Kc expression and its reciprocal", [{ eq: "K_c' = \\frac{1}{8.3\\times10^{-3}} = 120.48" }]),
      step("Apply Le Chatelier's principle for (i)-(iii)", ["Adding PCl₅ or raising pressure both shift the position of equilibrium but leave Kc unchanged; raising temperature increases Kc since the reaction is endothermic."]),
    ],
    exp: "Kc itself is a function of temperature ONLY — adding more reactant or changing pressure shifts the position of equilibrium (Qc moves back toward the same Kc), not the value of Kc.",
  },
  "31": {
    steps: [
      step("Set up the ICE table", [{ eq: "\\frac{p\\times p}{(4.0-p)(4.0-p)} = 10.1" }]),
      step("Solve for p", [{ eq: "\\frac{p}{4.0-p} = \\sqrt{10.1} = 3.178 \\Rightarrow p = 3.04\\ bar" }]),
    ],
    exp: "The same square-root shortcut as Q16/Q22 — every species here has coefficient 1, so Kp reduces to a perfect square.",
  },
  "32": {
    steps: [step("Compare each Kc to the 10⁻³–10³ 'appreciable' window", ["(a) and (b) fall far outside this range; only (c), with Kc = 1.8, sits inside it."])],
    exp: "Kc this small (10⁻³⁹) or this large (10⁸) means the reaction is, for practical purposes, one-directional — only a K near 1 gives a genuine mixture of reactants and products.",
  },
  "33": {
    steps: [
      step("Write the Kc expression and substitute", [{ eq: "2.0\\times10^{-50} = \\frac{[O_3(g)]^2}{(1.6\\times10^{-2})^3}" }]),
      step("Solve for [O₃]", [{ eq: "[O_3(g)] = \\sqrt{8.192\\times10^{-56}} = 2.86\\times10^{-28}\\ M" }]),
    ],
    exp: "This is why stratospheric ozone exists only in trace amounts even though it's constantly being formed — its equilibrium constant relative to O₂ is astronomically small.",
  },
  "34": {
    steps: [
      step("Write concentrations at equilibrium", [{ eq: "[CO]=0.3\\ M,\\ [H_2]=0.1\\ M,\\ [H_2O]=0.02\\ M" }]),
      step("Substitute into Kc and solve for y", [{ eq: "\\frac{y\\times0.02}{0.3\\times(0.1)^3} = 3.9 \\Rightarrow y = 5.85\\times10^{-2}\\ M" }]),
    ],
    exp: "Because CH₄ is the only unknown, this Kc expression collapses to a simple one-step algebra problem rather than needing a full ICE table.",
  },
  "35": {
    steps: [step("Identify the conjugate partner for each species", ["Adding H⁺ gives the conjugate acid; removing H⁺ gives the conjugate base — apply this to all seven species listed."])],
    exp: "Adding H⁺ makes the conjugate acid; removing H⁺ makes the conjugate base — every one of these seven pairs follows from that single rule.",
  },
  "36": {
    steps: [step("Classify each species by electron-pair donation or acceptance", ["H₂O donates a lone pair (base); BF₃, H⁺ and NH₄⁺ each accept a pair (acids)."])],
    exp: "Lewis acid–base theory is broader than Brønsted theory — it explains why species with no H⁺ to give, like BF₃, can still act as acids.",
  },
  "37": {
    steps: [step("Remove one H⁺ from each acid", ["HF → F⁻; H₂SO₄ → HSO₄⁻ (only one of its two acidic protons is removed); HCO₃⁻ → CO₃²⁻."])],
    exp: "Removing a proton from an acid always gives its conjugate base — H₂SO₄ losing one of its two acidic protons gives HSO₄⁻, not SO₄²⁻ directly.",
  },
  "38": {
    steps: [step("Add one H⁺ to each base", ["NH₂⁻ → NH₃; NH₃ → NH₄⁺; HCOO⁻ → HCOOH."])],
    exp: "Adding a proton to a base gives its conjugate acid — the exact mirror operation of Q37.",
  },
  "39": {
    steps: [step("Add H⁺ for the conjugate acid, remove H⁺ for the conjugate base", [{ eq: "\\begin{array}{lcc} \\text{Species} & \\text{Conjugate Acid} & \\text{Conjugate Base} \\\\ H_2O & H_3O^+ & OH^- \\\\ HCO_3^- & H_2CO_3 & CO_3^{2-} \\end{array}" }])],
    exp: "Species that can both gain and lose a proton (like H₂O, HCO₃⁻) are called amphiprotic — they sit in the middle of a proton-transfer chain rather than at an end.",
  },
  "40": {
    steps: [step("Determine whether each species can donate or accept an electron pair", ["OH⁻ and F⁻ donate (bases); H⁺ and BCl₃ accept (acids)."])],
    exp: "H⁺ is the simplest possible Lewis acid — it has no electrons of its own, so it MUST accept a pair to form any bond.",
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
console.log(`✓ Patched steps + explanation onto ${count} questions (Q21-40)`);
