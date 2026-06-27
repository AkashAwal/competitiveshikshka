import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

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
function step(title, ...lines) { return { _type: "step", _key: randomUUID(), stepTitle: title, content: blocks(...lines) }; }

const enrichments = {
  "1": {
    steps: [
      step("Write down the formula", "Identify each element and its subscript: H2O has 2 H and 1 O; CO2 has 1 C and 2 O; CH4 has 1 C and 4 H."),
      step("Look up atomic masses", "H = 1.008 u, O = 16.00 u, C = 12.01 u"),
      step("Multiply atoms × atomic mass for each element", "H2O: 2(1.008) + 16.00 = 18.016 u\nCO2: 12.01 + 2(16.00) = 44.01 u\nCH4: 12.01 + 4(1.008) = 16.042 u"),
    ],
    explanation: "Molecular mass is just the sum of all atomic masses in one molecule. Think of it like weighing each atom on a scale and adding them up. The subscript tells you how many of each atom you have.",
  },
  "2": {
    steps: [
      step("Find the molar mass of Na2SO4", "Na: 2 × 23 = 46\nS: 1 × 32 = 32\nO: 4 × 16 = 64\nTotal = 142 g/mol"),
      step("Apply the mass percent formula", "Mass % = (mass of element / molar mass of compound) × 100"),
      step("Calculate for each element", "Na: (46/142) × 100 = 32.38%\nS: (32/142) × 100 = 22.57%\nO: (64/142) × 100 = 45.05%"),
      step("Verify: all percentages must add to 100%", "32.38 + 22.57 + 45.05 = 100.00% ✓"),
    ],
    explanation: "Mass percent tells you how much of each element is present in 100 g of the compound. It's based on 1 mole because molar mass gives us a fixed reference mass. The trick is to always verify your answers sum to 100%.",
  },
  "3": {
    steps: [
      step("Assume 100 g of the compound", "Fe = 69.9 g, O = 30.1 g"),
      step("Convert mass to moles", "Moles of Fe = 69.9 / 56 = 1.248\nMoles of O = 30.1 / 16 = 1.881"),
      step("Find the simplest whole number ratio", "Divide both by the smaller: 1.248/1.248 = 1, 1.881/1.248 = 1.507 ≈ 1.5\nMultiply by 2: Fe = 2, O = 3"),
      step("Write the empirical formula", "Fe2O3"),
    ],
    explanation: "The 100 g assumption is a shortcut — it turns percentages directly into grams. Dividing by molar mass gives moles, and dividing by the smallest mole value gives the atom ratio. If the ratio isn't a whole number, multiply until it is.",
  },
  "4": {
    steps: [
      step("Write the balanced equation", "C + O2 → CO2 (1 mol C reacts with 1 mol O2)"),
      step("Case (i): 1 mol C in excess air", "Plenty of O2, so C is fully used. 1 mol C → 1 mol CO2 = 44 g"),
      step("Case (ii): 1 mol C + 16 g O2", "16 g O2 = 16/32 = 0.5 mol O2. Only 0.5 mol C can react. O2 is the limiting reagent. 0.5 mol CO2 = 22 g"),
      step("Case (iii): 2 mol C + 16 g O2", "Still only 0.5 mol O2 available. O2 is limiting. 0.5 mol CO2 = 22 g. 1.5 mol C remains unused."),
    ],
    explanation: "The key concept here is limiting reagent — the reactant that runs out first. In cases (ii) and (iii), O2 runs out before all the carbon can burn. Always find the moles of both reactants and compare them to the stoichiometric ratio before calculating the product.",
  },
  "5": {
    steps: [
      step("Identify what's given", "Volume = 500 mL = 0.5 L, Molarity = 0.375 M, Molar mass = 82.0245 g/mol"),
      step("Find moles needed", "Moles = Molarity × Volume = 0.375 × 0.5 = 0.1875 mol"),
      step("Convert moles to mass", "Mass = moles × molar mass = 0.1875 × 82.0245 = 15.38 g"),
    ],
    explanation: "Molarity (M) means moles per litre. So to find moles in any volume, multiply M × V(in litres). Then mass = moles × molar mass. This is one of the most used calculations in chemistry — remember M × V = moles.",
  },
  "6": {
    steps: [
      step("Find mass of HNO3 in 1 L solution", "Mass of 1 L solution = 1000 mL × 1.41 g/mL = 1410 g\nMass of HNO3 = 69% of 1410 = 972.9 g"),
      step("Find moles of HNO3", "Molar mass of HNO3 = 1 + 14 + 48 = 63 g/mol\nMoles = 972.9 / 63 = 15.44 mol"),
      step("Calculate molarity", "Molarity = moles / volume(L) = 15.44 / 1 = 15.44 M"),
    ],
    explanation: "Density converts volume to mass, and mass percent tells you how much of that mass is the solute. The key insight: take exactly 1 L of solution, find what mass of solute is in it, convert to moles, and that's your molarity.",
  },
  "7": {
    steps: [
      step("Find molar mass of CuSO4", "Cu: 63.5, S: 32, O: 4×16 = 64\nTotal = 159.5 g/mol"),
      step("Find moles of CuSO4 in 100 g", "Moles = 100 / 159.5 = 0.627 mol"),
      step("Find mass of Cu", "1 mol CuSO4 contains 1 mol Cu\nMass of Cu = 0.627 × 63.5 = 39.8 g"),
    ],
    explanation: "In any ionic compound, each formula unit contains a fixed number of each ion. Since there's one Cu per CuSO4, moles of Cu = moles of CuSO4. Then multiply by atomic mass to get mass.",
  },
  "8": {
    steps: [
      step("Find the empirical formula (same as Q3)", "Fe = 69.9%, O = 30.1% → ratio is 2:3 → Empirical formula: Fe2O3"),
      step("Calculate empirical formula mass", "2(56) + 3(16) = 112 + 48 = 160 g/mol"),
      step("Find n = molar mass / empirical mass", "n = 159.8 / 160 ≈ 1"),
      step("Write molecular formula", "Molecular formula = n × empirical formula = 1 × Fe2O3 = Fe2O3"),
    ],
    explanation: "Empirical formula gives the simplest ratio of atoms. Molecular formula is a whole-number multiple of it. To find which multiple, divide the given molar mass by the empirical formula mass. Here n = 1, so both formulas are the same.",
  },
  "9": {
    steps: [
      step("Note isotope data", "Cl-35: mass = 34.9689 u, abundance = 75.77%\nCl-37: mass = 36.9659 u, abundance = 24.23%"),
      step("Convert percentages to decimals", "75.77% = 0.7577, 24.23% = 0.2423"),
      step("Apply weighted average formula", "Avg mass = (0.7577 × 34.9689) + (0.2423 × 36.9659)"),
      step("Calculate", "= 26.496 + 8.957 = 35.45 u"),
    ],
    explanation: "Elements exist as isotopes — same element, different masses. The atomic mass on the periodic table is the weighted average based on how common each isotope is in nature. More abundant isotopes pull the average closer to their mass.",
  },
  "10": {
    steps: [
      step("Recall the formula of ethane", "C2H6 — 2 carbon atoms and 6 hydrogen atoms per molecule"),
      step("(i) Moles of carbon atoms", "3 mol C2H6 × 2 C per molecule = 6 mol C"),
      step("(ii) Moles of hydrogen atoms", "3 mol C2H6 × 6 H per molecule = 18 mol H"),
      step("(iii) Number of molecules", "3 mol × 6.022 × 10²³ = 1.807 × 10²⁴ molecules"),
    ],
    explanation: "Avogadro's number (6.022 × 10²³) is the bridge between moles and actual particles. The subscripts in a formula directly tell you the ratio — if you have 3 mol of C2H6, you simply multiply each subscript by 3 to get moles of each atom.",
  },
  "11": {
    steps: [
      step("Find molar mass of C12H22O11 (sucrose)", "C: 12×12 = 144, H: 22×1 = 22, O: 11×16 = 176\nTotal = 342 g/mol"),
      step("Find moles of sugar", "Moles = 20 g / 342 g/mol = 0.0585 mol"),
      step("Calculate molarity", "Molarity = 0.0585 mol / 2 L = 0.0293 M"),
    ],
    explanation: "Molarity = moles of solute / volume of solution in litres. Always convert mL to L first, and always use the volume of the final solution — not the volume of solvent added.",
  },
  "12": {
    steps: [
      step("Find moles of methanol needed", "Moles = Molarity × Volume = 0.25 M × 2.5 L = 0.625 mol"),
      step("Convert moles to mass", "Molar mass of CH3OH = 12 + 4 + 16 = 32 g/mol\nMass = 0.625 × 32 = 20 g"),
      step("Convert mass to volume using density", "Volume = mass / density = 20 g / 793 g/L = 0.02523 L = 25.23 mL"),
    ],
    explanation: "Density is the link between mass and volume for liquids. Since methanol is a liquid, you measure it by volume not by weighing. The calculation goes: target molarity → moles needed → mass needed → volume to measure out.",
  },
  "13": {
    steps: [
      step("Understand the given value", "Mass of air per cm² of Earth's surface = 1034 g/cm²"),
      step("Convert to SI units", "1034 g/cm² = 1034 × 10⁻³ kg / (10⁻⁴ m²) = 10340 kg/m²"),
      step("Calculate pressure (P = mass × g / area, but mass/area is given)", "P = 10340 kg/m² × 9.8 m/s² = 101332 Pa ≈ 1.013 × 10⁵ Pa"),
    ],
    explanation: "Pressure is force per area, and force = mass × g. When mass per unit area is given directly, you just multiply by g. 1 atm ≈ 101325 Pa — this answer confirms that atmospheric pressure is about 1 atm.",
  },
  "14": {
    steps: [
      step("State the SI unit", "The SI unit of mass is the kilogram (kg)"),
      step("Definition", "It is defined as the mass equal to the international prototype of the kilogram — a platinum-iridium cylinder kept at the International Bureau of Weights and Measures in Sèvres, France."),
    ],
    explanation: "The kilogram is the only SI base unit still defined by a physical object (though since 2019 it's redefined using Planck's constant). For exams, the key facts are: unit = kg, it's a base unit, and 1 kg = 1000 g.",
  },
  "15": {
    steps: [
      step("Learn the prefix-power pairs", "micro (µ) = 10⁻⁶\ndeca (da) = 10¹\nmega (M) = 10⁶\ngiga (G) = 10⁹\nfemto (f) = 10⁻¹⁵"),
      step("Match each prefix", "(i) micro → 10⁻⁶\n(ii) deca → 10\n(iii) mega → 10⁶\n(iv) giga → 10⁹\n(v) femto → 10⁻¹⁵"),
    ],
    explanation: "SI prefixes are a standardised way to express very large or very small numbers. Memorise the key ones: femto < pico < nano < micro < milli < (base) < kilo < mega < giga < tera. Each step is 10³ apart in the commonly used ones.",
  },
  "16": {
    steps: [
      step("Define significant figures", "Significant figures (sig figs) are all the meaningful digits in a measurement — every digit that is known with certainty, plus one estimated digit."),
      step("Rules for counting sig figs", "1. All non-zero digits are significant\n2. Zeros between non-zero digits are significant\n3. Leading zeros are NOT significant\n4. Trailing zeros after a decimal ARE significant"),
      step("Examples", "0.0025 → 2 sig figs (leading zeros don't count)\n208 → 3 sig figs\n500.0 → 4 sig figs (trailing zeros after decimal count)"),
    ],
    explanation: "Sig figs communicate the precision of a measurement. If you write 5 g, it means you know it's between 4.5 and 5.5 g. If you write 5.00 g, you're claiming precision to the nearest 0.01 g. The number of sig figs reflects your instrument's precision.",
  },
  "17": {
    steps: [
      step("Understand ppm", "15 ppm (by mass) = 15 g of CHCl3 per 10⁶ g of solution = 15 mg/kg"),
      step("(i) Convert to percent by mass", "% = (15 / 10⁶) × 100 = 1.5 × 10⁻³ %"),
      step("(ii) Find molality — assume 1 kg of solution ≈ 1 kg water", "Mass of CHCl3 in 1 kg water = 15 × 10⁻³ g\nMolar mass of CHCl3 = 12 + 1 + 3(35.5) = 119.5 g/mol\nMoles of CHCl3 = 0.015 / 119.5 = 1.255 × 10⁻⁴ mol"),
      step("Calculate molality", "m = moles of solute / kg of solvent = 1.255 × 10⁻⁴ / 1 = 1.255 × 10⁻⁴ mol/kg"),
    ],
    explanation: "ppm (parts per million) is used for very dilute solutions. 15 ppm means 15 g in 1,000,000 g of solution — incredibly small. For dilute aqueous solutions, mass of solution ≈ mass of water, which simplifies the molality calculation.",
  },
  "18": {
    steps: [
      step("Rule for scientific notation", "Write as A × 10ⁿ where 1 ≤ A < 10. Count how many places you move the decimal: right = negative n, left = positive n."),
      step("Convert each number", "(i) 0.0048 → move decimal 3 right → 4.8 × 10⁻³\n(ii) 234000 → move decimal 5 left → 2.34 × 10⁵\n(iii) 8008 → move decimal 3 left → 8.008 × 10³\n(iv) 500.0 → move decimal 2 left → 5.000 × 10²\n(v) 6.0012 → already in form → 6.0012 × 10⁰"),
    ],
    explanation: "Scientific notation prevents errors with very large or very small numbers and makes sig figs explicit. Moving the decimal to the right means the number got smaller, so the exponent is negative. Moving left means it got bigger, so the exponent is positive.",
  },
  "19": {
    steps: [
      step("Apply sig fig rules to each", "(i) 0.0025 — leading zeros not significant → 2 sig figs\n(ii) 208 — zero between non-zeros IS significant → 3 sig figs\n(iii) 5005 — both zeros between non-zeros are significant → 4 sig figs\n(iv) 126000 — trailing zeros without decimal are ambiguous → 3 sig figs\n(v) 500.0 — trailing zeros after decimal are significant → 4 sig figs\n(vi) 2.0034 — zero between non-zeros counts → 5 sig figs"),
    ],
    explanation: "The trickiest cases are zeros. Remember: zeros are significant when they're between two non-zero digits, or when they come after a decimal point. Zeros at the start (like 0.002) are just placeholders and don't count.",
  },
  "20": {
    steps: [
      step("Rounding rule", "Look at the digit after the 3rd significant figure. If it's ≥ 5, round up. If it's < 5, round down."),
      step("Round each number", "(i) 34.216 → 3rd sig fig is 2, next digit is 1 → 34.2\n(ii) 10.4107 → 3rd sig fig is 4, next digit is 1 → 10.4\n(iii) 0.04597 → 3rd sig fig is 9, next digit is 7 → 0.0460\n(iv) 2808 → 3rd sig fig is 0, next digit is 8 → 2810"),
    ],
    explanation: "When rounding 0.04597 to 3 sig figs: the leading zeros don't count, so sig figs start at 4 (4, 5, 9). The digit after 9 is 7 ≥ 5, so 9 rounds up to 10, which carries over: 0.0460. The trailing zero must be written to show it's significant.",
  },
  "21": {
    steps: [
      step("Fix the mass of nitrogen at 28 g in each compound", "For the law of multiple proportions, keep one element constant and compare the other."),
      step("Find mass of oxygen corresponding to 28 g N in each compound", "Compound 1: O = 16 g\nCompound 2: O = 32 g\nCompound 3: O = 48 g"),
      step("Find the ratio of oxygen masses", "16 : 32 : 48 = 1 : 2 : 3"),
      step("Check if ratio is simple whole numbers", "1:2:3 are simple whole numbers ✓ — Law of Multiple Proportions is verified"),
    ],
    explanation: "The Law of Multiple Proportions states that when two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a simple whole-number ratio. Here NO, NO2, and N2O3 are the compounds, and the oxygen ratio is perfectly 1:2:3.",
  },
  "23": {
    steps: [
      step("Write the reaction ratio", "A + B2 → AB2 means 1 atom A reacts with 1 molecule B2"),
      step("Compare available amounts to the 1:1 ratio", "(i) 300 A : 200 B2 → need equal amounts, B2 is less → B2 is limiting\n(ii) 2 mol A : 3 mol B2 → A is less → A is limiting\n(iii) 100 A : 100 B2 → equal amounts → neither is limiting\n(iv) 5 mol A : 2.5 mol B2 → B2 is less → B2 is limiting\n(v) 2.5 mol A : 5 mol B2 → A is less → A is limiting"),
    ],
    explanation: "Limiting reagent is the one that gets used up first and stops the reaction. Since the ratio here is 1:1, whichever reactant has fewer moles (or atoms) is limiting. Always compare using the mole ratio from the balanced equation, not just raw numbers.",
  },
  "24": {
    steps: [
      step("Write balanced equation and given data", "N2 + 3H2 → 2NH3\n2000 g N2 = 2000/28 = 71.43 mol\n1000 g H2 = 1000/2 = 500 mol"),
      step("Find limiting reagent", "71.43 mol N2 needs 71.43 × 3 = 214.3 mol H2\nAvailable H2 = 500 mol > 214.3 mol → N2 is limiting"),
      step("Calculate NH3 produced", "71.43 mol N2 → 2 × 71.43 = 142.86 mol NH3\nMass = 142.86 × 17 = 2428.6 g"),
      step("Find excess H2", "H2 used = 214.3 mol\nExcess H2 = 500 - 214.3 = 285.7 mol = 285.7 × 2 = 571.4 g"),
    ],
    explanation: "Always find moles first, then use stoichiometry. The limiting reagent determines how much product forms — never the excess reagent. Here N2 runs out first even though you have less H2 by mass, because N2 has a much higher molar mass.",
  },
  "25": {
    steps: [
      step("0.50 mol Na2CO3", "This is a fixed amount of substance.\nMass = 0.50 × 106 = 53 g of solid Na2CO3"),
      step("0.50 M Na2CO3", "This is a concentration — 0.50 mol dissolved in exactly 1 L of solution.\nSame 53 g, but dissolved in water to make 1 L"),
      step("Key difference", "Mol = amount of substance (independent of volume)\nM (molarity) = amount per unit volume (depends on how much solution you make)"),
    ],
    explanation: "This question tests a common confusion. 0.50 mol is like saying '53 grams' — it's a fixed amount. 0.50 M is a concentration — you could make 500 mL of it (using 26.5 g) or 2 L of it (using 106 g). The concentration stays the same, but the total amount changes with volume.",
  },
  "26": {
    steps: [
      step("Write the balanced equation", "2H2(g) + O2(g) → 2H2O(g)"),
      step("Note the volume ratio from Gay-Lussac's Law", "Volumes of gases react in the same ratio as their mole coefficients: 2:1:2"),
      step("Apply to given volumes", "10 vol H2 : 5 vol O2 → ratio is 10:5 = 2:1 ✓ (stoichiometric, no excess)\n10 vol H2 produces 10 vol H2O"),
    ],
    explanation: "Gay-Lussac's Law of Gaseous Volumes: gases react and are produced in simple whole-number volume ratios at constant T and P. This is because equal volumes of gases at same T and P contain equal moles (Avogadro's Law). No need to convert to moles — the volume ratio IS the mole ratio.",
  },
  "27": {
    steps: [
      step("Identify the prefix and its power of 10", "pm (picometer) = 10⁻¹²\nµs (microsecond) = 10⁻⁶\nmg (milligram) = 10⁻³"),
      step("Convert to SI base units", "(i) 28.7 pm = 28.7 × 10⁻¹² m = 2.87 × 10⁻¹¹ m\n(ii) 15.15 µs = 15.15 × 10⁻⁶ s = 1.515 × 10⁻⁵ s\n(iii) 25365 mg = 25365 × 10⁻³ g = 25.365 g = 0.025365 kg"),
    ],
    explanation: "SI base units are m, s, kg, A, K, mol, cd. To convert, replace the prefix with its power of 10 and simplify. Note that kg is the SI base unit for mass (not g), so milligrams need two conversions: mg → g → kg.",
  },
  "28": {
    steps: [
      step("Formula: number of atoms = (mass / molar mass) × 6.022×10²³", "More atoms = smaller molar mass for same 1 g"),
      step("Calculate for each", "(i) Au: 1/197 × 6.022×10²³ = 3.06×10²¹\n(ii) Na: 1/23 × 6.022×10²³ = 2.62×10²²\n(iii) Li: 1/7 × 6.022×10²³ = 8.60×10²²\n(iv) Cl2: (1/71 × 6.022×10²³) × 2 = 1.70×10²² atoms"),
      step("Compare and identify the largest", "Li has the highest count: 8.60×10²² atoms"),
    ],
    explanation: "For the same mass, lighter atoms give more atoms. Li has the smallest molar mass among the options, so 1 g of Li contains the most atoms. For Cl2, remember it's a diatomic molecule — each molecule has 2 atoms, so multiply moles of molecules by 2.",
  },
  "29": {
    steps: [
      step("Set up the mole fraction equation", "Mole fraction of ethanol = moles of ethanol / total moles = 0.040"),
      step("Choose a basis of 1 mole of solution", "Moles of ethanol = 0.040, moles of water = 0.960"),
      step("Find volume of water in this basis", "Mass of water = 0.960 × 18 = 17.28 g = 17.28 mL ≈ 0.01728 L"),
      step("Calculate molarity", "Molarity = moles of ethanol / volume of solution in L = 0.040 / 0.01728 = 2.31 M"),
    ],
    explanation: "The 1 mole of solution basis is a common trick — it makes mole fraction directly equal to moles. Since the solution is dilute (water is the solvent), volume of solution ≈ volume of water. This converts mole fraction to molarity without complex algebra.",
  },
  "31": {
    steps: [
      step("Rule for multiplication/division", "Answer has same sig figs as the number with fewest sig figs"),
      step("Rule for addition/subtraction", "Answer has same decimal places as the number with fewest decimal places"),
      step("Apply to each", "(i) 0.02856 × 298.15 × 0.112 / 0.5785 → 0.112 has 3 sig figs → answer: 3 sig figs\n(ii) 5 × 5.364 → 5 is exact (infinite sig figs), 5.364 has 4 → answer: 4 sig figs\n(iii) 0.0125 + 0.7864 + 0.0215 → all have 4 decimal places → answer: 4 decimal places"),
    ],
    explanation: "The sig fig rules for different operations are different. Multiplication/division: count sig figs. Addition/subtraction: count decimal places. The result can never be more precise than your least precise measurement.",
  },
  "32": {
    steps: [
      step("Note the isotope data", "Ar-36: 35.9675 u, 0.337%\nAr-38: 37.9627 u, 0.063%\nAr-40: 39.9624 u, 99.600%"),
      step("Convert percentages to fractions", "0.00337, 0.00063, 0.99600"),
      step("Calculate weighted average", "(0.00337 × 35.9675) + (0.00063 × 37.9627) + (0.99600 × 39.9624)"),
      step("Add up", "= 0.1212 + 0.0239 + 39.8425 = 39.9876 ≈ 39.95 g/mol"),
    ],
    explanation: "Since Ar-40 has 99.6% abundance, it dominates the average. The final answer is very close to 39.96 u — almost entirely determined by Ar-40. This is why the periodic table shows Ar's atomic mass as ~39.95.",
  },
  "33": {
    steps: [
      step("(i) 52 moles of He", "Number of atoms = 52 × 6.022×10²³ = 3.131×10²⁵ atoms"),
      step("(ii) 52 u of He", "Atomic mass of He = 4 u. One He atom has mass 4 u.\n52 u / 4 u per atom = 13 atoms"),
      step("(iii) 52 g of He", "Moles = 52 g / 4 g/mol = 13 mol\nAtoms = 13 × 6.022×10²³ = 7.83×10²⁴ atoms"),
    ],
    explanation: "Three different units, three different approaches. Moles → multiply by Avogadro's. Atomic mass units (u) → divide by mass per atom (same as atomic mass in u). Grams → convert to moles first, then to atoms. Never mix up u and g/mol — they're numerically equal but used differently.",
  },
  "34": {
    steps: [
      step("Find mass of C and H from combustion products", "3.38 g CO2 → C = 3.38 × (12/44) = 0.9218 g\n0.690 g H2O → H = 0.690 × (2/18) = 0.0767 g"),
      step("Convert to moles and find ratio", "Moles C = 0.9218/12 = 0.0768\nMoles H = 0.0767/1 = 0.0767\nRatio C:H = 1:1 → Empirical formula = CH"),
      step("Find molar mass from STP data", "10 L at STP = 10/22.4 = 0.4464 mol\nMolar mass = 11.6 g / 0.4464 mol = 25.99 ≈ 26 g/mol"),
      step("Find molecular formula", "Empirical mass of CH = 13 g/mol\nn = 26/13 = 2\nMolecular formula = C2H2 (acetylene)"),
    ],
    explanation: "This is a classic compound identification problem. Combustion analysis tells you the C:H ratio. The STP density gives molar mass. Together they uniquely identify the compound — acetylene (C2H2), the gas used in welding torches.",
  },
  "35": {
    steps: [
      step("Write the balanced equation", "CaCO3 + 2HCl → CaCl2 + CO2 + H2O"),
      step("Find moles of HCl", "Moles of HCl = 0.025 L × 0.75 mol/L = 0.01875 mol"),
      step("Use stoichiometry to find moles of CaCO3", "2 mol HCl reacts with 1 mol CaCO3\nMoles CaCO3 = 0.01875 / 2 = 0.009375 mol"),
      step("Convert to mass", "Mass = 0.009375 × 100 = 0.9375 g"),
    ],
    explanation: "Stoichiometry always goes: moles of known → moles of unknown (using the equation ratio) → mass of unknown. The mole ratio here is 1:2 (CaCO3:HCl), so divide HCl moles by 2 to get CaCO3 moles.",
  },
  "36": {
    steps: [
      step("Write the balanced equation", "4HCl + MnO2 → 2H2O + MnCl2 + Cl2"),
      step("Find moles of MnO2", "Molar mass of MnO2 = 55 + 32 = 87 g/mol\nMoles = 5.0 / 87 = 0.0575 mol"),
      step("Use stoichiometry to find moles of HCl", "4 mol HCl per 1 mol MnO2\nMoles HCl = 4 × 0.0575 = 0.2299 mol"),
      step("Convert to mass", "Molar mass of HCl = 36.5 g/mol\nMass = 0.2299 × 36.5 = 8.39 g ≈ 8.4 g"),
    ],
    explanation: "The 4:1 ratio between HCl and MnO2 is key — you need 4 moles of HCl for every mole of MnO2. This is why MnO2 is used in labs to make Cl2: it's a solid that's easy to handle, and it reacts with readily available HCl.",
  },
};

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 1][0]'
);

let patch = client.patch(doc._id);
const setPatch = {};

for (const [qNum, data] of Object.entries(enrichments)) {
  const idx = doc.questions.findIndex((q) => q.questionNumber === qNum);
  if (idx === -1) { console.log(`Q${qNum} not found, skipping`); continue; }

  if (data.steps) {
    setPatch[`questions[${idx}].steps`] = data.steps.map((s) => ({
      ...s,
      content: s.content,
    }));
  }
  if (data.explanation) {
    setPatch[`questions[${idx}].explanation`] = blocks(data.explanation);
  }
}

await patch.set(setPatch).commit();
console.log(`Patched ${Object.keys(enrichments).length} questions with steps and explanations.`);
