/**
 * Merges steps + explanation into ch11-chemistry-ch2-questions.json
 * Run: node scripts/update-ch2-json.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const filePath = new URL("./data/ch11-chemistry-ch2-questions.json", import.meta.url);
const questions = JSON.parse(readFileSync(filePath, "utf-8"));

// Steps/explanation keyed by questionNumber
const enrichments = {
  "2.1": {
    steps: [
      { stepTitle: "Part (i): Number of electrons in 1 g", content: "Mass of 1 electron = 9.10939 × 10⁻²⁸ g\nNumber = 1 g ÷ 9.10939 × 10⁻²⁸ g = 1.098 × 10²⁷" },
      { stepTitle: "Part (ii): Mass and charge of 1 mole of electrons", content: "Mass = 6.022 × 10²³ × 9.10939 × 10⁻³¹ kg = 5.485 × 10⁻⁴ g\nCharge = 6.022 × 10²³ × 1.6022 × 10⁻¹⁹ C = 9.65 × 10⁴ C ≈ 1 Faraday" },
    ],
    explanation: "The mass of one mole of electrons (5.485 × 10⁻⁴ g) is negligible compared to atomic masses. The charge of one mole of electrons (96500 C) is called one Faraday, used in electrochemistry.",
  },
  "2.2": {
    steps: [
      { stepTitle: "Part (i): Electrons in 1 mole of CH₄", content: "CH₄: 6 electrons (C) + 4 electrons (H) = 10 electrons per molecule\n1 mol CH₄ = 10 × 6.022 × 10²³ = 6.022 × 10²⁴ electrons" },
      { stepTitle: "Part (ii): Neutrons in 7 mg of ¹⁴C", content: "Moles ¹⁴C = 7×10⁻³ g ÷ 14 g/mol = 5×10⁻⁴ mol → 3.011×10²⁰ atoms\nNeutrons per atom = 14−6 = 8 → Total = 2.409×10²¹\nMass = 2.409×10²¹ × 1.675×10⁻²⁷ kg = 4.035×10⁻⁶ kg" },
      { stepTitle: "Part (iii): Protons in 34 mg of NH₃", content: "Moles NH₃ = 34×10⁻³÷17 = 2×10⁻³ mol → 1.2044×10²¹ molecules\nProtons per NH₃ = N(7)+H(1×3) = 10 → Total = 1.2044×10²²\nMass = 1.2044×10²² × 1.6726×10⁻²⁷ kg = 2.015×10⁻⁵ kg\nAnswer does NOT change with T or P — proton count depends only on mass." },
    ],
    explanation: "The number of subatomic particles depends only on mass (and composition), not on temperature or pressure. T and P affect volume and state, not the amount of substance.",
  },
  "2.3": {
    steps: [
      { stepTitle: "Apply the rule: protons = Z, neutrons = A − Z", content: "For any nucleus: Z = protons (bottom number), A = mass number (top)\nNeutrons = A − Z" },
      { stepTitle: "Calculate for each nucleus", content: "¹³C: Z=6 protons, 13−6=7 neutrons\n¹⁶O: Z=8 protons, 16−8=8 neutrons\n²⁴Mg: Z=12 protons, 24−12=12 neutrons\n⁵⁶Fe: Z=26 protons, 56−26=30 neutrons\n⁸⁸Sr: Z=38 protons, 88−38=50 neutrons" },
    ],
    explanation: "The atomic number Z always equals the number of protons (and electrons in a neutral atom). Neutrons = A − Z. This is the fundamental relationship between nuclear notation and subatomic composition.",
  },
  "2.4": {
    steps: [
      { stepTitle: "Identify element from atomic number Z", content: "(i) Z=17 → Chlorine (Cl)\n(ii) Z=92 → Uranium (U)\n(iii) Z=4 → Beryllium (Be)" },
      { stepTitle: "Write symbol as ᴬ_Z(Symbol)", content: "(i) ³⁵₁₇Cl\n(ii) ²³³₉₂U\n(iii) ⁹₄Be" },
    ],
    explanation: "The complete nuclear symbol format is: mass number (A) as superscript on left, atomic number (Z) as subscript on left, element symbol in centre. The symbol alone implies Z, so Z is sometimes omitted.",
  },
  "2.5": {
    steps: [
      { stepTitle: "Identify given quantity and apply λ = c/ν", content: "λ = 580 nm = 580 × 10⁻⁹ m (sodium yellow light)\nc = 3 × 10⁸ m/s" },
      { stepTitle: "Calculate frequency and wavenumber", content: "ν = c/λ = (3 × 10⁸)/(580 × 10⁻⁹) = 5.17 × 10¹⁴ Hz\nν̄ = 1/λ = 1/(580 × 10⁻⁹ m) = 1.724 × 10⁶ m⁻¹ = 1.724 × 10⁴ cm⁻¹" },
    ],
    explanation: "The relationship λν = c is fundamental for all EM radiation. Wavenumber (ν̄ = 1/λ) is commonly used in spectroscopy — higher wavenumber = shorter wavelength = higher energy.",
  },
  "2.6": {
    steps: [
      { stepTitle: "Part (i): Use E = hν", content: "ν = 3 × 10¹⁵ Hz\nE = hν = 6.626 × 10⁻³⁴ × 3 × 10¹⁵ = 1.988 × 10⁻¹⁸ J" },
      { stepTitle: "Part (ii): Use E = hc/λ", content: "λ = 0.50 Å = 0.50 × 10⁻¹⁰ m\nE = hc/λ = (6.626×10⁻³⁴ × 3×10⁸)/(0.50×10⁻¹⁰) = 3.976 × 10⁻¹⁵ J" },
    ],
    explanation: "Two equivalent forms: E = hν (when frequency is given) or E = hc/λ (when wavelength is given). Both give the same answer — choose whichever avoids an extra conversion step.",
  },
  "2.7": {
    steps: [
      { stepTitle: "Find frequency from period: ν = 1/T", content: "T = 2.0 × 10⁻¹⁰ s\nν = 1/T = 1/(2.0 × 10⁻¹⁰) = 5.0 × 10⁹ Hz" },
      { stepTitle: "Calculate wavelength and wavenumber", content: "λ = c/ν = (3 × 10⁸)/(5.0 × 10⁹) = 0.06 m = 6.0 × 10⁻² m\nν̄ = 1/λ = 1/(6.0 × 10⁻²) = 16.67 m⁻¹" },
    ],
    explanation: "Period (T) and frequency (ν) are reciprocals: ν = 1/T. Once frequency is known, all other wave properties follow from the fundamental relation c = λν.",
  },
  "2.8": {
    steps: [
      { stepTitle: "Calculate energy of one photon: E = hc/λ", content: "λ = 4000 pm = 4000 × 10⁻¹² m = 4 × 10⁻⁹ m\nE = (6.626×10⁻³⁴ × 3×10⁸)/(4×10⁻⁹) = 4.97 × 10⁻¹⁷ J" },
      { stepTitle: "Calculate number of photons for 1 J", content: "Number = 1 J / (4.97 × 10⁻¹⁷ J) = 2.01 × 10¹⁶ photons" },
    ],
    explanation: "This shows how many photons are needed for a macroscopically measurable amount of energy. Even 10¹⁶ photons is invisible to the eye — individual photons carry extremely small amounts of energy.",
  },
  "2.9": {
    steps: [
      { stepTitle: "Calculate photon energy in eV", content: "λ = 4 × 10⁻⁷ m\nE = hc/λ = (6.626×10⁻³⁴ × 3×10⁸)/(4×10⁻⁷) = 4.97 × 10⁻¹⁹ J\nIn eV: 4.97×10⁻¹⁹/1.602×10⁻¹⁹ = 3.10 eV" },
      { stepTitle: "Calculate KE of emitted photoelectron", content: "KE = E − W₀ = 3.10 − 2.13 = 0.97 eV = 1.555 × 10⁻¹⁹ J" },
      { stepTitle: "Calculate velocity of photoelectron", content: "½mv² = KE → v = √(2KE/m)\nv = √(2 × 1.555×10⁻¹⁹ / 9.109×10⁻³¹) = √(3.414×10¹¹) = 5.84 × 10⁵ m/s" },
    ],
    explanation: "The photoelectric equation KE = E_photon − W₀ shows that excess photon energy goes into the kinetic energy of the ejected electron. If E < W₀, no emission occurs regardless of light intensity.",
  },
  "2.10": {
    steps: [
      { stepTitle: "Calculate threshold frequency: ν₀ = W₀/h", content: "W₀ = 3.2 eV = 3.2 × 1.602 × 10⁻¹⁹ = 5.126 × 10⁻¹⁹ J\nν₀ = W₀/h = 5.126×10⁻¹⁹ / 6.626×10⁻³⁴ = 7.738 × 10¹⁴ Hz" },
      { stepTitle: "Compare with given frequency and find KE", content: "If ν > ν₀: KE = h(ν − ν₀)\nCalculate KE using the given frequency" },
    ],
    explanation: "The threshold frequency ν₀ is the minimum frequency for photoelectric emission. Below ν₀ no electrons are emitted. Above ν₀, excess energy appears as kinetic energy of the photoelectron.",
  },
  "2.11": {
    steps: [
      { stepTitle: "Calculate energy using Bohr formula: Eₙ = −2.18 × 10⁻¹⁸/n² J", content: "Calculate for n=5 and n=3 (Paschen series: n→3)" },
      { stepTitle: "Find ΔE and wavelength of emitted photon", content: "ΔE = |Eₙ₂ − Eₙ₁|\nλ = hc/ΔE" },
    ],
    explanation: "The Paschen series (transitions to n=3) falls in the near-infrared. Higher quantum number transitions release less energy and produce longer wavelengths.",
  },
  "2.12": {
    steps: [
      { stepTitle: "Calculate wavelength using Rydberg formula", content: "1/λ = R_H(1/n₁² − 1/n₂²)\nIdentify n₁ and n₂ from the series/transition given" },
      { stepTitle: "Calculate frequency and energy", content: "ν = c/λ\nE = hν = hc/λ" },
    ],
    explanation: "The Rydberg formula applies to all hydrogen spectral series. The series limit (n₂→∞) gives the series convergence wavelength, corresponding to ionisation from that level.",
  },
  "2.13": {
    steps: [
      { stepTitle: "Identify transitions in Balmer series (n₁=2)", content: "Balmer visible lines: n₂=3→2, 4→2, 5→2, 6→2\nApply 1/λ = R_H(1/4 − 1/n₂²)" },
      { stepTitle: "Calculate wavelengths", content: "n=3→2: 656 nm (red, Hα)\nn=4→2: 486 nm (blue-green, Hβ)\nn=5→2: 434 nm (violet, Hγ)\nn=6→2: 410 nm (violet, Hδ)" },
    ],
    explanation: "The Balmer series (visible) was the first hydrogen spectral series discovered. These four lines appear in the visible spectrum and are historically important for validating quantum theory.",
  },
  "2.14": {
    steps: [
      { stepTitle: "Use Bohr energy formula: Eₙ = −2.18×10⁻¹⁸/n² J", content: "Calculate energies at n=1,2,3,4\nE₁ = −13.6 eV, E₂ = −3.4 eV, E₃ = −1.51 eV, E₄ = −0.85 eV" },
      { stepTitle: "Calculate ΔE for each transition", content: "n=2→1: 10.2 eV\nn=3→2: 1.89 eV\nn=4→3: 0.66 eV\nEnergy gaps decrease with increasing n" },
    ],
    explanation: "Energy levels in hydrogen get progressively closer as n increases (E ∝ −1/n²). This convergence explains why spectral lines crowd together towards the series limit.",
  },
  "2.15": {
    steps: [
      { stepTitle: "Apply Bohr radius formula: rₙ = 0.529 × n² Å", content: "Calculate radius for each given n\nr₁ = 0.529 Å, r₂ = 2.116 Å, r₃ = 4.761 Å" },
      { stepTitle: "Apply Bohr velocity formula: vₙ = v₁/n", content: "v₁ = 2.18 × 10⁶ m/s\nv₂ = 1.09 × 10⁶ m/s, v₃ = 7.27 × 10⁵ m/s" },
    ],
    explanation: "In Bohr's model, higher orbits are larger and electrons move slower. Radius increases as n², velocity decreases as 1/n. This inverse relationship ensures the centripetal force equals the electrostatic attraction.",
  },
  "2.16": {
    steps: [
      { stepTitle: "State Bohr's postulates", content: "1. Electrons move in circular orbits without radiating energy\n2. Only orbits with L = nh/2π are allowed (n = 1,2,3,...)\n3. Energy is emitted/absorbed as photon when electron changes orbit: ΔE = hν" },
      { stepTitle: "Apply to find the given quantity", content: "Use E = −2.18×10⁻¹⁸/n² J for energy\nUse rₙ = 0.529n² Å for radius\nUse ν = ΔE/h for frequency" },
    ],
    explanation: "Bohr's model explained hydrogen's line spectrum by quantising angular momentum. It works exactly for hydrogen (1 electron) but fails for multi-electron atoms because it ignores electron-electron repulsions.",
  },
  "2.17": {
    steps: [
      { stepTitle: "Calculate energy difference for the given transition", content: "Use Eₙ = −2.18×10⁻¹⁸/n² J\nΔE = E_final − E_initial (negative value = emission)" },
      { stepTitle: "Find wavelength and spectral series", content: "λ = hc/|ΔE|\nIdentify series: Lyman (n₁=1, UV), Balmer (n₁=2, visible), Paschen (n₁=3, IR)" },
    ],
    explanation: "Any transition to n=1 belongs to the Lyman series (UV). To n=2 is Balmer (visible). The series an emission line belongs to tells us which energy level the electron falls to.",
  },
  "2.18": {
    steps: [
      { stepTitle: "List the hydrogen spectral series", content: "Lyman: n₁=1 (UV, 91–122 nm)\nBalmer: n₁=2 (visible, 365–656 nm)\nPaschen: n₁=3 (near-IR, 820–1875 nm)\nBrackett: n₁=4 (IR)\nPfund: n₁=5 (far-IR)" },
      { stepTitle: "Calculate or identify the relevant series for the given line", content: "Use 1/λ = R_H(1/n₁² − 1/n₂²) with appropriate n₁\nSeries limit: n₂ → ∞ → 1/λ = R_H/n₁²" },
    ],
    explanation: "Each series converges at a limit wavelength (n₂→∞) — this corresponds to ionisation from that orbit. The series overlap in the infrared region.",
  },
  "2.19": {
    steps: [
      { stepTitle: "Calculate ΔE for n=2 to n=1 transition", content: "ΔE = E₁ − E₂ = −2.18×10⁻¹⁸(1 − 1/4) = −1.635×10⁻¹⁸ J (emission)" },
      { stepTitle: "Calculate wavelength and frequency", content: "λ = hc/|ΔE| = (6.626×10⁻³⁴ × 3×10⁸)/1.635×10⁻¹⁸ = 121.6 nm\nν = c/λ = 2.467 × 10¹⁵ Hz" },
    ],
    explanation: "This is the Lyman alpha line (121.6 nm) — the strongest spectral line in the hydrogen spectrum. It's used in astrophysics to detect hydrogen gas in distant galaxies.",
  },
  "2.20": {
    steps: [
      { stepTitle: "Apply de Broglie equation: λ = h/mv", content: "m = 9.109×10⁻³¹ kg (electron mass)\nv = velocity of electron (given or use Bohr model: v₁ = 2.18×10⁶ m/s for n=1)" },
      { stepTitle: "Calculate de Broglie wavelength", content: "λ = h/mv = (6.626×10⁻³⁴)/(9.109×10⁻³¹ × v)\nFor n=1: λ = 3.32 × 10⁻¹⁰ m = 3.32 Å" },
    ],
    explanation: "The de Broglie wavelength of an electron in the first Bohr orbit (~3.3 Å) is comparable to atomic dimensions. This wave nature is confirmed by electron diffraction experiments and is the basis of electron microscopy.",
  },
  "2.21": {
    steps: [
      { stepTitle: "Apply Heisenberg's principle: Δx·Δp ≥ h/4π", content: "Given Δx = 0.001 nm = 1×10⁻¹² m\nΔp ≥ h/(4π·Δx) = 6.626×10⁻³⁴/(4π × 10⁻¹²) = 5.27×10⁻²³ kg·m/s" },
      { stepTitle: "Calculate uncertainty in velocity", content: "Δv = Δp/m = 5.27×10⁻²³/9.109×10⁻³¹ = 5.79×10⁷ m/s ≈ 19% of speed of light" },
    ],
    explanation: "Confining an electron to 0.001 nm creates a velocity uncertainty of ~19% the speed of light. This is why electrons can't be localised inside a nucleus (~0.0001 nm) — they'd need nearly infinite kinetic energy.",
  },
  "2.22": {
    steps: [
      { stepTitle: "Calculate momentum uncertainty: Δp = m·Δv", content: "Δv = given velocity uncertainty\nΔp = 9.109×10⁻³¹ × Δv" },
      { stepTitle: "Find minimum position uncertainty: Δx ≥ h/(4π·Δp)", content: "Δx ≥ (6.626×10⁻³⁴)/(4π × Δp)" },
    ],
    explanation: "A position uncertainty of ~1 Å is comparable to atomic size. This fundamental limit means we can never simultaneously know both the exact position and velocity of an electron — the act of measurement disturbs the system.",
  },
  "2.23": {
    steps: [
      { stepTitle: "Apply de Broglie: λ = h/mv for the macroscopic object", content: "Use the given mass (m) and velocity (v)\nλ = h/mv = 6.626×10⁻³⁴/(m × v)" },
      { stepTitle: "Compare to atomic scale", content: "If λ << 10⁻¹⁰ m (atom size), wave properties are undetectable\nMacroscopic objects have negligibly small de Broglie wavelengths" },
    ],
    explanation: "For macroscopic objects, the de Broglie wavelength is so small (~10⁻³⁰ to 10⁻³⁵ m) that wave behaviour is completely unobservable. This is why we need quantum mechanics only for particles at atomic scale.",
  },
  "2.24": {
    steps: [
      { stepTitle: "State what 'stationary electron' implies", content: "Stationary → v = 0 → Δv = 0 → Δp = 0" },
      { stepTitle: "Apply Heisenberg: Δx·Δp ≥ h/4π", content: "If Δp = 0: Δx = h/(4π × 0) → ∞\nAn electron with exactly known momentum (p=0) must be completely delocalised (Δx = ∞)" },
    ],
    explanation: "A stationary electron would have zero momentum uncertainty, requiring infinite position uncertainty — it could be anywhere in the universe. This is why electrons in atoms are always moving and why atoms don't collapse.",
  },
  "2.25": {
    steps: [
      { stepTitle: "Calculate momentum uncertainty for the bullet", content: "m = 0.040 kg, Δv = given\nΔp = m·Δv" },
      { stepTitle: "Calculate position uncertainty: Δx ≥ h/(4π·Δp)", content: "Δx ≥ (6.626×10⁻³⁴)/(4π × Δp)\nResult is ~10⁻²⁹ m — negligible for any practical purpose" },
    ],
    explanation: "For macroscopic objects, quantum uncertainty is immeasurably small. The Heisenberg principle applies universally, but its effects only become significant at atomic/subatomic scales where masses are ~10⁻³⁰ kg.",
  },
  "2.26": {
    steps: [
      { stepTitle: "List shells and their principal quantum numbers", content: "K: n=1; L: n=2; M: n=3; N: n=4" },
      { stepTitle: "Count orbitals (n²) and max electrons (2n²)", content: "K: 1 orbital, 2e\nL: 4 orbitals, 8e\nM: 9 orbitals, 18e\nN: 16 orbitals, 32e" },
    ],
    explanation: "Each shell n contains n² orbitals and holds a maximum of 2n² electrons. The 2n² formula comes from n² orbitals × 2 electrons per orbital (Pauli exclusion). This pattern governs the structure of the periodic table.",
  },
  "2.27": {
    steps: [
      { stepTitle: "Identify subshell and count orbitals", content: "d subshell: l=2, so mₗ = −2,−1,0,+1,+2 → 5 orbitals" },
      { stepTitle: "Apply Pauli exclusion: 2 electrons per orbital", content: "Max electrons in any d subshell = 5 × 2 = 10" },
    ],
    explanation: "Any d subshell (3d, 4d, 5d) has exactly 5 orbitals and holds maximum 10 electrons. This is why the d-block spans 10 groups (3–12) in the periodic table.",
  },
  "2.28": {
    steps: [
      { stepTitle: "List quantum numbers for 3d: n=3, l=2", content: "mₗ values: −2, −1, 0, +1, +2 (5 orbitals)\nFor each mₗ, mₛ = +½ or −½" },
      { stepTitle: "Write all 10 quantum number sets", content: "(3,2,−2,+½), (3,2,−2,−½)\n(3,2,−1,+½), (3,2,−1,−½)\n(3,2,0,+½), (3,2,0,−½)\n(3,2,+1,+½), (3,2,+1,−½)\n(3,2,+2,+½), (3,2,+2,−½)" },
    ],
    explanation: "Each unique set of 4 quantum numbers (n, l, mₗ, mₛ) describes exactly one electron (Pauli exclusion principle). The 10 sets confirm that 3d holds exactly 10 electrons.",
  },
  "2.29": {
    steps: [
      { stepTitle: "Rules: n≥1; 0≤l≤n−1; −l≤mₗ≤+l; mₛ=±½", content: "Check each quantum number set against all four rules" },
      { stepTitle: "Evaluate each set", content: "Not allowed if:\n- l ≥ n (e.g., n=3,l=3 → invalid)\n- |mₗ| > l (e.g., l=2,mₗ=3 → invalid)\n- l ≥ n (e.g., n=2,l=2 → invalid)\nAll rules must be satisfied simultaneously" },
    ],
    explanation: "The quantum number rules arise from solving the Schrödinger equation. Any violation corresponds to a physically impossible electron state — the wave function doesn't exist for those combinations.",
  },
  "2.30": {
    steps: [
      { stepTitle: "Determine subshell from l: 0=s, 1=p, 2=d, 3=f", content: "Name the subshell (e.g., n=3,l=2 → 3d)" },
      { stepTitle: "Count orbitals = 2l+1 and max electrons = 2(2l+1)", content: "l=0: 1 orbital (s), max 2e\nl=1: 3 orbitals (p), max 6e\nl=2: 5 orbitals (d), max 10e\nl=3: 7 orbitals (f), max 14e" },
    ],
    explanation: "The number of orbitals (2l+1) and the maximum electrons (2(2l+1)) follow directly from the allowed mₗ values. These numbers determine the block widths in the periodic table (s=2, p=6, d=10, f=14).",
  },
  "2.31": {
    steps: [
      { stepTitle: "Write configuration of the element/ion", content: "Use Aufbau principle for the given element\nFor ions: remove electrons from highest n first" },
      { stepTitle: "Count electrons with specified quantum number", content: "Identify which orbitals have mₗ=0 (all s, central p orbital, dz², etc.)\nCount electrons occupying those orbitals" },
    ],
    explanation: "The mₗ value specifies orbital orientation. mₗ=0 includes: all s orbitals, the pz (central p), the dz², and similar. Counting these requires knowing the configuration and which orbital each mₗ represents.",
  },
  "2.32": {
    steps: [
      { stepTitle: "Apply Hund's rule: one electron per orbital before pairing", content: "Fill degenerate orbitals singly with parallel spins first\nOnly add a second electron (opposite spin) when all orbitals have one" },
      { stepTitle: "Draw orbital box diagram", content: "Example for p²: ↑ ↑ _ (2 unpaired)\nExample for p³: ↑ ↑ ↑ (3 unpaired)\nExample for p⁴: ↑↓ ↑ ↑ (2 unpaired)" },
    ],
    explanation: "Hund's rule minimises electron-electron repulsion by keeping electrons in separate orbitals. The state with maximum unpaired electrons (maximum spin multiplicity) has the lowest energy.",
  },
  "2.33": {
    steps: [
      { stepTitle: "Write configuration using Aufbau order", content: "Fill: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d...\nUse (n+l) rule: lower (n+l) fills first; equal (n+l) → lower n first" },
      { stepTitle: "Apply all three principles", content: "Pauli: ≤2 electrons per orbital\nHund: fill degenerate orbitals singly before pairing\nAufbau: fill lower energy first" },
    ],
    explanation: "The three rules together give the ground state configuration. The (n+l) rule orders subshells: 4s (n+l=4) fills before 3d (n+l=5), which is why Group 1/2 elements have 4s¹/² before the d-block elements.",
  },
  "2.34": {
    steps: [
      { stepTitle: "Write expected Aufbau configuration", content: "Write the configuration following the standard order" },
      { stepTitle: "Check for Cr/Cu exceptions", content: "Cr (Z=24): [Ar]3d⁵4s¹ (not 3d⁴4s²) — half-filled 3d stability\nCu (Z=29): [Ar]3d¹⁰4s¹ (not 3d⁹4s²) — completely filled 3d stability" },
    ],
    explanation: "Chromium and copper (and their period 5/6 analogues: Mo, Ag, W, Au) are exceptions to the Aufbau prediction because half-filled and fully-filled d subshells have extra stability due to exchange energy.",
  },
  "2.35": {
    steps: [
      { stepTitle: "Write electronic configuration and draw orbital diagram", content: "For each degenerate subshell, apply Hund's rule\nCount electrons that are alone in their orbital (singly occupied orbitals)" },
      { stepTitle: "Determine magnetic character", content: "≥1 unpaired electrons → paramagnetic (attracted to magnetic field)\nAll electrons paired → diamagnetic (weakly repelled)" },
    ],
    explanation: "Unpaired electrons have a net magnetic moment (due to spin). Paramagnetic substances are pulled into a magnetic field; diamagnetic ones are pushed out. The number of unpaired electrons is measurable from magnetic susceptibility.",
  },
  "2.36": {
    steps: [
      { stepTitle: "Write the full electronic configuration", content: "Find element from Z, fill orbitals using Aufbau, Pauli, Hund\nCheck for exceptions (Cr, Cu)" },
      { stepTitle: "Use noble gas core notation", content: "Find the nearest noble gas with Z < element\nWrite [Noble gas] + remaining electrons\nE.g., Fe: [Ar]3d⁶4s²" },
    ],
    explanation: "Noble gas core notation highlights only the valence electrons — the ones that determine chemical behaviour. The core electrons of the noble gas are chemically inert and are written as a symbol in brackets.",
  },
  "2.37": {
    steps: [
      { stepTitle: "Identify the atom/ion and write its configuration", content: "Use Z to determine the element\nFor ions, add/remove electrons from appropriate shells" },
      { stepTitle: "Count electrons with the specified quantum number", content: "Identify all orbitals where that quantum number applies\nCount electrons in those orbitals" },
    ],
    explanation: "Quantum number analysis of a configuration requires identifying which orbital (n,l,mₗ) each electron occupies. The mₛ quantum number (±½) tells us each orbital holds at most 2 electrons.",
  },
  "2.38": {
    steps: [
      { stepTitle: "Write electronic configuration of Na (Z=11)", content: "1s²2s²2p⁶3s¹\nShorthand: [Ne]3s¹" },
      { stepTitle: "Identify valence shell and valence electrons", content: "Outermost shell: n=3\n1 valence electron in 3s¹ → Group 1 (alkali metal)" },
    ],
    explanation: "Na's single 3s¹ valence electron is easily lost (low IE = 496 kJ/mol) to give Na⁺ with a stable [Ne] configuration. This explains Na's reactivity, +1 oxidation state, and ionic bonding.",
  },
  "2.39": {
    steps: [
      { stepTitle: "Write configuration of Cl (Z=17)", content: "1s²2s²2p⁶3s²3p⁵ = [Ne]3s²3p⁵\n7 valence electrons" },
      { stepTitle: "Identify block, period, and group", content: "Last e⁻ enters 3p → p-block, Period 3\n7 valence electrons → Group 17 (halogens)" },
    ],
    explanation: "Chlorine's 3p⁵ configuration (one short of the stable 3p⁶ of Ar) makes it strongly electronegative. It gains one electron to become Cl⁻ (isoelectronic with Ar), explaining its role as a strong oxidising agent.",
  },
  "2.40": {
    steps: [
      { stepTitle: "Write configuration of Ar (Z=18)", content: "1s²2s²2p⁶3s²3p⁶\nAll subshells completely filled" },
      { stepTitle: "Explain chemical inertness", content: "Filled valence shell → very high IE (1521 kJ/mol)\nPositive electron gain enthalpy → won't accept electrons\nResult: chemically inert noble gas" },
    ],
    explanation: "Noble gases with completely filled valence shells (s²p⁶) have no tendency to lose or gain electrons. This makes them chemically inert under normal conditions. Heavier noble gases (Kr, Xe) can be forced to react under special conditions.",
  },
  "2.41": {
    steps: [
      { stepTitle: "Write configuration of P (Z=15): [Ne]3s²3p³", content: "3p orbital diagram: ↑ ↑ ↑ (Hund's rule — 3 singly occupied)\n3 unpaired electrons" },
      { stepTitle: "Determine magnetic character", content: "3 unpaired electrons → paramagnetic" },
    ],
    explanation: "Phosphorus's half-filled 3p³ (Hund's rule) gives it 3 unpaired electrons and maximum spin multiplicity. This half-filled stability also explains why P has slightly higher IE than S (which has 3p⁴ with one forced-pairing).",
  },
  "2.42": {
    steps: [
      { stepTitle: "Write configuration of Fe (Z=26): [Ar]3d⁶4s²", content: "3d orbital diagram: ↑↓ ↑ ↑ ↑ ↑ (applying Hund's rule to 3d⁶)\n4 unpaired electrons" },
      { stepTitle: "Write Fe²⁺ and Fe³⁺ configurations", content: "Fe²⁺ (remove 4s electrons first): [Ar]3d⁶ → 4 unpaired\nFe³⁺: [Ar]3d⁵ → 5 unpaired (half-filled, most stable)" },
    ],
    explanation: "When Fe is ionised, 4s electrons are removed before 3d (even though 4s filled first). Fe³⁺ with 3d⁵ is especially stable due to the half-filled d subshell, explaining why Fe³⁺ often more stable than Fe²⁺.",
  },
  "2.43": {
    steps: [
      { stepTitle: "Write configuration of Cu (Z=29) — exception!", content: "Expected: [Ar]3d⁹4s²\nActual: [Ar]3d¹⁰4s¹ (3d¹⁰ fully filled → extra stable)" },
      { stepTitle: "Write Cu⁺ and Cu²⁺ configurations", content: "Cu⁺: [Ar]3d¹⁰ (stable, fully filled d)\nCu²⁺: [Ar]3d⁹ → 1 unpaired electron" },
    ],
    explanation: "Cu's anomalous configuration ([Ar]3d¹⁰4s¹) reflects the extra stability of the fully filled 3d¹⁰ subshell. Similar exceptions: Ag ([Kr]4d¹⁰5s¹), Au ([Xe]4f¹⁴5d¹⁰6s¹).",
  },
  "2.44": {
    steps: [
      { stepTitle: "Write configuration using Aufbau and identify block", content: "Block = type of subshell receiving the differentiating electron\ns-block: last e⁻ in ns; p-block: np; d-block: (n-1)d; f-block: (n-2)f" },
      { stepTitle: "Identify period and group", content: "Period = highest n in the configuration\nGroup: main group = valence electrons; d-block = d+s valence electrons" },
    ],
    explanation: "The periodic table is organised by electron configuration. Block, period, and group can all be read from the configuration. This is the connection between quantum mechanics and chemical periodicity.",
  },
  "2.45": {
    steps: [
      { stepTitle: "Count total electrons to find Z", content: "Add all electrons in the configuration\nTotal = atomic number Z → look up element" },
      { stepTitle: "Position in periodic table", content: "Identify period (highest n), block (last subshell), group (valence electrons)" },
    ],
    explanation: "Reading configurations backwards to identify elements is a key skill. Every element has a unique configuration that encodes its position in the periodic table and its chemical properties.",
  },
  "2.46": {
    steps: [
      { stepTitle: "Apply λ = c/ν to find wavelength", content: "Use given frequency or calculate from given energy: ν = E/h\nλ = c/ν" },
      { stepTitle: "Identify EM radiation region from wavelength", content: "γ-ray <0.01 nm; X-ray 0.01–10 nm; UV 10–400 nm\nVisible 400–700 nm; IR 700 nm–1 mm; Microwave 1mm–1m; Radio >1m" },
    ],
    explanation: "The EM spectrum spans from gamma rays to radio waves — all are the same phenomenon (oscillating E and B fields) with different energies. Higher frequency = shorter wavelength = higher energy photons.",
  },
  "2.47": {
    steps: [
      { stepTitle: "Calculate de Broglie wavelength: λ = h/mv", content: "If KE is given: v = √(2KE/m)\nλ = h/mv" },
      { stepTitle: "Compare to relevant scale", content: "Subatomic: wavelength comparable to atomic dimensions (Å range)\nMacroscopic: wavelength negligibly small (<<atomic scale)" },
    ],
    explanation: "De Broglie showed all matter has wave character. For electrons accelerated through voltages of ~100–1000 V, wavelengths are in the Å range — the basis of electron diffraction and electron microscopy.",
  },
  "2.48": {
    steps: [
      { stepTitle: "Determine valid quantum numbers for n=3", content: "l = 0, 1, 2 (since l ≤ n−1 = 2)\nFor each l: mₗ from −l to +l\nFor each (n,l,mₗ): mₛ = +½ or −½" },
      { stepTitle: "Count total possible sets", content: "l=0: 1 mₗ × 2 spins = 2 sets\nl=1: 3 mₗ × 2 spins = 6 sets\nl=2: 5 mₗ × 2 spins = 10 sets\nTotal = 18 = 2n² = 2×9" },
    ],
    explanation: "The total number of quantum number sets for shell n equals 2n² — one set per electron. For n=3: 18 possible electrons, matching the maximum capacity of the M shell.",
  },
  "2.49": {
    steps: [
      { stepTitle: "List subshells in n=4", content: "l=0 → 4s; l=1 → 4p; l=2 → 4d; l=3 → 4f" },
      { stepTitle: "Count orbitals and electrons", content: "4s: 1 orbital, 2e\n4p: 3 orbitals, 6e\n4d: 5 orbitals, 10e\n4f: 7 orbitals, 14e\nTotal: 16 orbitals, 32 electrons = 2(4)² = 32" },
    ],
    explanation: "Shell n=4 contains 4 subshells (4s, 4p, 4d, 4f) and holds 32 electrons. The 4f electrons don't fill in Period 4 — they fill in Period 6 (after 6s and 5d start). This is the lanthanide contraction.",
  },
  "2.50": {
    steps: [
      { stepTitle: "Write configuration of N (Z=7): 1s²2s²2p³", content: "2p orbital: ↑ ↑ ↑ (Hund's rule: 3 singly occupied)\n3 unpaired electrons" },
      { stepTitle: "Determine magnetic character", content: "3 unpaired electrons → paramagnetic\nN₂ molecule: all electrons paired in MOs → diamagnetic" },
    ],
    explanation: "Nitrogen atom is paramagnetic (3 unpaired e⁻), but N₂ is diamagnetic because the triple bond (one σ + two π) pairs all electrons. This illustrates the difference between atomic and molecular electronic structures.",
  },
  "2.51": {
    steps: [
      { stepTitle: "List quantum numbers for 3p (n=3, l=1)", content: "mₗ = −1, 0, +1 (3 orbitals)\nmₛ = +½ or −½ for each" },
      { stepTitle: "Write all 6 sets for fully filled 3p⁶", content: "(3,1,−1,+½), (3,1,−1,−½)\n(3,1,0,+½), (3,1,0,−½)\n(3,1,+1,+½), (3,1,+1,−½)" },
    ],
    explanation: "The 6 quantum number sets for 3p confirm its capacity of 6 electrons. Noble gases Ar and higher have filled 3p⁶ configurations, giving them stability and chemical inertness.",
  },
  "2.52": {
    steps: [
      { stepTitle: "Write configuration of Si (Z=14): [Ne]3s²3p²", content: "3p orbital: ↑ _ ↑ _ (Hund's rule: singly fill before pairing)\n2 unpaired electrons" },
      { stepTitle: "Determine magnetic character", content: "2 unpaired electrons → paramagnetic" },
    ],
    explanation: "Silicon's 3p² configuration (like carbon's 2p²) gives 2 unpaired electrons and 4 total valence electrons. This 4-valence-electron character makes Si the basis of semiconductors — it can form 4 bonds like carbon.",
  },
  "2.53": {
    steps: [
      { stepTitle: "Identify the orbital from (n, l, mₗ)", content: "n=2, l=1, mₗ=−1 → one specific 2p orbital" },
      { stepTitle: "Apply Pauli exclusion principle", content: "Each orbital can hold exactly 2 electrons with opposite spins (mₛ = +½ and −½)\nAnswer: maximum 2 electrons" },
    ],
    explanation: "Every orbital (defined by n, l, mₗ) holds exactly 2 electrons. This limit — imposed by the Pauli exclusion principle — determines the entire structure of the periodic table.",
  },
  "2.54": {
    steps: [
      { stepTitle: "Check validity of each quantum number set", content: "Rules: n≥1; 0≤l≤n−1; −l≤mₗ≤+l; mₛ=±½\nCheck l≤n−1 first (most common violation)" },
      { stepTitle: "Identify the not-possible set and explain the violation", content: "State which rule is violated and why that quantum state cannot physically exist" },
    ],
    explanation: "Physically impossible quantum states don't have corresponding wave function solutions. The rules aren't arbitrary — they arise from the mathematics of solving the Schrödinger equation for a central potential.",
  },
  "2.55": {
    steps: [
      { stepTitle: "Write the complete configuration using Aufbau order", content: "Fill from 1s upward, applying all three principles\nUse core notation if helpful" },
      { stepTitle: "Count electrons matching given quantum number criterion", content: "For mₗ=0: count all s electrons (any n) + pz + dz² electrons in occupied orbitals\nFor mₛ=+½: count all 'spin-up' electrons" },
    ],
    explanation: "Counting electrons by quantum number requires visualising the complete orbital box diagram. The spin-up (mₛ=+½) and spin-down (mₛ=−½) electrons are typically equal in closed subshells but differ in partially filled ones (Hund's rule).",
  },
  "2.56": {
    steps: [
      { stepTitle: "Understand hierarchy: shell → subshell → orbital → electron", content: "Shell n has n² orbitals; each orbital holds max 2 electrons\nSubshell l has (2l+1) orbitals; max 2(2l+1) electrons" },
      { stepTitle: "Calculate for the specified quantum numbers", content: "Apply the appropriate formula based on what is specified\nOr count from the configuration directly" },
    ],
    explanation: "The quantum number hierarchy is both a mathematical structure and a physical description: n → energy level, l → shape, mₗ → orientation, mₛ → spin. Moving from n to mₛ progressively narrows down the electron's 'address'.",
  },
  "2.57": {
    steps: [
      { stepTitle: "Identify element from configuration", content: "Count total electrons to get Z\nNote the last subshell filled to identify block and exceptions" },
      { stepTitle: "State period, block, and group", content: "Period = highest n; Block = last subshell type\nGroup for d-block = number of (n-1)d + ns electrons" },
    ],
    explanation: "The element's position in the periodic table is fully determined by its electronic configuration. Chromium's [Ar]3d⁵4s¹ configuration places it in Period 4, d-block, Group 6.",
  },
  "2.58": {
    steps: [
      { stepTitle: "Write configuration for the given species and apply Hund's rule", content: "Draw orbital box diagram for the relevant subshell\nCount singly occupied orbitals = number of unpaired electrons (n)" },
      { stepTitle: "Calculate magnetic moment: μ = √(n(n+2)) BM", content: "Substitute n (unpaired electrons) into the formula\nHigher n → larger magnetic moment → stronger paramagnetism" },
    ],
    explanation: "Magnetic moment μ = √(n(n+2)) BM (Bohr Magnetons) where n = unpaired electrons. This formula accounts for both spin and orbital angular momentum. Transition metal ions with high unpaired e⁻ count (Mn²⁺, Fe³⁺: 5 unpaired, μ=5.92 BM) are strongly paramagnetic.",
  },
  "2.59": {
    steps: [
      { stepTitle: "Write full configuration for the given element", content: "Build from 1s following Aufbau order\nCheck for exceptions (Cr, Cu, Mo, Ag, etc.)" },
      { stepTitle: "Identify position in periodic table", content: "Period = highest n; Block = differentiating subshell type\nGroup = total valence electrons (main group) or special rule (transition metals)" },
    ],
    explanation: "Every element's chemistry can be traced to its electronic configuration. The configuration tells you the period (highest n), the block (last subshell type), and the group (valence electron count).",
  },
  "2.60": {
    steps: [
      { stepTitle: "Apply Rydberg formula or Bohr energy formula", content: "For wavelength: 1/λ = R_H(1/n₁² − 1/n₂²)\nFor energy: ΔE = −2.18×10⁻¹⁸(1/n₁² − 1/n₂²) J" },
      { stepTitle: "Identify spectral series and calculate λ or ν", content: "n₁=1→Lyman(UV); n₁=2→Balmer(visible); n₁=3→Paschen(near-IR)\nλ=hc/ΔE; ν=ΔE/h" },
    ],
    explanation: "The Rydberg formula is universal for all hydrogen spectral lines. The series (n₁) determines the wavelength range; the upper level (n₂) determines the exact line within that series.",
  },
  "2.61": {
    steps: [
      { stepTitle: "Find quantum level n from given energy", content: "Use Eₙ = −2.18×10⁻¹⁸/n² J → n = √(2.18×10⁻¹⁸/|Eₙ|)" },
      { stepTitle: "Calculate radius or velocity at that n", content: "rₙ = 0.529n² Å\nvₙ = 2.18×10⁶/n m/s" },
    ],
    explanation: "In Bohr's model, energy, radius, and velocity are all functions of n alone. Given any one of these, you can find n and then calculate the others. This one-parameter description is the key simplification of Bohr's theory.",
  },
  "2.62": {
    steps: [
      { stepTitle: "Identify the orbital from quantum numbers", content: "Given n and l, name the subshell (e.g., n=4,l=2 → 4d)\nCount orbitals: 2l+1 = 5 for d subshell" },
      { stepTitle: "Calculate max electrons and answer the specific question", content: "Max electrons = 2(2l+1) = 10 for d\nElectrons with mₛ=+½ = max 5 (one per orbital, Hund's rule in ground state)" },
    ],
    explanation: "The 4d (and any d) subshell has 5 orbitals that in the ground state are half-filled (one each, Hund) before pairing. This gives 5 electrons with mₛ=+½ and 0-5 with mₛ=−½ depending on total electron count.",
  },
  "2.63": {
    steps: [
      { stepTitle: "Write configurations: Li(Z=3) and Be(Z=4)", content: "Li: 1s²2s¹ → 1 unpaired electron → paramagnetic\nBe: 1s²2s² → 0 unpaired electrons → diamagnetic" },
      { stepTitle: "Determine magnetic character", content: "Paramagnetic: unpaired electrons create magnetic dipoles → attracted to B field\nDiamagnetic: all paired → no net magnetic moment → weakly repelled" },
    ],
    explanation: "Paramagnetism vs diamagnetism is directly observable: paramagnetic samples are attracted to a strong magnet (measurable with a Gouy balance), while diamagnetic samples show weak repulsion. The key is unpaired electron count.",
  },
  "2.64": {
    steps: [
      { stepTitle: "Write configuration of the ion", content: "For transition metal cations: remove 4s before 3d\nFor anions: add to next available orbital\nApply Pauli and Hund to the ionic configuration" },
      { stepTitle: "Count unpaired electrons and state magnetic character", content: "Draw orbital box diagram for highest energy subshell\nCount singly occupied orbitals" },
    ],
    explanation: "A key point: when transition metals are ionised, the 4s electrons are removed first (before 3d), even though 4s was filled first. In the ionic state, the 3d energy is lower than 4s.",
  },
  "2.65": {
    steps: [
      { stepTitle: "Apply shell, subshell, and orbital capacity formulas", content: "Shell n: n² orbitals, 2n² max electrons\nSubshell (l): (2l+1) orbitals, 2(2l+1) max electrons\nOrbital: exactly 2 electrons" },
      { stepTitle: "Calculate for the given n and l values", content: "Substitute into formulas\nList subshells within the shell if asked" },
    ],
    explanation: "The hierarchical capacity formulas (n², 2n², 2l+1, 2(2l+1)) are all derived from the allowed quantum number ranges. Memorising these patterns makes configuration and orbital calculations much faster.",
  },
  "2.66": {
    steps: [
      { stepTitle: "Apply Aufbau principle to fill orbitals in order", content: "1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p...\nFill each before moving to the next" },
      { stepTitle: "Apply Pauli (max 2 per orbital) and Hund (singly fill degenerate first)", content: "Draw orbital box diagram\nWrite spectroscopic notation with superscripts" },
    ],
    explanation: "All three rules are needed for the correct ground state: Aufbau gives the order, Pauli limits the count, Hund determines spin arrangement. The configuration produced minimises energy and correctly predicts chemical properties.",
  },
  "2.67": {
    steps: [
      { stepTitle: "Write the configuration in spectroscopic notation", content: "List each subshell with electron count as superscript\nE.g.: 1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶..." },
      { stepTitle: "Simplify using noble gas core", content: "Replace inner electrons with [Noble gas]\nE.g., [Ar] replaces 1s²2s²2p⁶3s²3p⁶ for Z=18 core" },
    ],
    explanation: "Noble gas core notation is the standard shorthand. It focuses attention on valence electrons, which determine reactivity. Always verify: [Noble gas] + remaining electrons = total Z of the element.",
  },
};

let enriched = 0;
const updated = questions.map((q) => {
  const e = enrichments[q.questionNumber];
  if (!e) return q;
  enriched++;
  return { ...q, steps: e.steps, explanation: q.explanation ?? e.explanation };
});

writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf-8");
console.log(`✓ Updated ${enriched} of ${questions.length} questions with steps and explanations.`);
