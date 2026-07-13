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
    n: "21",
    q: [
      "The equilibrium constant, Kc, for the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) at 500 K is 0.061.\nAt a specific time, analysis shows that the composition of the reaction mixture is 3.0 mol L⁻¹ N₂, 2.0 mol L⁻¹ H₂ and 0.5 mol L⁻¹ NH₃. Is the reaction at equilibrium? If not, in which direction does the reaction proceed to reach equilibrium?",
    ],
    a: [
      {
        eq: "\\begin{array}{lccc} & N_2(g) & 3H_2(g) & 2NH_3(g) \\\\ \\text{At a particular time} & 3.0\\ mol\\ L^{-1} & 2.0\\ mol\\ L^{-1} & 0.5\\ mol\\ L^{-1} \\end{array}",
      },
      "So,",
      { eq: "Q_c = \\frac{[NH_3]^2}{[N_2][H_2]^3} = \\frac{(0.5)^2}{(3.0)(2.0)^3} = 0.0104" },
      "It is given that Kc = 0.061. Since Qc ≠ Kc, the reaction is not at equilibrium.",
      "Since Qc < Kc, the reaction proceeds in the forward direction to reach equilibrium.",
    ],
  },
  {
    n: "22",
    q: [
      "Bromine monochloride, BrCl, decomposes into bromine and chlorine and reaches the following equilibrium:",
      { eq: "2BrCl(g) \\rightleftharpoons Br_2(g) + Cl_2(g)" },
      "for which Kc = 32 at 500 K. If initially pure BrCl is present at a concentration of 3.3×10⁻³ mol L⁻¹, what is its molar concentration in the mixture at equilibrium?",
    ],
    a: [
      "Let the amount of bromine and chlorine formed at equilibrium be x.",
      {
        eq: "\\begin{array}{lccc} & 2BrCl(g) & Br_2(g) & Cl_2(g) \\\\ \\text{Initial conc.} & 3.3\\times10^{-3} & 0 & 0 \\\\ \\text{At equilibrium} & 3.3\\times10^{-3}-2x & x & x \\end{array}",
      },
      "Now, we can write:",
      { eq: "\\frac{[Br_2][Cl_2]}{[BrCl]^2} = K_c \\Rightarrow \\frac{x\\times x}{(3.3\\times10^{-3}-2x)^2} = 32" },
      { eq: "\\sqrt{32} = \\frac{x}{3.3\\times10^{-3}-2x} \\Rightarrow 5.66 = \\frac{x}{3.3\\times10^{-3}-2x}" },
      { eq: "x = 5.66\\times(3.3\\times10^{-3}-2x) = 18.678\\times10^{-3}-11.32x" },
      { eq: "12.32x = 18.678\\times10^{-3} \\Rightarrow x = 1.5\\times10^{-3}" },
      "So, at equilibrium:",
      { eq: "[BrCl] = 3.3\\times10^{-3}-(2\\times1.5\\times10^{-3}) = 3.3\\times10^{-3}-3.0\\times10^{-3} = 0.3\\times10^{-3}\\ mol\\ L^{-1}" },
      "and [Br₂] = [Cl₂] = 1.5×10⁻³ mol L⁻¹.",
    ],
  },
  {
    n: "23",
    q: [
      "At 1127 K and 1 atm pressure, a gaseous mixture of CO and CO₂ in equilibrium with solid carbon has 90.55% CO by mass.",
      { eq: "C(s) + CO_2(g) \\rightleftharpoons 2CO(g)" },
      "Calculate Kc for this reaction at the above temperature.",
    ],
    a: [
      "Let us assume that the gaseous mixture is 100 g in total.",
      "Given, the mass of CO = 90.55 g. Therefore, the mass of CO₂ = (100 - 90.55) = 9.45 g.",
      "Now, the number of moles of CO and CO₂ are:",
      { eq: "n_{CO} = \\frac{90.55}{28} = 3.234\\ mol,\\quad n_{CO_2} = \\frac{9.45}{44} = 0.215\\ mol" },
      "The partial pressure of CO and CO₂ are:",
      { eq: "p_{CO} = \\frac{n_{CO}}{n_{CO}+n_{CO_2}}\\times p_{total} = \\frac{3.234}{3.234+0.215}\\times1 = 0.938\\ atm" },
      { eq: "p_{CO_2} = \\frac{n_{CO_2}}{n_{CO}+n_{CO_2}}\\times p_{total} = \\frac{0.215}{3.234+0.215}\\times1 = 0.062\\ atm" },
      "Therefore:",
      { eq: "K_p = \\frac{[CO]^2}{[CO_2]} = \\frac{(0.938)^2}{0.062} = 14.19" },
      "For the given reaction, Δn = 2-1 = 1. We know that Kp = Kc(RT)^Δn, so:",
      { eq: "14.19 = K_c(0.082\\times1127)^1 \\Rightarrow K_c = \\frac{14.19}{0.082\\times1127} = 0.154\\ \\text{(approximately)}" },
      "Therefore, the equilibrium constant for the given reaction, Kc, is 0.154.",
    ],
  },
  {
    n: "24",
    q: [
      "Calculate (a) ΔG° and (b) the equilibrium constant for the formation of NO₂ from NO and O₂ at 298 K:",
      { eq: "NO(g) + \\tfrac{1}{2}O_2(g) \\rightleftharpoons NO_2(g)" },
      "where ΔfG°(NO₂) = 52.0 kJ/mol, ΔfG°(NO) = 87.0 kJ/mol, ΔfG°(O₂) = 0 kJ/mol.",
    ],
    a: [
      "(a) For the given reaction:",
      { eq: "\\Delta G^\\circ = \\Delta G^\\circ_{(Products)} - \\Delta G^\\circ_{(Reactants)} = 52.0-(87.0+0) = -35.0\\ kJ\\ mol^{-1}" },
      "(b) We know that ΔG° = -2.303 RT log Kc. Therefore:",
      { eq: "\\log K_c = \\frac{-\\Delta G^\\circ}{2.303\\ RT} = \\frac{35.0\\times10^3}{2.303\\times8.314\\times298} = 6.134" },
      { eq: "K_c = \\text{antilog}(6.134) = 1.36\\times10^6" },
      "Therefore, the equilibrium constant for the given reaction, Kc, is 1.36×10⁶.",
    ],
  },
  {
    n: "25",
    q: [
      "Does the number of moles of reaction products increase, decrease or remain the same when each of the following equilibria is subjected to a decrease in pressure by increasing the volume?",
      { eq: "\\text{(a)}\\ PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)" },
      { eq: "\\text{(b)}\\ CaO(s) + CO_2(g) \\rightleftharpoons CaCO_3(s)" },
      { eq: "\\text{(c)}\\ 3Fe(s) + 4H_2O(g) \\rightleftharpoons Fe_3O_4(s) + 4H_2(g)" },
    ],
    a: [
      "(a) The number of moles of reaction products will increase. According to Le Chatelier's principle, if pressure is decreased, the equilibrium shifts in the direction in which the number of moles of gas is more. In the given reaction, the number of moles of gaseous products is more than that of gaseous reactants. Thus, the reaction proceeds in the forward direction, and the number of moles of reaction products will increase.\n(b) The number of moles of reaction products will decrease.\n(c) The number of moles of reaction products remains the same.",
    ],
  },
  {
    n: "26",
    q: [
      "Which of the following reactions will get affected by increasing the pressure? Also, mention whether the change will cause the reaction to go in the forward or backward direction.",
      { eq: "\\text{(I)}\\ COCl_2(g) \\rightleftharpoons CO(g) + Cl_2(g)" },
      { eq: "\\text{(II)}\\ CH_4(g) + 2S_2(g) \\rightleftharpoons CS_2(g) + 2H_2S(g)" },
      { eq: "\\text{(III)}\\ CO_2(g) + C(s) \\rightleftharpoons 2CO(g)" },
      { eq: "\\text{(IV)}\\ 2H_2(g) + CO(g) \\rightleftharpoons CH_3OH(g)" },
      { eq: "\\text{(V)}\\ CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g)" },
      { eq: "\\text{(VI)}\\ 4NH_3(g) + 5O_2(g) \\rightleftharpoons 4NO(g) + 6H_2O(g)" },
    ],
    a: [
      "When pressure is increased, the reactions given in (I), (III), (IV), (V) and (VI) will get affected — reaction (II) is unaffected since the number of moles of gas is equal on both sides.\nSince the number of moles of gaseous reactants is more than that of gaseous products in (IV), the reaction given in (IV) will proceed in the forward direction.\nSince the number of moles of gaseous reactants is less than that of gaseous products in (I), (III), (V) and (VI), these reactions will shift in the backward direction.",
    ],
  },
  {
    n: "27",
    q: [
      "The equilibrium constant for the following reaction is Kp = 1.6×10⁵ at 1024 K:",
      { eq: "H_2(g) + Br_2(g) \\rightleftharpoons 2HBr(g)" },
      "Find the equilibrium pressure of all gases if 10.0 bar of HBr is introduced into a sealed container at 1024 K.",
    ],
    a: [
      "Given, Kp for H₂(g)+Br₂(g)⇌2HBr(g) is 1.6×10⁵.",
      "Therefore, for the reverse reaction 2HBr(g)⇌H₂(g)+Br₂(g), the equilibrium constant will be:",
      { eq: "K_p' = \\frac{1}{K_p} = \\frac{1}{1.6\\times10^5} = 6.25\\times10^{-6}" },
      "Now, let p be the pressure of both H₂ and Br₂ at equilibrium.",
      {
        eq: "\\begin{array}{lccc} & 2HBr(g) & H_2(g) & Br_2(g) \\\\ \\text{Initial conc.} & 10 & 0 & 0 \\\\ \\text{At equilibrium} & 10-2p & p & p \\end{array}",
      },
      "Now, we can write:",
      { eq: "\\frac{p_{H_2}\\times p_{Br_2}}{p_{HBr}^2} = K_p' \\Rightarrow \\frac{p\\times p}{(10-2p)^2} = 6.25\\times10^{-6}" },
      { eq: "\\frac{p}{10-2p} = 2.5\\times10^{-3} \\Rightarrow p = 2.5\\times10^{-2}-(5.0\\times10^{-3})p" },
      { eq: "p+(5.0\\times10^{-3})p = 2.5\\times10^{-2} \\Rightarrow (1.005)p = 2.5\\times10^{-2}" },
      { eq: "p = 2.49\\times10^{-2}\\ bar \\approx 2.5\\times10^{-2}\\ bar\\ \\text{(approximately)}" },
      "Therefore, at equilibrium: [H₂] = [Br₂] = 2.49×10⁻² bar.",
      { eq: "[HBr] = 10-2\\times(2.49\\times10^{-2}) = 9.95\\ bar \\approx 10\\ bar\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "28",
    q: [
      "Dihydrogen gas is obtained from natural gas by partial oxidation with steam as per the following endothermic reaction:",
      { eq: "CH_4(g) + H_2O(g) \\rightleftharpoons CO(g) + 3H_2(g)" },
      "(a) Write an expression for Kp for the above reaction.\n(b) How will the values of Kp and the composition of the equilibrium mixture be affected by (i) increasing the pressure, (ii) increasing the temperature, (iii) using a catalyst?",
    ],
    a: [
      "(a) For the given reaction:",
      { eq: "K_p = \\frac{p_{CO}\\times p_{H_2}^3}{p_{CH_4}\\times p_{H_2O}}" },
      "(b) (i) According to Le Chatelier's principle, the equilibrium will shift in the backward direction.\n(ii) According to Le Chatelier's principle, as the reaction is endothermic, the equilibrium will shift in the forward direction.\n(iii) The equilibrium of the reaction is not affected by the presence of a catalyst. A catalyst only increases the rate of a reaction; thus, equilibrium will be attained more quickly.",
    ],
  },
  {
    n: "29",
    q: [
      "Describe the effect of (a) addition of H₂, (b) addition of CH₃OH, (c) removal of CO, and (d) removal of CH₃OH on the equilibrium of the reaction:",
      { eq: "2H_2(g) + CO(g) \\rightleftharpoons CH_3OH(g)" },
    ],
    a: [
      "(a) According to Le Chatelier's principle, on the addition of H₂, the equilibrium of the given reaction will shift in the forward direction.\n(b) On addition of CH₃OH, the equilibrium will shift in the backward direction.\n(c) On removing CO, the equilibrium will shift in the backward direction.\n(d) On removing CH₃OH, the equilibrium will shift in the forward direction.",
    ],
  },
  {
    n: "30",
    q: [
      "At 473 K, equilibrium constant Kc for the reaction PCl₅(g)⇌PCl₃(g)+Cl₂(g) is 8.3×10⁻³. If the decomposition is depicted as:",
      { eq: "PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g);\\quad \\Delta_rH^\\circ = 124.0\\ kJ\\ mol^{-1}" },
      "(a) Write an expression for Kc for the reaction.\n(b) What is the value of Kc for the reverse reaction at the same temperature?\n(c) What would be the effect on Kc if (i) more PCl₅ is added, (ii) pressure is increased, (iii) the temperature is increased?",
    ],
    a: [
      { eq: "\\text{(a)}\\quad K_c = \\frac{[PCl_3(g)][Cl_2(g)]}{[PCl_5(g)]}" },
      "(b) Value of Kc for the reverse reaction at the same temperature is:",
      { eq: "K_c' = \\frac{1}{K_c} = \\frac{1}{8.3\\times10^{-3}} = 1.2048\\times10^2 = 120.48" },
      "(c) (i) Kc would remain the same because, in this case, the temperature remains the same.\n(ii) Kc is constant at a constant temperature. Thus, in this case, Kc would not change.\n(iii) In an endothermic reaction, the value of Kc increases with an increase in temperature. Since the given reaction is an endothermic reaction, the value of Kc will increase if the temperature is increased.",
    ],
  },
  {
    n: "31",
    q: [
      "Dihydrogen gas used in Haber's process is produced by reacting methane from natural gas with high-temperature steam. The first stage of the two-stage reaction involves the formation of CO and H₂. In the second stage, CO formed in the first stage is reacted with more steam in the water gas shift reaction,",
      { eq: "CO(g) + H_2O(g) \\rightleftharpoons CO_2(g) + H_2(g)" },
      "If a reaction vessel at 400°C is charged with an equimolar mixture of CO and steam such that pCO = pH₂O = 4.0 bar, what will be the partial pressure of H₂ at equilibrium? Kp = 10.1 at 400°C.",
    ],
    a: [
      "Let the partial pressure of both carbon dioxide and hydrogen gas be p.",
      {
        eq: "\\begin{array}{lcccc} & CO(g) & H_2O(g) & CO_2(g) & H_2(g) \\\\ \\text{Initial conc.} & 4.0\\ bar & 4.0\\ bar & 0 & 0 \\\\ \\text{At equilibrium} & 4.0-p & 4.0-p & p & p \\end{array}",
      },
      "Given Kp = 10.1:",
      { eq: "\\frac{p_{CO_2}\\times p_{H_2}}{p_{CO}\\times p_{H_2O}} = K_p \\Rightarrow \\frac{p\\times p}{(4.0-p)(4.0-p)} = 10.1" },
      { eq: "\\frac{p}{4.0-p} = \\sqrt{10.1} = 3.178 \\Rightarrow p = 12.712-3.178p" },
      { eq: "4.178p = 12.712 \\Rightarrow p = \\frac{12.712}{4.178} = 3.04" },
      "So, the partial pressure of H₂ is 3.04 bar at equilibrium.",
    ],
  },
  {
    n: "32",
    q: [
      "Predict which of the following reactions will have an appreciable concentration of reactants and products:",
      { eq: "\\text{(a)}\\ Cl_2(g) \\rightleftharpoons 2Cl(g);\\quad K_c = 5\\times10^{-39}" },
      { eq: "\\text{(b)}\\ Cl_2(g) + 2NO(g) \\rightleftharpoons 2NOCl(g);\\quad K_c = 3.7\\times10^{8}" },
      { eq: "\\text{(c)}\\ Cl_2(g) + 2NO_2(g) \\rightleftharpoons 2NO_2Cl(g);\\quad K_c = 1.8" },
    ],
    a: [
      "If the value of Kc lies between 10⁻³ and 10³, a reaction has an appreciable concentration of reactants and products. Thus, the reaction given in (c) will have an appreciable concentration of reactants and products.",
    ],
  },
  {
    n: "33",
    q: [
      "The value of Kc for the reaction 3O₂(g) ⇌ 2O₃(g) is 2.0×10⁻⁵⁰ at 25°C. If the equilibrium concentration of O₂ in air at 25°C is 1.6×10⁻² M, what is the concentration of O₃?",
    ],
    a: [
      { eq: "3O_2(g) \\rightleftharpoons 2O_3(g)" },
      { eq: "K_c = \\frac{[O_3(g)]^2}{[O_2(g)]^3}" },
      "Given that Kc = 2.0×10⁻⁵⁰ and [O₂(g)] = 1.6×10⁻². Then:",
      { eq: "2.0\\times10^{-50} = \\frac{[O_3(g)]^2}{(1.6\\times10^{-2})^3}" },
      { eq: "[O_3(g)]^2 = 2.0\\times10^{-50}\\times(1.6\\times10^{-2})^3 = 8.192\\times10^{-56}" },
      { eq: "[O_3(g)] = \\sqrt{8.192\\times10^{-56}} = 2.86\\times10^{-28}\\ M" },
      "So, the concentration of O₃ is 2.86×10⁻²⁸ M.",
    ],
  },
  {
    n: "34",
    q: [
      "The reaction, CO(g) + 3H₂(g) ⇌ CH₄(g) + H₂O(g) at 1300 K is at equilibrium in a 1 L container. It has 0.30 mol of CO, 0.10 mol of H₂ and 0.02 mol of H₂O, and an unknown amount of CH₄ in the flask. Determine the concentration of CH₄ in the mixture. The equilibrium constant, Kc, for the reaction at the given temperature is 3.90.",
    ],
    a: [
      "Let the concentration of CH₄ at equilibrium be y.",
      { eq: "CO(g) + 3H_2(g) \\rightleftharpoons CH_4(g) + H_2O(g)" },
      "At equilibrium:",
      { eq: "[CO] = \\frac{0.3}{1} = 0.3\\ M,\\quad [H_2] = \\frac{0.1}{1} = 0.1\\ M,\\quad [H_2O] = \\frac{0.02}{1} = 0.02\\ M" },
      { eq: "K_c = \\frac{[CH_4(g)][H_2O(g)]}{[CO(g)][H_2(g)]^3} \\Rightarrow \\frac{y\\times0.02}{0.3\\times(0.1)^3} = 3.9" },
      { eq: "y = \\frac{3.9\\times0.3\\times(0.1)^3}{0.02} = \\frac{0.00117}{0.02} = 0.0585\\ M = 5.85\\times10^{-2}\\ M" },
      "Therefore, the concentration of CH₄ at equilibrium is 5.85×10⁻² M.",
    ],
  },
  {
    n: "35",
    q: [
      "What is meant by a conjugate acid-base pair? Find the conjugate acid/base for the following species:",
      { eq: "HNO_2,\\ CN^-,\\ HClO_4,\\ F^-,\\ OH^-,\\ CO_3^{2-},\\ \\text{and}\\ S^{2-}" },
    ],
    a: [
      { eq: "\\text{A conjugate acid-base pair differs by only one proton: } HA \\rightleftharpoons A^- + H^+" },
      "The conjugate acid-base pairs of the given species are as follows:\nHNO₂ — conjugate base NO₂⁻\nCN⁻ — conjugate acid HCN\nHClO₄ — conjugate base ClO₄⁻\nF⁻ — conjugate acid HF\nOH⁻ — conjugate acid H₂O; conjugate base O²⁻\nCO₃²⁻ — conjugate acid HCO₃⁻\nS²⁻ — conjugate acid HS⁻",
    ],
  },
  {
    n: "36",
    q: ["Which of the following are Lewis acids? H₂O, BF₃, H⁺, and NH₄⁺"],
    a: [
      "Lewis acids are species that can accept a pair of electrons, while Lewis bases can donate a pair of electrons. H₂O is a Lewis base (it can donate a lone pair of electrons). BF₃, H⁺, and NH₄⁺ are Lewis acids (each can accept a pair of electrons).",
    ],
  },
  {
    n: "37",
    q: ["What will be the conjugate bases for the Brönsted acids: HF, H₂SO₄ and HCO₃⁻?"],
    a: [
      "The conjugate bases for the given Brönsted acids are as follows:\nHF → F⁻\nH₂SO₄ → HSO₄⁻\nHCO₃⁻ → CO₃²⁻",
    ],
  },
  {
    n: "38",
    q: ["Write the conjugate acids for the following Brönsted bases: NH₂⁻, NH₃ and HCOO⁻."],
    a: [
      "The conjugate acids for the given Brönsted bases are as follows:\nNH₂⁻ → NH₃\nNH₃ → NH₄⁺\nHCOO⁻ → HCOOH",
    ],
  },
  {
    n: "39",
    q: [
      "The species: H₂O, HCO₃⁻, HSO₄⁻ and NH₃ can act both as Brönsted acids and bases. For each case, give the corresponding conjugate acid and base.",
    ],
    a: [
      {
        eq: "\\begin{array}{lcc} \\text{Species} & \\text{Conjugate Acid} & \\text{Conjugate Base} \\\\ H_2O & H_3O^+ & OH^- \\\\ HCO_3^- & H_2CO_3 & CO_3^{2-} \\\\ HSO_4^- & H_2SO_4 & SO_4^{2-} \\\\ NH_3 & NH_4^+ & NH_2^- \\end{array}",
      },
    ],
  },
  {
    n: "40",
    q: ["Classify the following species into Lewis acids and Lewis bases and show how these species act as Lewis acid/base:\n(a) OH⁻ (b) F⁻ (c) H⁺ (d) BCl₃"],
    a: [
      "(a) OH⁻ is a Lewis base, as it has a tendency to donate a pair of electrons.\n(b) F⁻ is a Lewis base, as it has a tendency to donate its lone pair of electrons.\n(c) H⁺ is a Lewis acid, as it has a tendency to accept a pair of electrons.\n(d) BCl₃ is a Lewis acid, as it has a tendency to accept a pair of electrons.",
    ],
  },
];

const docId = process.argv[2];
if (!docId) {
  console.error("Usage: node scripts/append-ch11-chemistry-ch7-part2.mjs <docId>");
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

console.log(`✓ Appended Q21-40 (${newQuestions.length} questions) to ${docId}`);
