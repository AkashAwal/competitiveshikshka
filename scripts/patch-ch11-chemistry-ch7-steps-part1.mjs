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
  console.error("Usage: node scripts/patch-ch11-chemistry-ch7-steps-part1.mjs <docId>");
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

// n -> { steps: [step(...), ...], exp: "..." }
const data = {
  "1": {
    steps: [
      step("Effect on vapour pressure", ["On increasing the volume, the same amount of vapour spreads over more space, so vapour pressure initially drops."]),
      step("Effect on the two rates", ["Evaporation rate rises (more room for liquid to escape into); condensation rate falls (vapour is now more dilute)."]),
      step("Return to equilibrium", ["The two rates re-equalize, but the final vapour pressure is unchanged, since it depends only on temperature."]),
    ],
    exp: "Vapour pressure of a liquid at fixed temperature is a true equilibrium property — it doesn't care how much liquid or vapour is present, or how big the container is, only how hot it is.",
  },
  "2": {
    steps: [
      step("Write the equilibrium constant expression", [{ eq: "K_c = \\frac{[SO_3]^2}{[SO_2]^2[O_2]}" }]),
      step("Substitute the equilibrium concentrations", [{ eq: "K_c = \\frac{(1.90)^2}{(0.60)^2(0.82)}\\ M^{-1} = 12.229\\ M^{-1}" }]),
    ],
    exp: "Kc is always products over reactants raised to their stoichiometric coefficients — squaring SO₂ and SO₃ here reflects their coefficient of 2 in the balanced equation.",
  },
  "3": {
    steps: [
      step("Find partial pressures of I and I₂ from the % composition", [
        { eq: "p_I = \\frac{40}{100}\\times10^5 = 4\\times10^4\\ Pa" },
        { eq: "p_{I_2} = \\frac{60}{100}\\times10^5 = 6\\times10^4\\ Pa" },
      ]),
      step("Substitute into the Kp expression", [{ eq: "K_p = \\frac{(p_I)^2}{p_{I_2}} = 2.67\\times10^4\\ Pa" }]),
    ],
    exp: "Partial pressures are just total pressure split proportionally by mole fraction — here, volume % equals mole % for an ideal gas mixture.",
  },
  "4": {
    steps: [
      step("Write each expression directly from the balanced equation", ["Every species appears raised to its stoichiometric coefficient, products over reactants."]),
      step("Drop solids and pure liquids from (ii)-(v)", ["CuO(s), Cu(NO₃)₂(s), H₂O(l), Fe(OH)₃(s) and I₂(s) all vanish from their respective expressions, since their 'concentration' is a fixed constant."]),
    ],
    exp: "Any species that's a pure solid or liquid is dropped from Kc, because its concentration term is a constant already folded into the value of K itself (see Q7).",
  },
  "5": {
    steps: [
      step("Recall the Kp-Kc relation", [{ eq: "K_p = K_c(RT)^{\\Delta n}" }]),
      step("Solve part (i)", [{ eq: "K_c = \\frac{1.8\\times10^{-2}}{0.0831\\times500} = 4.33\\times10^{-4}" }]),
      step("Solve part (ii)", [{ eq: "K_c = \\frac{167}{0.0831\\times1073} = 1.87" }]),
    ],
    exp: "Whenever Δn = 0, Kp and Kc are numerically identical — it's only when the mole-count of gas changes across the reaction that the (RT)^Δn factor matters.",
  },
  "6": {
    steps: [step("Take the reciprocal of Kc", [{ eq: "K_c' = \\frac{1}{K_c} = \\frac{1}{6.3\\times10^{14}} = 1.59\\times10^{-15}" }])],
    exp: "Reversing a reaction always inverts its equilibrium constant, regardless of whether the reaction is elementary or not.",
  },
  "7": {
    steps: [
      step("Write molar concentration in terms of density and molar mass", [
        { eq: "\\text{Molar concentration} = \\frac{\\text{Mass}}{\\text{Volume}\\times\\text{Molecular mass}} = \\frac{\\text{Density}}{\\text{Molecular mass}}" },
      ]),
      step("Note both quantities are fixed for a pure solid or liquid", ["Density and molar mass never change for a pure substance, so this 'concentration' is a constant that merges into K."]),
    ],
    exp: "This is why you never see [CaCO₃(s)] appear in a Kc expression — its 'concentration' is a fixed number already absorbed into the value of K itself.",
  },
  "8": {
    steps: [
      step("Set up the ICE table", [{ eq: "\\begin{array}{lccc} & 2N_2(g) & O_2(g) & 2N_2O(g) \\\\ \\text{Initial} & 0.482\\ mol & 0.933\\ mol & 0 \\\\ \\text{At equilibrium} & (0.482-x)\\ mol & (0.933-\\frac{x}{2})\\ mol & x\\ mol \\end{array}" }]),
      step("Approximate using the very small Kc", [{ eq: "[N_2] \\approx 0.0482\\ M,\\quad [O_2] \\approx 0.0933\\ M" }]),
      step("Solve for x", [{ eq: "x^2 = 43.35\\times10^{-40} \\Rightarrow x = 6.6\\times10^{-20}" }]),
      step("Find [N₂O]", [{ eq: "[N_2O] = \\frac{x}{10} = 6.6\\times10^{-21}\\ mol\\ L^{-1}" }]),
    ],
    exp: "Whenever K is many orders of magnitude smaller than 1, the reaction barely proceeds forward — approximating (initial − x) ≈ initial is what keeps the equation solvable by hand.",
  },
  "9": {
    steps: [
      step("Use stoichiometry to find how much reacted", [{ eq: "\\frac{0.0518}{2} = 0.0259\\ mol\\ \\text{of}\\ Br_2\\ \\text{reacted}" }]),
      step("Subtract from initial amounts", [
        { eq: "[NO] = 0.087 - 0.0518 = 0.0352\\ mol" },
        { eq: "[Br_2] = 0.0437 - 0.0259 = 0.0178\\ mol" },
      ]),
    ],
    exp: "Since the amount of NOBr formed is given directly, there's no need for an ICE table with an unknown x — the stoichiometric ratios read straight off the balanced equation.",
  },
  "10": {
    steps: [
      step("Identify Δn and substitute into Kp = Kc(RT)^Δn", [{ eq: "K_c = (2.0\\times10^{10})(0.0831\\times450) = 7.48\\times10^{11}\\ M^{-1}" }]),
    ],
    exp: "Kc came out larger than Kp here because Δn is negative — dividing by (RT)^Δn with a negative exponent is the same as multiplying up.",
  },
  "11": {
    steps: [
      step("Set up the ICE table from the pressure drop in HI", [{ eq: "\\begin{array}{lccc} & 2HI(g) & H_2(g) & I_2(g) \\\\ \\text{Initial} & 0.2\\ atm & 0 & 0 \\\\ \\text{At equilibrium} & 0.04\\ atm & 0.08\\ atm & 0.08\\ atm \\end{array}" }]),
      step("Substitute into Kp", [{ eq: "K_p = \\frac{0.08\\times0.08}{(0.04)^2} = 4.0" }]),
    ],
    exp: "The 2:1:1 stoichiometric ratio means the pressure lost by HI is split evenly, one-for-one, between H₂ and I₂.",
  },
  "12": {
    steps: [
      step("Write the actual concentrations from moles and volume", [{ eq: "[N_2] = \\frac{1.57}{20},\\quad [H_2] = \\frac{1.92}{20},\\quad [NH_3] = \\frac{8.13}{20}" }]),
      step("Compute Qc and compare to Kc", [{ eq: "Q_c = 2.4\\times10^3 \\gg K_c = 1.7\\times10^2" }]),
    ],
    exp: "Comparing Qc to Kc — not just computing Qc — is the entire point: Qc > Kc always means 'too much product, go backward', regardless of the actual numbers involved.",
  },
  "13": {
    steps: [step("Match exponents to stoichiometric coefficients", ["Each exponent in the Kc expression (4, 6, 4, 5) is exactly that species' coefficient in the balanced equation."])],
    exp: "An equilibrium expression's exponents are a direct fingerprint of the balanced equation's coefficients — you can reconstruct one from the other.",
  },
  "14": {
    steps: [
      step("Build the ICE table for the conversion used in the source solution", [{ eq: "\\begin{array}{lcccc} & H_2O & CO & H_2 & CO_2 \\\\ \\text{Initial} & 0.1\\ M & 0.1\\ M & 0 & 0 \\\\ \\text{Equilibrium} & 0.06\\ M & 0.06\\ M & 0.04\\ M & 0.04\\ M \\end{array}" }]),
      step("Substitute into Kc", [{ eq: "K_c = \\frac{(0.04)(0.04)}{(0.06)(0.06)} = 0.444" }]),
    ],
    exp: "The worked numbers reflect 40% conversion, not the 60% stated in the question — reported here exactly as the original solution's arithmetic, so treat the final Kc as illustrating the method rather than a literal answer to the 60% case.",
  },
  "15": {
    steps: [
      step("Find Kc for the reverse reaction", [{ eq: "K_c' = \\frac{1}{54.8}" }]),
      step("Set equal concentrations of H₂ and I₂ and solve", [{ eq: "x^2 = \\frac{0.25}{54.8} \\Rightarrow x = 0.068\\ mol\\ L^{-1}" }]),
    ],
    exp: "Starting from pure HI and letting it decompose always produces H₂ and I₂ in a 1:1 ratio — that's exactly the stoichiometry of the reverse reaction.",
  },
  "16": {
    steps: [
      step("Set up the ICE table", [{ eq: "\\begin{array}{lccc} & 2ICl(g) & I_2(g) & Cl_2(g) \\\\ \\text{Initial} & 0.78\\ M & 0 & 0 \\\\ \\text{At equilibrium} & (0.78-2x)\\ M & x\\ M & x\\ M \\end{array}" }]),
      step("Take the square root of both sides", [{ eq: "\\sqrt{0.14} = \\frac{x}{0.78-2x}" }]),
      step("Solve the resulting linear equation", [{ eq: "1.748x = 0.2917 \\Rightarrow x = 0.167\\ M" }]),
    ],
    exp: "Taking √Kc first turns a quadratic in x into a linear one — a shortcut that works whenever every species in Kc appears with the same net power top and bottom.",
  },
  "17": {
    steps: [
      step("Set up the ICE table and Kp expression", [{ eq: "\\frac{p\\times p}{4.0-p} = 0.04" }]),
      step("Rearrange into a quadratic in p", [{ eq: "p^2+0.04p-0.16=0" }]),
      step("Solve with the quadratic formula", [{ eq: "p = \\frac{-0.04+0.80}{2} = 0.38" }]),
    ],
    exp: "The quadratic formula gives two mathematically valid roots — only the positive one that keeps every species' pressure non-negative is physically meaningful.",
  },
  "18": {
    steps: [
      step("(i) Write the reaction quotient", [{ eq: "Q_c = \\frac{[CH_3COOC_2H_5][H_2O]}{[CH_3COOH][C_2H_5OH]}" }]),
      step("(ii) Set up the ICE table and solve for Kc", [{ eq: "K_c = 3.919 \\approx 3.92" }]),
      step("(iii) Compare the new Qc to Kc", [{ eq: "Q_c = 0.204 < K_c" }]),
    ],
    exp: "Because water is a product here (not the solvent), it can't be dropped from the expression — that only happens when water is in vast excess or acting as the medium.",
  },
  "19": {
    steps: [
      step("Write the Kc expression", [{ eq: "K_c = \\frac{[PCl_3][Cl_2]}{[PCl_5]}" }]),
      step("Solve for x", [{ eq: "x^2 = 4.15\\times10^{-4} \\Rightarrow x = 0.02\\ mol\\ L^{-1}" }]),
    ],
    exp: "Since no initial PCl₃ or Cl₂ concentration is given, the ICE table can start directly at 'equilibrium' — there's no need to track an initial row here.",
  },
  "20": {
    steps: [
      step("Compare Qp to Kp to find the direction", [{ eq: "Q_p = \\frac{0.80}{1.4} = 0.571 > K_p" }]),
      step("Set up the shift in pressure and solve for p", [{ eq: "0.265 = \\frac{0.80-p}{1.4+p} \\Rightarrow p = 0.339\\ atm" }]),
    ],
    exp: "A heterogeneous equilibrium like this one only has ONE gas-phase ratio in Kp (CO₂/CO) — the solids FeO and Fe don't appear at all.",
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
console.log(`✓ Patched steps + explanation onto ${count} questions (Q1-20)`);
