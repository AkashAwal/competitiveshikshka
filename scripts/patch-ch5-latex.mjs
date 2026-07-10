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
function eq(latex) {
  return { _type: "equation", _key: randomUUID(), latex };
}
function step(title, ...content) {
  return { _type: "step", _key: randomUUID(), stepTitle: title, content };
}

const raw = [
  {
    n: "1",
    q: [block("What will be the minimum pressure required to compress 500 dm³ of air at 1 bar to 200 dm³ at 30°C?")],
    a: [
      block("Initial pressure, P₁ = 1 bar; initial volume, V₁ = 500 dm³; final volume, V₂ = 200 dm³."),
      block("Since the temperature stays constant, Boyle's law applies:"),
      eq("P_1V_1 = P_2V_2"),
      eq("P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{1 \\times 500}{200} = 2.5\\ \\text{bar}"),
      block("Therefore, the minimum pressure required to compress the air is 2.5 bar."),
    ],
    steps: [
      step("Identify the constant-temperature condition", block("The temperature (30°C) is the same before and after compression, so Boyle's law (P₁V₁ = P₂V₂) applies.")),
      step("Substitute the known values", block("P₁ = 1 bar, V₁ = 500 dm³, V₂ = 200 dm³")),
      step("Solve for P₂", eq("P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{1 \\times 500}{200} = 2.5\\ \\text{bar}")),
    ],
    exp: [block("Boyle's law only holds at constant temperature — that's exactly the condition given here (30°C throughout), which is the cue to reach for P₁V₁ = P₂V₂ instead of the full ideal gas equation.")],
  },
  {
    n: "2",
    q: [block("A vessel of 120 mL capacity contains a certain amount of gas at 35°C and 1.2 bar pressure. The gas is transferred to another vessel of volume 180 mL at 35°C. What would be its pressure?")],
    a: [
      block("Initial pressure, P₁ = 1.2 bar; initial volume, V₁ = 120 mL; final volume, V₂ = 180 mL."),
      block("Since the temperature remains constant, Boyle's law applies:"),
      eq("P_1V_1 = P_2V_2"),
      eq("P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{1.2 \\times 120}{180} = 0.8\\ \\text{bar}"),
      block("Therefore, the new pressure is 0.8 bar."),
    ],
    steps: [
      step("Confirm constant temperature", block("35°C is the same in both vessels, so Boyle's law applies.")),
      step("Apply Boyle's law", eq("P_2 = \\dfrac{P_1V_1}{V_2} = \\dfrac{1.2 \\times 120}{180} = 0.8\\ \\text{bar}")),
    ],
    exp: [block("Moving a fixed amount of gas into a larger container at the same temperature always lowers its pressure — the same number of molecules now have more room, so they collide with the walls less often.")],
  },
  {
    n: "3",
    q: [block("Using the equation of state pV = nRT, show that at a given temperature the density of a gas is proportional to gas pressure p.")],
    a: [
      block("From pV = nRT:"),
      eq("\\dfrac{n}{V} = \\dfrac{p}{RT}"),
      block("Replace n with m/M (m = mass, M = molar mass):"),
      eq("\\dfrac{m}{MV} = \\dfrac{p}{RT} \\qquad \\text{...(2)}"),
      block("But m/V = d (density). So from equation (2):"),
      eq("\\dfrac{d}{M} = \\dfrac{p}{RT}\\ ,\\ \\text{i.e.}\\ d = \\dfrac{M}{RT}\\,p"),
      block("Therefore, d ∝ p — at a given temperature, the density of a gas (d) is directly proportional to its pressure (p)."),
    ],
    steps: [
      step("Rearrange the ideal gas equation", eq("pV = nRT \\ \\Rightarrow\\ \\dfrac{n}{V} = \\dfrac{p}{RT}")),
      step("Substitute n = m/M", eq("\\dfrac{m}{MV} = \\dfrac{p}{RT}")),
      step("Recognise m/V as density", eq("d = \\dfrac{m}{V} \\ \\Rightarrow\\ \\dfrac{d}{M} = \\dfrac{p}{RT} \\ \\Rightarrow\\ d = \\dfrac{M}{RT}\\,p")),
      step("Conclude the proportionality", block("At constant T, M/RT is a constant, so d ∝ p.")),
    ],
    exp: [block("This is why a gas cylinder feels 'denser' the more you pressurise it: cramming the same mass into the same volume at higher pressure only works because more molecules are packed in per unit volume, which is exactly what density measures.")],
  },
  {
    n: "4",
    q: [block("At 0°C, the density of a certain oxide of a gas at 2 bar is the same as that of dinitrogen at 5 bar. What is the molecular mass of the oxide?")],
    a: [
      eq("d_1 = \\dfrac{M_1p_1}{RT} \\qquad d_2 = \\dfrac{M_2p_2}{RT}"),
      block("Since d₁ = d₂: M₁p₁ = M₂p₂"),
      eq("M_1 = \\dfrac{M_2p_2}{p_1} = \\dfrac{28 \\times 5}{2} = 70\\ \\text{g/mol}"),
      block("Therefore, the molecular mass of the oxide is 70 g/mol."),
    ],
    steps: [
      step("Write the density expression for each gas", block("d = Mp/(RT) for both gases, at the same temperature (0°C) so RT cancels when the densities are set equal.")),
      step("Set the two densities equal", eq("d_1 = d_2 \\ \\Rightarrow\\ M_1p_1 = M_2p_2")),
      step("Solve for the unknown molar mass", eq("M_1 = \\dfrac{M_2p_2}{p_1} = \\dfrac{28 \\times 5}{2} = 70\\ \\text{g/mol}")),
    ],
    exp: [block("Equal densities at the same temperature mean M₁p₁ = M₂p₂ — a heavier gas at lower pressure can have exactly the same density as a lighter gas at higher pressure, which is the trick this problem is testing.")],
  },
  {
    n: "5",
    q: [block("The pressure of 1 g of an ideal gas A at 27°C is found to be 2 bar. When 2 g of another ideal gas B is introduced in the same flask at the same temperature, the pressure becomes 3 bar. Find a relationship between their molecular masses.")],
    a: [
      block("For ideal gas A:"),
      eq("p_xV = n_xRT \\qquad \\text{...(1)}"),
      block("For ideal gas B (V and T are constant for both gases):"),
      eq("p_yV = n_yRT \\qquad \\text{...(2)}"),
      block("From (1), with nₓ = mₓ/Mₓ:"),
      eq("\\dfrac{p_xM_x}{m_x} = \\dfrac{RT}{V} \\qquad \\text{...(3)}"),
      block("From (2), with nᵧ = mᵧ/Mᵧ:"),
      eq("\\dfrac{p_yM_y}{m_y} = \\dfrac{RT}{V} \\qquad \\text{...(4)}"),
      block("From (3) and (4):"),
      eq("\\dfrac{p_xM_x}{m_x} = \\dfrac{p_yM_y}{m_y} \\qquad \\text{...(5)}"),
      block("Given: mₓ = 1 g, pₓ = 2 bar, mᵧ = 2 g, pᵧ = (3 − 2) = 1 bar (since the total pressure is 3 bar and A alone contributed 2 bar)."),
      block("Substituting into (5):"),
      eq("\\dfrac{2M_x}{1} = \\dfrac{1 \\times M_y}{2} \\ \\Rightarrow\\ M_y = 4M_x"),
      block("Therefore, the molecular mass of gas B is four times that of gas A."),
    ],
    steps: [
      step("Write the ideal gas equation for each gas separately", block("pₓV = nₓRT and pᵧV = nᵧRT, with the same V and T for both since they share the flask.")),
      step("Substitute n = m/M for each gas", eq("\\dfrac{p_xM_x}{m_x} = \\dfrac{RT}{V} \\qquad \\dfrac{p_yM_y}{m_y} = \\dfrac{RT}{V}")),
      step("Equate the two expressions (both equal RT/V)", eq("\\dfrac{p_xM_x}{m_x} = \\dfrac{p_yM_y}{m_y}")),
      step("Find pᵧ using Dalton's law of partial pressures", block("Total pressure = pₓ + pᵧ = 3 bar, and pₓ = 2 bar, so pᵧ = 1 bar.")),
      step("Substitute all known values and solve", eq("\\dfrac{2M_x}{1} = \\dfrac{1 \\times M_y}{2} \\ \\Rightarrow\\ M_y = 4M_x")),
    ],
    exp: [block("The key insight is that gas B's own partial pressure (1 bar) is found by simple subtraction — total pressure minus A's original pressure — because each gas in a mixture contributes independently to the total pressure (Dalton's law).")],
  },
  {
    n: "6",
    q: [block("The drain cleaner, Drainex, contains small bits of aluminium which react with caustic soda to produce dihydrogen. What volume of dihydrogen at 20°C and one bar will be released when 0.15 g of aluminium reacts?")],
    a: [
      block("Reaction of aluminium with caustic soda:"),
      eq("2Al + 2NaOH + 2H_2O \\rightarrow 2NaAlO_2 + 3H_2"),
      block("At STP (273.15 K and 1 atm), 54 g (2 × 27 g) of Al gives 3 × 22400 mL of H₂."),
      eq("0.15\\ \\text{g Al gives} = \\dfrac{3 \\times 22400 \\times 0.15}{54}\\ \\text{mL of H}_2 = 186.67\\ \\text{mL of H}_2"),
      block("At STP: p₁ = 1 atm, V₁ = 186.67 mL, T₁ = 273.15 K. Let the new volume be V₂ at p₂ = 0.987 atm (since 1 bar = 0.987 atm) and T₂ = (273.15 + 20) K = 293.15 K."),
      eq("\\dfrac{p_1V_1}{T_1} = \\dfrac{p_2V_2}{T_2} \\ \\Rightarrow\\ V_2 = \\dfrac{p_1V_1T_2}{p_2T_1} = \\dfrac{1 \\times 186.67 \\times 293.15}{0.987 \\times 273.15} = 202.98\\ \\text{mL} \\approx 203\\ \\text{mL}"),
      block("Hence, 203 mL of dihydrogen will be released."),
    ],
    steps: [
      step("Write the balanced equation and find the mole ratio", eq("2Al + 2NaOH + 2H_2O \\rightarrow 2NaAlO_2 + 3H_2"), block("2 mol Al (54 g) produces 3 mol H₂")),
      step("Find the volume of H₂ at STP produced by 0.15 g Al", eq("0.15\\ \\text{g Al} \\rightarrow \\dfrac{3 \\times 22400 \\times 0.15}{54} = 186.67\\ \\text{mL H}_2\\ \\text{at STP}")),
      step("Convert bar to atm for the new pressure", block("1 bar = 0.987 atm")),
      step("Apply the combined gas law to shift from STP to the new conditions", eq("V_2 = \\dfrac{p_1V_1T_2}{p_2T_1} = \\dfrac{1 \\times 186.67 \\times 293.15}{0.987 \\times 273.15} \\approx 203\\ \\text{mL}")),
    ],
    exp: [block("This problem chains two separate ideas: stoichiometry (to find how much H₂ forms at STP) and the combined gas law (to convert that STP volume to the actual 20°C, 1 bar conditions asked for) — always find moles/volume at a known reference state first, then adjust for the real conditions.")],
  },
  {
    n: "7",
    q: [block("What will be the pressure exerted by a mixture of 3.2 g of methane and 4.4 g of carbon dioxide contained in a 9 dm³ flask at 27°C?")],
    a: [
      block("It is known that:"),
      eq("p = \\dfrac{m}{M} \\times \\dfrac{RT}{V} \\qquad [\\text{9 dm}^3 = 9\\times10^{-3}\\ \\text{m}^3,\\ 27°\\text{C} = 300\\ \\text{K}]"),
      eq("p(CH_4) = \\dfrac{3.2}{16} \\times \\dfrac{8.314 \\times 300}{9 \\times 10^{-3}} = 5.543 \\times 10^{4}\\ \\text{Pa}"),
      eq("p(CO_2) = \\dfrac{4.4}{44} \\times \\dfrac{8.314 \\times 300}{9 \\times 10^{-3}} = 2.771 \\times 10^{4}\\ \\text{Pa}"),
      block("The total pressure exerted by the mixture:"),
      eq("p = p(CH_4) + p(CO_2) = (5.543 + 2.771)\\times 10^{4}\\ \\text{Pa} = 8.314 \\times 10^{4}\\ \\text{Pa}"),
    ],
    steps: [
      step("Convert units to SI", block("9 dm³ = 9 × 10⁻³ m³; 27°C = 300 K")),
      step("Find the partial pressure of methane", block("Moles of CH₄ = 3.2/16 = 0.2 mol"), eq("p(CH_4) = \\dfrac{0.2 \\times 8.314 \\times 300}{9 \\times 10^{-3}} = 5.543 \\times 10^{4}\\ \\text{Pa}")),
      step("Find the partial pressure of carbon dioxide", block("Moles of CO₂ = 4.4/44 = 0.1 mol"), eq("p(CO_2) = \\dfrac{0.1 \\times 8.314 \\times 300}{9 \\times 10^{-3}} = 2.771 \\times 10^{4}\\ \\text{Pa}")),
      step("Add the partial pressures (Dalton's law)", eq("p(\\text{total}) = 5.543\\times10^4 + 2.771\\times10^4 = 8.314 \\times 10^{4}\\ \\text{Pa}")),
    ],
    exp: [block("Each gas in a mixture behaves as if it alone occupied the whole flask — that's Dalton's law of partial pressures — so you can compute each gas's contribution separately using pV = nRT and simply add them.")],
  },
  {
    n: "8",
    q: [block("What will be the pressure of the gaseous mixture when 0.5 L of H₂ at 0.8 bar and 2.0 L of dioxygen at 0.7 bar are introduced in a 1 L vessel at 27°C?")],
    a: [
      block("Let the partial pressure of H₂ in the container be p(H₂). Here p₁ = 0.8 bar, V₁ = 0.5 L, V₂ = 1 L. Since p₁V₁ = p₂V₂:"),
      eq("p(H_2) = \\dfrac{p_1 \\times V_1}{V_2} = \\dfrac{0.8 \\times 0.5}{1} = 0.4\\ \\text{bar}"),
      block("Similarly, for O₂: p₁ = 0.7 bar, V₁ = 2.0 L, V₂ = 1 L."),
      eq("p(O_2) = \\dfrac{0.7 \\times 2.0}{1} = 1.4\\ \\text{bar}"),
      block("The total pressure of the gas mixture:"),
      eq("p(\\text{total}) = p(H_2) + p(O_2) = 0.4 + 1.4 = 1.8\\ \\text{bar}"),
    ],
    steps: [
      step("Recognise this as two separate Boyle's-law compressions", block("Each gas is being squeezed from its own original volume into the shared 1 L vessel at the same (constant) temperature, so p₁V₁ = p₂V₂ applies to each gas individually.")),
      step("Find H₂'s new partial pressure", eq("p(H_2) = \\dfrac{0.8 \\times 0.5}{1} = 0.4\\ \\text{bar}")),
      step("Find O₂'s new partial pressure", eq("p(O_2) = \\dfrac{0.7 \\times 2.0}{1} = 1.4\\ \\text{bar}")),
      step("Add the partial pressures for the total", eq("p(\\text{total}) = 0.4 + 1.4 = 1.8\\ \\text{bar}")),
    ],
    exp: [block("Combining two gases into one vessel is really just two independent Boyle's-law problems happening at once — work out each gas's new pressure on its own, then add them per Dalton's law.")],
  },
  {
    n: "9",
    q: [block("The density of a gas is found to be 5.46 g/dm³ at 27°C at 2 bar pressure. What will be its density at STP?")],
    a: [
      block("Given: d₁ = 5.46 g/dm³, p₁ = 2 bar, T₁ = 300 K, p₂ = 1 bar, T₂ = 273 K, d₂ = ?"),
      block("Density is given by d = Mp/(RT), so:"),
      eq("\\dfrac{d_1}{d_2} = \\dfrac{p_1/T_1}{p_2/T_2} = \\dfrac{p_1T_2}{p_2T_1}"),
      eq("d_2 = \\dfrac{p_2T_1d_1}{p_1T_2} = \\dfrac{1 \\times 300 \\times 5.46}{2 \\times 273} = 3\\ \\text{g/dm}^3"),
      block("Hence, the density of the gas at STP will be 3 g/dm³."),
    ],
    steps: [
      step("Write the density relation for both states", block("d = Mp/(RT); since M and R are the same substance-specific constants, they cancel when comparing the two states.")),
      step("Set up the ratio d₁/d₂", eq("\\dfrac{d_1}{d_2} = \\dfrac{p_1/T_1}{p_2/T_2} = \\dfrac{p_1T_2}{p_2T_1}")),
      step("Solve for d₂", eq("d_2 = \\dfrac{p_2T_1d_1}{p_1T_2} = \\dfrac{1 \\times 300 \\times 5.46}{2 \\times 273} = 3\\ \\text{g/dm}^3")),
    ],
    exp: [block("Density changes with both pressure and temperature for a gas (unlike a liquid or solid), so converting a density value to STP always needs both corrections applied together via d = Mp/(RT).")],
  },
  {
    n: "10",
    q: [block("34.05 mL of phosphorus vapour weighs 0.0625 g at 546°C and 0.1 bar pressure. What is the molar mass of phosphorus?")],
    a: [
      block("Given: p = 0.1 bar, V = 34.05 × 10⁻³ dm³, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = (546 + 273) K = 819 K."),
      block("Using the ideal gas equation pV = nRT:"),
      eq("n = \\dfrac{pV}{RT} = \\dfrac{0.1 \\times 34.05 \\times 10^{-3}}{0.083 \\times 819} = 5.01 \\times 10^{-5}\\ \\text{mol}"),
      eq("M = \\dfrac{\\text{mass}}{n} = \\dfrac{0.0625}{5.01 \\times 10^{-5}} = 125\\ \\text{g/mol}"),
    ],
    steps: [
      step("Convert all quantities to consistent units", block("V = 34.05 mL = 34.05 × 10⁻³ dm³; T = 546 + 273 = 819 K")),
      step("Find moles using pV = nRT", eq("n = \\dfrac{pV}{RT} = \\dfrac{0.1 \\times 34.05 \\times 10^{-3}}{0.083 \\times 819} = 5.01 \\times 10^{-5}\\ \\text{mol}")),
      step("Divide mass by moles to get molar mass", eq("M = \\dfrac{0.0625}{5.01 \\times 10^{-5}} = 125\\ \\text{g/mol}")),
    ],
    exp: [block("125 g/mol matches P₄ (white phosphorus, 4 × 31 ≈ 124), which is a nice real-world check that the calculation is sensible — phosphorus vapour exists as tetratomic P₄ molecules, not single P atoms.")],
  },
  {
    n: "11",
    q: [block("A student forgot to add the reaction mixture to the round bottomed flask at 27°C, but instead, he placed the flask on the flame. After a lapse of time, he realised his mistake and using a pyrometer, he found the temperature of the flask was 477°C. What fraction of air would have been expelled out?")],
    a: [
      block("Let the volume of the container be V, so the volume of air inside it at 27°C is also V. V₁ = V, T₁ = 300 K; V₂ = ?, T₂ = 750 K."),
      block("By Charles's law:"),
      eq("\\dfrac{V_1}{T_1} = \\dfrac{V_2}{T_2} \\ \\Rightarrow\\ V_2 = \\dfrac{V_1T_2}{T_1} = \\dfrac{V \\times 750}{300} = 2.5V"),
      block("Therefore, the volume of air expelled out = 2.5V − V = 1.5V."),
      eq("\\text{fraction expelled} = \\dfrac{1.5V}{2.5V} = \\dfrac{3}{5}"),
    ],
    steps: [
      step("Recognise the constant-pressure setup", block("The open flask stays at atmospheric pressure throughout, so Charles's law (V₁/T₁ = V₂/T₂) applies as the air inside expands.")),
      step("Find the new volume the original air would occupy", eq("V_2 = \\dfrac{V_1T_2}{T_1} = \\dfrac{V \\times 750}{300} = 2.5V")),
      step("Find the volume actually expelled", block("Since the flask itself still only holds V, the extra 2.5V − V = 1.5V worth of air must have been pushed out.")),
      step("Express as a fraction of the original air", eq("\\text{fraction expelled} = \\dfrac{1.5V}{2.5V} = \\dfrac{3}{5}")),
    ],
    exp: [block("The flask's rigid volume V stays fixed, but the air inside it 'wants' to expand to 2.5V at the higher temperature — since it can't, the excess simply escapes out the open neck, and that escaped fraction is what the question asks for.")],
  },
  {
    n: "12",
    q: [block("Calculate the temperature of 4.0 mol of a gas occupying 5 dm³ at 3.32 bar. (R = 0.083 bar dm³ K⁻¹ mol⁻¹)")],
    a: [
      block("Given: n = 4.0 mol, V = 5 dm³, p = 3.32 bar, R = 0.083 bar dm³ K⁻¹ mol⁻¹."),
      block("Using the ideal gas equation pV = nRT:"),
      eq("T = \\dfrac{pV}{nR} = \\dfrac{3.32 \\times 5}{4 \\times 0.083} = 50\\ \\text{K}"),
      block("Therefore, the required temperature is 50 K."),
    ],
    steps: [
      step("Write down the known quantities", block("n = 4.0 mol, V = 5 dm³, p = 3.32 bar, R = 0.083 bar dm³ K⁻¹ mol⁻¹")),
      step("Rearrange the ideal gas equation for T", eq("T = \\dfrac{pV}{nR}")),
      step("Substitute and calculate", eq("T = \\dfrac{3.32 \\times 5}{4 \\times 0.083} = 50\\ \\text{K}")),
    ],
    exp: [block("A direct one-step application of pV = nRT — the only work is picking the right rearrangement and keeping R's units (bar·dm³·K⁻¹·mol⁻¹) consistent with the given p (bar) and V (dm³).")],
  },
  {
    n: "13",
    q: [block("Calculate the total number of electrons present in 1.4 g of dinitrogen gas.")],
    a: [
      block("Molar mass of dinitrogen (N₂) = 28 g/mol."),
      eq("1.4\\ \\text{g of N}_2 = \\dfrac{1.4}{28} = 0.05\\ \\text{mol} = 0.05 \\times 6.02 \\times 10^{23} = 3.01 \\times 10^{23}\\ \\text{molecules}"),
      block("Now, 1 molecule of N₂ has 14 electrons. Therefore:"),
      eq("14 \\times 3.01 \\times 10^{23} = 4.214 \\times 10^{23}\\ \\text{electrons}"),
    ],
    steps: [
      step("Convert mass to moles", eq("n = \\dfrac{1.4}{28} = 0.05\\ \\text{mol}")),
      step("Convert moles to number of molecules", eq("0.05 \\times 6.02 \\times 10^{23} = 3.01 \\times 10^{23}\\ \\text{molecules}")),
      step("Find electrons per molecule and multiply", block("N (Z = 7) has 7 electrons per atom, so N₂ has 14 electrons per molecule."), eq("14 \\times 3.01 \\times 10^{23} = 4.214 \\times 10^{23}\\ \\text{electrons}")),
    ],
    exp: [block("This is a mole-concept problem dressed up in a States of Matter chapter — the gas-law content is irrelevant here; only Avogadro's number and each atom's electron count (equal to its atomic number) matter.")],
  },
  {
    n: "14",
    q: [block("How much time would it take to distribute one Avogadro number of wheat grains, if 10¹⁰ grains are distributed each second?")],
    a: [
      block("Avogadro number = 6.02 × 10²³."),
      eq("\\text{time} = \\dfrac{6.02 \\times 10^{23}}{10^{10}}\\ \\text{s} = 6.02 \\times 10^{13}\\ \\text{s}"),
      eq("\\dfrac{6.02 \\times 10^{13}}{60 \\times 60 \\times 24 \\times 365} = 1.909 \\times 10^{6}\\ \\text{years}"),
      block("Therefore, the time taken would be 1.909 × 10⁶ years."),
    ],
    steps: [
      step("Divide Avogadro's number by the rate", eq("\\text{time} = \\dfrac{6.02 \\times 10^{23}}{10^{10}} = 6.02 \\times 10^{13}\\ \\text{s}")),
      step("Convert seconds to years", block("1 year = 60 × 60 × 24 × 365 s ≈ 3.1536 × 10⁷ s")),
      step("Divide to get the answer in years", eq("\\dfrac{6.02 \\times 10^{13}}{3.1536 \\times 10^{7}} \\approx 1.909 \\times 10^{6}\\ \\text{years}")),
    ],
    exp: [block("This calculation is really just meant to make the sheer scale of Avogadro's number (6.02 × 10²³) tangible — even distributing ten billion grains every second would take nearly 2 million years to hand out one mole of them.")],
  },
  {
    n: "15",
    q: [block("Calculate the total pressure in a mixture of 8 g of dioxygen and 4 g of dihydrogen confined in a vessel of 1 dm³ at 27°C. R = 0.083 bar dm³ K⁻¹ mol⁻¹")],
    a: [
      eq("n(O_2) = \\dfrac{8}{32} = 0.25\\ \\text{mol} \\qquad n(H_2) = \\dfrac{4}{2} = 2\\ \\text{mol}"),
      block("Hence, the total number of moles in the mixture = 0.25 + 2 = 2.25 mol."),
      block("Given: V = 1 dm³, n = 2.25 mol, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 300 K."),
      eq("p = \\dfrac{nRT}{V} = \\dfrac{2.25 \\times 0.083 \\times 300}{1} = 56.025\\ \\text{bar}"),
      block("Therefore, the total pressure of the mixture is 56.025 bar."),
    ],
    steps: [
      step("Convert each gas's mass to moles", eq("n(O_2) = \\dfrac{8}{32} = 0.25\\ \\text{mol} \\qquad n(H_2) = \\dfrac{4}{2} = 2\\ \\text{mol}")),
      step("Add the moles to get the total for the mixture", eq("n(\\text{total}) = 0.25 + 2 = 2.25\\ \\text{mol}")),
      step("Apply the ideal gas equation to the mixture as a whole", eq("p = \\dfrac{nRT}{V} = \\dfrac{2.25 \\times 0.083 \\times 300}{1} = 56.025\\ \\text{bar}")),
    ],
    exp: [block("For a gas mixture, you can either add up each gas's partial pressure separately, or — as done here — just add up the total moles first and apply pV = nRT once. Both routes give the same answer because pressure depends only on the total mole count, not on which gas the moles belong to.")],
  },
  {
    n: "16",
    q: [block("Payload is defined as the difference between the mass of displaced air and the mass of the balloon. Calculate the payload when a balloon of radius 10 m, mass 100 kg, is filled with helium at 1.66 bar at 27°C. (Density of air = 1.2 kg m⁻³ and R = 0.083 bar dm³ K⁻¹ mol⁻¹)")],
    a: [
      block("Given: r = 10 m. Therefore, the volume of the balloon:"),
      eq("V = \\dfrac{4}{3}\\pi r^3 = \\dfrac{4}{3} \\times \\dfrac{22}{7} \\times 10^3 = 4190.5\\ \\text{m}^3\\ (\\text{approx.})"),
      block("Mass of helium, m = MpV/(RT), where M = 4 × 10⁻³ kg/mol, p = 1.66 bar, V = 4190.5 × 10³ dm³, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 300 K:"),
      eq("m = \\dfrac{4 \\times 10^{-3} \\times 1.66 \\times 4190.5 \\times 10^3}{0.083 \\times 300} = 1117.5\\ \\text{kg}\\ (\\text{approx.})"),
      block("Therefore, the volume of the displaced air = 4190.5 m³, and its mass = 4190.5 × 1.2 kg = 5028.6 kg."),
      block("Now, total mass with helium = (100 + 1117.5) kg = 1217.5 kg."),
      eq("\\text{payload} = 5028.6 - 1217.5 = 3811.1\\ \\text{kg}"),
      block("Therefore, the payload of the balloon is 3811.1 kg."),
    ],
    steps: [
      step("Find the balloon's volume from its radius", eq("V = \\dfrac{4}{3}\\pi r^3 \\approx 4190.5\\ \\text{m}^3")),
      step("Find the mass of helium filling the balloon", eq("m(\\text{He}) = \\dfrac{MpV}{RT} \\approx 1117.5\\ \\text{kg}")),
      step("Find the mass of the air displaced by the balloon", eq("\\text{mass of displaced air} = 4190.5 \\times 1.2 \\approx 5028.6\\ \\text{kg}")),
      step("Find the total mass of the filled balloon", eq("\\text{total mass} = 100 + 1117.5 = 1217.5\\ \\text{kg}")),
      step("Apply the payload definition", eq("\\text{payload} = 5028.6 - 1217.5 = 3811.1\\ \\text{kg}")),
    ],
    exp: [block("This is essentially Archimedes' principle applied to a lighter-than-air gas: the balloon can lift a payload equal to the difference between the air it displaces (which has weight) and its own total mass (balloon + gas) — which is exactly why helium balloons float.")],
  },
  {
    n: "17",
    q: [block("Calculate the volume occupied by 8.8 g of CO₂ at 31.1°C and 1 bar pressure. R = 0.083 bar dm³ K⁻¹ mol⁻¹.")],
    a: [
      eq("pVM = mRT \\ \\Rightarrow\\ V = \\dfrac{mRT}{Mp}"),
      block("Given: m = 8.8 g, R = 0.083 bar dm³ K⁻¹ mol⁻¹, T = 304.1 K, M = 44 g/mol, p = 1 bar."),
      eq("V = \\dfrac{8.8 \\times 0.083 \\times 304.1}{44 \\times 1} = 5.048\\ \\text{L} \\approx 5.05\\ \\text{L}"),
    ],
    steps: [
      step("Write the ideal gas equation in terms of mass and molar mass", eq("pV = \\dfrac{m}{M}RT \\ \\Rightarrow\\ V = \\dfrac{mRT}{Mp}")),
      step("Convert temperature to kelvin", block("T = 31.1 + 273 = 304.1 K")),
      step("Substitute and calculate", eq("V = \\dfrac{8.8 \\times 0.083 \\times 304.1}{44 \\times 1} \\approx 5.05\\ \\text{L}")),
    ],
    exp: [block("8.8 g of CO₂ (molar mass 44) is exactly 0.2 mol — recognising that shortcut isn't necessary here, but it's a useful sanity check on the final volume via V = nRT/p.")],
  },
  {
    n: "18",
    q: [block("2.9 g of gas at 95°C occupied the same volume as 0.184 g of dihydrogen at 17°C, at the same pressure. What is the molar mass of the gas?")],
    a: [
      block("Volume of dihydrogen (T = 17°C = 290 K):"),
      eq("V = \\dfrac{mRT}{Mp} = \\dfrac{0.184 \\times R \\times 290}{2 \\times p}"),
      block("Let M be the molar mass of the unknown gas (T = 95°C = 368 K):"),
      eq("V = \\dfrac{2.9 \\times R \\times 368}{M \\times p}"),
      block("According to the question, both volumes (and pressures) are equal, so:"),
      eq("\\dfrac{0.184 \\times 290}{2} = \\dfrac{2.9 \\times 368}{M}"),
      eq("M = \\dfrac{2.9 \\times 368 \\times 2}{0.184 \\times 290} = 40\\ \\text{g/mol}"),
      block("Therefore, the molar mass of the gas is 40 g/mol."),
    ],
    steps: [
      step("Write the volume expression for dihydrogen", eq("V = \\dfrac{0.184 \\times R \\times 290}{2 \\times p}")),
      step("Write the volume expression for the unknown gas", eq("V = \\dfrac{2.9 \\times R \\times 368}{M \\times p}")),
      step("Equate the two volumes (same V and same p, so R and p cancel)", eq("\\dfrac{0.184 \\times 290}{2} = \\dfrac{2.9 \\times 368}{M}")),
      step("Solve for M", eq("M = \\dfrac{2.9 \\times 368 \\times 2}{0.184 \\times 290} = 40\\ \\text{g/mol}")),
    ],
    exp: [block("Because both gases share the same volume and pressure, setting their two mRT/(Mp) expressions equal cancels out R and p entirely, leaving a direct equation for the unknown molar mass — no need to ever compute the actual shared volume.")],
  },
  {
    n: "19",
    q: [block("A mixture of dihydrogen and dioxygen at one bar pressure contains 20% by weight of dihydrogen. Calculate the partial pressure of dihydrogen.")],
    a: [
      block("Let the weight of dihydrogen be 20 g and the weight of dioxygen be 80 g."),
      eq("n(H_2) = \\dfrac{20}{2} = 10\\ \\text{mol} \\qquad n(O_2) = \\dfrac{80}{32} = 2.5\\ \\text{mol}"),
      block("Given: p(total) = 1 bar."),
      eq("p(H_2) = \\left[\\dfrac{n(H_2)}{n(H_2) + n(O_2)}\\right] \\times p_{\\text{total}} = \\left[\\dfrac{10}{12.5}\\right] \\times 1 = 0.8\\ \\text{bar}"),
      block("Therefore, the partial pressure of dihydrogen is 0.8 bar."),
    ],
    steps: [
      step("Assume a convenient total mass and split by percentage", block("For 100 g of mixture: 20% H₂ = 20 g, 80% O₂ = 80 g")),
      step("Convert each mass to moles", eq("n(H_2) = \\dfrac{20}{2} = 10\\ \\text{mol} \\qquad n(O_2) = \\dfrac{80}{32} = 2.5\\ \\text{mol}")),
      step("Find the mole fraction of H₂", eq("x(H_2) = \\dfrac{n(H_2)}{n(H_2)+n(O_2)} = \\dfrac{10}{12.5} = 0.8")),
      step("Apply Dalton's law: partial pressure = mole fraction × total pressure", eq("p(H_2) = 0.8 \\times 1\\ \\text{bar} = 0.8\\ \\text{bar}")),
    ],
    exp: [block("Note that H₂'s mole fraction (0.8) is much higher than its mass fraction (0.2) — because H₂ is so much lighter than O₂, the same mass corresponds to far more moles, and partial pressure depends on mole fraction, not mass fraction.")],
  },
  {
    n: "20",
    q: [block("What will be the SI unit for the quantity pV²T²/n?")],
    a: [
      block("SI unit of pressure, p = N m⁻²; SI unit of volume, V = m³; SI unit of temperature, T = K; SI unit of the number of moles, n = mol."),
      eq("\\dfrac{pV^2T^2}{n} = \\dfrac{(N\\,m^{-2})(m^3)^2(K)^2}{\\text{mol}} = N\\,m^4\\,K^2\\,\\text{mol}^{-1}"),
    ],
    steps: [
      step("List the SI unit of each quantity", block("p → N m⁻², V → m³, T → K, n → mol")),
      step("Substitute the units into the expression", eq("\\dfrac{(N\\,m^{-2}) \\times (m^3)^2 \\times (K)^2}{\\text{mol}}")),
      step("Simplify the powers of m", eq("m^{-2} \\times m^6 = m^4 \\ \\Rightarrow\\ N\\,m^4\\,K^2\\,\\text{mol}^{-1}")),
    ],
    exp: [block("This is a pure dimensional-analysis exercise: substitute each variable's SI unit, then simplify the powers of the repeated unit (metre) exactly as you would simplify powers of x in algebra.")],
  },
  {
    n: "21",
    q: [block("In terms of Charles's law explain why −273°C is the lowest possible temperature.")],
    a: [
      block("Charles's law states that at constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature."),
      block("Charles found that for all gases, at any given pressure, a graph of volume vs. temperature (in Celsius) is a straight line, and on extending this line to zero volume, each line intercepts the temperature axis at −273.15°C."),
      block("The volume of the gas at −273.15°C would be zero, meaning the gas would not exist at all below this point."),
      block("In fact, all gases liquefy (or solidify) before this temperature is ever reached."),
      block("Hence, −273.15°C (rounded to −273°C) is taken as the lowest possible temperature, and is called absolute zero."),
    ],
    steps: [
      step("State Charles's law", eq("V \\propto T\\ \\text{(at constant pressure)}")),
      step("Extrapolate the V–T line to zero volume", block("For every gas, extending this straight line backwards makes it cross V = 0 at exactly −273.15°C.")),
      step("Interpret what zero volume would mean", block("A gas cannot physically have negative or literally zero volume, so no temperature below −273.15°C can be reached by any real gas in the gaseous state — it would liquefy/solidify first.")),
      step("Name this limiting temperature", block("−273.15°C is defined as absolute zero, the zero point of the Kelvin scale.")),
    ],
    exp: [block("Absolute zero is a theoretical extrapolation, not an experimentally reached point — every real gas condenses to a liquid (and then usually a solid) well before its temperature could ever actually hit −273.15°C.")],
  },
  {
    n: "22",
    q: [block("The critical temperature for carbon dioxide and methane are 31.1°C and −81.9°C, respectively. Which of these has stronger intermolecular forces and why?")],
    a: [
      block("If the critical temperature of a gas is higher, it is easier to liquefy — meaning the intermolecular forces of attraction among its molecules are directly proportional to its critical temperature."),
      block("Since CO₂ (31.1°C) has a much higher critical temperature than methane (−81.9°C), the intermolecular forces of attraction in CO₂ are stronger."),
    ],
    steps: [
      step("Recall what critical temperature means", block("Above its critical temperature, a gas cannot be liquefied no matter how much pressure is applied — it is the temperature below which intermolecular attractions are strong enough to hold the molecules together as a liquid.")),
      step("Compare the two critical temperatures", block("CO₂: 31.1°C; CH₄: −81.9°C — CO₂'s critical temperature is far higher.")),
      step("Connect critical temperature to intermolecular force strength", block("A higher critical temperature means stronger intermolecular attractions are needed to be overcome for the gas to remain gaseous, so CO₂ has the stronger intermolecular forces.")),
    ],
    exp: [block("This tracks with molecular structure too: CO₂ is a larger, more polarisable molecule than CH₄, giving it stronger van der Waals forces — which is exactly why CO₂ is comparatively easy to liquefy (e.g. as dry ice/liquid CO₂ in fire extinguishers) while methane needs extreme cooling.")],
  },
  {
    n: "23",
    q: [block("Explain the physical significance of Van der Waals parameters.")],
    a: [
      block("After accounting for pressure and volume corrections, the van der Waals equation is:"),
      eq("\\left(p + \\dfrac{an^2}{V^2}\\right)(V - nb) = nRT"),
      block("The van der Waals constants (parameters) are a and b, with the following significance:"),
      block("'a' measures the magnitude of the intermolecular attractive forces within the gas; it is independent of temperature and pressure. A larger 'a' means stronger intermolecular attraction, and hence a greater pressure correction (an²/V²) is needed."),
      block("'b' represents the effective volume occupied by a single gas molecule (excluded volume), while 'nb' represents the total volume excluded by all the molecules present."),
    ],
    steps: [
      step("Recall the van der Waals equation", eq("\\left(p + \\dfrac{an^2}{V^2}\\right)(V - nb) = nRT")),
      step("Interpret the pressure-correction term, an²/V²", block("This term is added to the measured pressure to account for the fact that intermolecular attractions pull inward-moving molecules back, making the observed pressure lower than it would be for a truly ideal gas. 'a' quantifies how strong these attractions are for a given gas.")),
      step("Interpret the volume-correction term, nb", block("Real molecules take up actual physical space, so the volume available for molecular motion is less than the container's total volume V. 'b' is this excluded volume per mole, and nb is the total excluded volume for n moles.")),
    ],
    exp: [block("Both 'a' and 'b' are what make the van der Waals equation better than the ideal gas equation for real gases: 'a' fixes the wrong assumption that molecules never attract each other, and 'b' fixes the wrong assumption that molecules are point particles with zero volume.")],
  },
];

const questions = raw.map((item) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: item.n,
  questionText: item.q,
  answer: item.a,
  ...(item.steps ? { steps: item.steps } : {}),
  ...(item.exp ? { explanation: item.exp } : {}),
}));

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 5][0]'
);
if (!doc) { console.error("Document not found"); process.exit(1); }
console.log(`Found document: ${doc._id}`);

await client.patch(doc._id).set({ questions }).commit();
console.log(`Replaced ${questions.length} questions with LaTeX-formatted content.`);
