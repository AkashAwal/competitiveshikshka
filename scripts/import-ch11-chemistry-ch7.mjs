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
    n: "1",
    q: [
      "A liquid is in equilibrium with its vapour in a sealed container at a fixed temperature. The volume of the container is suddenly increased.\n(a) What is the initial effect of the change on vapour pressure?\n(b) How do the rates of evaporation and condensation change initially?\n(c) What happens when equilibrium is restored finally, and what will be the final vapour pressure?",
    ],
    a: [
      "(a) On increasing the volume of the container, the vapour pressure will initially decrease, because the same amount of vapour is now distributed over a larger space.\n(b) On increasing the volume, the rate of evaporation increases initially because more space becomes available. Since the amount of vapour per unit volume decreases as the volume increases, the rate of condensation decreases initially.\n(c) Equilibrium is finally restored when the rates of the forward and backward processes become equal again. However, the vapour pressure remains unchanged, because it depends only on the temperature and not on the volume of the container.",
    ],
  },
  {
    n: "2",
    q: [
      "What is Kc for the following equilibrium when the equilibrium concentration of each substance is: [SO2] = 0.60 M, [O2] = 0.82 M and [SO3] = 1.90 M?",
      { eq: "2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)" },
    ],
    a: [
      "As per the reaction, the equilibrium constant expression is:",
      { eq: "K_c = \\frac{[SO_3]^2}{[SO_2]^2[O_2]}" },
      "Substituting the given equilibrium concentrations:",
      { eq: "K_c = \\frac{(1.90)^2}{(0.60)^2(0.82)}\\ M^{-1} = 12.229\\ M^{-1}\\ \\text{(approximately)}" },
      "Hence, Kc for the equilibrium is 12.229 M⁻¹.",
    ],
  },
  {
    n: "3",
    q: [
      "At a certain temperature and total pressure of 10⁵ Pa, iodine vapour contains 40% by volume of I atoms.",
      { eq: "I_2(g) \\rightleftharpoons 2I(g)" },
      "Calculate Kp for the equilibrium.",
    ],
    a: [
      "The partial pressure of iodine atoms (I):",
      { eq: "p_I = \\frac{40}{100} \\times p_{total} = \\frac{40}{100} \\times 10^5 = 4\\times10^4\\ Pa" },
      "The partial pressure of I₂ molecules:",
      { eq: "p_{I_2} = \\frac{60}{100} \\times p_{total} = \\frac{60}{100} \\times 10^5 = 6\\times10^4\\ Pa" },
      "Now, for the given reaction:",
      { eq: "K_p = \\frac{(p_I)^2}{p_{I_2}} = \\frac{(4\\times10^4\\ Pa)^2}{6\\times10^4\\ Pa} = 2.67\\times10^4\\ Pa" },
    ],
  },
  {
    n: "4",
    q: [
      "Write the expression for the equilibrium constant, Kc, for each of the following reactions:",
      { eq: "\\text{(i)}\\ 2NOCl(g) \\rightleftharpoons 2NO(g) + Cl_2(g)" },
      { eq: "\\text{(ii)}\\ 2Cu(NO_3)_2(s) \\rightleftharpoons 2CuO(s) + 4NO_2(g) + O_2(g)" },
      { eq: "\\text{(iii)}\\ CH_3COOC_2H_5(aq) + H_2O(l) \\rightleftharpoons CH_3COOH(aq) + C_2H_5OH(aq)" },
      { eq: "\\text{(iv)}\\ Fe^{3+}(aq) + 3OH^-(aq) \\rightleftharpoons Fe(OH)_3(s)" },
      { eq: "\\text{(v)}\\ I_2(s) + 5F_2(g) \\rightleftharpoons 2IF_5" },
    ],
    a: [
      { eq: "\\text{(i)}\\quad K_c = \\frac{[NO]^2[Cl_2]}{[NOCl]^2}" },
      "(ii) Since CuO(s) and Cu(NO₃)₂(s) are solids, their concentrations are omitted:",
      { eq: "K_c = [NO_2]^4[O_2]" },
      "(iii) Since H₂O(l) is a pure liquid, its concentration is omitted:",
      { eq: "K_c = \\frac{[CH_3COOH][C_2H_5OH]}{[CH_3COOC_2H_5]}" },
      "(iv) Since Fe(OH)₃(s) is a solid, its concentration is omitted:",
      { eq: "K_c = \\frac{1}{[Fe^{3+}][OH^-]^3}" },
      "(v) Since I₂(s) is a solid, its concentration is omitted:",
      { eq: "K_c = \\frac{[IF_5]^2}{[F_2]^5}" },
    ],
  },
  {
    n: "5",
    q: [
      "Find out the value of Kc for each of the following equilibria from the value of Kp:",
      { eq: "\\text{(i)}\\ 2NOCl(g) \\rightleftharpoons 2NO(g) + Cl_2(g);\\quad K_p = 1.8\\times10^{-2}\\ \\text{at}\\ 500\\ K" },
      { eq: "\\text{(ii)}\\ CaCO_3(s) \\rightleftharpoons CaO(s) + CO_2(g);\\quad K_p = 167\\ \\text{at}\\ 1073\\ K" },
    ],
    a: [
      "The relation between Kp and Kc is:",
      { eq: "K_p = K_c(RT)^{\\Delta n}" },
      "(i) Given: R = 0.0831 bar L mol⁻¹K⁻¹, Δn = 3-2 = 1, T = 500 K, Kp = 1.8×10⁻²",
      { eq: "1.8\\times10^{-2} = K_c(0.0831\\times500)^1" },
      { eq: "K_c = \\frac{1.8\\times10^{-2}}{0.0831\\times500} = 4.33\\times10^{-4}\\ \\text{(approximately)}" },
      "(ii) Here: Δn = 2-1 = 1, R = 0.0831 bar L mol⁻¹K⁻¹, T = 1073 K, Kp = 167",
      { eq: "167 = K_c(0.0831\\times1073)^1" },
      { eq: "K_c = \\frac{167}{0.0831\\times1073} = 1.87\\ \\text{(approximately)}" },
    ],
  },
  {
    n: "6",
    q: [
      "For the following equilibrium, Kc = 6.3×10¹⁴ at 1000 K:",
      { eq: "NO(g) + O_3(g) \\rightleftharpoons NO_2(g) + O_2(g)" },
      "Both the forward and reverse reactions in the equilibrium are elementary bimolecular reactions. What is Kc for the reverse reaction?",
    ],
    a: [
      "For the reverse reaction:",
      { eq: "K_c' = \\frac{1}{K_c} = \\frac{1}{6.3\\times10^{14}} = 1.59\\times10^{-15}" },
    ],
  },
  {
    n: "7",
    q: ["Explain why solids and pure liquids can be ignored while writing the equilibrium constant expression."],
    a: [
      "Solids and pure liquids can be ignored while writing the equilibrium constant expression because the molar concentration of a pure solid or liquid is independent of the amount present, i.e., it is constant.",
      {
        eq: "\\text{Molar concentration} = \\frac{\\text{Number of moles}}{\\text{Volume}} = \\frac{\\text{Mass}/\\text{Molecular mass}}{\\text{Volume}} = \\frac{\\text{Mass}}{\\text{Volume}\\times\\text{Molecular mass}} = \\frac{\\text{Density}}{\\text{Molecular mass}}",
      },
      "As the density of a solid or pure liquid is fixed, and its molar mass is also fixed, its molar concentration is constant. This constant is therefore merged into the equilibrium constant itself instead of being written separately.",
    ],
  },
  {
    n: "8",
    q: [
      "The reaction between N₂ and O₂ takes place as follows:",
      { eq: "2N_2(g) + O_2(g) \\rightleftharpoons 2N_2O(g)" },
      "If a mixture of 0.482 mol of N₂ and 0.933 mol of O₂ is placed in a 10 L reaction vessel and allowed to form N₂O at a temperature for which Kc = 2.0×10⁻³⁷, determine the composition of the equilibrium mixture.",
    ],
    a: [
      "Let the concentration of N₂O at equilibrium be x.",
      {
        eq: "\\begin{array}{lccc} & 2N_2(g) & O_2(g) & 2N_2O(g) \\\\ \\text{Initial} & 0.482\\ mol & 0.933\\ mol & 0 \\\\ \\text{At equilibrium} & (0.482-x)\\ mol & (0.933-\\frac{x}{2})\\ mol & x\\ mol \\end{array}",
      },
      { eq: "[N_2] = \\frac{0.482-x}{10},\\quad [O_2] = \\frac{0.933-\\frac{x}{2}}{10},\\quad [N_2O] = \\frac{x}{10}" },
      "Since the equilibrium constant is extremely small, only a very small amount of N₂ and O₂ combine to form N₂O; hence x can be neglected in comparison to 0.482 and 0.933. Then:",
      { eq: "[N_2] = \\frac{0.482}{10} = 0.0482\\ mol\\ L^{-1}\\quad\\text{and}\\quad [O_2] = \\frac{0.933}{10} = 0.0933\\ mol\\ L^{-1}" },
      "Now:",
      { eq: "K_c = \\frac{[N_2O]^2}{[N_2]^2[O_2]}" },
      { eq: "2.0\\times10^{-37} = \\frac{(x/10)^2}{(0.0482)^2(0.0933)}" },
      { eq: "\\frac{x^2}{100} = 2.0\\times10^{-37}\\times(0.0482)^2\\times(0.0933)" },
      { eq: "x^2 = 43.35\\times10^{-40}" },
      { eq: "x = 6.6\\times10^{-20}" },
      { eq: "[N_2O] = \\frac{x}{10} = \\frac{6.6\\times10^{-20}}{10} = 6.6\\times10^{-21}\\ mol\\ L^{-1}" },
      "Hence, at equilibrium: [N₂] = 0.0482 M, [O₂] = 0.0933 M, [N₂O] = 6.6×10⁻²¹ M.",
    ],
  },
  {
    n: "9",
    q: [
      "Nitric oxide reacts with Br₂ and gives nitrosyl bromide as per the reaction given below:",
      { eq: "2NO(g) + Br_2(g) \\rightleftharpoons 2NOBr(g)" },
      "When 0.087 mol of NO and 0.0437 mol of Br₂ are mixed in a closed container at a constant temperature, 0.0518 mol of NOBr is obtained at equilibrium. Calculate the equilibrium amount of NO and Br₂.",
    ],
    a: [
      "The given reaction is:",
      { eq: "\\begin{array}{ccc} 2NO(g) & Br_2(g) & 2NOBr(g) \\\\ 2\\ mol & 1\\ mol & 2\\ mol \\end{array}" },
      "Now, 2 mol of NOBr is formed from 2 mol of NO. Therefore, 0.0518 mol of NOBr is formed from 0.0518 mol of NO.",
      "Again, 2 mol of NOBr is formed from 1 mol of Br₂. Therefore, 0.0518 mol of NOBr is formed from:",
      { eq: "\\frac{0.0518}{2} = 0.0259\\ mol\\ \\text{of}\\ Br_2" },
      "The amount of NO and Br₂ present initially:",
      { eq: "[NO]_0 = 0.087\\ mol,\\quad [Br_2]_0 = 0.0437\\ mol" },
      "Therefore, the amount of NO present at equilibrium is:",
      { eq: "[NO] = 0.087 - 0.0518 = 0.0352\\ mol" },
      "And the amount of Br₂ present at equilibrium is:",
      { eq: "[Br_2] = 0.0437 - 0.0259 = 0.0178\\ mol" },
    ],
  },
  {
    n: "10",
    q: [
      "At 450 K, Kp = 2.0×10¹⁰ bar⁻¹ for the given reaction at equilibrium:",
      { eq: "2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g)" },
      "What is Kc at this temperature?",
    ],
    a: [
      "For the given reaction: Δn = 2 − 3 = −1, T = 450 K, R = 0.0831 bar L K⁻¹mol⁻¹, Kp = 2.0×10¹⁰ bar⁻¹",
      "We know that:",
      { eq: "K_p = K_c(RT)^{\\Delta n}" },
      { eq: "2.0\\times10^{10}\\ bar^{-1} = K_c(0.0831\\ L\\ bar\\ K^{-1}mol^{-1}\\times450\\ K)^{-1}" },
      { eq: "K_c = (2.0\\times10^{10}\\ bar^{-1})(0.0831\\ L\\ bar\\ K^{-1}mol^{-1}\\times450\\ K)" },
      { eq: "K_c = 74.79\\times10^{10}\\ L\\ mol^{-1} = 7.48\\times10^{11}\\ L\\ mol^{-1} = 7.48\\times10^{11}\\ M^{-1}" },
    ],
  },
  {
    n: "11",
    q: [
      "A sample of HI(g) is placed in a flask at a pressure of 0.2 atm. At equilibrium, the partial pressure of HI(g) is 0.04 atm. What is Kp for the given equilibrium?",
      { eq: "2HI(g) \\rightleftharpoons H_2(g) + I_2(g)" },
    ],
    a: [
      "The initial partial pressure of HI is 0.2 atm. At equilibrium, it is 0.04 atm. Therefore, the decrease in the pressure of HI is 0.2 − 0.04 = 0.16 atm.",
      {
        eq: "\\begin{array}{lccc} & 2HI(g) & H_2(g) & I_2(g) \\\\ \\text{Initial} & 0.2\\ atm & 0 & 0 \\\\ \\text{At equilibrium} & 0.04\\ atm & \\frac{0.16}{2}=0.08\\ atm & \\frac{0.16}{2}=0.08\\ atm \\end{array}",
      },
      "Therefore:",
      { eq: "K_p = \\frac{p_{H_2}\\times p_{I_2}}{p_{HI}^2} = \\frac{0.08\\times0.08}{(0.04)^2} = \\frac{0.0064}{0.0016} = 4.0" },
      "Hence, the value of Kp for the given equilibrium is 4.0.",
    ],
  },
  {
    n: "12",
    q: [
      "A mixture of 1.57 mol of N₂, 1.92 mol of H₂ and 8.13 mol of NH₃ is introduced into a 20 L reaction vessel at 500 K. At this temperature, the equilibrium constant, Kc, for the reaction",
      { eq: "N_2(g) + 3H_2(g) \\rightleftharpoons 2NH_3(g)" },
      "is 1.7×10². Is the reaction mixture at equilibrium? If not, what is the direction of the net reaction?",
    ],
    a: [
      "The given concentrations of the various species are:",
      { eq: "[N_2] = \\frac{1.57}{20}\\ mol\\ L^{-1},\\quad [H_2] = \\frac{1.92}{20}\\ mol\\ L^{-1},\\quad [NH_3] = \\frac{8.13}{20}\\ mol\\ L^{-1}" },
      "Now, the reaction quotient Qc is:",
      {
        eq: "Q_c = \\frac{[NH_3]^2}{[N_2][H_2]^3} = \\frac{\\left(\\frac{8.13}{20}\\right)^2}{\\left(\\frac{1.57}{20}\\right)\\left(\\frac{1.92}{20}\\right)^3} = 2.4\\times10^3",
      },
      "Since Qc ≠ Kc, the reaction mixture is not at equilibrium.",
      "Again, Qc > Kc. Hence, the reaction will proceed in the reverse direction (towards the reactants).",
    ],
  },
  {
    n: "13",
    q: [
      "The equilibrium constant expression for a gas reaction is:",
      { eq: "K_c = \\frac{[NH_3]^4[O_2]^5}{[NO]^4[H_2O]^6}" },
      "Write the balanced chemical equation corresponding to this expression.",
    ],
    a: [
      "The balanced chemical equation corresponding to the given expression is:",
      { eq: "4NO(g) + 6H_2O(g) \\rightleftharpoons 4NH_3(g) + 5O_2(g)" },
    ],
  },
  {
    n: "14",
    q: [
      "One mole of H₂O and one mole of CO are taken in a 10 L vessel and heated to 725 K. At equilibrium, 60% of water (by mass) reacts with CO according to the equation:",
      { eq: "H_2O(g) + CO(g) \\rightleftharpoons H_2(g) + CO_2(g)" },
      "Calculate the equilibrium constant for the reaction.",
    ],
    a: [
      "Note: as in the source, the worked solution below is carried out for 40% of the water reacting (i.e. 0.4 mol reacted, 0.6 mol of each reactant remaining) — the figures used in the calculation match a 40% conversion, matching the original NCERT problem.",
      {
        eq: "\\begin{array}{lcccc} \\text{Compound} & H_2O & CO & H_2 & CO_2 \\\\ \\text{Initial conc.} & 0.1\\ M & 0.1\\ M & 0 & 0 \\\\ \\text{Equilibrium conc.} & 0.06\\ M & 0.06\\ M & 0.04\\ M & 0.04\\ M \\end{array}",
      },
      "Therefore, the equilibrium constant for the reaction is:",
      { eq: "K_c = \\frac{[H_2][CO_2]}{[H_2O][CO]} = \\frac{(0.04)(0.04)}{(0.06)(0.06)} = 0.444" },
    ],
  },
  {
    n: "15",
    q: [
      "At 700 K, the equilibrium constant for the reaction H₂(g) + I₂(g) ⇌ 2HI(g) is 54.8. If 0.5 mol L⁻¹ of HI(g) is present at equilibrium at 700 K, what is the concentration of H₂(g) and I₂(g), assuming that we initially started with HI(g) and allowed it to reach equilibrium at 700 K?",
    ],
    a: [
      "It is given that the equilibrium constant Kc for H₂(g)+I₂(g)⇌2HI(g) is 54.8.",
      "Therefore, the equilibrium constant Kc' for the reverse reaction 2HI(g)⇌H₂(g)+I₂(g), with [HI]=0.5 mol L⁻¹, will be (1/54.8).",
      "Let the equilibrium concentrations of H₂ and I₂ each be x mol L⁻¹: [H₂]=[I₂]=x mol L⁻¹.",
      "Therefore:",
      { eq: "\\frac{[H_2][I_2]}{[HI]^2} = K_c'" },
      { eq: "\\frac{x\\times x}{(0.5)^2} = \\frac{1}{54.8}" },
      { eq: "x^2 = \\frac{0.25}{54.8}" },
      { eq: "x = \\sqrt{\\frac{0.25}{54.8}} = 0.06754 \\approx 0.068\\ mol\\ L^{-1}\\ \\text{(approximately)}" },
      "Hence, at equilibrium, [H₂] = [I₂] = 0.068 mol L⁻¹.",
    ],
  },
  {
    n: "16",
    q: [
      "What is the equilibrium concentration of each of the substances in the equilibrium when the initial concentration of ICl was 0.78 M?",
      { eq: "2ICl(g) \\rightleftharpoons I_2(g) + Cl_2(g);\\quad K_c = 0.14" },
    ],
    a: [
      {
        eq: "\\begin{array}{lccc} & 2ICl(g) & I_2(g) & Cl_2(g) \\\\ \\text{Initial conc.} & 0.78\\ M & 0 & 0 \\\\ \\text{At equilibrium} & (0.78-2x)\\ M & x\\ M & x\\ M \\end{array}",
      },
      "Now, we can write:",
      { eq: "K_c = \\frac{[I_2][Cl_2]}{[ICl]^2} = \\frac{x^2}{(0.78-2x)^2} = 0.14" },
      { eq: "\\sqrt{0.14} = \\frac{x}{0.78-2x} \\Rightarrow 0.374 = \\frac{x}{0.78-2x}" },
      { eq: "0.374\\times(0.78-2x) = x \\Rightarrow 0.2917-0.748x = x" },
      { eq: "1.748x = 0.2917 \\Rightarrow x = 0.167\\ M\\ \\text{(approximately)}" },
      "Hence, at equilibrium, [I₂] = [Cl₂] = 0.167 M and [ICl] = 0.78 - 2(0.167) = 0.446 M.",
    ],
  },
  {
    n: "17",
    q: [
      "Kp = 0.04 atm at 899 K for the equilibrium shown below. What is the equilibrium concentration of C₂H₆ when it is placed in a flask at 4.0 atm pressure and allowed to come to equilibrium?",
      { eq: "C_2H_6(g) \\rightleftharpoons C_2H_4(g) + H_2(g)" },
    ],
    a: [
      {
        eq: "\\begin{array}{lccc} & C_2H_6(g) & C_2H_4(g) & H_2(g) \\\\ \\text{Initial conc.} & 4.0\\ atm & 0 & 0 \\\\ \\text{At equilibrium} & (4.0-p)\\ atm & p\\ atm & p\\ atm \\end{array}",
      },
      "We can write:",
      { eq: "\\frac{p_{C_2H_4}\\times p_{H_2}}{p_{C_2H_6}} = K_p \\Rightarrow \\frac{p\\times p}{4.0-p} = 0.04" },
      { eq: "p^2 = 0.16-0.04p \\Rightarrow p^2+0.04p-0.16=0" },
      "Solving this quadratic equation for p:",
      { eq: "p = \\frac{-0.04\\pm\\sqrt{(0.04)^2-4\\times1\\times(-0.16)}}{2\\times1} = \\frac{-0.04\\pm\\sqrt{0.6416}}{2}" },
      { eq: "= \\frac{-0.04+0.80}{2}\\ \\text{(taking the positive value)} = \\frac{0.76}{2} = 0.38" },
      "Hence, at equilibrium, [C₂H₆] = 4.0 - p = 4.0 - 0.38 = 3.62 atm.",
    ],
  },
  {
    n: "18",
    q: [
      "Ethyl acetate is formed by the reaction between ethanol and acetic acid, and the equilibrium is represented as:",
      { eq: "CH_3COOH(l) + C_2H_5OH(l) \\rightleftharpoons CH_3COOC_2H_5(l) + H_2O(l)" },
      "(i) Write the concentration ratio (reaction quotient) Qc for this reaction (note: water is not in excess and is not a solvent in this reaction).\n(ii) At 293 K, if one starts with 1.00 mol of acetic acid and 0.18 mol of ethanol, there is 0.171 mol of ethyl acetate in the final equilibrium mixture. Calculate the equilibrium constant.\n(iii) Starting with 0.5 mol of ethanol and 1.0 mol of acetic acid and maintaining it at 293 K, 0.214 mol of ethyl acetate is found after some time. Has equilibrium been reached?",
    ],
    a: [
      "(i) The reaction quotient is:",
      { eq: "Q_c = \\frac{[CH_3COOC_2H_5][H_2O]}{[CH_3COOH][C_2H_5OH]}" },
      "(ii) Let the volume of the reaction mixture be V.",
      {
        eq: "\\begin{array}{lcccc} & CH_3COOH & C_2H_5OH & CH_3COOC_2H_5 & H_2O \\\\ \\text{Initial conc.} & 1/V\\ M & 0.18/V\\ M & 0 & 0 \\\\ \\text{At equilibrium} & \\frac{0.829}{V}\\ M & \\frac{0.009}{V}\\ M & \\frac{0.171}{V}\\ M & \\frac{0.171}{V}\\ M \\end{array}",
      },
      "Therefore, the equilibrium constant for the reaction is:",
      {
        eq: "K_c = \\frac{[CH_3COOC_2H_5][H_2O]}{[CH_3COOH][C_2H_5OH]} = \\frac{\\left(\\frac{0.171}{V}\\right)\\left(\\frac{0.171}{V}\\right)}{\\left(\\frac{0.829}{V}\\right)\\left(\\frac{0.009}{V}\\right)} = 3.919 \\approx 3.92\\ \\text{(approximately)}",
      },
      "(iii) Let the volume of the reaction mixture be V.",
      {
        eq: "\\begin{array}{lcccc} & CH_3COOH & C_2H_5OH & CH_3COOC_2H_5 & H_2O \\\\ \\text{Initial conc.} & 1.0/V\\ M & 0.5/V\\ M & 0 & 0 \\\\ \\text{At this instant} & \\frac{0.786}{V}\\ M & \\frac{0.286}{V}\\ M & \\frac{0.214}{V}\\ M & \\frac{0.214}{V}\\ M \\end{array}",
      },
      "Therefore, the reaction quotient is:",
      {
        eq: "Q_c = \\frac{[CH_3COOC_2H_5][H_2O]}{[CH_3COOH][C_2H_5OH]} = \\frac{\\left(\\frac{0.214}{V}\\right)\\left(\\frac{0.214}{V}\\right)}{\\left(\\frac{0.786}{V}\\right)\\left(\\frac{0.286}{V}\\right)} = 0.204\\ \\text{(approximately)}",
      },
      "Since Qc < Kc, equilibrium has not been reached.",
    ],
  },
  {
    n: "19",
    q: [
      "A sample of pure PCl₅ was introduced into an evacuated vessel at 473 K. After equilibrium was attained, the concentration of PCl₅ was found to be 0.5×10⁻¹ mol L⁻¹. If the value of Kc is 8.3×10⁻³, what are the concentrations of PCl₃ and Cl₂ at equilibrium?",
      { eq: "PCl_5(g) \\rightleftharpoons PCl_3(g) + Cl_2(g)" },
    ],
    a: [
      "Let the concentration of both PCl₃ and Cl₂ at equilibrium be x mol L⁻¹.",
      {
        eq: "\\begin{array}{lccc} & PCl_5(g) & PCl_3(g) & Cl_2(g) \\\\ \\text{At equilibrium} & 0.5\\times10^{-1}\\ mol\\ L^{-1} & x\\ mol\\ L^{-1} & x\\ mol\\ L^{-1} \\end{array}",
      },
      "Now, we can write the expression for the equilibrium constant as:",
      { eq: "K_c = \\frac{[PCl_3][Cl_2]}{[PCl_5]} \\Rightarrow \\frac{x\\times x}{0.5\\times10^{-1}} = 8.3\\times10^{-3}" },
      { eq: "x^2 = 8.3\\times10^{-3}\\times0.5\\times10^{-1} = 4.15\\times10^{-4}" },
      { eq: "x = \\sqrt{4.15\\times10^{-4}} = 2.04\\times10^{-2} \\approx 0.02\\ mol\\ L^{-1}\\ \\text{(approximately)}" },
      "Therefore, at equilibrium, [PCl₃] = [Cl₂] = 0.02 mol L⁻¹.",
    ],
  },
  {
    n: "20",
    q: [
      "One of the reactions that take place in producing steel from iron ore is the reduction of iron (II) oxide by carbon monoxide to give iron metal and CO₂.",
      { eq: "FeO(s) + CO(g) \\rightleftharpoons Fe(s) + CO_2(g);\\quad K_p = 0.265\\ \\text{at}\\ 1050\\ K" },
      "What are the equilibrium partial pressures of CO and CO₂ at 1050 K if the initial partial pressures are: pCO = 1.4 atm and pCO₂ = 0.80 atm?",
    ],
    a: [
      "Initially, pCO = 1.4 atm and pCO₂ = 0.80 atm.",
      { eq: "Q_p = \\frac{p_{CO_2}}{p_{CO}} = \\frac{0.80}{1.4} = 0.571" },
      "Since Qp > Kp, the reaction will proceed in the backward direction. Therefore, we can say that the pressure of CO will increase while the pressure of CO₂ will decrease.",
      "Now, let the increase in pressure of CO = decrease in pressure of CO₂ be p. Then, we can write:",
      { eq: "K_p = \\frac{p_{CO_2}}{p_{CO}} \\Rightarrow 0.265 = \\frac{0.80-p}{1.4+p}" },
      { eq: "0.371+0.265p = 0.80-p \\Rightarrow 1.265p = 0.429 \\Rightarrow p = 0.339\\ atm" },
      "Therefore, the equilibrium partial pressure of CO₂, pCO₂ = 0.80 - 0.339 = 0.461 atm.",
      "And the equilibrium partial pressure of CO, pCO = 1.4 + 0.339 = 1.739 atm.",
    ],
  },
];

const docData = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 7,
  chapterTitle: "Equilibrium",
  questions: questions.map((item) => ({
    _type: "questionAnswer",
    _key: randomUUID(),
    questionNumber: item.n,
    questionText: rich(item.q),
    answer: rich(item.a),
  })),
};

const existing = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 7][0]._id'
);
if (existing) {
  await client.delete(existing);
  console.log(`Deleted existing document: ${existing}`);
}

const result = await client.create(docData);
console.log(`✓ Created Class 11 Chemistry Ch.7 (part 1, Q1-20): ${result._id} (${questions.length} questions)`);
