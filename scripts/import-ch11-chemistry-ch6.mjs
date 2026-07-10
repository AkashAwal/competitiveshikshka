import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const root = resolve(fileURLToPath(import.meta.url), "../../");
config({ path: resolve(root, ".env.local") });

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
  return { _type: "step", _key: randomUUID(), stepTitle: title, content: blocks(...lines) };
}

const raw = [
  {
    n: "1",
    q: "Choose the correct answer. A thermodynamic state function is a quantity: (i) used to determine heat changes (ii) whose value is independent of the path (iii) used to determine pressure-volume work (iv) whose value depends on temperature only",
    a: [
      "(ii) whose value is independent of the path.",
      "A state function depends only on the state of the system — its initial and final states — not on the path taken to get there. Internal energy, enthalpy and entropy are all state functions; heat and work are not.",
    ],
    steps: [
      step("Recall the definition of a state function", "A state function's value depends only on the current state of the system (described by variables like P, V, T, n), not on how that state was reached."),
      step("Match it to the options", "Options (i) and (iii) describe path functions (heat, work), and (iv) is too narrow — so (ii) is correct."),
    ],
    exp: "State functions (U, H, S, G) vs path functions (q, w) is one of the first distinctions this chapter builds on, since it's what lets you calculate ΔU or ΔH via any convenient path (like Hess's law) instead of the actual reaction pathway.",
  },
  {
    n: "2",
    q: "For a process to occur under adiabatic conditions, the correct condition is: (i) ΔT = 0 (ii) Δp = 0 (iii) q = 0 (iv) w = 0",
    a: [
      "(iii) q = 0.",
      "An adiabatic process is one in which no heat enters or leaves the system — the system is thermally insulated from its surroundings.",
    ],
    steps: [
      step("Recall what 'adiabatic' means", "Adiabatic = no heat exchange with the surroundings, so q = 0 by definition."),
    ],
    exp: "Don't confuse adiabatic (q = 0) with isothermal (ΔT = 0) — in an adiabatic process the temperature can change a lot, precisely because no heat can escape to keep it constant.",
  },
  {
    n: "3",
    q: "The enthalpies of all elements in their standard states are: (i) unity (ii) zero (iii) < 0 (iv) different for each element",
    a: [
      "(ii) zero.",
      "By convention, the standard enthalpy of formation of an element in its most stable state of aggregation is taken as zero — this is the reference point every other enthalpy of formation is measured against.",
    ],
    steps: [
      step("Recall the convention", "ΔfH° of an element in its most stable form (e.g. graphite for carbon, O2(g) for oxygen) is defined as zero."),
    ],
    exp: "This convention is what makes Hess's law calculations possible — every ΔfH° value in a data table is really 'relative to zero for the elements'.",
  },
  {
    n: "4",
    q: "ΔU° of combustion of methane is −X kJ mol⁻¹. The value of ΔH° for the combustion reaction is: (i) = ΔU° (ii) > ΔU° (iii) < ΔU° (iv) = 0",
    a: [
      "(iii) < ΔU°.",
      "For the combustion of methane, CH4(g) + 2O2(g) → CO2(g) + 2H2O(l), the number of moles of gas decreases (3 mol gaseous reactants → 1 mol gaseous product), so Δng = 1 − 3 = −2 (negative).",
      "ΔH° = ΔU° + ΔngRT, and since Δng is negative, ΔngRT is a negative quantity — so ΔH° is more negative than ΔU°, i.e. ΔH° < ΔU°.",
    ],
    steps: [
      step("Write the balanced combustion equation", "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l)"),
      step("Find Δng", "Δng = moles of gaseous products − moles of gaseous reactants = 1 − 3 = −2"),
      step("Apply ΔH = ΔU + ΔngRT", "Since Δng < 0, the ΔngRT term is negative, making ΔH° more negative than ΔU° (i.e. ΔH° < ΔU°)."),
    ],
    exp: "Whenever a reaction reduces the number of gas moles, ΔH ends up smaller (more negative, for an exothermic reaction) than ΔU — the system does negative work as gas is 'consumed', which the surroundings effectively do on it.",
  },
  {
    n: "5",
    q: "The enthalpy of combustion of methane, graphite and dihydrogen at 298 K are −890.3 kJ mol⁻¹, −393.5 kJ mol⁻¹, and −285.8 kJ mol⁻¹, respectively. Enthalpy of formation of CH4(g) will be: (i) −74.8 kJ mol⁻¹ (ii) −52.27 kJ mol⁻¹ (iii) +74.8 kJ mol⁻¹ (iv) +52 kJ mol⁻¹",
    a: [
      "(i) −74.8 kJ mol⁻¹.",
      "The formation reaction is C(graphite) + 2H2(g) → CH4(g), ΔfH°(CH4). We're given: C(graphite) + O2(g) → CO2(g), ΔcH° = −393.5 kJ mol⁻¹; H2(g) + ½O2(g) → H2O(l), ΔcH° = −285.8 kJ mol⁻¹; and CH4(g) + 2O2(g) → CO2(g) + 2H2O(l), ΔcH° = −890.3 kJ mol⁻¹.",
      "By Hess's law: ΔfH°(CH4) = ΔcH°(C) + 2ΔcH°(H2) − ΔcH°(CH4) = [−393.5 + 2(−285.8)] − (−890.3) = −74.8 kJ mol⁻¹",
    ],
    steps: [
      step("Write the target formation reaction", "C(graphite) + 2H2(g) → CH4(g)"),
      step("List the three given combustion reactions", "Combustion of C → CO2 (−393.5), combustion of H2 → H2O (−285.8, ×2 needed for 2H2), combustion of CH4 → CO2 + 2H2O (−890.3)."),
      step("Combine via Hess's law", "ΔfH°(CH4) = ΔcH°(C) + 2ΔcH°(H2) − ΔcH°(CH4) = −393.5 − 571.6 + 890.3 = −74.8 kJ mol⁻¹"),
    ],
    exp: "This is a classic Hess's law setup: the formation reaction you want isn't one you have direct combustion data for, so you build it by adding/subtracting the given combustion equations until they cancel down to the target equation.",
  },
  {
    n: "6",
    q: "A reaction, A + B → C + D + q, is found to have a positive entropy change. The reaction will be: (i) possible at high temperature (ii) possible only at low temperature (iii) not possible at any temperature (iv) possible at any temperature",
    a: [
      "(iv) possible at any temperature.",
      "For a reaction to be spontaneous, ΔG must be negative, where ΔG = ΔH − TΔS.",
      "Here, heat q is evolved, so ΔH is negative (exothermic), and we're told ΔS is positive. With ΔH negative and −TΔS also negative (since ΔS is positive), ΔG = ΔH − TΔS is negative at every temperature.",
    ],
    steps: [
      step("Identify the signs given", "Heat is evolved (exothermic), so ΔH is negative. ΔS is stated to be positive."),
      step("Apply ΔG = ΔH − TΔS", "With ΔH negative and ΔS positive, −TΔS is negative for all positive T, so ΔG stays negative regardless of temperature."),
    ],
    exp: "A reaction with ΔH < 0 and ΔS > 0 is the one combination that's spontaneous at every temperature — the other three sign combinations (both positive, both negative, or the reverse) all depend on T to decide spontaneity.",
  },
  {
    n: "7",
    q: "In a process, 701 J of heat is absorbed by a system, and 394 J of work is done by the system. What is the change in internal energy for the process?",
    a: [
      "By the first law of thermodynamics: ΔU = q + w",
      "q = +701 J (positive, since heat is absorbed by the system); w = −394 J (negative, since work is done by the system on the surroundings)",
      "ΔU = 701 + (−394) = 307 J",
    ],
    steps: [
      step("Assign signs using the standard convention", "Heat absorbed by the system is +ve: q = +701 J. Work done by the system is −ve: w = −394 J."),
      step("Substitute into the first law", "ΔU = q + w = 701 − 394 = 307 J"),
    ],
    exp: "Getting the sign convention right (heat absorbed = +, work done BY the system = −) is the entire trick to this problem — the arithmetic itself is trivial once the signs are correct.",
  },
  {
    n: "8",
    q: "The reaction of cyanamide, NH2CN(s), with dioxygen was carried out in a bomb calorimeter, and ΔU was found to be −742.7 kJ mol⁻¹ at 298 K. Calculate the enthalpy change for the reaction at 298 K: NH2CN(s) + 3/2 O2(g) → N2(g) + CO2(g) + H2O(l)",
    a: [
      "ΔH = ΔU + ΔngRT",
      "Δng = moles of gaseous products − moles of gaseous reactants = (1 + 1) − 1.5 = 0.5 mol",
      "Given: ΔU = −742.7 kJ mol⁻¹, T = 298 K, R = 8.314 × 10⁻³ kJ mol⁻¹ K⁻¹",
      "ΔH = (−742.7 kJ mol⁻¹) + (0.5 mol)(298 K)(8.314 × 10⁻³ kJ mol⁻¹ K⁻¹) = −742.7 + 1.238 = −741.5 kJ mol⁻¹",
    ],
    steps: [
      step("Find Δng from the balanced equation", "Gaseous products: N2 and CO2 (2 mol); gaseous reactant: 3/2 O2 (1.5 mol). Δng = 2 − 1.5 = 0.5 mol."),
      step("Apply ΔH = ΔU + ΔngRT", "ΔH = −742.7 + (0.5)(298)(8.314 × 10⁻³) = −742.7 + 1.238 = −741.5 kJ mol⁻¹"),
    ],
    exp: "A bomb calorimeter measures ΔU directly (constant volume), so converting to ΔH (constant pressure, the quantity usually quoted) always needs this ΔngRT correction — here it's a small +1.238 kJ nudge because the moles of gas slightly increase.",
  },
  {
    n: "9",
    q: "Calculate the number of kJ of heat necessary to raise the temperature of 60.0 g of aluminium from 35°C to 55°C. Molar heat capacity of Al is 24 J mol⁻¹ K⁻¹.",
    a: [
      "q = n × Cp × ΔT",
      "Given: mass of Al = 60 g, molar mass of Al = 27 g mol⁻¹, so number of moles = 60/27 mol; Cp = 24 J mol⁻¹ K⁻¹; ΔT = (55 − 35) = 20 K",
      "q = (60/27) mol × (24 J mol⁻¹ K⁻¹) × (20 K) = 1066.7 J = 1.067 kJ",
    ],
    steps: [
      step("Convert mass to moles", "Moles of Al = 60 g / 27 g mol⁻¹"),
      step("Apply q = nCpΔT", "q = (60/27) × 24 × 20 = 1066.7 J = 1.067 kJ"),
    ],
    exp: "This is the same calorimetry formula used for water (q = mCΔT) but written per mole instead of per gram — always check whether a given heat capacity is molar or specific before plugging in mass directly.",
  },
  {
    n: "10",
    q: "1 mol of liquid water at 10°C is converted to ice at −10°C. Calculate the ΔU and ΔH of this transformation. (ΔfusH° = 6.03 kJ mol⁻¹ at 0°C; Cp[H2O(l)] = 75.3 J mol⁻¹ K⁻¹, Cp[H2O(s)] = 36.8 J mol⁻¹ K⁻¹.)",
    a: [
      "The overall enthalpy change is the sum of three steps: cooling liquid water from 10°C to 0°C, freezing at 0°C, then cooling the ice from 0°C to −10°C.",
      "Step 1 — cooling water (10°C → 0°C): ΔH1 = Cp[H2O(l)] × ΔT = 75.3 × (0 − 10) = −753 J mol⁻¹",
      "Step 2 — freezing at 0°C: ΔH2 = −ΔfusH° = −6.03 kJ mol⁻¹ = −6030 J mol⁻¹",
      "Step 3 — cooling ice (0°C → −10°C): ΔH3 = Cp[H2O(s)] × ΔT = 36.8 × (−10 − 0) = −368 J mol⁻¹",
      "ΔH = ΔH1 + ΔH2 + ΔH3 = (−753) + (−6030) + (−368) = −7151 J mol⁻¹ = −7.151 kJ mol⁻¹",
      "Since this transformation involves only solid and liquid phases (negligible volume change) at essentially constant pressure, ΔU ≈ ΔH = −7.151 kJ mol⁻¹.",
    ],
    steps: [
      step("Break the process into three steps", "Cool liquid water 10°C → 0°C, freeze it at 0°C, then cool the resulting ice 0°C → −10°C — since ΔfusH is only defined right at 0°C."),
      step("Compute each step's enthalpy change", "ΔH1 = 75.3 × (−10) = −753 J; ΔH2 = −6030 J; ΔH3 = 36.8 × (−10) = −368 J"),
      step("Add the three steps", "ΔH = −753 − 6030 − 368 = −7151 J mol⁻¹ = −7.151 kJ mol⁻¹"),
      step("Relate ΔU to ΔH", "Since only condensed phases (liquid, solid) are involved, the volume change is negligible, so ΔU ≈ ΔH = −7.151 kJ mol⁻¹."),
    ],
    exp: "The key move is splitting the process into three legs so each one uses a formula you actually have data for — you can't apply ΔfusH° directly at −10°C or +10°C, only right at the melting point of 0°C.",
  },
  {
    n: "11",
    q: "Enthalpy of combustion of carbon to CO2 is −393.5 kJ mol⁻¹. Calculate the heat released upon formation of 35.2 g of CO2 from carbon and dioxygen gas.",
    a: [
      "C(s) + O2(g) → CO2(g), ΔfH° = −393.5 kJ mol⁻¹",
      "Heat released on formation of 44 g (1 mol) of CO2 = 393.5 kJ",
      "Heat released on formation of 35.2 g of CO2 = (393.5 × 35.2) / 44 = 314.8 kJ",
    ],
    steps: [
      step("Write the formation/combustion reaction", "C(s) + O2(g) → CO2(g), ΔH° = −393.5 kJ mol⁻¹ — this releases 393.5 kJ per mole (44 g) of CO2 formed."),
      step("Scale to the given mass", "Heat released = 393.5 kJ × (35.2 g / 44 g) = 314.8 kJ"),
    ],
    exp: "The enthalpy value given is always per mole, so the first move in any 'heat released for X grams' question is a straightforward mass-to-mole scaling using the molar mass.",
  },
  {
    n: "12",
    q: "Enthalpies of formation of CO(g), CO2(g), N2O(g) and N2O4(g) are −110, −393, 81 and 9.7 kJ mol⁻¹ respectively. Find the value of ΔrH for the reaction: N2O4(g) + 3CO(g) → N2O(g) + 3CO2(g)",
    a: [
      "ΔrH = [ΔfH°(N2O) + 3ΔfH°(CO2)] − [ΔfH°(N2O4) + 3ΔfH°(CO)]",
      "= [81 + 3(−393)] − [9.7 + 3(−110)] = [81 − 1179] − [9.7 − 330] = (−1098) − (−320.3)",
      "= −777.7 kJ mol⁻¹",
    ],
    steps: [
      step("Apply ΔrH = Σ ΔfH°(products) − Σ ΔfH°(reactants)", "Products: N2O (81) + 3×CO2 (3 × −393); Reactants: N2O4 (9.7) + 3×CO (3 × −110)"),
      step("Compute each side", "Products sum: 81 − 1179 = −1098 kJ. Reactants sum: 9.7 − 330 = −320.3 kJ"),
      step("Subtract reactants from products", "ΔrH = −1098 − (−320.3) = −777.7 kJ mol⁻¹"),
    ],
    exp: "This is the standard Hess's-law shortcut — you never need the actual reaction pathway, just Σ(products' ΔfH°) − Σ(reactants' ΔfH°), each weighted by its stoichiometric coefficient.",
  },
  {
    n: "13",
    q: "Enthalpy of formation of NH3(g) can be found using the enthalpy of the reaction: N2(g) + 3H2(g) → 2NH3(g), ΔrH° = −92.4 kJ mol⁻¹. Calculate ΔfH° of NH3(g).",
    a: [
      "Dividing the whole equation by 2 gives the actual formation reaction of 1 mol NH3(g): ½N2(g) + 3/2H2(g) → NH3(g)",
      "ΔfH°(NH3) = ½ × (−92.4) = −46.2 kJ mol⁻¹",
    ],
    steps: [
      step("Recall the definition of a formation reaction", "ΔfH° is defined per 1 mole of the compound formed from its elements, but the given equation produces 2 mol NH3."),
      step("Halve the equation and the enthalpy", "½N2(g) + 3/2H2(g) → NH3(g), ΔfH°(NH3) = −92.4/2 = −46.2 kJ mol⁻¹"),
    ],
    exp: "Watch the stoichiometric coefficient of the compound you're finding ΔfH° for — formation enthalpy is always 'per mole of product', so a given equation producing 2 mol needs its ΔH halved.",
  },
  {
    n: "14",
    q: "Given: CH3OH(l) + 3/2O2(g) → CO2(g) + 2H2O(l), ΔrH° = −726 kJ mol⁻¹; C(s) + O2(g) → CO2(g), ΔcH° = −393 kJ mol⁻¹; H2(g) + ½O2(g) → H2O(l), ΔfH° = −286 kJ mol⁻¹. Calculate the enthalpy of formation of CH3OH(l).",
    a: [
      "ΔfH°(CH3OH) = ΔfH°(CO2) + 2ΔfH°(H2O) − ΔrH°(combustion of methanol)",
      "= (−393) + 2(−286) − (−726) = −393 − 572 + 726 = −239 kJ mol⁻¹",
    ],
    steps: [
      step("Set up Hess's law around the combustion of methanol", "The combustion equation connects ΔfH°(CH3OH) to ΔfH°(CO2) and ΔfH°(H2O), which are both given."),
      step("Rearrange to isolate ΔfH°(CH3OH)", "ΔfH°(CH3OH) = ΔfH°(CO2) + 2ΔfH°(H2O) − ΔrH°(combustion)"),
      step("Substitute and compute", "= −393 − 572 − (−726) = −239 kJ mol⁻¹"),
    ],
    exp: "Combustion-based Hess's law problems all follow the same template: ΔrH°(combustion) = Σ ΔfH°(products) − ΔfH°(fuel), so isolating the fuel's ΔfH° is just rearranging this one equation.",
  },
  {
    n: "15",
    q: "Calculate the enthalpy change for the process CCl4(g) → C(g) + 4Cl(g), and calculate the bond enthalpy of C–Cl in CCl4(g). Given: ΔvapH°(CCl4) = 30.5 kJ mol⁻¹; ΔfH°(CCl4) = −135.5 kJ mol⁻¹; ΔaH°(C) = 715 kJ mol⁻¹; ΔaH°(Cl2) = 242 kJ mol⁻¹, where ΔaH° is enthalpy of atomisation.",
    a: [
      "The overall process CCl4(g) → C(g) + 4Cl(g) can be built via Hess's law from: vaporisation of CCl4(l), the reverse of formation of CCl4(l), atomisation of C(s), and atomisation of 2 mol Cl2(g) (to give 4 mol Cl atoms).",
      "ΔH = ΔaH°(C) + 2ΔaH°(Cl2) − ΔvapH°(CCl4) − ΔfH°(CCl4)",
      "= 715 + 2(242) − 30.5 − (−135.5) = 715 + 484 − 30.5 + 135.5 = 1304 kJ mol⁻¹",
      "This enthalpy corresponds to breaking 4 mol of C–Cl bonds, so the bond enthalpy of C–Cl = 1304 / 4 = 326 kJ mol⁻¹",
    ],
    steps: [
      step("Identify the four legs of the Hess's law cycle", "CCl4(l) → CCl4(g) [ΔvapH°]; CCl4(l) formed from C(s) + 2Cl2(g) [reverse of ΔfH°]; C(s) → C(g) [ΔaH°(C)]; 2Cl2(g) → 4Cl(g) [2 × ΔaH°(Cl2)]"),
      step("Sum the legs to get the target reaction's enthalpy", "ΔH = ΔaH°(C) + 2ΔaH°(Cl2) − ΔvapH°(CCl4) − ΔfH°(CCl4) = 715 + 484 − 30.5 + 135.5 = 1304 kJ mol⁻¹"),
      step("Divide by the number of C–Cl bonds broken", "CCl4 has 4 C–Cl bonds, so bond enthalpy = 1304 / 4 = 326 kJ mol⁻¹"),
    ],
    exp: "The final division by 4 is easy to forget — the 1304 kJ mol⁻¹ is the energy to atomise the whole molecule, and bond enthalpy is always reported per individual bond broken, so you divide by however many equivalent bonds the molecule has.",
  },
  {
    n: "16",
    q: "For an isolated system, ΔU = 0. What will be ΔS?",
    a: [
      "An isolated system exchanges neither matter nor energy with its surroundings, so its internal energy stays constant (ΔU = 0) regardless of what happens inside it.",
      "By the second law of thermodynamics, the entropy of an isolated system increases for any spontaneous process occurring within it — so ΔS > 0.",
    ],
    steps: [
      step("Recall what 'isolated' means", "No exchange of matter or energy with the surroundings — hence ΔU is always 0 for an isolated system, by definition."),
      step("Apply the second law", "The second law says entropy of an isolated system increases for a spontaneous process, so ΔS > 0."),
    ],
    exp: "ΔU = 0 here isn't telling you anything is at equilibrium — it's just the definition of 'isolated'. The interesting physics is entirely in ΔS, which is what actually drives spontaneity in a system that can't exchange heat.",
  },
  {
    n: "17",
    q: "For the reaction 2A(g) + B(g) → C(g), ΔH = −400 kJ mol⁻¹ and ΔS = −0.2 kJ mol⁻¹ K⁻¹ at 298 K. Above what temperature will the reaction become spontaneous?",
    a: [
      "A reaction becomes spontaneous when ΔG < 0, where ΔG = ΔH − TΔS.",
      "At the temperature where the reaction just becomes spontaneous, ΔG = 0, so T = ΔH/ΔS = 400/0.2 = 2000 K",
      "Since ΔH is negative and ΔS is also negative here, TΔS must stay smaller in magnitude than ΔH for ΔG to be negative — this happens below 2000 K, so the reaction is spontaneous at temperatures below 2000 K.",
    ],
    steps: [
      step("Set ΔG = 0 to find the boundary temperature", "0 = ΔH − TΔS → T = ΔH/ΔS = 400/0.2 = 2000 K (using magnitudes since both ΔH and ΔS are negative)."),
      step("Check which side of 2000 K gives ΔG < 0", "With ΔH negative and ΔS negative, ΔG = ΔH − TΔS becomes more negative as T decreases, so the reaction is spontaneous below 2000 K."),
    ],
    exp: "With ΔH < 0 and ΔS < 0, temperature works against spontaneity (unlike question 6's ΔH<0, ΔS>0 case) — this combination is only spontaneous below the crossover temperature, not above it.",
  },
  {
    n: "18",
    q: "For the reaction 2Cl(g) → Cl2(g), what are the signs of ΔH and ΔS?",
    a: [
      "ΔH is negative: bond formation between two Cl atoms releases energy, making this reaction exothermic.",
      "ΔS is negative: two moles of gaseous atoms combine into one mole of gaseous molecules, decreasing the number of independent particles and hence the randomness of the system.",
    ],
    steps: [
      step("Consider the enthalpy change", "Forming a new Cl–Cl bond releases energy (bond formation is always exothermic), so ΔH < 0."),
      step("Consider the entropy change", "Two separate gas atoms becoming one gas molecule reduces the number of independently-moving particles, so ΔS < 0."),
    ],
    exp: "Any reaction where separate gas particles combine into fewer particles (atoms → molecule, or 2 molecules → 1) will have ΔS < 0 — fewer independent particles always means less disorder, regardless of what the enthalpy does.",
  },
  {
    n: "19",
    q: "For the reaction 2A(g) + B(g) → 2D(g), ΔU° = −10.5 kJ and ΔS° = −44.1 J K⁻¹. Calculate ΔG° for the reaction, and predict whether the reaction is spontaneous. (T = 298 K)",
    a: [
      "Δng = moles of gaseous products − moles of gaseous reactants = 2 − 3 = −1 mol",
      "ΔH° = ΔU° + ΔngRT = −10.5 + (−1)(8.314 × 10⁻³)(298) = −10.5 − 2.478 = −12.98 kJ",
      "ΔG° = ΔH° − TΔS° = −12.98 − (298)(−44.1 × 10⁻³) = −12.98 + 13.14 = +0.16 kJ",
      "Since ΔG° is positive, the reaction is not spontaneous.",
    ],
    steps: [
      step("Find Δng and convert ΔU° to ΔH°", "Δng = 2 − 3 = −1. ΔH° = ΔU° + ΔngRT = −10.5 + (−1)(8.314×10⁻³)(298) = −12.98 kJ"),
      step("Apply ΔG° = ΔH° − TΔS°", "ΔG° = −12.98 − (298)(−44.1×10⁻³) = −12.98 + 13.14 = +0.16 kJ"),
      step("Interpret the sign", "ΔG° > 0, so the reaction is not spontaneous under standard conditions at 298 K."),
    ],
    exp: "This problem chains together both conversions from the chapter — ΔU to ΔH via Δng, then ΔH to ΔG via TΔS — and the final answer (+0.16 kJ) is a genuinely close call, just barely non-spontaneous.",
  },
  {
    n: "20",
    q: "The equilibrium constant for a reaction is 10. What will be the value of ΔG°? R = 8.314 J K⁻¹ mol⁻¹, T = 300 K.",
    a: [
      "ΔG° = −2.303 RT log K",
      "= −2.303 × 8.314 × 300 × log(10) = −2.303 × 8.314 × 300 × 1",
      "= −5744.1 J mol⁻¹ ≈ −5.74 kJ mol⁻¹",
    ],
    steps: [
      step("Recall the relation between ΔG° and K", "ΔG° = −2.303 RT log K, connecting the standard free energy change to the equilibrium constant."),
      step("Substitute the values", "ΔG° = −2.303 × 8.314 × 300 × log 10 = −2.303 × 8.314 × 300 × 1"),
      step("Compute the result", "ΔG° = −5744.1 J mol⁻¹ ≈ −5.74 kJ mol⁻¹"),
    ],
    exp: "log 10 = 1 exactly, which is what makes this particular K value convenient to test — don't forget the 2.303 conversion factor, which comes from converting natural log (ln K) to base-10 log K.",
  },
  {
    n: "21",
    q: "Comment on the thermodynamic stability of NO(g), given: ½N2(g) + ½O2(g) → NO(g), ΔrH° = +90 kJ mol⁻¹; NO(g) + ½O2(g) → NO2(g), ΔrH° = −74 kJ mol⁻¹",
    a: [
      "The formation of NO(g) from its elements is endothermic (ΔrH° = +90 kJ mol⁻¹ > 0), so NO(g) is thermodynamically unstable relative to its elements N2 and O2.",
      "The conversion of NO(g) to NO2(g) is exothermic (ΔrH° = −74 kJ mol⁻¹ < 0), so NO2(g) is more stable than NO(g) — NO(g) therefore readily converts to the more stable NO2(g) when oxygen is available.",
    ],
    steps: [
      step("Assess NO's formation enthalpy", "ΔrH° = +90 kJ mol⁻¹ (endothermic) means NO sits at higher energy than its elements — it's unstable relative to N2 and O2."),
      step("Assess NO → NO2's enthalpy", "ΔrH° = −74 kJ mol⁻¹ (exothermic) means NO2 is at lower energy than NO — NO2 is the more stable species, and NO tends to convert to it."),
    ],
    exp: "A positive ΔfH° doesn't mean a compound can't exist (NO is a perfectly real, isolable gas) — it just means it's higher in energy than its elements, and will release energy converting to something more stable if a pathway (like reacting with more O2) is available.",
  },
  {
    n: "22",
    q: "Calculate ΔSsurr for the following reaction: H2(g) + ½O2(g) → H2O(l), ΔrH° = −286 kJ mol⁻¹ (T = 298 K)",
    a: [
      "The heat released by the system is absorbed by the surroundings, so qsurr = +286 kJ = +286000 J",
      "ΔSsurr = qsurr / T = 286000 / 298 = 959.73 J K⁻¹ mol⁻¹",
    ],
    steps: [
      step("Relate the system's ΔH to the surroundings' heat gain", "The reaction releases 286 kJ, and this heat flows entirely into the surroundings: qsurr = +286000 J"),
      step("Divide by temperature to get ΔSsurr", "ΔSsurr = qsurr/T = 286000/298 = 959.73 J K⁻¹ mol⁻¹"),
    ],
    exp: "ΔSsurr = −ΔH/T (at constant P, T) is the bridge between a reaction's enthalpy and the second law — it's exactly this quantity, added to ΔSsystem, that must be positive for a process to be spontaneous overall.",
  },
];

const questions = raw.map((r) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: r.n,
  questionText: blocks(r.q),
  answer: blocks(...r.a),
  explanation: blocks(r.exp),
  steps: r.steps,
}));

const doc = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 6,
  chapterTitle: "Thermodynamics",
  questions,
};

const created = await client.create(doc);
console.log(`Created ${created._id} with ${questions.length} questions.`);
