import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "cekjuoyu", dataset: "production",
  apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN, useCdn: false,
});

function block(text) {
  return { _type: "block", _key: randomUUID(), style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }], markDefs: [] };
}
function blocks(text) { return text.split("\n").filter(Boolean).map(block); }
function step(title, content) { return { _type: "step", _key: randomUUID(), stepTitle: title, content: blocks(content) }; }

const enrichments = {
  "2.1": {
    steps: [
      step("Part (i): Number of electrons in 1 g", "Mass of 1 electron = 9.10939 × 10⁻²⁸ g\nNumber = 1 g ÷ 9.10939 × 10⁻²⁸ g = 1.098 × 10²⁷"),
      step("Part (ii): Mass and charge of 1 mole of electrons", "Mass = 6.022 × 10²³ × 9.10939 × 10⁻³¹ kg = 5.485 × 10⁻⁴ g\nCharge = 6.022 × 10²³ × 1.6022 × 10⁻¹⁹ C = 9.65 × 10⁴ C ≈ 1 Faraday"),
    ],
    explanation: "The mass of one mole of electrons (5.485 × 10⁻⁴ g) is negligible compared to atomic masses. The charge of one mole of electrons (96500 C) is called one Faraday, the unit used in electrochemistry.",
  },
  "2.2": {
    steps: [
      step("Part (i): Electrons in 1 mole of CH₄", "CH₄: 6 electrons (C) + 4 electrons (H) = 10 electrons per molecule\n1 mol CH₄ = 10 × 6.022 × 10²³ = 6.022 × 10²⁴ electrons"),
      step("Part (ii): Neutrons in 7 mg of ¹⁴C", "Moles ¹⁴C = 7×10⁻³ g ÷ 14 g/mol = 5×10⁻⁴ mol → 3.011×10²⁰ atoms\nNeutrons per atom = 14−6 = 8 → Total = 2.409×10²¹\nMass = 2.409×10²¹ × 1.675×10⁻²⁷ kg = 4.035×10⁻⁶ kg"),
      step("Part (iii): Protons in 34 mg of NH₃", "Moles NH₃ = 34×10⁻³÷17 = 2×10⁻³ mol → 1.2044×10²¹ molecules\nProtons per NH₃ = N(7)+H(1×3) = 10 → Total = 1.2044×10²²\nMass = 1.2044×10²² × 1.6726×10⁻²⁷ kg = 2.015×10⁻⁵ kg\nAnswer does NOT change with T or P — proton count depends only on mass."),
    ],
    explanation: "The number of subatomic particles depends only on mass (and composition), not on temperature or pressure. T and P affect volume and state, not the amount of substance.",
  },
  "2.3": {
    steps: [
      step("Apply the rule: protons = Z (atomic number), neutrons = A − Z", "For any nucleus: Z = protons (bottom number), A = mass number (top)\nNeutrons = A − Z"),
      step("Calculate for each nucleus", "¹³C: Z=6 protons, 13−6=7 neutrons\n¹⁶O: Z=8 protons, 16−8=8 neutrons\n²⁴Mg: Z=12 protons, 24−12=12 neutrons\n⁵⁶Fe: Z=26 protons, 56−26=30 neutrons\n⁸⁸Sr: Z=38 protons, 88−38=50 neutrons"),
    ],
    explanation: "The atomic number Z always equals the number of protons (and electrons in a neutral atom). Neutrons = A − Z. This is the fundamental relationship between the nuclear notation and subatomic composition.",
  },
  "2.4": {
    steps: [
      step("Identify element from atomic number Z", "(i) Z=17 → Chlorine (Cl)\n(ii) Z=92 → Uranium (U)\n(iii) Z=4 → Beryllium (Be)"),
      step("Write symbol as ᴬ_Z(Symbol)", "(i) ³⁵₁₇Cl\n(ii) ²³³₉₂U\n(iii) ⁹₄Be"),
    ],
    explanation: "The complete nuclear symbol format is: mass number (A) as superscript on left, atomic number (Z) as subscript on left, element symbol in centre. The symbol alone implies Z, so Z is sometimes omitted, but the full symbol always shows both A and Z.",
  },
  "2.5": {
    steps: [
      step("Identify isotopes (same Z, different A) and isobars (same A, different Z)", "From the list of atoms, isotopes have the same element symbol (same Z)\nIsobars have the same mass number A but different elements"),
      step("Find isotopes", "Examples: ⁶C and ¹⁴C are both carbon (Z=6) but different A → isotopes\n³⁵Cl and ³⁷Cl are both Cl (Z=17) → isotopes"),
      step("Find isobars", "Example: ⁴⁰Ca (Z=20) and ⁴⁰Ar (Z=18) have same A=40 but different Z → isobars"),
    ],
    explanation: "Isotopes have the same chemical properties because they have the same electron configuration (same Z). Isobars have different chemical properties despite having the same mass number, because they have different numbers of protons and electrons.",
  },
  "2.6": {
    steps: [
      step("Recall hydrogen spectral series limits", "Lyman: n₁=1 (UV)\nBalmer: n₁=2 (visible)\nPaschen: n₁=3 (near-IR)\nBrackett: n₁=4 (IR)\nPfund: n₁=5 (far-IR)"),
      step("Apply Rydberg formula: 1/λ = R_H(1/n₁² − 1/n₂²)", "For Lyman series (UV): n₁=1, n₂=2,3,4...\nFor Balmer series (visible): n₁=2, n₂=3,4,5..."),
    ],
    explanation: "The hydrogen spectrum arises from electron transitions between energy levels. Each series corresponds to transitions ending (or beginning) at a specific orbit. The Balmer series (visible light) was historically identified first, in 1885.",
  },
  "2.7": {
    steps: [
      step("Use λ = c/ν to find wavelength", "ν = 3.0 × 10⁸ Hz (given)\nc = 3 × 10⁸ m/s\nλ = c/ν = (3 × 10⁸)/(3 × 10⁸) = 1 m"),
      step("Calculate wavenumber", "ν̄ = 1/λ = 1/1 m = 1 m⁻¹"),
    ],
    explanation: "The relationship λν = c is fundamental for all electromagnetic radiation. When frequency equals 3×10⁸ Hz, the wavelength is exactly 1 m — this is in the microwave/UHF range.",
  },
  "2.8": {
    steps: [
      step("Identify the given quantities and apply λ = c/ν", "λ = 589 nm = 589 × 10⁻⁹ m (sodium yellow D-line)\nc = 3 × 10⁸ m/s"),
      step("Calculate frequency", "ν = c/λ = (3 × 10⁸)/(589 × 10⁻⁹) = 5.09 × 10¹⁴ Hz"),
      step("Calculate wavenumber", "ν̄ = 1/λ = 1/(589 × 10⁻⁹ m) = 1.698 × 10⁶ m⁻¹ = 1.698 × 10⁴ cm⁻¹"),
    ],
    explanation: "The sodium yellow D-lines (589 nm and 589.6 nm) are among the most recognisable spectral lines in chemistry. They're used to calibrate spectrometers and appear in flame tests for sodium.",
  },
  "2.9": {
    steps: [
      step("Recall: 1 Å = 10⁻¹⁰ m", "λ = 7 Å = 7 × 10⁻¹⁰ m"),
      step("Calculate frequency and wavenumber", "ν = c/λ = (3 × 10⁸)/(7 × 10⁻¹⁰) = 4.286 × 10¹⁷ Hz\nν̄ = 1/λ = 1/(7 × 10⁻¹⁰) = 1.43 × 10⁹ m⁻¹"),
      step("Identify the region", "λ = 7 Å = 0.7 nm → X-ray region (0.01 to 10 nm)"),
    ],
    explanation: "X-rays have wavelengths in the Ångström range — comparable to atomic bond lengths (~1–2 Å). This is why X-ray crystallography can determine crystal structures: the wavelength matches the spacing between atoms.",
  },
  "2.10": {
    steps: [
      step("Calculate energy of one photon: E = hν = hc/λ", "λ = 400 nm = 4 × 10⁻⁷ m\nE = (6.626 × 10⁻³⁴ × 3 × 10⁸)/(4 × 10⁻⁷) = 4.97 × 10⁻¹⁹ J"),
      step("Check if E > work function (W₀)", "Convert W₀ = 3.2 eV to joules: 3.2 × 1.6022 × 10⁻¹⁹ = 5.127 × 10⁻¹⁹ J\nE(photon) = 4.97 × 10⁻¹⁹ J < W₀ = 5.127 × 10⁻¹⁹ J"),
      step("Conclusion", "Since photon energy < work function, NO photoelectric effect occurs.\n400 nm light cannot eject electrons from this metal."),
    ],
    explanation: "The photoelectric effect has a threshold: if photon energy < work function, no emission occurs regardless of light intensity. Only if E_photon > W₀ can electrons be ejected, with KE = E_photon − W₀.",
  },
  "2.11": {
    steps: [
      step("Calculate energy at n=5 using Bohr formula", "E_n = −2.18 × 10⁻¹⁸/n² J\nE₅ = −2.18 × 10⁻¹⁸/25 = −8.72 × 10⁻²⁰ J"),
      step("Calculate energy at n=3", "E₃ = −2.18 × 10⁻¹⁸/9 = −2.422 × 10⁻¹⁹ J"),
      step("Find ΔE and wavelength", "ΔE = E₅ − E₃ = −8.72×10⁻²⁰ − (−2.422×10⁻¹⁹) = 1.55×10⁻¹⁹ J\nλ = hc/ΔE = (6.626×10⁻³⁴ × 3×10⁸)/1.55×10⁻¹⁹ = 1.283×10⁻⁶ m = 1283 nm (infrared)"),
    ],
    explanation: "The Paschen series (transitions ending at n=3) falls in the near-infrared. This n=5 to n=3 transition (Paschen β) at 1283 nm is invisible to the human eye but detectable with infrared sensors.",
  },
  "2.12": {
    steps: [
      step("Calculate energy using Rydberg formula", "1/λ = R_H(1/n₁² − 1/n₂²)\nFor n₁=1 (Lyman), n₂=2: 1/λ = 1.097×10⁷ × (1 − 1/4) = 8.228×10⁶ m⁻¹\nλ = 121.6 nm"),
      step("Calculate frequency", "ν = c/λ = 3×10⁸/121.6×10⁻⁹ = 2.467×10¹⁵ Hz"),
      step("Calculate energy", "E = hν = 6.626×10⁻³⁴ × 2.467×10¹⁵ = 1.635×10⁻¹⁸ J = 10.2 eV"),
    ],
    explanation: "The Lyman alpha line (121.6 nm, UV) is the strongest line in the hydrogen spectrum and requires 10.2 eV of energy. It corresponds to the n=2 to n=1 transition — the smallest possible gap in the Lyman series.",
  },
  "2.13": {
    steps: [
      step("Understand that visible Balmer lines have n₁=2", "Balmer series: transitions from n=3,4,5,6 down to n=2\nVisible range: ~400−700 nm"),
      step("Calculate wavelengths of visible Balmer lines", "n=3→2: 1/λ = 1.097×10⁷(1/4−1/9) = 656 nm (red, Hα)\nn=4→2: 486 nm (blue-green, Hβ)\nn=5→2: 434 nm (violet, Hγ)\nn=6→2: 410 nm (violet, Hδ)"),
    ],
    explanation: "The four visible Balmer lines were historically the first hydrogen spectral lines discovered (by Balmer in 1885). They appear as bright coloured lines against a dark background in emission, or dark lines against a bright background in absorption (Fraunhofer lines in the solar spectrum).",
  },
  "2.14": {
    steps: [
      step("Calculate energy at n=1 (ground state)", "E₁ = −2.18 × 10⁻¹⁸ J = −13.6 eV"),
      step("Calculate energies at n=2, 3, 4", "E₂ = E₁/4 = −3.4 eV\nE₃ = E₁/9 = −1.51 eV\nE₄ = E₁/16 = −0.85 eV"),
      step("Calculate differences for photon energies", "n=2→1: ΔE = 13.6−3.4 = 10.2 eV\nn=3→2: ΔE = 3.4−1.51 = 1.89 eV\nn=4→3: ΔE = 1.51−0.85 = 0.66 eV"),
    ],
    explanation: "Energy levels in hydrogen get progressively closer as n increases (E ∝ −1/n²). The energy differences between adjacent levels get smaller and smaller, which is why the spectral lines crowd together towards the series limit.",
  },
  "2.15": {
    steps: [
      step("Use Bohr model velocity formula or radius formula", "Radius of nth orbit: rₙ = 0.529 × n² Å (Bohr radius formula)\nr₁ = 0.529 Å (ground state)"),
      step("Calculate velocities", "v₁ = 2.18 × 10⁶ m/s (given or standard value)\nvₙ = v₁/n"),
      step("Or use energy relationships", "The problem requires applying Bohr postulates: mvrₙ = nh/2π\nFor ground state: mv₁r₁ = h/2π → v₁ = h/(2πmr₁)"),
    ],
    explanation: "In Bohr's model, electrons move faster in lower orbits (closer to nucleus) — they have to maintain the centripetal acceleration from the nuclear attraction. Velocity decreases as 1/n as you go to higher orbits.",
  },
  "2.16": {
    steps: [
      step("Bohr's first postulate: fixed orbits", "Electrons move in circular orbits around the nucleus without radiating energy\nOnly specific orbits where angular momentum L = nh/2π are allowed"),
      step("Bohr's second postulate: energy quantisation", "Energy is emitted or absorbed only when an electron jumps between allowed orbits\nΔE = hν (Planck's relation connects energy change to photon frequency"),
      step("Bohr's third postulate: angular momentum quantisation", "mvr = nh/2π where n = 1,2,3,...\nThis restricts electrons to specific orbits with specific energies"),
    ],
    explanation: "Bohr's model was revolutionary because it quantised atomic energy — explaining why atoms only emit discrete spectral lines rather than a continuous spectrum. However, it only works exactly for hydrogen (1-electron atoms) and fails for multi-electron atoms.",
  },
  "2.17": {
    steps: [
      step("Calculate energy difference for n=4 to n=1 transition", "E₁ = −2.18×10⁻¹⁸ J, E₄ = −2.18×10⁻¹⁸/16 = −1.3625×10⁻¹⁹ J\nΔE = E₁ − E₄ = −2.18×10⁻¹⁸ − (−1.3625×10⁻¹⁹) = −2.0437×10⁻¹⁸ J (energy released)"),
      step("Calculate wavelength of emitted photon", "λ = hc/|ΔE| = (6.626×10⁻³⁴ × 3×10⁸)/2.0437×10⁻¹⁸\n= 9.73×10⁻⁸ m = 97.3 nm → UV region (Lyman series)"),
    ],
    explanation: "Any transition to n=1 belongs to the Lyman series (UV region). The n=4→n=1 transition (Lyman δ) at 97.3 nm is in the vacuum ultraviolet — it cannot propagate through air (absorbed by oxygen and nitrogen).",
  },
  "2.18": {
    steps: [
      step("List the Lyman series wavelengths (n₁=1, n₂=2,3,4...)", "1/λ = 1.097×10⁷ × (1 − 1/n₂²)\nn₂=2: λ=121.6 nm; n₂=3: λ=102.6 nm; n₂=4: λ=97.3 nm; n₂=5: λ=95.0 nm; n₂=∞: λ=91.2 nm (series limit)"),
      step("Identify spectral region", "All Lyman series lines: 91.2 to 121.6 nm → Vacuum UV (ultraviolet)"),
    ],
    explanation: "The Lyman series limit (n₂=∞) at 91.2 nm corresponds to ionisation from the ground state. Photons with λ < 91.2 nm can ionise ground-state hydrogen atoms.",
  },
  "2.19": {
    steps: [
      step("Calculate energy difference for n=2 to n=1", "ΔE = E₁ − E₂ = −2.18×10⁻¹⁸(1/1 − 1/4) = −2.18×10⁻¹⁸ × 3/4 = −1.635×10⁻¹⁸ J"),
      step("Calculate wavelength", "λ = hc/|ΔE| = (6.626×10⁻³⁴ × 3×10⁸)/1.635×10⁻¹⁸ = 1.216×10⁻⁷ m = 121.6 nm"),
      step("Calculate frequency", "ν = c/λ = 3×10⁸/1.216×10⁻⁷ = 2.467×10¹⁵ Hz"),
    ],
    explanation: "This is the Lyman alpha line — the most intense line in the hydrogen emission spectrum. It's important in astrophysics as it's used to detect hydrogen gas in distant galaxies (Lyman alpha forest).",
  },
  "2.20": {
    steps: [
      step("Apply de Broglie equation: λ = h/mv", "m = 9.109×10⁻³¹ kg, v = 2.05×10⁶ m/s (given or calculated from Bohr model)\nλ = (6.626×10⁻³⁴)/(9.109×10⁻³¹ × 2.05×10⁶)"),
      step("Calculate wavelength", "λ = 6.626×10⁻³⁴ / 1.867×10⁻²⁴ = 3.55×10⁻¹⁰ m = 3.55 Å"),
    ],
    explanation: "The de Broglie wavelength of an electron in the first Bohr orbit (~3.3 Å) is comparable to atomic dimensions and explains why electrons show wave diffraction in crystals. This wave-particle duality is why quantum mechanics (not classical mechanics) describes electrons.",
  },
  "2.21": {
    steps: [
      step("Apply Heisenberg's principle: Δx · Δp ≥ h/4π", "Given: Δx = 0.001 nm = 1×10⁻¹² m\nΔp ≥ h/(4π × Δx) = (6.626×10⁻³⁴)/(4π × 10⁻¹²)"),
      step("Calculate minimum uncertainty in momentum", "Δp ≥ (6.626×10⁻³⁴)/(12.566×10⁻¹²) = 5.273×10⁻²³ kg·m/s"),
      step("Calculate uncertainty in velocity", "Δv = Δp/m = 5.273×10⁻²³/(9.109×10⁻³¹) = 5.79×10⁷ m/s ≈ 19% of speed of light"),
    ],
    explanation: "Confining an electron to a 0.001 nm region creates a velocity uncertainty of ~5.8×10⁷ m/s — nearly 20% the speed of light! This is why electrons cannot be localised inside a nucleus (which is ~0.0001 nm), proving that electrons don't orbit inside the nucleus.",
  },
  "2.22": {
    steps: [
      step("Apply Heisenberg's principle: Δx · Δp ≥ h/4π", "Δp = mΔv = 9.109×10⁻³¹ × 5.7×10⁵ = 5.19×10⁻²⁵ kg·m/s\n(5.7 km/s = 5.7×10³ m/s; but if Δv = 5.7×10⁵ m/s use that)"),
      step("Calculate minimum position uncertainty", "Δx ≥ h/(4π·Δp) = (6.626×10⁻³⁴)/(4π × 5.19×10⁻²⁵) = 1.013×10⁻¹⁰ m ≈ 1 Å"),
    ],
    explanation: "A position uncertainty of ~1 Å is comparable to atomic size. This means we cannot determine both the position and velocity of an electron precisely at the same time — the act of measurement disturbs the system.",
  },
  "2.23": {
    steps: [
      step("Apply de Broglie equation: λ = h/mv", "m = 0.040 kg (40 g), v = 1 m/s (rest velocity?), or use given data\nλ = h/mv = 6.626×10⁻³⁴/(0.040 × v)"),
      step("For a ball moving at 1 m/s", "λ = 6.626×10⁻³⁴/(0.040 × 1) = 1.66×10⁻³² m"),
      step("Compare to atomic scale", "λ ≈ 10⁻³² m — far smaller than any known particle or atom\nWave properties are completely undetectable for macroscopic objects"),
    ],
    explanation: "The de Broglie wavelength of a cricket ball (~10⁻³² m) is incomprehensibly small — this is why quantum mechanical wave behaviour is never observed for everyday objects. Only subatomic particles have wavelengths comparable to atomic/molecular dimensions.",
  },
  "2.24": {
    steps: [
      step("Apply Heisenberg's principle to a stationary electron", "If electron is stationary: Δv = 0 → Δp = 0\nThis would require Δx → ∞ (completely unknown position)"),
      step("Show why this is impossible", "By Heisenberg: Δx·Δp ≥ h/4π\nIf Δp = 0: Δx = ∞ — the electron could be anywhere in the universe"),
      step("Conclusion", "An electron cannot be stationary inside an atom — it would violate HUP\nElectrons must have kinetic energy and are in constant motion"),
    ],
    explanation: "The impossibility of a stationary electron is one of the most important consequences of the Heisenberg Uncertainty Principle. It explains why atoms don't collapse: electrons can't fall into the nucleus and sit still — that would require knowing both position (very small) and momentum (zero) precisely.",
  },
  "2.25": {
    steps: [
      step("Apply Heisenberg's principle to a bullet", "m = 0.040 kg (40 g bullet), Δv = 10⁻⁴ m/s (given)\nΔp = m·Δv = 0.040 × 10⁻⁴ = 4×10⁻⁶ kg·m/s"),
      step("Calculate position uncertainty", "Δx ≥ h/(4π·Δp) = (6.626×10⁻³⁴)/(4π × 4×10⁻⁶)\n= 1.32×10⁻²⁹ m"),
      step("Interpret", "Δx ≈ 10⁻²⁹ m — completely negligible for macroscopic purposes\nClassical mechanics applies perfectly to bullets"),
    ],
    explanation: "For a 40 g bullet, the uncertainty in position is ~10⁻²⁹ m — 10 trillion times smaller than a proton. The uncertainty principle exists for bullets too, but its effects are so small as to be completely irrelevant. This is why classical physics works for everyday objects.",
  },
  "2.26": {
    steps: [
      step("Identify principal quantum number n for each shell", "K shell: n=1\nL shell: n=2\nM shell: n=3\nN shell: n=4"),
      step("Count orbitals using n² formula", "K: n²=1 orbital; max electrons = 2\nL: n²=4 orbitals; max electrons = 8\nM: n²=9 orbitals; max electrons = 18\nN: n²=16 orbitals; max electrons = 32"),
    ],
    explanation: "Each shell n contains n² orbitals and holds a maximum of 2n² electrons. The 2n² formula comes from: n² orbitals × 2 electrons per orbital (Pauli exclusion principle). Knowing this avoids memorising individual shell capacities.",
  },
  "2.27": {
    steps: [
      step("Identify what the question asks", "How many electrons can occupy the 3d subshell?"),
      step("Count orbitals in 3d subshell", "d subshell: l=2, so mₗ = −2,−1,0,+1,+2 → 5 orbitals\nEach orbital holds 2 electrons (Pauli exclusion principle)\nMax electrons in 3d = 5 × 2 = 10"),
    ],
    explanation: "Any d subshell (regardless of n) has exactly 5 orbitals and holds a maximum of 10 electrons. This is why the d-block of the periodic table spans 10 groups (Groups 3–12).",
  },
  "2.28": {
    steps: [
      step("List all quantum numbers for 3d subshell", "n=3, l=2 (d subshell)\nmₗ values: −2, −1, 0, +1, +2 → 5 orbitals\nFor each mₗ, mₛ = +½ or −½"),
      step("List the complete set", "Total = 5 orbitals × 2 spin states = 10 electrons\nSets: (3,2,−2,+½), (3,2,−2,−½), (3,2,−1,+½), (3,2,−1,−½),\n(3,2,0,+½), (3,2,0,−½), (3,2,+1,+½), (3,2,+1,−½),\n(3,2,+2,+½), (3,2,+2,−½)"),
    ],
    explanation: "Each unique set of 4 quantum numbers (n, l, mₗ, mₛ) describes exactly one electron in an atom (Pauli exclusion principle). Listing all 10 sets for 3d confirms that 3d can hold exactly 10 electrons.",
  },
  "2.29": {
    steps: [
      step("Apply quantum number rules: n ≥ 1; 0 ≤ l ≤ n−1; −l ≤ mₗ ≤ +l; mₛ = ±½", "Check each set against these rules"),
      step("Evaluate each set", "(a) n=3, l=3: l must be ≤ n−1=2 → NOT ALLOWED\n(b) n=3, l=1, mₗ=0, mₛ=+½ → all valid → ALLOWED\n(c) n=4, l=2, mₗ=−2, mₛ=−½ → all valid → ALLOWED\n(d) n=1, l=0, mₗ=0, mₛ=+½ → all valid → ALLOWED\n(e) n=3, l=2, mₗ=+3: mₗ must be between −2 and +2 → NOT ALLOWED\n(f) n=2, l=2: l must be ≤ n−1=1 → NOT ALLOWED"),
    ],
    explanation: "The quantum number rules are: n determines shell; l determines subshell (0=s, 1=p, 2=d, 3=f); mₗ specifies the orbital orientation; mₛ specifies spin direction. Any violation makes the quantum state physically impossible.",
  },
  "2.30": {
    steps: [
      step("Determine subshell from n and l", "l=0 → s; l=1 → p; l=2 → d; l=3 → f"),
      step("Calculate number of orbitals = 2l+1 for each", "(a) n=1, l=0 → 1s subshell, 2(0)+1=1 orbital\n(b) n=2, l=1 → 2p subshell, 2(1)+1=3 orbitals\n(c) n=3, l=2 → 3d subshell, 2(2)+1=5 orbitals\n(d) n=4, l=3 → 4f subshell, 2(3)+1=7 orbitals"),
    ],
    explanation: "The number of orbitals in a subshell = 2l+1. This follows from the allowed mₗ values: from −l to +l, giving (2l+1) distinct values. Each orbital can hold 2 electrons, so max electrons per subshell = 2(2l+1).",
  },
  "2.31": {
    steps: [
      step("Convert mole fraction to moles and find molarity of H₂O₂", "Question about H₂O₂ — calculate concentration from given data"),
      step("Use appropriate formula for concentration unit", "Molarity (M) = moles solute / volume solution (L)\nMolality (m) = moles solute / mass solvent (kg)\nMole fraction = moles solute / total moles"),
    ],
    explanation: "Different concentration units are used in different contexts: molarity (M) is most common for lab work; molality (m) is temperature-independent (useful in colligative property calculations); mole fraction is used in thermodynamics and gas law calculations.",
  },
  "2.32": {
    steps: [
      step("Apply Hund's rule: one electron per orbital before pairing", "Fill each orbital in the subshell singly first (same spin = +½)\nOnly pair up when all orbitals have one electron"),
      step("Write the orbital diagram for the given configuration", "Example: p² configuration → ↑ ↑ _ (2p: Hund's rule)\nTwo unpaired electrons"),
    ],
    explanation: "Hund's rule of maximum multiplicity: electrons fill orbitals of the same energy (degenerate) singly with parallel spins before pairing. This minimises electron-electron repulsion and gives the lowest energy state.",
  },
  "2.33": {
    steps: [
      step("Write electronic configuration using Aufbau principle", "Fill orbitals in order of increasing energy: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p..."),
      step("Apply Pauli exclusion and Hund's rule", "Each orbital holds max 2 electrons with opposite spins\nWithin a subshell, fill singly before pairing"),
    ],
    explanation: "The Aufbau principle (German: 'building up') gives a systematic method to write electronic configurations. The (n+l) rule determines energy order: lower (n+l) fills first; for equal (n+l), lower n fills first.",
  },
  "2.34": {
    steps: [
      step("Identify the element and write its configuration", "Use atomic number Z to determine the element\nWrite configuration following Aufbau order"),
      step("Check for exceptions (Cr, Cu and their analogues)", "Cr (Z=24): [Ar]3d⁵4s¹ (not 3d⁴4s²) — half-filled 3d stability\nCu (Z=29): [Ar]3d¹⁰4s¹ (not 3d⁹4s²) — fully-filled 3d stability"),
    ],
    explanation: "Electronic configurations of Cr and Cu deviate from the Aufbau prediction due to extra stability associated with half-filled (3d⁵) and fully-filled (3d¹⁰) d-subshells. These exceptions must be memorised.",
  },
  "2.35": {
    steps: [
      step("Determine number of unpaired electrons from orbital diagrams", "Draw the orbital box diagram showing electron arrangement in each orbital\nCount electrons that are alone in an orbital (unpaired)"),
      step("Apply Hund's rule for p and d subshells", "For np³: all 3 electrons unpaired (3 unpaired)\nFor nd⁵: all 5 electrons unpaired (5 unpaired)\nFor nd⁶: 4 unpaired (one orbital paired)"),
    ],
    explanation: "Unpaired electrons determine magnetic properties: atoms/ions with unpaired electrons are paramagnetic (attracted to magnetic fields); those with all electrons paired are diamagnetic (weakly repelled). The number of unpaired electrons is directly measurable from magnetic susceptibility.",
  },
  "2.36": {
    steps: [
      step("Write electronic configuration for the given element", "Identify element, write full configuration\nGroup into core + valence electrons"),
      step("Count total electrons and check the configuration", "Verify: total electrons = atomic number Z\nCheck for exceptions if Z = 24 (Cr) or 29 (Cu) or their period 5 analogues"),
    ],
    explanation: "Systematic configurations follow from Aufbau, Pauli, and Hund's rules. For most elements the rules work perfectly. The exceptions (Cr, Cu and their analogues Mo, Ag, Au) require special attention.",
  },
  "2.37": {
    steps: [
      step("Identify the subshell and count electrons", "The question gives a quantum number set — identify what subshell it represents\nl=0: s (max 2e); l=1: p (max 6e); l=2: d (max 10e)"),
      step("Apply Pauli exclusion: no two electrons can have identical sets of all 4 quantum numbers", "Each orbital (unique n, l, mₗ combination) holds at most 2 electrons with opposite spins"),
    ],
    explanation: "Pauli's exclusion principle is one of the most fundamental rules in quantum mechanics. It explains why matter is 'solid' (electrons can't collapse into the same state), why the periodic table has the structure it does, and why white dwarf stars don't collapse.",
  },
  "2.38": {
    steps: [
      step("Write the full electronic configuration of Na (Z=11)", "1s²2s²2p⁶3s¹\nCore: 1s²2s²2p⁶ (Ne core)\nValence: 3s¹"),
      step("Identify valence shell and valence electron count", "Outermost shell n=3 → valence shell\n1 valence electron → Group 1 element (alkali metal)"),
    ],
    explanation: "The valence shell configuration determines chemical behaviour. Na has 1 valence electron (3s¹) which it readily loses to form Na⁺. This explains Na's high reactivity, low ionisation enthalpy, and +1 oxidation state in all compounds.",
  },
  "2.39": {
    steps: [
      step("Write configuration of Cl (Z=17)", "1s²2s²2p⁶3s²3p⁵\nCore: [Ne] = 1s²2s²2p⁶\nValence: 3s²3p⁵ (7 valence electrons)"),
      step("Identify block, period, group", "Outermost subshell is 3p → p-block\nHighest n = 3 → Period 3\n7 valence electrons → Group 17 (halogens)"),
    ],
    explanation: "Chlorine's 3p⁵ configuration (one electron short of the stable 3p⁶ of Argon) drives it to gain one electron, giving Cl⁻ and explaining its strong oxidising power and reactivity with metals and hydrogen.",
  },
  "2.40": {
    steps: [
      step("Write configuration of Ar (Z=18)", "1s²2s²2p⁶3s²3p⁶\nAll subshells completely filled → stable configuration"),
      step("Explain chemical inertness", "Fully filled outermost subshells → very high ionisation enthalpy\nPositive electron gain enthalpy → won't accept electrons\nNeither gains nor loses electrons → chemically inert"),
    ],
    explanation: "Noble gases like Ar have filled valence shells (s²p⁶ configuration for Ar). This makes them extremely stable with very high ionisation enthalpies and positive electron gain enthalpies. Under normal conditions, noble gases form no chemical compounds.",
  },
  "2.41": {
    steps: [
      step("Write electronic configuration of P (Z=15)", "1s²2s²2p⁶3s²3p³\nOr: [Ne]3s²3p³"),
      step("Apply Hund's rule to 3p³", "3p: ↑ ↑ ↑ (each p orbital has one electron, all parallel spins)\n3 unpaired electrons"),
      step("Count unpaired electrons", "3p³ has 3 singly occupied orbitals → 3 unpaired electrons"),
    ],
    explanation: "Phosphorus with 3p³ (half-filled p subshell) has 3 unpaired electrons and is paramagnetic. This half-filled configuration has extra stability (Hund's rule), which is why the ionisation enthalpy of P is slightly higher than that of S (which has 3p⁴ with one paired electron).",
  },
  "2.42": {
    steps: [
      step("Write electronic configuration of Fe (Z=26)", "Fe: [Ar]3d⁶4s²"),
      step("Apply Hund's rule to 3d⁶", "3d orbitals: ↑↓ ↑ ↑ ↑ ↑ (5 up-spin, 1 paired)\n4 unpaired electrons in 3d"),
      step("Write Fe²⁺ and Fe³⁺ configurations", "Fe²⁺ (lose 4s first): [Ar]3d⁶ → 4 unpaired electrons\nFe³⁺: [Ar]3d⁵ → 5 unpaired electrons (half-filled, most stable)"),
    ],
    explanation: "When iron is ionised, the 4s electrons are removed before 3d electrons (despite filling order). This is because in ions, 3d has lower energy than 4s. Fe³⁺ with 3d⁵ (half-filled, 5 unpaired) is especially stable, explaining why Fe³⁺ is often more stable than Fe²⁺.",
  },
  "2.43": {
    steps: [
      step("Write electronic configuration of Cu (Z=29)", "Exception: Cu is [Ar]3d¹⁰4s¹ (NOT [Ar]3d⁹4s²)"),
      step("Explain the exception", "Fully filled 3d¹⁰ gives extra stability\nOne electron shifts from 4s to complete the 3d subshell\nResult: [Ar]3d¹⁰4s¹"),
      step("Write Cu⁺ and Cu²⁺ configurations", "Cu⁺: [Ar]3d¹⁰ (completely filled d — stable)\nCu²⁺: [Ar]3d⁹ → 1 unpaired electron"),
    ],
    explanation: "Copper's anomalous configuration ([Ar]3d¹⁰4s¹) arises from the extra stability of the completely filled 3d¹⁰ subshell. Similar exceptions occur for Mo ([Kr]4d⁵5s¹), Ag ([Kr]4d¹⁰5s¹), and Au ([Xe]4f¹⁴5d¹⁰6s¹).",
  },
  "2.44": {
    steps: [
      step("Write electronic configuration for each element", "Given atomic numbers, write the full configuration"),
      step("Identify block from the last orbital filled", "If last e⁻ enters s → s-block; p → p-block; d → d-block; f → f-block"),
      step("Identify period (highest n) and group", "Period = highest principal quantum number n\nGroup for main group = valence electrons; for d-block = (d+s) electrons"),
    ],
    explanation: "The block an element belongs to is determined by the subshell receiving the differentiating (last added) electron. The period equals the highest n in the configuration. This systematic approach works for all elements.",
  },
  "2.45": {
    steps: [
      step("Count total electrons to identify the element", "Add up all electrons from the given configuration\nTotal electrons = atomic number Z"),
      step("Find element from periodic table", "Z gives the element identity and position in the table"),
    ],
    explanation: "Reading an electronic configuration backward to find Z and the element is a fundamental skill. The configuration encodes: period (highest n), block (last subshell type), group (valence electron count), and chemical properties.",
  },
  "2.46": {
    steps: [
      step("Calculate wavelength using λ = c/ν", "ν = 4 × 10⁸ m/s?? (check — may be a different quantity)\nOr calculate from given photon energy E = hν → ν = E/h → λ = c/ν"),
    ],
    explanation: "Always identify given quantities first. EM radiation problems require: λν=c and E=hν. Given any one of λ, ν, or E, the other two can be calculated.",
  },
  "2.47": {
    steps: [
      step("Apply de Broglie: λ = h/p = h/mv", "Identify mass m and velocity v (or calculate v from kinetic energy KE = ½mv²)"),
      step("Calculate wavelength", "λ = h/mv = (6.626×10⁻³⁴)/(m × v)"),
    ],
    explanation: "De Broglie wavelength applies to all matter. For visible objects the wavelength is negligibly small. For electrons it's comparable to atomic dimensions — this is the basis of electron microscopy.",
  },
  "2.48": {
    steps: [
      step("Determine valid l values for given n", "l can be 0, 1, 2, ..., (n−1)\nFor n=3: l = 0, 1, or 2"),
      step("Determine valid mₗ values for given l", "mₗ ranges from −l to +l\nFor l=2: mₗ = −2, −1, 0, +1, +2"),
    ],
    explanation: "The quantum number hierarchy: n determines the shell, l determines the subshell within that shell (with l < n), mₗ determines the orbital orientation within the subshell, and mₛ specifies the electron's spin direction.",
  },
  "2.49": {
    steps: [
      step("Determine possible l values for n=4", "l = 0 (4s), 1 (4p), 2 (4d), 3 (4f)"),
      step("Count orbitals and electrons for n=4", "4s: 1 orbital, 2e; 4p: 3 orbitals, 6e; 4d: 5 orbitals, 10e; 4f: 7 orbitals, 14e\nTotal for n=4: 16 orbitals, 32 electrons (= n² and 2n²)"),
    ],
    explanation: "Shell n=4 contains the 4s, 4p, 4d, and 4f subshells. The 4f subshell is why Period 6 (not Period 4) has 32 elements — the 4f orbitals actually fill in Period 6 (after 5s and 5p have started filling), not in Period 4.",
  },
  "2.50": {
    steps: [
      step("Write configuration of N (Z=7)", "N: 1s²2s²2p³\nApply Hund's rule: 2p orbitals: ↑ ↑ ↑"),
      step("Count unpaired electrons and determine magnetic character", "3 unpaired electrons in 2p → paramagnetic\nN has magnetic moment due to unpaired electron spins"),
    ],
    explanation: "Nitrogen's 2p³ half-filled configuration (Hund's rule) gives 3 unpaired electrons. This makes N paramagnetic. The N₂ molecule, however, is diamagnetic because the two nitrogen atoms' electrons pair up when they form the triple bond.",
  },
  "2.51": {
    steps: [
      step("List quantum numbers for 3p subshell", "n=3, l=1 (p subshell)\nmₗ = −1, 0, +1 → 3 orbitals\nFor each orbital, mₛ = +½ or −½"),
      step("Write all sets for a fully filled 3p⁶", "6 electrons: (3,1,−1,+½), (3,1,−1,−½), (3,1,0,+½), (3,1,0,−½), (3,1,+1,+½), (3,1,+1,−½)"),
    ],
    explanation: "Listing all quantum number sets for a subshell confirms the maximum electron capacity: 3p has 3 orbitals × 2 spin states = 6 electrons. Argon and the other noble gases have filled 3p⁶, giving them their chemical inertness.",
  },
  "2.52": {
    steps: [
      step("Write configuration of Si (Z=14)", "Si: 1s²2s²2p⁶3s²3p²\nOr: [Ne]3s²3p²"),
      step("Apply Hund's rule to 3p²", "3p: ↑ _ ↑ _ (two orbitals singly occupied, one empty)\n2 unpaired electrons"),
    ],
    explanation: "Silicon with 3p² has 2 unpaired electrons and is paramagnetic. This configuration also means Si has 4 valence electrons (like carbon), explaining why it forms 4 bonds and is the basis of semiconductor technology (silicon chips).",
  },
  "2.53": {
    steps: [
      step("Apply the rule: no two electrons can have the same set of 4 quantum numbers", "If n=2, l=1, mₗ=−1: this is one specific 2p orbital\nIt can hold at most 2 electrons (mₛ=+½ and mₛ=−½)"),
      step("Answer: maximum 2 electrons", "Pauli's principle limits each orbital to exactly 2 electrons with opposite spins"),
    ],
    explanation: "Every orbital (defined by n, l, and mₗ) can hold exactly 2 electrons. This is one of the most fundamental results of Pauli's exclusion principle and determines the entire structure of the periodic table.",
  },
  "2.54": {
    steps: [
      step("Identify which quantum number is incorrect", "List valid ranges: n(≥1), 0≤l≤n−1, −l≤mₗ≤+l, mₛ=±½\nCheck each given set against these rules"),
      step("Find the violating set and explain", "E.g., if n=1 and l=1: violates l≤n−1=0 → NOT ALLOWED"),
    ],
    explanation: "This type of question tests systematic understanding of quantum number rules. The fastest approach: check l≤n−1 first (catches most violations), then check mₗ within ±l, then verify mₛ is ±½.",
  },
  "2.55": {
    steps: [
      step("Write configuration for the given element", "Find element from Z, write the full configuration"),
      step("Count electrons with each quantum number property", "e.g., 'How many electrons have mₗ=0?' → count all s orbitals (mₗ=0) and all p/d/f mₗ=0 orbitals that are occupied"),
    ],
    explanation: "Each orbital is uniquely identified by (n, l, mₗ). The mₗ=0 orbitals are: all s orbitals, the central p orbital (pz), the dz² orbital, etc. Counting requires knowing orbital notation and which mₗ values each subshell contains.",
  },
  "2.56": {
    steps: [
      step("Recall: shells, subshells, and orbitals", "Shell n: total n² orbitals, max 2n² electrons\nSubshell (n,l): (2l+1) orbitals, max 2(2l+1) electrons\nOrbital (n,l,mₗ): max 2 electrons"),
      step("Apply to the given question", "Number of electrons with given quantum numbers follows from counting available slots in the specified orbitals"),
    ],
    explanation: "Understanding the hierarchy of quantum numbers (n→l→mₗ→mₛ) is essential. Each level restricts the range of the next. Together they form the address system for electrons in atoms.",
  },
  "2.57": {
    steps: [
      step("Write electronic configuration and identify the element", "Given: an element with configuration ending in ...3d⁵4s¹\nThis is Chromium (Cr, Z=24)"),
      step("Identify period, block, and group", "Highest n=4 → Period 4\nLast electron enters 3d → d-block (transition metal)\n3d⁵4s¹: 6 outer electrons, but group = 3d⁵+4s¹ electrons in bonding = Group 6"),
    ],
    explanation: "Chromium's anomalous configuration [Ar]3d⁵4s¹ (instead of expected 3d⁴4s²) arises from the extra stability of the half-filled d subshell. All five 3d orbitals are singly occupied with parallel spins — this is energetically favourable.",
  },
  "2.58": {
    steps: [
      step("Apply Hund's rule to 4d⁵ or given configuration", "d⁵ configuration: each of 5 d-orbitals gets 1 electron → 5 unpaired electrons\nMagnetic moment μ = √(n(n+2)) BM where n = unpaired electrons"),
      step("Calculate magnetic moment for 5 unpaired electrons", "μ = √(5×7) = √35 = 5.92 BM"),
    ],
    explanation: "Magnetic moment is directly related to the number of unpaired electrons. Transition metal ions with high unpaired electron count (like Mn²⁺ with 3d⁵ = 5 unpaired) show strong paramagnetism. This is used in MRI machines and magnetic materials.",
  },
  "2.59": {
    steps: [
      step("Write complete electronic configuration of given element", "Build from 1s up, following Aufbau order"),
      step("Identify the last subshell filled and n value", "Period = highest n; Block = type of last subshell\nGroup = valence electron count (for main group) or special counting for d/f block"),
    ],
    explanation: "The electronic configuration is the complete descriptor of an element's position in the periodic table and its chemical behaviour. Every feature (period, group, block, reactivity) can be read from it.",
  },
  "2.60": {
    steps: [
      step("Calculate wavelength from given data", "Use λν=c or E=hν=hc/λ depending on what's given\nConvert units carefully (nm to m, kJ to J, etc.)"),
      step("Identify the spectral series", "Lyman (UV, n₁=1), Balmer (visible, n₁=2), Paschen (near-IR, n₁=3)\nUse Rydberg formula: 1/λ = R_H(1/n₁² − 1/n₂²)"),
    ],
    explanation: "Always identify which series a spectral line belongs to by its wavelength or the transition levels given. The Rydberg formula is universal for all hydrogen series — just change n₁.",
  },
  "2.61": {
    steps: [
      step("Determine n from given energy or wavelength", "For hydrogen: Eₙ = −2.18×10⁻¹⁸/n² J\nOr use Rydberg formula with given λ to find n₁ and n₂"),
      step("Calculate the required quantity", "Use the appropriate formula (Bohr energy, Rydberg, de Broglie) for what's asked"),
    ],
    explanation: "Hydrogen atom calculations use two key formulas: Bohr energy Eₙ = −13.6/n² eV, and Rydberg for wavelengths. The principal quantum number n uniquely determines the energy level.",
  },
  "2.62": {
    steps: [
      step("Identify the orbital type from quantum numbers", "n=4, l=2 → 4d orbital\nOr: given a description, identify n, l, and orbital name"),
      step("Calculate subshell properties", "4d: 5 orbitals, holds max 10 electrons\nNumber of electrons with mₛ=+½ = 5 (one per orbital, maximally)"),
    ],
    explanation: "The 4d subshell (and all d subshells) contains exactly 5 orbitals. These are often denoted dxy, dxz, dyz, dx²-y², dz². They are degenerate (equal energy) in isolated atoms, but split in energy in crystal fields — the basis of transition metal colour and bonding.",
  },
  "2.63": {
    steps: [
      step("Write electronic configurations of Li (Z=3) and Be (Z=4)", "Li: 1s²2s¹ → 1 unpaired electron → paramagnetic\nBe: 1s²2s² → 0 unpaired electrons → diamagnetic"),
      step("Determine magnetic character", "Paramagnetic: ≥1 unpaired electrons → attracted to magnetic field\nDiamagnetic: all electrons paired → weakly repelled by magnetic field"),
    ],
    explanation: "Paramagnetism vs diamagnetism is determined solely by whether an atom/ion has unpaired electrons. Li with 1 unpaired electron is paramagnetic; Be with all pairs is diamagnetic. This property can be measured experimentally with a Gouy balance.",
  },
  "2.64": {
    steps: [
      step("Write the configuration for the ion (remember: for cations, remove electrons from highest n first)", "For transition metal cations: remove s electrons before d electrons\nFor anions: add electrons to the next available orbital"),
      step("Count unpaired electrons and determine magnetic character", "Draw orbital box diagram for the outermost subshell\nCount singly occupied boxes = unpaired electrons"),
    ],
    explanation: "When transition metals are ionised, the 4s electrons are removed before the 3d electrons (despite being added after 3d in the neutral atom). This is because in the ionic state, 3d is lower in energy than 4s.",
  },
  "2.65": {
    steps: [
      step("Identify what the question asks about shells and subshells", "Shell = all orbitals with same n\nSubshell = orbitals with same n and l\nOrbital = unique (n, l, mₗ) combination"),
      step("Count for each category", "Shell n=4: 4s+4p+4d+4f = 1+3+5+7 = 16 orbitals, 32 max electrons\nSubshell 4d: 5 orbitals, 10 max electrons"),
    ],
    explanation: "The hierarchical structure of atomic orbitals (shell → subshell → orbital) maps directly to the quantum numbers (n → l → mₗ). Each level gets more specific, narrowing down where an electron can be found.",
  },
  "2.66": {
    steps: [
      step("Draw orbital box diagrams applying all three rules", "Aufbau: fill lowest energy orbitals first\nPauli: max 2 electrons per orbital, opposite spins\nHund: single electrons in each degenerate orbital before pairing"),
      step("Write the full configuration and count electrons", "Verify total = Z\nIdentify valence electrons (outermost shell)"),
    ],
    explanation: "The three principles (Aufbau, Pauli, Hund) together completely determine the ground state electronic configuration of any element. Aufbau gives the order, Pauli limits the count per orbital, and Hund maximises unpaired electrons within a subshell.",
  },
  "2.67": {
    steps: [
      step("Write the electronic configuration using spectroscopic notation", "Spectroscopic notation: list subshells with superscript electron count\nE.g., 1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p³"),
      step("Verify and simplify using noble gas core notation", "Replace filled noble gas core with [symbol] in brackets\nE.g., [Ar] = 1s²2s²2p⁶3s²3p⁶ for 18 electrons"),
    ],
    explanation: "Noble gas core notation is shorthand that makes configurations easier to write and compare. Always write the nearest noble gas with Z less than the element, then continue from there. This highlights only the chemically important valence electrons.",
  },
};

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 2][0]'
);

if (!doc) { console.error("Ch.2 document not found in Sanity."); process.exit(1); }
console.log(`Found Ch.2 document: ${doc._id} (${doc.questions.length} questions)`);

const setPatch = {};
let patched = 0;

for (const [qNum, data] of Object.entries(enrichments)) {
  const idx = doc.questions.findIndex((q) => q.questionNumber === qNum);
  if (idx === -1) { console.log(`Q${qNum} not found, skipping`); continue; }
  if (data.steps) setPatch[`questions[${idx}].steps`] = data.steps;
  if (data.explanation) setPatch[`questions[${idx}].explanation`] = blocks(data.explanation);
  patched++;
}

await client.patch(doc._id).set(setPatch).commit();
console.log(`✓ Patched ${patched} questions with steps and explanations.`);
