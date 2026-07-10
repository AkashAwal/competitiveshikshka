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
    q: "What will be the minimum pressure required to compress 500 dm³ of air at 1 bar to 200 dm³ at 30°C?",
    a: [
      "Initial pressure, P₁ = 1 bar; initial volume, V₁ = 500 dm³; final volume, V₂ = 200 dm³.",
      "Since the temperature stays constant, Boyle's law applies: P₁V₁ = P₂V₂",
      "P₂ = P₁V₁/V₂ = (1 × 500)/200 = 2.5 bar",
      "Therefore, the minimum pressure required to compress the air is 2.5 bar."
    ],
    steps: [
      step("Identify the constant-temperature condition", "The temperature (30°C) is the same before and after compression, so Boyle's law (P₁V₁ = P₂V₂) applies."),
      step("Substitute the known values", "P₁ = 1 bar, V₁ = 500 dm³, V₂ = 200 dm³"),
      step("Solve for P₂", "P₂ = P₁V₁/V₂ = (1 × 500)/200 = 2.5 bar"),
    ],
    exp: "Boyle's law only holds at constant temperature — that's exactly the condition given here (30°C throughout), which is the cue to reach for P₁V₁ = P₂V₂ instead of the full ideal gas equation.",
  },
  {
    n: "2",
    q: "A vessel of 120 mL capacity contains a certain amount of gas at 35°C and 1.2 bar pressure. The gas is transferred to another vessel of volume 180 mL at 35°C. What would be its pressure?",
    a: [
      "Initial pressure, P₁ = 1.2 bar; initial volume, V₁ = 120 mL; final volume, V₂ = 180 mL.",
      "Since the temperature remains constant, Boyle's law applies: P₁V₁ = P₂V₂",
      "P₂ = P₁V₁/V₂ = (1.2 × 120)/180 = 0.8 bar",
      "Therefore, the new pressure is 0.8 bar."
    ],
    steps: [
      step("Confirm constant temperature", "35°C is the same in both vessels, so Boyle's law applies."),
      step("Apply Boyle's law", "P₂ = P₁V₁/V₂ = (1.2 × 120)/180 = 0.8 bar"),
    ],
    exp: "Moving a fixed amount of gas into a larger container at the same temperature always lowers its pressure — the same number of molecules now have more room, so they collide with the walls less often.",
  },
  {
    n: "3",
    q: "Using the equation of state pV = nRT, show that at a given temperature the density of a gas is proportional to gas pressure p.",
    a: [
      "From pV = nRT: n/V = p/(RT)",
      "Replace n with m/M (m = mass, M = molar mass): m/(MV) = p/(RT) ......(2)",
      "But m/V = d (density). So from equation (2): d/M = p/(RT), i.e. d = (M/RT)·p",
      "Therefore, d ∝ p — at a given temperature, the density of a gas (d) is directly proportional to its pressure (p)."
    ],
    steps: [
      step("Rearrange the ideal gas equation", "pV = nRT → n/V = p/(RT)"),
      step("Substitute n = m/M", "m/(MV) = p/(RT)"),
      step("Recognise m/V as density", "d = m/V, so d/M = p/(RT), giving d = (M/RT)·p"),
      step("Conclude the proportionality", "At constant T, M/RT is a constant, so d ∝ p."),
    ],
    exp: "This is why a gas cylinder feels 'denser' the more you pressurise it: cramming the same mass into the same volume at higher pressure only works because more molecules are packed in per unit volume, which is exactly what density measures.",
  },
  {
    n: "4",
    q: "At 0°C, the density of a certain oxide of a gas at 2 bar is the same as that of dinitrogen at 5 bar. What is the molecular mass of the oxide?",
    a: [
      "Density of the oxide: d₁ = M₁p₁/(RT); density of dinitrogen: d₂ = M₂p₂/(RT)",
      "Since d₁ = d₂: M₁p₁ = M₂p₂",
      "M₁ = M₂p₂/p₁ = (28 × 5)/2 = 70 g/mol",
      "Therefore, the molecular mass of the oxide is 70 g/mol."
    ],
    steps: [
      step("Write the density expression for each gas", "d = Mp/(RT) for both gases, at the same temperature (0°C) so RT cancels when the densities are set equal."),
      step("Set the two densities equal", "d₁ = d₂ → M₁p₁ = M₂p₂"),
      step("Solve for the unknown molar mass", "M₁ = M₂p₂/p₁ = (28 × 5)/2 = 70 g/mol"),
    ],
    exp: "Equal densities at the same temperature mean M₁p₁ = M₂p₂ — a heavier gas at lower pressure can have exactly the same density as a lighter gas at higher pressure, which is the trick this problem is testing.",
  },
  {
    n: "5",
    q: "The pressure of 1 g of an ideal gas A at 27°C is found to be 2 bar. When 2 g of another ideal gas B is introduced in the same flask at the same temperature, the pressure becomes 3 bar. Find a relationship between their molecular masses.",
    a: [
      "For ideal gas A: pₓV = nₓRT ......(1), where pₓ and nₓ are the pressure and moles of gas A.",
      "For ideal gas B: pᵧV = nᵧRT ......(2), where pᵧ and nᵧ are the pressure and moles of gas B. (V and T are constant for both.)",
      "From (1), with nₓ = mₓ/Mₓ: pₓMₓ/mₓ = RT/V ......(3)",
      "From (2), with nᵧ = mᵧ/Mᵧ: pᵧMᵧ/mᵧ = RT/V ......(4)",
      "From (3) and (4): pₓMₓ/mₓ = pᵧMᵧ/mᵧ ......(5)",
      "Given: mₓ = 1 g, pₓ = 2 bar, mᵧ = 2 g, pᵧ = (3 − 2) = 1 bar (since the total pressure is 3 bar and A alone contributed 2 bar)",
      "Substituting into (5): (2 × Mₓ)/1 = (1 × Mᵧ)/2, so Mᵧ = 4Mₓ.",
      "Therefore, the molecular mass of gas B is four times that of gas A."
    ],
    steps: [
      step("Write the ideal gas equation for each gas separately", "pₓV = nₓRT and pᵧV = nᵧRT, with the same V and T for both since they share the flask."),
      step("Substitute n = m/M for each gas", "pₓMₓ/mₓ = RT/V and pᵧMᵧ/mᵧ = RT/V"),
      step("Equate the two expressions (both equal RT/V)", "pₓMₓ/mₓ = pᵧMᵧ/mᵧ"),
      step("Find pᵧ using Dalton's law of partial pressures", "Total pressure = pₓ + pᵧ = 3 bar, and pₓ = 2 bar, so pᵧ = 1 bar."),
      step("Substitute all known values and solve", "(2×Mₓ)/1 = (1×Mᵧ)/2 → Mᵧ = 4Mₓ"),
    ],
    exp: "The key insight is that gas B's own partial pressure (1 bar) is found by simple subtraction — total pressure minus A's original pressure — because each gas in a mixture contributes independently to the total pressure (Dalton's law).",
  },
  {
    n: "6",
    q: "The drain cleaner, Drainex, contains small bits of aluminium which react with caustic soda to produce dihydrogen. What volume of dihydrogen at 20°C and one bar will be released when 0.15 g of aluminium reacts?",
    a: [
      "Reaction of aluminium with caustic soda: 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂",
      "At STP (273.15 K and 1 atm), 54 g (2 × 27 g) of Al gives 3 × 22400 mL of H₂.",
      "Therefore, 0.15 g Al gives = (3 × 22400 × 0.15)/54 mL of H₂ = 186.67 mL of H₂ at STP.",
      "At STP: p₁ = 1 atm, V₁ = 186.67 mL, T₁ = 273.15 K",
      "Let the volume of dihydrogen at the new conditions be V₂, with p₂ = 0.987 atm (since 1 bar = 0.987 atm) and T₂ = (273.15 + 20) K = 293.15 K.",
      "Using the combined gas law: p₁V₁/T₁ = p₂V₂/T₂, so V₂ = p₁V₁T₂/(p₂T₁) = (1 × 186.67 × 293.15)/(0.987 × 273.15) = 202.98 mL ≈ 203 mL",
      "Hence, 203 mL of dihydrogen will be released."
    ],
    steps: [
      step("Write the balanced equation and find the mole ratio", "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂\n2 mol Al (54 g) produces 3 mol H₂"),
      step("Find the volume of H₂ at STP produced by 0.15 g Al", "54 g Al → 3 × 22400 mL H₂ (at STP)\n0.15 g Al → (3 × 22400 × 0.15)/54 = 186.67 mL H₂ at STP"),
      step("Convert bar to atm for the new pressure", "1 bar = 0.987 atm"),
      step("Apply the combined gas law to shift from STP to the new conditions", "p₁V₁/T₁ = p₂V₂/T₂\nV₂ = (1 × 186.67 × 293.15)/(0.987 × 273.15) ≈ 203 mL"),
    ],
    exp: "This problem chains two separate ideas: stoichiometry (to find how much H₂ forms at STP) and the combined gas law (to convert that STP volume to the actual 20°C, 1 bar conditions asked for) — always find moles/volume at a known reference state first, then adjust for the real conditions.",
  },
  {
    n: "7",
    q: "What will be the pressure exerted by a mixture of 3.2 g of methane and 4.4 g of carbon dioxide contained in a 9 dm³ flask at 27°C?",
    a: [
      "It is known that p = (m/M) × (RT/V)  [since 9 dm³ = 9 × 10⁻³ m³ and 27°C = 300 K]",
      "For methane (CH₄): p(CH₄) = (3.2/16) × (8.314 × 300)/(9 × 10⁻³) = 5.543 × 10⁴ Pa",
      "For carbon dioxide (CO₂): p(CO₂) = (4.4/44) × (8.314 × 300)/(9 × 10⁻³) = 2.771 × 10⁴ Pa",
      "The total pressure exerted by the mixture: p = p(CH₄) + p(CO₂) = (5.543 × 10⁴ + 2.771 × 10⁴) Pa = 8.314 × 10⁴ Pa"
    ],
    steps: [
      step("Convert units to SI", "9 dm³ = 9 × 10⁻³ m³; 27°C = 300 K"),
      step("Find the partial pressure of methane", "Moles of CH₄ = 3.2/16 = 0.2 mol\np(CH₄) = (0.2 × 8.314 × 300)/(9 × 10⁻³) = 5.543 × 10⁴ Pa"),
      step("Find the partial pressure of carbon dioxide", "Moles of CO₂ = 4.4/44 = 0.1 mol\np(CO₂) = (0.1 × 8.314 × 300)/(9 × 10⁻³) = 2.771 × 10⁴ Pa"),
      step("Add the partial pressures (Dalton's law)", "p(total) = 5.543 × 10⁴ + 2.771 × 10⁴ = 8.314 × 10⁴ Pa"),
    ],
    exp: "Each gas in a mixture behaves as if it alone occupied the whole flask — that's Dalton's law of partial pressures — so you can compute each gas's contribution separately using pV = nRT and simply add them.",
  },
  {
    n: "8",
    q: "What will be the pressure of the gaseous mixture when 0.5 L of H₂ at 0.8 bar and 2.0 L of dioxygen at 0.7 bar are introduced in a 1 L vessel at 27°C?",
    a: [
      "Let the partial pressure of H₂ in the container be p(H₂). Here p₁ = 0.8 bar, V₁ = 0.5 L, V₂ = 1 L.",
      "Since p₁V₁ = p₂V₂: p(H₂) = (p₁ × V₁)/V₂ = (0.8 × 0.5)/1 = 0.4 bar",
      "Similarly, for O₂: p₁ = 0.7 bar, V₁ = 2.0 L, V₂ = 1 L.",
      "p(O₂) = (p₁ × V₁)/V₂ = (0.7 × 2.0)/1 = 1.4 bar",
      "The total pressure of the gas mixture: p(total) = p(H₂) + p(O₂) = 0.4 + 1.4 = 1.8 bar"
    ],
    steps: [
      step("Recognise this as two separate Boyle's-law compressions", "Each gas is being squeezed from its own original volume into the shared 1 L vessel at the same (constant) temperature, so p₁V₁ = p₂V₂ applies to each gas individually."),
      step("Find H₂'s new partial pressure", "p(H₂) = (0.8 × 0.5)/1 = 0.4 bar"),
      step("Find O₂'s new partial pressure", "p(O₂) = (0.7 × 2.0)/1 = 1.4 bar"),
      step("Add the partial pressures for the total", "p(total) = 0.4 + 1.4 = 1.8 bar"),
    ],
    exp: "Combining two gases into one vessel is really just two independent Boyle's-law problems happening at once — work out each gas's new pressure on its own, then add them per Dalton's law.",
  },
  {
    n: "9",
    q: "The density of a gas is found to be 5.46 g/dm³ at 27°C at 2 bar pressure. What will be its density at STP?",
    a: [
      "Given: d₁ = 5.46 g/dm³, p₁ = 2 bar, T₁ = (27 + 273) K = 300 K, p₂ = 1 bar, T₂ = 273 K, d₂ = ?",
      "Density is given by d = Mp/(RT), so d₁/d₂ = (p₁/T₁)/(p₂/T₂) = (p₁T₂)/(p₂T₁)",
      "d₂ = (p₂T₁d₁)/(p₁T₂) = (1 × 300 × 5.46)/(2 × 273) = 3 g/dm³",
      "Hence, the density of the gas at STP will be 3 g/dm³."
    ],
    steps: [
      step("Write the density relation for both states", "d = Mp/(RT); since M and R are the same substance-specific constants, they cancel when comparing the two states."),
      step("Set up the ratio d₁/d₂", "d₁/d₂ = (p₁/T₁)/(p₂/T₂) = (p₁T₂)/(p₂T₁)"),
      step("Solve for d₂", "d₂ = (p₂T₁d₁)/(p₁T₂) = (1 × 300 × 5.46)/(2 × 273) = 3 g/dm³"),
    ],
    exp: "Density changes with both pressure and temperature for a gas (unlike a liquid or solid), so converting a density value to STP always needs both corrections applied together via d = Mp/(RT).",
  },
  {
    n: "10",
    q: "34.05 mL of phosphorus vapour weighs 0.0625 g at 546°C and 0.1 bar pressure. What is the molar mass of phosphorus?",
    a: [
      "Given: p = 0.1 bar, V = 34.05 mL = 34.05 × 10⁻³ dm³, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = (546 + 273) K = 819 K",
      "Using the ideal gas equation pV = nRT: n = pV/(RT) = (0.1 × 34.05 × 10⁻³)/(0.083 × 819) = 5.01 × 10⁻⁵ mol",
      "Molar mass of phosphorus = mass/n = 0.0625/(5.01 × 10⁻⁵) = 125 g/mol."
    ],
    steps: [
      step("Convert all quantities to consistent units", "V = 34.05 mL = 34.05 × 10⁻³ dm³; T = 546 + 273 = 819 K"),
      step("Find moles using pV = nRT", "n = pV/(RT) = (0.1 × 34.05 × 10⁻³)/(0.083 × 819) = 5.01 × 10⁻⁵ mol"),
      step("Divide mass by moles to get molar mass", "M = 0.0625/(5.01 × 10⁻⁵) = 125 g/mol"),
    ],
    exp: "125 g/mol matches P₄ (white phosphorus, 4 × 31 ≈ 124), which is a nice real-world check that the calculation is sensible — phosphorus vapour exists as tetratomic P₄ molecules, not single P atoms.",
  },
  {
    n: "11",
    q: "A student forgot to add the reaction mixture to the round bottomed flask at 27°C, but instead, he placed the flask on the flame. After a lapse of time, he realised his mistake and using a pyrometer, he found the temperature of the flask was 477°C. What fraction of air would have been expelled out?",
    a: [
      "Let the volume of the container be V, so the volume of air inside it at 27°C is also V.",
      "V₁ = V, T₁ = (27 + 273) K = 300 K; V₂ = ?, T₂ = (477 + 273) K = 750 K",
      "By Charles's law: V₁/T₁ = V₂/T₂, so V₂ = V₁T₂/T₁ = (V × 750)/300 = 2.5V",
      "Therefore, the volume of air expelled out = 2.5V − V = 1.5V",
      "Hence, the fraction of air expelled out = 1.5V/2.5V = 3/5."
    ],
    steps: [
      step("Recognise the constant-pressure setup", "The open flask stays at atmospheric pressure throughout, so Charles's law (V₁/T₁ = V₂/T₂) applies as the air inside expands."),
      step("Find the new volume the original air would occupy", "V₂ = V₁T₂/T₁ = (V × 750)/300 = 2.5V"),
      step("Find the volume actually expelled", "Since the flask itself still only holds V, the extra 2.5V − V = 1.5V worth of air must have been pushed out."),
      step("Express as a fraction of the original air", "Fraction expelled = 1.5V/2.5V = 3/5"),
    ],
    exp: "The flask's rigid volume V stays fixed, but the air inside it 'wants' to expand to 2.5V at the higher temperature — since it can't, the excess simply escapes out the open neck, and that escaped fraction is what the question asks for.",
  },
  {
    n: "12",
    q: "Calculate the temperature of 4.0 mol of a gas occupying 5 dm³ at 3.32 bar. (R = 0.083 bar dm³ K⁻¹ mol⁻¹)",
    a: [
      "Given: n = 4.0 mol, V = 5 dm³, p = 3.32 bar, R = 0.083 bar dm³ K⁻¹ mol⁻¹",
      "Using the ideal gas equation pV = nRT: T = pV/(nR) = (3.32 × 5)/(4 × 0.083) = 50 K",
      "Therefore, the required temperature is 50 K."
    ],
    steps: [
      step("Write down the known quantities", "n = 4.0 mol, V = 5 dm³, p = 3.32 bar, R = 0.083 bar dm³ K⁻¹ mol⁻¹"),
      step("Rearrange the ideal gas equation for T", "T = pV/(nR)"),
      step("Substitute and calculate", "T = (3.32 × 5)/(4 × 0.083) = 50 K"),
    ],
    exp: "A direct one-step application of pV = nRT — the only work is picking the right rearrangement and keeping R's units (bar·dm³·K⁻¹·mol⁻¹) consistent with the given p (bar) and V (dm³).",
  },
  {
    n: "13",
    q: "Calculate the total number of electrons present in 1.4 g of dinitrogen gas.",
    a: [
      "Molar mass of dinitrogen (N₂) = 28 g/mol",
      "Thus, 1.4 g of N₂ = 1.4/28 = 0.05 mol = 0.05 × 6.02 × 10²³ molecules = 3.01 × 10²³ molecules",
      "Now, 1 molecule of N₂ has 14 electrons (7 from each N atom). Therefore, 3.01 × 10²³ molecules of N₂ contain 14 × 3.01 × 10²³ = 4.214 × 10²³ electrons."
    ],
    steps: [
      step("Convert mass to moles", "Moles of N₂ = 1.4/28 = 0.05 mol"),
      step("Convert moles to number of molecules", "Number of molecules = 0.05 × 6.02 × 10²³ = 3.01 × 10²³ molecules"),
      step("Find electrons per molecule and multiply", "N (Z = 7) has 7 electrons per atom, so N₂ has 14 electrons per molecule.\nTotal electrons = 14 × 3.01 × 10²³ = 4.214 × 10²³"),
    ],
    exp: "This is a mole-concept problem dressed up in a States of Matter chapter — the gas-law content is irrelevant here; only Avogadro's number and each atom's electron count (equal to its atomic number) matter.",
  },
  {
    n: "14",
    q: "How much time would it take to distribute one Avogadro number of wheat grains, if 10¹⁰ grains are distributed each second?",
    a: [
      "Avogadro number = 6.02 × 10²³",
      "Therefore, the time taken = (6.02 × 10²³)/10¹⁰ s = 6.02 × 10¹³ s",
      "= (6.02 × 10²³)/(60 × 60 × 24 × 365) years... using the seconds value: 6.02 × 10¹³ / (60 × 60 × 24 × 365) = 1.909 × 10⁶ years",
      "Therefore, the time taken would be 1.909 × 10⁶ years."
    ],
    steps: [
      step("Divide Avogadro's number by the rate", "Time in seconds = (6.02 × 10²³)/10¹⁰ = 6.02 × 10¹³ s"),
      step("Convert seconds to years", "1 year = 60 × 60 × 24 × 365 s ≈ 3.1536 × 10⁷ s"),
      step("Divide to get the answer in years", "(6.02 × 10¹³)/(3.1536 × 10⁷) ≈ 1.909 × 10⁶ years"),
    ],
    exp: "This calculation is really just meant to make the sheer scale of Avogadro's number (6.02 × 10²³) tangible — even distributing ten billion grains every second would take nearly 2 million years to hand out one mole of them.",
  },
  {
    n: "15",
    q: "Calculate the total pressure in a mixture of 8 g of dioxygen and 4 g of dihydrogen confined in a vessel of 1 dm³ at 27°C. R = 0.083 bar dm³ K⁻¹ mol⁻¹",
    a: [
      "Mass of O₂ = 8 g; no. of moles = 8/32 = 0.25 mol",
      "Mass of H₂ = 4 g; no. of moles = 4/2 = 2 mol",
      "Hence, the total number of moles in the mixture = 0.25 + 2 = 2.25 mol",
      "Given: V = 1 dm³, n = 2.25 mol, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 27°C = 300 K",
      "Total pressure: pV = nRT, so p = nRT/V = (2.25 × 0.083 × 300)/1 = 56.025 bar",
      "Therefore, the total pressure of the mixture is 56.025 bar."
    ],
    steps: [
      step("Convert each gas's mass to moles", "Moles of O₂ = 8/32 = 0.25 mol\nMoles of H₂ = 4/2 = 2 mol"),
      step("Add the moles to get the total for the mixture", "n(total) = 0.25 + 2 = 2.25 mol"),
      step("Apply the ideal gas equation to the mixture as a whole", "p = nRT/V = (2.25 × 0.083 × 300)/1 = 56.025 bar"),
    ],
    exp: "For a gas mixture, you can either add up each gas's partial pressure separately, or — as done here — just add up the total moles first and apply pV = nRT once. Both routes give the same answer because pressure depends only on the total mole count, not on which gas the moles belong to.",
  },
  {
    n: "16",
    q: "Payload is defined as the difference between the mass of displaced air and the mass of the balloon. Calculate the payload when a balloon of radius 10 m, mass 100 kg, is filled with helium at 1.66 bar at 27°C. (Density of air = 1.2 kg m⁻³ and R = 0.083 bar dm³ K⁻¹ mol⁻¹)",
    a: [
      "Given: r = 10 m. Therefore, the volume of the balloon = (4/3)πr³ = (4/3) × (22/7) × 10³ = 4190.5 m³ (approx.)",
      "Mass of helium, m = MpV/(RT), where M = 4 × 10⁻³ kg/mol, p = 1.66 bar, V = 4190.5 m³ = 4190.5 × 10³ dm³, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 27°C = 300 K",
      "m = (4 × 10⁻³ × 1.66 × 4190.5 × 10³)/(0.083 × 300) = 1117.5 kg (approx.)",
      "Therefore, the volume of the displaced air = 4190.5 m³, and its mass = 4190.5 × 1.2 kg = 5028.6 kg",
      "Now, total mass with helium = (100 + 1117.5) kg = 1217.5 kg",
      "Therefore, payload = (5028.6 − 1217.5) = 3811.1 kg",
      "Therefore, the payload of the balloon is 3811.1 kg."
    ],
    steps: [
      step("Find the balloon's volume from its radius", "V = (4/3)πr³ = (4/3) × (22/7) × 10³ ≈ 4190.5 m³"),
      step("Find the mass of helium filling the balloon", "m(He) = MpV/(RT), with M = 4 × 10⁻³ kg/mol, p = 1.66 bar, V = 4190.5 × 10³ dm³, T = 300 K\nm(He) ≈ 1117.5 kg"),
      step("Find the mass of the air displaced by the balloon", "Mass of displaced air = volume × density of air = 4190.5 × 1.2 ≈ 5028.6 kg"),
      step("Find the total mass of the filled balloon", "Total mass = mass of balloon + mass of helium = 100 + 1117.5 = 1217.5 kg"),
      step("Apply the payload definition", "Payload = mass of displaced air − total mass of filled balloon = 5028.6 − 1217.5 = 3811.1 kg"),
    ],
    exp: "This is essentially Archimedes' principle applied to a lighter-than-air gas: the balloon can lift a payload equal to the difference between the air it displaces (which has weight) and its own total mass (balloon + gas) — which is exactly why helium balloons float.",
  },
  {
    n: "17",
    q: "Calculate the volume occupied by 8.8 g of CO₂ at 31.1°C and 1 bar pressure. R = 0.083 bar dm³ K⁻¹ mol⁻¹.",
    a: [
      "pVM = mRT, so V = mRT/(Mp)",
      "Given: m = 8.8 g, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 31.1°C = 304.1 K, M = 44 g/mol, p = 1 bar",
      "V = (8.8 × 0.083 × 304.1)/(44 × 1) = 5.04806 L ≈ 5.05 L"
    ],
    steps: [
      step("Write the ideal gas equation in terms of mass and molar mass", "pV = nRT = (m/M)RT, so V = mRT/(Mp)"),
      step("Convert temperature to kelvin", "T = 31.1 + 273 = 304.1 K"),
      step("Substitute and calculate", "V = (8.8 × 0.083 × 304.1)/(44 × 1) ≈ 5.05 L"),
    ],
    exp: "8.8 g of CO₂ (molar mass 44) is exactly 0.2 mol — recognising that shortcut isn't necessary here, but it's a useful sanity check on the final volume via V = nRT/p.",
  },
  {
    n: "18",
    q: "2.9 g of gas at 95°C occupied the same volume as 0.184 g of dihydrogen at 17°C, at the same pressure. What is the molar mass of the gas?",
    a: [
      "Volume of dihydrogen: V = mRT/(Mp) = (0.184 × R × 290)/(2 × p), where T = 17°C = 290 K",
      "Let M be the molar mass of the unknown gas. The volume occupied by the unknown gas is V = mRT/(Mp) = (2.9 × R × 368)/(M × p), where T = 95°C = 368 K",
      "According to the question, both volumes (and pressures) are equal, so: (0.184 × 290)/2 = (2.9 × 368)/M",
      "M = (2.9 × 368 × 2)/(0.184 × 290) = 40 g/mol",
      "Therefore, the molar mass of the gas is 40 g/mol."
    ],
    steps: [
      step("Write the volume expression for dihydrogen", "V = mRT/(Mp) = (0.184 × R × 290)/(2 × p)"),
      step("Write the volume expression for the unknown gas", "V = (2.9 × R × 368)/(M × p)"),
      step("Equate the two volumes (same V and same p, so R and p cancel)", "(0.184 × 290)/2 = (2.9 × 368)/M"),
      step("Solve for M", "M = (2.9 × 368 × 2)/(0.184 × 290) = 40 g/mol"),
    ],
    exp: "Because both gases share the same volume and pressure, setting their two mRT/(Mp) expressions equal cancels out R and p entirely, leaving a direct equation for the unknown molar mass — no need to ever compute the actual shared volume.",
  },
  {
    n: "19",
    q: "A mixture of dihydrogen and dioxygen at one bar pressure contains 20% by weight of dihydrogen. Calculate the partial pressure of dihydrogen.",
    a: [
      "Let the weight of dihydrogen be 20 g and the weight of dioxygen be 80 g.",
      "No. of moles of dihydrogen (n(H₂)) = 20/2 = 10 mol",
      "No. of moles of dioxygen (n(O₂)) = 80/32 = 2.5 mol",
      "Given: p(total) = 1 bar",
      "Partial pressure of dihydrogen (p(H₂)) = [n(H₂)/(n(H₂) + n(O₂))] × p(total) = [10/(10 + 2.5)] × 1 = 0.8 bar",
      "Therefore, the partial pressure of dihydrogen is 0.8 bar."
    ],
    steps: [
      step("Assume a convenient total mass and split by percentage", "For 100 g of mixture: 20% H₂ = 20 g, 80% O₂ = 80 g"),
      step("Convert each mass to moles", "n(H₂) = 20/2 = 10 mol\nn(O₂) = 80/32 = 2.5 mol"),
      step("Find the mole fraction of H₂", "x(H₂) = n(H₂)/[n(H₂) + n(O₂)] = 10/12.5 = 0.8"),
      step("Apply Dalton's law: partial pressure = mole fraction × total pressure", "p(H₂) = 0.8 × 1 bar = 0.8 bar"),
    ],
    exp: "Note that H₂'s mole fraction (0.8) is much higher than its mass fraction (0.2) — because H₂ is so much lighter than O₂, the same mass corresponds to far more moles, and partial pressure depends on mole fraction, not mass fraction.",
  },
  {
    n: "20",
    q: "What will be the SI unit for the quantity pV²T²/n?",
    a: [
      "SI unit of pressure, p = N m⁻²",
      "SI unit of volume, V = m³",
      "SI unit of temperature, T = K",
      "SI unit of the number of moles, n = mol",
      "Hence, SI unit of pV²T²/n = (N m⁻²)(m³)²(K)²/mol = N m⁴ K² mol⁻¹"
    ],
    steps: [
      step("List the SI unit of each quantity", "p → N m⁻², V → m³, T → K, n → mol"),
      step("Substitute the units into the expression", "(N m⁻²) × (m³)² × (K)² / mol"),
      step("Simplify the powers of m", "m⁻² × m⁶ = m⁴, so the combined unit is N m⁴ K² mol⁻¹"),
    ],
    exp: "This is a pure dimensional-analysis exercise: substitute each variable's SI unit, then simplify the powers of the repeated unit (metre) exactly as you would simplify powers of x in algebra.",
  },
  {
    n: "21",
    q: "In terms of Charles's law explain why −273°C is the lowest possible temperature.",
    a: [
      "Charles's law states that at constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature.",
      "Charles found that for all gases, at any given pressure, a graph of volume vs. temperature (in Celsius) is a straight line, and on extending this line to zero volume, each line intercepts the temperature axis at −273.15°C.",
      "The volume of the gas at −273.15°C would be zero, meaning the gas would not exist at all below this point.",
      "In fact, all gases liquefy (or solidify) before this temperature is ever reached.",
      "Hence, −273.15°C (rounded to −273°C) is taken as the lowest possible temperature, and is called absolute zero."
    ],
    steps: [
      step("State Charles's law", "At constant p, V ∝ T (absolute temperature) — a plot of V vs. temperature in °C is a straight line."),
      step("Extrapolate the V–T line to zero volume", "For every gas, extending this straight line backwards makes it cross V = 0 at exactly −273.15°C."),
      step("Interpret what zero volume would mean", "A gas cannot physically have negative or literally zero volume, so no temperature below −273.15°C can be reached by any real gas in the gaseous state — it would liquefy/solidify first."),
      step("Name this limiting temperature", "−273.15°C is defined as absolute zero, the zero point of the Kelvin scale."),
    ],
    exp: "Absolute zero is a theoretical extrapolation, not an experimentally reached point — every real gas condenses to a liquid (and then usually a solid) well before its temperature could ever actually hit −273.15°C.",
  },
  {
    n: "22",
    q: "The critical temperature for carbon dioxide and methane are 31.1°C and −81.9°C, respectively. Which of these has stronger intermolecular forces and why?",
    a: [
      "If the critical temperature of a gas is higher, it is easier to liquefy — meaning the intermolecular forces of attraction among its molecules are directly proportional to its critical temperature.",
      "Since CO₂ (31.1°C) has a much higher critical temperature than methane (−81.9°C), the intermolecular forces of attraction in CO₂ are stronger."
    ],
    steps: [
      step("Recall what critical temperature means", "Above its critical temperature, a gas cannot be liquefied no matter how much pressure is applied — it is the temperature below which intermolecular attractions are strong enough to hold the molecules together as a liquid."),
      step("Compare the two critical temperatures", "CO₂: 31.1°C; CH₄: −81.9°C — CO₂'s critical temperature is far higher."),
      step("Connect critical temperature to intermolecular force strength", "A higher critical temperature means stronger intermolecular attractions are needed to be overcome for the gas to remain gaseous, so CO₂ has the stronger intermolecular forces."),
    ],
    exp: "This tracks with molecular structure too: CO₂ is a larger, more polarisable molecule than CH₄, giving it stronger van der Waals forces — which is exactly why CO₂ is comparatively easy to liquefy (e.g. as dry ice/liquid CO₂ in fire extinguishers) while methane needs extreme cooling.",
  },
  {
    n: "23",
    q: "Explain the physical significance of Van der Waals parameters.",
    a: [
      "After accounting for pressure and volume corrections, the van der Waals equation is: (p + an²/V²)(V − nb) = nRT",
      "The van der Waals constants (parameters) are a and b, with the following significance:",
      "'a' measures the magnitude of the intermolecular attractive forces within the gas; it is independent of temperature and pressure. A larger 'a' means stronger intermolecular attraction, and hence a greater pressure correction (an²/V²) is needed.",
      "'b' represents the effective volume occupied by a single gas molecule (excluded volume), while 'nb' represents the total volume excluded by all the molecules present."
    ],
    steps: [
      step("Recall the van der Waals equation", "(p + an²/V²)(V − nb) = nRT — this corrects the ideal gas equation for real-gas behaviour."),
      step("Interpret the pressure-correction term, an²/V²", "This term is added to the measured pressure to account for the fact that intermolecular attractions pull inward-moving molecules back, making the observed pressure lower than it would be for a truly ideal gas. 'a' quantifies how strong these attractions are for a given gas."),
      step("Interpret the volume-correction term, nb", "Real molecules take up actual physical space, so the volume available for molecular motion is less than the container's total volume V. 'b' is this excluded volume per mole, and nb is the total excluded volume for n moles."),
    ],
    exp: "Both 'a' and 'b' are what make the van der Waals equation better than the ideal gas equation for real gases: 'a' fixes the wrong assumption that molecules never attract each other, and 'b' fixes the wrong assumption that molecules are point particles with zero volume.",
  },
];

const questions = raw.map((item) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: item.n,
  questionText: blocks(item.q),
  answer: blocks(...item.a),
  ...(item.steps ? { steps: item.steps } : {}),
  ...(item.exp ? { explanation: blocks(item.exp) } : {}),
}));

const doc = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 5,
  chapterTitle: "States of Matter",
  questions,
};

console.log("Importing Class 11 Chemistry Chapter 5: States of Matter");
console.log(`Questions: ${questions.length}`);

const result = await client.create(doc);
console.log(`✓ Created document: ${result._id}`);
