import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

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

const questions = [
  {
    n: "41",
    q: ["The concentration of hydrogen ion in a sample of soft drink is 3.8×10⁻³ M. What is its pH?"],
    a: [
      {
        eq: "pH = -\\log[H^+] = -\\log(3.8\\times10^{-3}) = -\\log3.8-\\log10^{-3} = -\\log3.8+3 = -0.5798+3 = 2.42\\ \\text{(approximately)}",
      },
      "Hence, the pH of the soft drink sample is 2.42.",
    ],
  },
  {
    n: "42",
    q: ["The pH of a sample of vinegar is 3.76. Calculate the concentration of hydrogen ion in it."],
    a: [
      { eq: "pH = -\\log[H^+] \\Rightarrow \\log[H^+] = -pH = -3.76" },
      { eq: "[H^+] = \\text{antilog}(-3.76) = 1.74\\times10^{-4}\\ M \\approx 1.78\\times10^{-4}\\ M" },
      "Therefore, the concentration of hydrogen ion in the given sample of vinegar is 1.78×10⁻⁴ M.",
    ],
  },
  {
    n: "43",
    q: [
      "The ionization constant of HF, HCOOH and HCN at 298 K are 6.8×10⁻⁴, 1.8×10⁻⁴ and 4.8×10⁻⁹ respectively. Calculate the ionization constants of the corresponding conjugate base.",
    ],
    a: [
      "The ionization constant of a conjugate base is related to the ionization constant of its acid by Ka × Kb = Kw, i.e. Kb = Kw/Ka.",
      "For the conjugate base of HF, i.e. F⁻:",
      { eq: "K_b = \\frac{K_w}{K_a} = \\frac{10^{-14}}{6.8\\times10^{-4}} = 1.5\\times10^{-11}\\ \\text{(approximately)}" },
      "For the conjugate base of HCOOH, i.e. HCOO⁻:",
      { eq: "K_b = \\frac{10^{-14}}{1.8\\times10^{-4}} = 5.6\\times10^{-11}\\ \\text{(approximately)}" },
      "For the conjugate base of HCN, i.e. CN⁻:",
      { eq: "K_b = \\frac{10^{-14}}{4.8\\times10^{-9}} = 2.08\\times10^{-6}\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "44",
    q: [
      "The ionization constant of phenol is 1.0×10⁻¹⁰. What is the concentration of phenolate ion in 0.05 M solution of phenol? What will be its degree of ionization if the solution is also 0.01 M in sodium phenolate?",
    ],
    a: [
      "Let the concentration of the phenolate ion be x.",
      { eq: "C_6H_5OH \\rightleftharpoons C_6H_5O^- + H^+" },
      {
        eq: "\\begin{array}{lccc} & C_6H_5OH & C_6H_5O^- & H^+ \\\\ \\text{Initial conc.} & 0.05\\ M & 0 & 0 \\\\ \\text{At equilibrium} & (0.05-x)\\ M & x\\ M & x\\ M \\end{array}",
      },
      { eq: "K_a = \\frac{[C_6H_5O^-][H^+]}{[C_6H_5OH]} = \\frac{x^2}{0.05-x} \\approx \\frac{x^2}{0.05} = 1.0\\times10^{-10}" },
      { eq: "x^2 = 1.0\\times10^{-10}\\times0.05 = 5\\times10^{-12} \\Rightarrow x = 2.2\\times10^{-6}\\ M" },
      "Now, if the solution is also 0.01 M in sodium phenolate, then let y be the additional dissociation of phenol. [C₆H₅O⁻] ≈ 0.01 M (from the salt) and [C₆H₅OH] ≈ 0.05 M.",
      { eq: "K_a = \\frac{[C_6H_5O^-][H^+]}{[C_6H_5OH]} \\Rightarrow 1.0\\times10^{-10} = \\frac{0.01\\times y}{0.05}" },
      { eq: "y = \\frac{1.0\\times10^{-10}\\times0.05}{0.01} = 5\\times10^{-10}\\ M" },
      { eq: "\\alpha = \\frac{y}{c} = \\frac{5\\times10^{-10}}{5\\times10^{-2}} = 1\\times10^{-8}" },
    ],
  },
  {
    n: "45",
    q: [
      "The first ionization constant of H₂S is 9.1×10⁻⁸. Calculate the concentration of HS⁻ ion in its 0.1 M solution. How will this concentration be affected if the solution is 0.1 M in HCl also? If the second dissociation constant of H₂S is 1.2×10⁻¹³, calculate the concentration of S²⁻ under both conditions.",
    ],
    a: [
      { eq: "H_2S \\rightleftharpoons H^+ + HS^-" },
      "Case (i) — HCl absent. Let [HS⁻] = [H⁺] = x.",
      { eq: "K_{a_1} = \\frac{[H^+][HS^-]}{[H_2S]} \\approx \\frac{x^2}{0.1} = 9.1\\times10^{-8}" },
      { eq: "x^2 = 9.1\\times10^{-9} \\Rightarrow x = 9.54\\times10^{-5}\\ M" },
      "So, [HS⁻] = [H⁺] = 9.54×10⁻⁵ M (approximately).",
      "Case (ii) — the solution is also 0.1 M in HCl. Here, [H⁺] ≈ 0.1 M (from HCl) since it suppresses the dissociation of H₂S. Let [HS⁻] = y.",
      { eq: "K_{a_1} = \\frac{[H^+][HS^-]}{[H_2S]} \\approx \\frac{(0.1)y}{0.1} = 9.1\\times10^{-8} \\Rightarrow y = 9.1\\times10^{-8}\\ M" },
      "So, [HS⁻] = 9.1×10⁻⁸ M.",
      "Now, for the second dissociation, HS⁻ ⇌ H⁺ + S²⁻, with Ka₂ = 1.2×10⁻¹³:",
      { eq: "K_{a_2} = \\frac{[H^+][S^{2-}]}{[HS^-]}" },
      "In Case (i), since [H⁺] ≈ [HS⁻] (both arise from the first dissociation), these terms cancel:",
      { eq: "[S^{2-}] = K_{a_2} = 1.2\\times10^{-13}\\ M" },
      "In Case (ii), [H⁺] = 0.1 M and [HS⁻] = 9.1×10⁻⁸ M:",
      { eq: "[S^{2-}] = \\frac{K_{a_2}\\times[HS^-]}{[H^+]} = \\frac{1.2\\times10^{-13}\\times9.1\\times10^{-8}}{0.1} = 1.092\\times10^{-19}\\ M" },
    ],
  },
  {
    n: "46",
    q: [
      "The ionization constant of acetic acid is 1.74×10⁻⁵. Calculate the degree of dissociation of acetic acid in its 0.05 M solution. Calculate the concentration of the acetate ion in the solution and its pH.",
    ],
    a: [
      { eq: "CH_3COOH \\rightleftharpoons CH_3COO^- + H^+" },
      "Let the degree of dissociation of acetic acid be α. Using Ka = Cα²:",
      { eq: "\\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{1.74\\times10^{-5}}{0.05}} = \\sqrt{3.48\\times10^{-4}} = 0.0187\\ \\text{(approximately)}" },
      { eq: "[H^+] = [CH_3COO^-] = C\\alpha = \\sqrt{K_a\\times C} = \\sqrt{(1.74\\times10^{-5})(0.05)} = 9.33\\times10^{-4}\\ M" },
      { eq: "pH = -\\log[H^+] = -\\log(9.33\\times10^{-4}) = 3.03\\ \\text{(approximately)}" },
      "Hence, the degree of dissociation is 0.0187, [CH₃COO⁻] = 9.33×10⁻⁴ M, and pH = 3.03.",
    ],
  },
  {
    n: "47",
    q: [
      "It has been found that the pH of a 0.01 M solution of an organic acid is 4.15. Calculate the concentration of the anion, the ionization constant of the acid, and its pKa.",
    ],
    a: [
      { eq: "HA \\rightleftharpoons H^+ + A^-" },
      "Since pH = -log[H⁺] = 4.15:",
      { eq: "[H^+] = \\text{antilog}(-4.15) = 7.08\\times10^{-5}\\ M" },
      "So, [A⁻] = [H⁺] = 7.08×10⁻⁵ M.",
      { eq: "K_a = \\frac{[H^+][A^-]}{[HA]} = \\frac{(7.08\\times10^{-5})^2}{0.01} = 5.0\\times10^{-7}\\ \\text{(approximately)}" },
      { eq: "pK_a = -\\log K_a = -\\log(5.0\\times10^{-7}) = 6.301\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "48",
    q: [
      "Assuming complete dissociation, calculate the pH of the following solutions:\n(a) 0.003 M HCl (b) 0.005 M NaOH (c) 0.002 M HBr (d) 0.002 M KOH",
    ],
    a: [
      { eq: "\\text{(a)}\\ [H^+]=[HCl]=0.003\\ M \\Rightarrow pH=-\\log(3\\times10^{-3})=2.52\\ \\text{(approximately)}" },
      {
        eq: "\\text{(b)}\\ [OH^-]=[NaOH]=0.005\\ M \\Rightarrow [H^+]=\\frac{10^{-14}}{5\\times10^{-3}}=2\\times10^{-12}\\ M \\Rightarrow pH=11.70\\ \\text{(approximately)}",
      },
      { eq: "\\text{(c)}\\ [H^+]=[HBr]=0.002\\ M \\Rightarrow pH=-\\log(2\\times10^{-3})=2.70\\ \\text{(approximately)}" },
      {
        eq: "\\text{(d)}\\ [OH^-]=[KOH]=0.002\\ M \\Rightarrow [H^+]=\\frac{10^{-14}}{2\\times10^{-3}}=5\\times10^{-12}\\ M \\Rightarrow pH=11.30\\ \\text{(approximately)}",
      },
    ],
  },
  {
    n: "49",
    q: [
      "Calculate the pH of the following solutions:\n(I) 2 g of TlOH dissolved in water to give 2 L of solution.\n(II) 0.3 g of Ca(OH)₂ dissolved in water to give 500 mL of solution.\n(III) 0.3 g of NaOH dissolved in water to give 200 mL of solution.\n(IV) 1 mL of 13.6 M HCl is diluted with water to give 1 L of solution.",
    ],
    a: [
      "(I) Molar mass of TlOH = 204 + 16 + 1 = 221 g mol⁻¹.",
      { eq: "[TlOH] = \\frac{2}{221\\times2} = 4.52\\times10^{-3}\\ M = [OH^-]" },
      { eq: "[H^+] = \\frac{K_w}{[OH^-]} = \\frac{10^{-14}}{4.52\\times10^{-3}} = 2.21\\times10^{-12}\\ M \\Rightarrow pH = 11.66\\ \\text{(approximately)}" },
      "(II) Molar mass of Ca(OH)₂ = 40 + 2(16+1) = 74 g mol⁻¹.",
      { eq: "[Ca(OH)_2] = \\frac{0.3}{74\\times0.5} = 8.11\\times10^{-3}\\ M \\Rightarrow [OH^-] = 2\\times8.11\\times10^{-3} = 1.622\\times10^{-2}\\ M" },
      { eq: "pOH = -\\log(1.622\\times10^{-2}) = 1.79 \\Rightarrow pH = 14-1.79 = 12.21\\ \\text{(approximately)}" },
      "(III) Molar mass of NaOH = 23+16+1 = 40 g mol⁻¹.",
      { eq: "[NaOH] = \\frac{0.3}{40\\times0.2} = 3.75\\times10^{-2}\\ M = [OH^-]" },
      { eq: "pOH = -\\log(3.75\\times10^{-2}) = 1.43 \\Rightarrow pH = 14-1.43 = 12.57\\ \\text{(approximately)}" },
      "(IV) Using M₁V₁ = M₂V₂: 13.6 M×1 mL = M₂×1000 mL",
      { eq: "M_2 = [H^+] = 1.36\\times10^{-2}\\ M \\Rightarrow pH = -\\log(1.36\\times10^{-2}) = 1.87\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "50",
    q: ["The degree of ionization of a 0.1 M bromoacetic acid solution is 0.132. Calculate the pKa of the acid."],
    a: [
      "Let α be the degree of ionization of bromoacetic acid, C be its initial concentration.",
      { eq: "K_a = C\\alpha^2" },
      { eq: "pK_a = -\\log K_a = -\\log(1.74\\times10^{-3}) = 2.76\\ \\text{(approximately)}" },
      "Also, [H⁺] = Cα = 0.1×0.132 = 1.32×10⁻² M.",
      { eq: "pH = -\\log(1.32\\times10^{-2}) = 1.88\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "51",
    q: [
      "Aniline is a weak base with Kb = 4.27×10⁻¹⁰. Calculate the degree of ionization of aniline in its 0.001 M solution. Calculate the ionization constant of the conjugate acid of aniline.",
    ],
    a: [
      "Let the degree of ionization of aniline be α.",
      { eq: "K_b = C\\alpha^2 \\Rightarrow \\alpha = \\sqrt{\\frac{K_b}{C}} = \\sqrt{\\frac{4.27\\times10^{-10}}{0.001}} = 6.53\\times10^{-4}\\ \\text{(approximately)}" },
      { eq: "[OH^-] = C\\alpha = 0.001\\times6.53\\times10^{-4} = 6.53\\times10^{-7}\\ M" },
      { eq: "pOH = -\\log(6.53\\times10^{-7}) = 6.187\\ \\text{(approximately)} \\Rightarrow pH = 14-6.187 = 7.813" },
      "The ionization constant of the conjugate acid of aniline (the anilinium ion) is:",
      { eq: "K_a = \\frac{K_w}{K_b} = \\frac{10^{-14}}{4.27\\times10^{-10}} = 2.34\\times10^{-5}" },
    ],
  },
  {
    n: "52",
    q: [
      "Calculate the degree of ionization of 0.05 M acetic acid if its pKa value is 4.74. How is the degree of dissociation affected when its solution is also 0.01 M in HCl? And, in 0.1 M in HCl?",
    ],
    a: [
      { eq: "K_a = \\text{antilog}(-pK_a) = \\text{antilog}(-4.74) = 1.82\\times10^{-5}" },
      "Let α be the degree of ionization of acetic acid in the absence of HCl. Using Ka = Cα²:",
      { eq: "\\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{1.82\\times10^{-5}}{0.05}} = 1.908\\times10^{-2}\\ \\text{(approximately)}" },
      "When HCl is added, the additional H⁺ suppresses the dissociation of acetic acid (common-ion effect). Let x be the new equilibrium concentration of CH₃COO⁻; since [H⁺] is now dominated by the added HCl:",
      "Case (i): with 0.01 M HCl present, [H⁺] ≈ 0.01 M.",
      { eq: "K_a = \\frac{[CH_3COO^-][H^+]}{[CH_3COOH]} \\Rightarrow 1.82\\times10^{-5} = \\frac{x\\times0.01}{0.05}" },
      {
        eq: "x = \\frac{1.82\\times10^{-5}\\times0.05}{0.01} = 9.1\\times10^{-5}\\ M \\Rightarrow \\alpha = \\frac{x}{C} = \\frac{9.1\\times10^{-5}}{0.05} = 1.82\\times10^{-3}\\ \\text{(approximately)}",
      },
      "Case (ii): with 0.1 M HCl present, [H⁺] ≈ 0.1 M.",
      {
        eq: "1.82\\times10^{-5} = \\frac{X\\times0.1}{0.05} \\Rightarrow X = \\frac{1.82\\times10^{-5}\\times0.05}{0.1} = 9.1\\times10^{-6}\\ M \\Rightarrow \\alpha = \\frac{X}{C} = \\frac{9.1\\times10^{-6}}{0.05} = 1.82\\times10^{-4}\\ \\text{(approximately)}",
      },
      "Hence, the degree of dissociation of acetic acid decreases sharply as the concentration of added HCl increases, consistent with the common-ion effect.",
    ],
  },
  {
    n: "53",
    q: [
      "Calculate the degree of ionization of 0.02 M dimethylamine, (CH₃)₂NH, if its Kb = 5.4×10⁻⁴. Also, calculate its ionization constant if the solution is also 0.1 M in NaOH.",
    ],
    a: [
      { eq: "(CH_3)_2NH + H_2O \\rightleftharpoons (CH_3)_2NH_2^+ + OH^-" },
      "Let α be the degree of ionization of dimethylamine. With C = 0.02 M:",
      { eq: "\\alpha = \\sqrt{\\frac{K_b}{C}} = \\sqrt{\\frac{5.4\\times10^{-4}}{0.02}} = 0.1643\\ \\text{(approximately)}" },
      "Now, if 0.1 M of NaOH is added to the solution, then NaOH (being a strong base) undergoes complete ionization:",
      { eq: "NaOH(aq) \\rightarrow Na^+(aq) + OH^-(aq)" },
      {
        eq: "\\begin{array}{lccc} & (CH_3)_2NH & (CH_3)_2NH_2^+ & OH^- \\\\ \\text{Initial conc.} & 0.02\\ M & 0 & 0.1\\ M\\ (\\text{from}\\ NaOH) \\\\ \\text{At equilibrium} & 0.02-x & x & x+0.1\\approx0.1 \\end{array}",
      },
      { eq: "K_b = \\frac{[(CH_3)_2NH_2^+][OH^-]}{[(CH_3)_2NH]} \\Rightarrow 5.4\\times10^{-4} = \\frac{x\\times0.1}{0.02}" },
      {
        eq: "x = \\frac{5.4\\times10^{-4}\\times0.02}{0.1} = 1.08\\times10^{-4}\\ M \\Rightarrow \\alpha = \\frac{x}{C} = \\frac{1.08\\times10^{-4}}{0.02} = 5.4\\times10^{-3} = 0.54\\%",
      },
      "Hence, in the presence of 0.1 M NaOH, only 0.54% of dimethylamine will get dissociated (a sharp decrease from 16.43%, due to the common-ion effect).",
    ],
  },
  {
    n: "54",
    q: [
      "Calculate the hydrogen ion concentration in the following biological fluids whose pH values are given below: (I) Human saliva, 6.4; (II) Human stomach fluid, 1.2; (III) Human muscle-fluid, 6.83; and (IV) Human blood, 7.38.",
    ],
    a: [
      { eq: "\\text{(I)}\\ pH=6.4=-\\log[H^+] \\Rightarrow [H^+]=3.98\\times10^{-7}\\ M" },
      { eq: "\\text{(II)}\\ pH=1.2=-\\log[H^+] \\Rightarrow [H^+]=0.063\\ M=6.3\\times10^{-2}\\ M" },
      { eq: "\\text{(III)}\\ pH=6.83=-\\log[H^+] \\Rightarrow [H^+]=1.48\\times10^{-7}\\ M" },
      { eq: "\\text{(IV)}\\ pH=7.38=-\\log[H^+] \\Rightarrow [H^+]=4.17\\times10^{-8}\\ M" },
    ],
  },
  {
    n: "55",
    q: [
      "The pH of milk, black coffee, tomato juice, lemon juice and egg white are 6.8, 5.0, 4.2, 2.2 and 7.8, respectively. Calculate the corresponding hydrogen ion concentration in each.",
    ],
    a: [
      "The hydrogen ion concentration in the given substances can be calculated by using pH = -log[H⁺].",
      { eq: "\\text{(I) Milk: } pH=6.8 \\Rightarrow [H^+]=\\text{antilog}(-6.8)=1.5\\times10^{-7}\\ M" },
      { eq: "\\text{(II) Black coffee: } pH=5.0 \\Rightarrow [H^+]=\\text{antilog}(-5.0)=10^{-5}\\ M" },
      { eq: "\\text{(III) Tomato juice: } pH=4.2 \\Rightarrow [H^+]=\\text{antilog}(-4.2)=6.31\\times10^{-5}\\ M" },
      { eq: "\\text{(IV) Lemon juice: } pH=2.2 \\Rightarrow [H^+]=\\text{antilog}(-2.2)=6.31\\times10^{-3}\\ M" },
      { eq: "\\text{(V) Egg white: } pH=7.8 \\Rightarrow [H^+]=\\text{antilog}(-7.8)=1.58\\times10^{-8}\\ M" },
    ],
  },
];

const docId = process.argv[2];
if (!docId) {
  console.error("Usage: node scripts/append-ch11-chemistry-ch7-part3.mjs <docId>");
  process.exit(1);
}

const newQuestions = questions.map((item) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: item.n,
  questionText: rich(item.q),
  answer: rich(item.a),
}));

await client
  .patch(docId)
  .setIfMissing({ questions: [] })
  .append("questions", newQuestions)
  .commit();

console.log(`✓ Appended Q41-55 (${newQuestions.length} questions) to ${docId}`);
