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
    n: "56",
    q: [
      "0.561 g of KOH is dissolved in water to give 200 mL of solution at 298 K. Calculate the concentrations of potassium, hydrogen and hydroxyl ions. What is its pH?",
    ],
    a: [
      "Molar mass of KOH = 39+16+1 = 56 g mol⁻¹.",
      { eq: "[KOH] = \\frac{0.561}{56\\times0.2} = 0.05\\ M" },
      { eq: "KOH(aq) \\rightarrow K^+(aq) + OH^-(aq)" },
      "So, [OH⁻] = 0.05 M = [K⁺]. Using [H⁺][OH⁻] = Kw:",
      { eq: "[H^+] = \\frac{K_w}{[OH^-]} = \\frac{10^{-14}}{0.05} = 2\\times10^{-13}\\ M" },
      { eq: "pH = -\\log[H^+] = -\\log(2\\times10^{-13}) = 12.70" },
    ],
  },
  {
    n: "57",
    q: [
      "The solubility of Sr(OH)₂ at 298 K is 19.23 g L⁻¹ of solution. Calculate the concentrations of strontium and hydroxyl ions and the pH of the solution.",
    ],
    a: [
      "Molar mass of Sr(OH)₂ = 87.62 + 2(17) = 121.63 g mol⁻¹.",
      { eq: "[Sr(OH)_2] = \\frac{19.23}{121.63} = 0.1581\\ M" },
      { eq: "Sr(OH)_2(aq) \\rightarrow Sr^{2+}(aq) + 2OH^-(aq)" },
      "So, [Sr²⁺] = 0.1581 M and [OH⁻] = 2×0.1581 = 0.3162 M.",
      { eq: "K_w = [OH^-][H^+] \\Rightarrow [H^+] = \\frac{10^{-14}}{0.3162} = 3.2\\times10^{-14}\\ M" },
      { eq: "pH = -\\log(3.2\\times10^{-14}) = 13.50" },
    ],
  },
  {
    n: "58",
    q: [
      "The ionization constant of propanoic acid is 1.32×10⁻⁵. Calculate the degree of ionization of the acid in its 0.05 M solution and also its pH. What will be its degree of ionization if the solution is 0.01 M in HCl also?",
    ],
    a: [
      "Let the degree of ionization of propanoic acid be α. Representing it as HA:",
      { eq: "HA + H_2O \\rightleftharpoons H_3O^+ + A^-" },
      {
        eq: "\\begin{array}{lccc} & HA & H_3O^+ & A^- \\\\ \\text{Initial conc.} & 0.05\\ M & 0 & 0 \\\\ \\text{At equilibrium} & (0.05-0.05\\alpha)\\approx0.05 & 0.05\\alpha & 0.05\\alpha \\end{array}",
      },
      { eq: "K_a = \\frac{[H_3O^+][A^-]}{[HA]} = \\frac{(0.05\\alpha)(0.05\\alpha)}{0.05} = 0.05\\alpha^2" },
      { eq: "\\alpha = \\sqrt{\\frac{K_a}{0.05}} = \\sqrt{\\frac{1.32\\times10^{-5}}{0.05}} = 1.63\\times10^{-2}" },
      { eq: "[H_3O^+] = 0.05\\alpha = 0.05\\times1.63\\times10^{-2} = 8.15\\times10^{-4}\\ M \\Rightarrow pH = 3.09" },
      "In the presence of 0.01 M HCl, let α' be the new degree of ionization. Here [H₃O⁺] ≈ 0.01 M (dominated by HCl), [A⁻] = 0.05α', [HA] ≈ 0.05 M.",
      { eq: "K_a = \\frac{0.01\\times0.05\\alpha'}{0.05} = 0.01\\alpha' \\Rightarrow 1.32\\times10^{-5} = 0.01\\alpha'" },
      { eq: "\\alpha' = 1.32\\times10^{-3}" },
    ],
  },
  {
    n: "59",
    q: [
      "The pH of 0.1 M solution of cyanic acid (HCNO) is 2.34. Calculate the ionization constant of the acid and its degree of ionization in the solution.",
    ],
    a: [
      "Given, c = 0.1 M and pH = 2.34.",
      { eq: "-\\log[H^+] = 2.34 \\Rightarrow [H^+] = 4.5\\times10^{-3}\\ M" },
      "Also, [H⁺] = cα:",
      { eq: "4.5\\times10^{-3} = 0.1\\times\\alpha \\Rightarrow \\alpha = \\frac{4.5\\times10^{-3}}{0.1} = 0.045" },
      { eq: "K_a = c\\alpha^2 = 0.1\\times(0.045)^2 = 0.0002025 = 2.025\\times10^{-4}" },
    ],
  },
  {
    n: "60",
    q: [
      "The ionization constant of nitrous acid is 4.5×10⁻⁴. Calculate the pH of 0.04 M sodium nitrite solution and also its degree of hydrolysis.",
    ],
    a: [
      "Sodium nitrite is a salt of NaOH (strong base) and HNO₂ (weak acid); its anion undergoes hydrolysis:",
      { eq: "NO_2^- + H_2O \\rightleftharpoons HNO_2 + OH^-" },
      { eq: "K_h = \\frac{[HNO_2][OH^-]}{[NO_2^-]} = \\frac{K_w}{K_a} = \\frac{10^{-14}}{4.5\\times10^{-4}} = 2.2\\times10^{-11}" },
      "Let y mole of the salt undergo hydrolysis. Then [NO₂⁻] = 0.04-y ≈ 0.04, [HNO₂] = y, [OH⁻] = y.",
      { eq: "K_h = \\frac{y^2}{0.04} = 2.2\\times10^{-11} \\Rightarrow y^2 = 8.8\\times10^{-13} \\Rightarrow y = 9.3\\times10^{-7}" },
      "So, [OH⁻] = 9.3×10⁻⁷ M, and:",
      { eq: "[H_3O^+] = \\frac{10^{-14}}{9.3\\times10^{-7}} = 1.075\\times10^{-8}\\ M \\Rightarrow pH = -\\log(1.075\\times10^{-8}) = 7.96" },
      "The degree of hydrolysis is:",
      { eq: "h = \\frac{y}{0.04} = \\frac{9.3\\times10^{-7}}{0.04} = 2.325\\times10^{-5}" },
    ],
  },
  {
    n: "61",
    q: [
      "The pH of 0.02 M solution of pyridinium hydrochloride (C₅H₅NHCl) is 3.44. Calculate the ionization constant of pyridine.",
    ],
    a: [
      "Pyridinium hydrochloride is a salt of a weak base (pyridine, C₅H₅N) and a strong acid (HCl); its cation undergoes hydrolysis:",
      { eq: "C_5H_5NH^+ + H_2O \\rightleftharpoons C_5H_5N + H_3O^+" },
      "Given pH = 3.44:",
      { eq: "[H^+] = \\text{antilog}(-3.44) = 3.63\\times10^{-4}\\ M" },
      { eq: "K_h = \\frac{[H^+]^2}{C} = \\frac{(3.63\\times10^{-4})^2}{0.02} = 6.6\\times10^{-6}" },
      { eq: "K_a(\\text{pyridine}) = \\frac{K_w}{K_h} = \\frac{10^{-14}}{6.6\\times10^{-6}} = 1.51\\times10^{-9}" },
    ],
  },
  {
    n: "62",
    q: ["Predict if the solutions of the following salts are neutral, acidic or basic: NaCl, KBr, NaCN, NH₄NO₃, NaNO₂ and KF."],
    a: [
      "NaCl is a salt of a strong acid (HCl) and a strong base (NaOH). Hence, it forms a neutral solution.\nKBr is a salt of a strong acid (HBr) and a strong base (KOH). Hence, it also forms a neutral solution.\nNaCN is a salt of a weak acid (HCN) and a strong base (NaOH). Hence, it forms a basic solution.\nNH₄NO₃ is a salt of a strong acid (HNO₃) and a weak base (NH₄OH). Hence, it forms an acidic solution.\nNaNO₂ is a salt of a weak acid (HNO₂) and a strong base (NaOH). Hence, it forms a basic solution.\nKF is a salt of a weak acid (HF) and a strong base (KOH). Hence, it forms a basic solution.",
    ],
  },
  {
    n: "63",
    q: ["The ionization constant of chloroacetic acid is 1.35×10⁻³. What will be the pH of 0.1 M acid and its 0.1 M sodium salt solution?"],
    a: [
      "Let the degree of ionization of chloroacetic acid (ClCH₂COOH) be α.",
      { eq: "\\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{1.35\\times10^{-3}}{0.1}} = 0.116\\ \\text{(approximately)}" },
      { eq: "[H^+] = C\\alpha = 0.1\\times0.116 = 0.0116\\ M \\Rightarrow pH = -\\log(0.0116) = 1.94" },
      "For the 0.1 M sodium salt (ClCH₂COONa) solution, the anion undergoes hydrolysis:",
      { eq: "ClCH_2COO^- + H_2O \\rightleftharpoons ClCH_2COOH + OH^-" },
      { eq: "K_h = \\frac{K_w}{K_a} = \\frac{10^{-14}}{1.35\\times10^{-3}} = 7.40\\times10^{-12}" },
      "Let y be the concentration of OH⁻ produced by hydrolysis:",
      { eq: "K_h = \\frac{y^2}{0.1} = 7.40\\times10^{-12} \\Rightarrow y^2 = 7.40\\times10^{-13} \\Rightarrow y = 8.6\\times10^{-7}\\ M" },
      { eq: "[H^+] = \\frac{K_w}{[OH^-]} = \\frac{10^{-14}}{8.6\\times10^{-7}} = 1.162\\times10^{-8}\\ M \\Rightarrow pH = 7.94" },
    ],
  },
  {
    n: "64",
    q: ["Ionic product of water at 310 K is 2.7×10⁻¹⁴. What is the pH of neutral water at this temperature?"],
    a: [
      "In neutral water, [H⁺] = [OH⁻]. Let this common concentration be y.",
      { eq: "K_w = [H^+][OH^-] = y^2 = 2.7\\times10^{-14} \\Rightarrow y = 1.64\\times10^{-7}\\ M" },
      { eq: "pH = -\\log(1.64\\times10^{-7}) = 6.78\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "65",
    q: ["The solubility product constant of Ag₂CrO₄ and AgBr are 1.1×10⁻¹² and 5.0×10⁻¹³, respectively. Calculate the ratio of the molarities of their saturated solutions."],
    a: [
      { eq: "Ag_2CrO_4 \\rightleftharpoons 2Ag^+ + CrO_4^{2-}" },
      { eq: "K_{sp} = [Ag^+]^2[CrO_4^{2-}]" },
      "Let the solubility of Ag₂CrO₄ be x. Then [Ag⁺] = 2x and [CrO₄²⁻] = x.",
      { eq: "K_{sp} = (2x)^2(x) = 4x^3 \\Rightarrow 1.1\\times10^{-12} = 4x^3" },
      { eq: "x = 0.65\\times10^{-4}\\ M" },
      "Let the solubility of AgBr be y.",
      { eq: "AgBr(s) \\rightleftharpoons Ag^+ + Br^- \\Rightarrow K_{sp} = y^2" },
      { eq: "5.0\\times10^{-13} = y^2 \\Rightarrow y = 7.07\\times10^{-7}\\ M" },
      "The ratio of the molarities of their saturated solutions is:",
      { eq: "\\frac{x}{y} = \\frac{0.65\\times10^{-4}\\ M}{7.07\\times10^{-7}\\ M} = 91.9" },
    ],
  },
  {
    n: "66",
    q: ["Equal volumes of 0.002 M solutions of sodium iodate and cupric chlorate are mixed together. Will it lead to the precipitation of copper iodate? (For cupric iodate, Ksp = 7.4×10⁻⁸.)"],
    a: [
      "On mixing equal volumes, the molar concentrations of both sodium iodate and cupric chlorate are halved to 0.001 M each.",
      { eq: "NaIO_3(aq) \\rightarrow Na^+(aq) + IO_3^-(aq)\\quad [IO_3^-]=0.001\\ M" },
      { eq: "Cu(ClO_3)_2(aq) \\rightarrow Cu^{2+}(aq) + 2ClO_3^-(aq)\\quad [Cu^{2+}]=0.001\\ M" },
      "For Cu(IO₃)₂(s) ⇌ Cu²⁺(aq) + 2IO₃⁻(aq), the ionic product is:",
      { eq: "\\text{Ionic product} = [Cu^{2+}][IO_3^-]^2 = (0.001)(0.001)^2 = 1.0\\times10^{-9}" },
      "Since the ionic product (1.0×10⁻⁹) is less than Ksp (7.4×10⁻⁸), precipitation will not occur.",
    ],
  },
  {
    n: "67",
    q: ["The ionisation constant of benzoic acid is 6.46×10⁻⁵, and Ksp for silver benzoate is 2.5×10⁻¹³. How many times is silver benzoate more soluble in a buffer of pH 3.19 compared to its solubility in pure water?"],
    a: [
      "At pH = 3.19:",
      { eq: "[H_3O^+] = \\text{antilog}(-3.19) = 6.46\\times10^{-4}\\ M" },
      { eq: "C_6H_5COOH + H_2O \\rightleftharpoons C_6H_5COO^- + H_3O^+" },
      {
        eq: "K_a = \\frac{[C_6H_5COO^-][H_3O^+]}{[C_6H_5COOH]} \\Rightarrow \\frac{[C_6H_5COOH]}{[C_6H_5COO^-]} = \\frac{[H_3O^+]}{K_a} = \\frac{6.46\\times10^{-4}}{6.46\\times10^{-5}} = 10",
      },
      "Let the solubility of silver benzoate (C₆H₅COOAg) in this buffer be y mol L⁻¹, so [Ag⁺] = y. Since [C₆H₅COOH] = 10[C₆H₅COO⁻] and [C₆H₅COOH] + [C₆H₅COO⁻] = y (mass balance):",
      { eq: "[C_6H_5COO^-] = \\frac{y}{11}" },
      { eq: "K_{sp} = [Ag^+][C_6H_5COO^-] \\Rightarrow 2.5\\times10^{-13} = y\\times\\frac{y}{11}" },
      { eq: "y^2 = 27.5\\times10^{-13} \\Rightarrow y = 1.66\\times10^{-6}\\ mol\\ L^{-1}" },
      "Hence, the solubility of C₆H₅COOAg in the buffer of pH = 3.19 is 1.66×10⁻⁶ mol L⁻¹.",
      "For pure water: let the solubility of silver benzoate be x mol L⁻¹. Here [Ag⁺] = [C₆H₅COO⁻] = x (neglecting hydrolysis of the benzoate ion in pure water):",
      { eq: "K_{sp} = x^2 \\Rightarrow 2.5\\times10^{-13} = x^2 \\Rightarrow x = 5.0\\times10^{-7}\\ mol\\ L^{-1}" },
      "Therefore, the solubility of silver benzoate in the buffer relative to pure water is:",
      { eq: "\\frac{y}{x} = \\frac{1.66\\times10^{-6}}{5.0\\times10^{-7}} = 3.32" },
      "Hence, silver benzoate is about 3.32 times more soluble in a buffer of pH 3.19 than in pure water.",
    ],
  },
  {
    n: "68",
    q: ["What is the maximum concentration of equimolar solutions of ferrous sulphate and sodium sulphide so that when mixed in equal volumes, there is no precipitation of iron sulphide? (For iron sulphide, Ksp = 6.3×10⁻¹⁸.)"],
    a: [
      "Let the concentration of both FeSO₄ and Na₂S be y mol L⁻¹. On mixing equal volumes, each concentration is halved to y/2:",
      { eq: "[Fe^{2+}] = \\frac{y}{2},\\quad [S^{2-}] = \\frac{y}{2}" },
      "For no precipitation of FeS, the ionic product must not exceed Ksp:",
      { eq: "K_{sp} = [Fe^{2+}][S^{2-}] = \\frac{y}{2}\\times\\frac{y}{2} = \\frac{y^2}{4}" },
      { eq: "6.3\\times10^{-18} = \\frac{y^2}{4} \\Rightarrow y^2 = 25.2\\times10^{-18} \\Rightarrow y = 5.02\\times10^{-9}\\ M" },
      "Hence, the maximum concentration of both FeSO₄ and Na₂S should be 5.02×10⁻⁹ M for no precipitation of FeS to occur.",
    ],
  },
  {
    n: "69",
    q: ["What is the minimum volume of water required to dissolve 1 g of calcium sulphate at 298 K? (For calcium sulphate, Ksp is 9.1×10⁻⁶.)"],
    a: [
      { eq: "CaSO_4(s) \\rightleftharpoons Ca^{2+}(aq) + SO_4^{2-}(aq)" },
      "Let the solubility of CaSO₄ be x mol L⁻¹.",
      { eq: "K_{sp} = [Ca^{2+}][SO_4^{2-}] = x^2 \\Rightarrow 9.1\\times10^{-6} = x^2 \\Rightarrow x = 3.02\\times10^{-3}\\ mol\\ L^{-1}" },
      "Molar mass of CaSO₄ = 40 + 32 + 64 = 136 g mol⁻¹.",
      { eq: "\\text{Solubility} = 3.02\\times10^{-3}\\times136 = 0.41\\ g\\ L^{-1}" },
      "This means that 0.41 g of CaSO₄ dissolves in 1 L of water. Therefore, the minimum volume of water required to dissolve 1 g of CaSO₄ is:",
      { eq: "V = \\frac{1}{0.41} = 2.44\\ L" },
    ],
  },
  {
    n: "70",
    q: ["The concentration of sulphide ion in 0.1 M HCl solution saturated with hydrogen sulphide is 1.0×10⁻¹⁹ M. If 10 mL of this is added to 5 mL of 0.04 M solutions of the following ions: FeSO₄, MnCl₂, ZnCl₂ and CdCl₂, in which of these solutions will precipitation take place?"],
    a: [
      "For precipitation, the ionic product [M²⁺][S²⁻] must exceed the Ksp of the corresponding metal sulphide.",
      "On mixing 10 mL of the sulphide-ion solution with 5 mL of a 0.04 M metal-ion solution, the total volume becomes 15 mL, so both concentrations are diluted:",
      { eq: "[S^{2-}] = \\frac{1.0\\times10^{-19}\\times10}{15} = 6.67\\times10^{-20}\\ M" },
      { eq: "[M^{2+}] = \\frac{0.04\\times5}{15} = 1.33\\times10^{-2}\\ M" },
      "So, the ionic product for each metal sulphide is the same:",
      { eq: "[M^{2+}][S^{2-}] = (1.33\\times10^{-2})(6.67\\times10^{-20}) = 8.87\\times10^{-22}" },
      "Comparing this ionic product with the Ksp of each metal sulphide (from standard solubility-product data): FeS and MnS have Ksp values greater than 8.87×10⁻²², so no precipitation occurs in these solutions. ZnS and CdS have Ksp values smaller than 8.87×10⁻²², so precipitation will occur in these solutions.",
      "Hence, precipitation takes place only in the ZnCl₂ and CdCl₂ solutions.",
    ],
  },
];

const docId = process.argv[2];
if (!docId) {
  console.error("Usage: node scripts/append-ch11-chemistry-ch7-part4.mjs <docId>");
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

console.log(`✓ Appended Q56-70 (${newQuestions.length} questions) to ${docId}`);
