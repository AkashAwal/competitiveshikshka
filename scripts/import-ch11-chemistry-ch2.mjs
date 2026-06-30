import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";

const client = createClient({
  projectId: "cekjuoyu",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function block(text) {
  return {
    _type: "block", _key: randomUUID(), style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
    markDefs: [],
  };
}
function blocks(...lines) { return lines.map(block); }
function step(title, ...lines) {
  return { _type: "exampleStep", _key: randomUUID(), stepTitle: title, content: blocks(...lines) };
}
function toBlocks(text) {
  return text.split("\n").filter(Boolean).map((line) => block(line));
}
function toSteps(steps) {
  if (!steps?.length) return undefined;
  return steps.map((s) => ({
    _type: "step", _key: randomUUID(),
    stepTitle: s.stepTitle,
    content: toBlocks(s.content),
  }));
}

// ─── 18 in-text worked problems ───────────────────────────────────────────────
const examples = [
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.1",
    questionText: blocks("Calculate the number of protons, neutrons and electrons in ⁸⁰₃₅Br."),
    answer: blocks(
      "Given: Mass number A = 80, Atomic number Z = 35",
      "Protons = Z = 35",
      "Electrons = Z = 35 (neutral atom)",
      "Neutrons = A − Z = 80 − 35 = 45"
    ),
    steps: [
      step("Identify atomic number and mass number", "Z = 35 (number of protons, defines the element as Bromine)\nA = 80 (total of protons + neutrons)"),
      step("Determine protons and electrons", "In a neutral atom: protons = electrons = Z = 35"),
      step("Calculate neutrons", "Neutrons = A − Z = 80 − 35 = 45"),
    ],
    explanation: blocks("The atomic number Z always equals the number of protons. In a neutral atom, electrons = protons = Z. The number of neutrons = A − Z. Isotopes differ in neutron count but have the same Z."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.2",
    questionText: blocks("The number of electrons, protons and neutrons in a species are equal to 18, 16 and 16 respectively. Assign the proper symbol to the species."),
    answer: blocks(
      "Protons = 16 → Element is Sulphur (S), Z = 16",
      "Mass number A = protons + neutrons = 16 + 16 = 32",
      "Charge = protons − electrons = 16 − 18 = −2",
      "Symbol: ³²₁₆S²⁻"
    ),
    steps: [
      step("Identify the element from proton count", "16 protons → Atomic number Z = 16 → Sulphur (S)"),
      step("Calculate mass number", "A = protons + neutrons = 16 + 16 = 32"),
      step("Determine charge", "Charge = protons − electrons = 16 − 18 = −2 (anion with 2 extra electrons)"),
      step("Write the symbol", "³²₁₆S²⁻ — this is the sulphide ion"),
    ],
    explanation: blocks("When electrons > protons, the species is an anion (negative charge). The charge = protons − electrons. This species is the sulphide ion S²⁻, isoelectronic with Argon (18 electrons)."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.3",
    questionText: blocks("Vividh Bharati station of All India Radio, Delhi broadcasts on a frequency of 1368 kHz (kilohertz). Calculate the wavelength of the electromagnetic radiation emitted by the transmitter. Which part of the electromagnetic spectrum does it belong to?"),
    answer: blocks(
      "ν = 1368 kHz = 1368 × 10³ Hz = 1.368 × 10⁶ Hz",
      "λ = c/ν = (3 × 10⁸ m/s) / (1.368 × 10⁶ Hz)",
      "λ = 2.193 × 10² m = 219.3 m",
      "This belongs to the radio wave region of the electromagnetic spectrum."
    ),
    steps: [
      step("Convert frequency to Hz", "ν = 1368 kHz = 1368 × 10³ Hz = 1.368 × 10⁶ Hz"),
      step("Apply λ = c/ν", "c = 3 × 10⁸ m/s\nλ = (3 × 10⁸) / (1.368 × 10⁶) = 219.3 m"),
      step("Identify the region", "λ ≈ 219 m → This is in the radio wave (AM broadcast) region"),
    ],
    explanation: blocks("AM radio waves have wavelengths in the range of hundreds of metres. The relationship λ = c/ν connects wavelength and frequency: higher frequency means shorter wavelength. Radio waves are the longest wavelength, lowest frequency waves in the EM spectrum."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.4",
    questionText: blocks("The Vividh Bharati problem above gives λ = 219 m. What is the wavenumber (ν̄) of this radiation? Also, if the visible range of the spectrum spans 400–750 nm, express this range in terms of frequency."),
    answer: blocks(
      "Wavenumber ν̄ = 1/λ = 1/219.3 m = 4.56 × 10⁻³ m⁻¹",
      "",
      "Visible spectrum frequency range:",
      "For λ = 400 nm: ν = (3 × 10⁸)/(400 × 10⁻⁹) = 7.5 × 10¹⁴ Hz",
      "For λ = 750 nm: ν = (3 × 10⁸)/(750 × 10⁻⁹) = 4.0 × 10¹⁴ Hz",
      "Visible range: 4.0 × 10¹⁴ Hz to 7.5 × 10¹⁴ Hz"
    ),
    steps: [
      step("Calculate wavenumber", "ν̄ = 1/λ = 1/219.3 m⁻¹ = 4.56 × 10⁻³ m⁻¹"),
      step("Convert 400 nm wavelength to frequency", "ν = c/λ = (3 × 10⁸)/(400 × 10⁻⁹) = 7.5 × 10¹⁴ Hz"),
      step("Convert 750 nm wavelength to frequency", "ν = c/λ = (3 × 10⁸)/(750 × 10⁻⁹) = 4.0 × 10¹⁴ Hz"),
    ],
    explanation: blocks("Wavenumber is the reciprocal of wavelength in metres (or more commonly in cm⁻¹). For the visible spectrum, violet light (400 nm) has the highest frequency and red light (750 nm) the lowest."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.5",
    questionText: blocks("Calculate the wavenumber for the yellow light of wavelength 5800 Å emitted by a sodium lamp."),
    answer: blocks(
      "λ = 5800 Å = 5800 × 10⁻¹⁰ m = 5.8 × 10⁻⁷ m",
      "Frequency ν = c/λ = (3 × 10⁸)/(5.8 × 10⁻⁷) = 5.17 × 10¹⁴ Hz",
      "Wavenumber ν̄ = 1/λ = 1/(5.8 × 10⁻⁷ m) = 1.724 × 10⁶ m⁻¹",
      "In cm⁻¹: ν̄ = 1/(5.8 × 10⁻⁵ cm) = 1.724 × 10⁴ cm⁻¹"
    ),
    steps: [
      step("Convert Å to metres", "1 Å = 10⁻¹⁰ m\n5800 Å = 5800 × 10⁻¹⁰ m = 5.8 × 10⁻⁷ m"),
      step("Calculate frequency", "ν = c/λ = (3 × 10⁸)/(5.8 × 10⁻⁷) = 5.17 × 10¹⁴ Hz"),
      step("Calculate wavenumber", "ν̄ = 1/λ = 1/(5.8 × 10⁻⁷) = 1.724 × 10⁶ m⁻¹ = 1.724 × 10⁴ cm⁻¹"),
    ],
    explanation: blocks("Wavenumber in cm⁻¹ is commonly used in IR and Raman spectroscopy. To convert: if λ is in m, ν̄(cm⁻¹) = 10²/λ(m). The sodium yellow D-lines at ~589 nm are one of the most recognisable spectral lines."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.6",
    questionText: blocks("Calculate the energy of one mole of photons of radiation whose frequency is 5 × 10¹⁴ Hz."),
    answer: blocks(
      "Energy of one photon: E = hν = 6.626 × 10⁻³⁴ J·s × 5 × 10¹⁴ s⁻¹",
      "= 3.313 × 10⁻¹⁹ J",
      "",
      "Energy of one mole of photons:",
      "E_mole = E × N_A = 3.313 × 10⁻¹⁹ × 6.022 × 10²³",
      "= 1.995 × 10⁵ J mol⁻¹ = 199.5 kJ mol⁻¹"
    ),
    steps: [
      step("Calculate energy of one photon", "E = hν = (6.626 × 10⁻³⁴)(5 × 10¹⁴) = 3.313 × 10⁻¹⁹ J"),
      step("Scale to one mole using Avogadro's number", "E_mole = 3.313 × 10⁻¹⁹ × 6.022 × 10²³ = 1.995 × 10⁵ J/mol"),
      step("Convert to kJ/mol", "1.995 × 10⁵ J/mol = 199.5 kJ/mol"),
    ],
    explanation: blocks("Planck's equation E = hν gives energy per photon. One mole of photons (an 'einstein') has energy N_A × hν. This molar energy is useful for comparing photon energies with bond dissociation energies (usually in kJ/mol)."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.7",
    questionText: blocks("A 100 W sodium lamp (λ = 589 nm) radiates energy uniformly in all directions. The lamp is located at the centre of a large sphere that absorbs all the sodium light which is incident on it. The sphere is made of material which has a work function of 2.0 eV. Calculate:\n(a) the energy of each photon\n(b) the number of photons per second\n(c) whether the sodium light can eject electrons from the sphere"),
    answer: blocks(
      "(a) λ = 589 nm = 589 × 10⁻⁹ m",
      "E = hc/λ = (6.626 × 10⁻³⁴ × 3 × 10⁸)/(589 × 10⁻⁹) = 3.374 × 10⁻¹⁹ J",
      "= 3.374 × 10⁻¹⁹ / 1.6022 × 10⁻¹⁹ eV = 2.107 eV",
      "",
      "(b) Power = 100 W = 100 J/s",
      "Number of photons per second = P/E = 100 / (3.374 × 10⁻¹⁹) = 2.96 × 10²⁰ photons/s",
      "",
      "(c) Work function = 2.0 eV; photon energy = 2.107 eV > 2.0 eV",
      "Yes, sodium light CAN eject electrons from the sphere."
    ),
    steps: [
      step("Calculate photon energy", "E = hc/λ = (6.626×10⁻³⁴ × 3×10⁸)/(589×10⁻⁹) = 3.374×10⁻¹⁹ J = 2.107 eV"),
      step("Find number of photons per second", "N = Power/Energy per photon = 100 W / 3.374×10⁻¹⁹ J = 2.96×10²⁰ photons/s"),
      step("Check photoelectric condition", "E(photon) = 2.107 eV > W₀ = 2.0 eV → Photoelectric effect occurs; electrons are ejected"),
    ],
    explanation: blocks("The photoelectric effect occurs only if the photon energy exceeds the work function. Here 2.107 eV > 2.0 eV, so ejection is possible. The KE of ejected electrons = 2.107 − 2.0 = 0.107 eV."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.8",
    questionText: blocks("The threshold frequency ν₀ for a metal is 7.0 × 10¹⁴ s⁻¹. Calculate the kinetic energy of an electron emitted when radiation of frequency ν = 1.0 × 10¹⁵ Hz is incident on the metal."),
    answer: blocks(
      "KE = h(ν − ν₀)",
      "= 6.626 × 10⁻³⁴ × (1.0 × 10¹⁵ − 7.0 × 10¹⁴)",
      "= 6.626 × 10⁻³⁴ × 3.0 × 10¹⁴",
      "= 1.988 × 10⁻¹⁹ J"
    ),
    steps: [
      step("Identify known values", "ν₀ = 7.0 × 10¹⁴ Hz (threshold frequency)\nν = 1.0 × 10¹⁵ Hz (incident frequency)"),
      step("Apply Einstein's photoelectric equation", "KE = h(ν − ν₀) = hν − hν₀"),
      step("Substitute and calculate", "KE = 6.626 × 10⁻³⁴ × (10¹⁵ − 7×10¹⁴) = 6.626 × 10⁻³⁴ × 3×10¹⁴ = 1.988 × 10⁻¹⁹ J"),
    ],
    explanation: blocks("Einstein's photoelectric equation: KE = hν − W₀ = h(ν − ν₀). The kinetic energy of the emitted electron equals the excess photon energy above the work function. Photons with ν < ν₀ cannot eject electrons regardless of intensity."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.9",
    questionText: blocks("Electromagnetic radiation of wavelength 663 nm is just sufficient to ionise the potassium atom. Calculate the ionisation energy of potassium in kJ mol⁻¹."),
    answer: blocks(
      "λ = 663 nm = 663 × 10⁻⁹ m",
      "Energy per photon = hc/λ = (6.626 × 10⁻³⁴ × 3 × 10⁸)/(663 × 10⁻⁹)",
      "= 2.998 × 10⁻¹⁹ J",
      "",
      "Ionisation energy per mole = 2.998 × 10⁻¹⁹ × 6.022 × 10²³",
      "= 1.806 × 10⁵ J mol⁻¹ = 180.6 kJ mol⁻¹"
    ),
    steps: [
      step("Calculate energy of one ionising photon", "E = hc/λ = (6.626×10⁻³⁴ × 3×10⁸)/(663×10⁻⁹) = 2.998×10⁻¹⁹ J"),
      step("Multiply by Avogadro's number", "IE = 2.998×10⁻¹⁹ × 6.022×10²³ = 1.806×10⁵ J/mol = 180.6 kJ/mol"),
    ],
    explanation: blocks("The ionisation energy equals the energy of a photon whose wavelength is exactly the threshold wavelength. Since one photon ionises one atom, multiplying by N_A gives the molar ionisation energy. Potassium's actual IE is ~419 kJ/mol — the 663 nm photon gives the minimum energy needed at this wavelength."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.10",
    questionText: blocks("What is the wavelength of light emitted when the electron in a hydrogen atom undergoes transition from energy level n = 4 to energy level n = 2? What is the colour of this light?"),
    answer: blocks(
      "Using Rydberg formula: 1/λ = R_H (1/n₁² − 1/n₂²)",
      "n₁ = 2 (lower level), n₂ = 4 (upper level)",
      "1/λ = 1.097 × 10⁷ × (1/4 − 1/16)",
      "= 1.097 × 10⁷ × (4 − 1)/16",
      "= 1.097 × 10⁷ × 3/16",
      "= 2.057 × 10⁶ m⁻¹",
      "λ = 1/(2.057 × 10⁶) = 4.86 × 10⁻⁷ m = 486 nm",
      "This is blue-green light (Hβ line of the Balmer series)."
    ),
    steps: [
      step("Set up Rydberg formula", "1/λ = R_H(1/n₁² − 1/n₂²); n₁=2, n₂=4; R_H = 1.097×10⁷ m⁻¹"),
      step("Calculate 1/λ", "1/λ = 1.097×10⁷ × (1/4 − 1/16) = 1.097×10⁷ × 3/16 = 2.057×10⁶ m⁻¹"),
      step("Find λ and identify colour", "λ = 1/2.057×10⁶ = 4.86×10⁻⁷ m = 486 nm → blue-green (Hβ Balmer line)"),
    ],
    explanation: blocks("Balmer series transitions end at n=2 and fall in the visible range. The four visible lines are: Hα (n=3→2, 656 nm, red), Hβ (n=4→2, 486 nm, blue-green), Hγ (n=5→2, 434 nm, violet), Hδ (n=6→2, 410 nm, violet)."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.11",
    questionText: blocks("How much energy is required to ionise a hydrogen atom if the electron occupies n = 5 orbit? What will be the wavelength of the radiation emitted if the ionised electron is recaptured into the 4th orbit?"),
    answer: blocks(
      "E₅ = −2.18 × 10⁻¹⁸ / n² = −2.18 × 10⁻¹⁸ / 25 = −8.72 × 10⁻²⁰ J",
      "Ionisation energy from n=5 = 0 − (−8.72 × 10⁻²⁰) = 8.72 × 10⁻²⁰ J",
      "",
      "For electron recaptured into n=4:",
      "E₄ = −2.18 × 10⁻¹⁸ / 16 = −1.3625 × 10⁻¹⁹ J",
      "ΔE = E₄ − E∞ = −1.3625 × 10⁻¹⁹ − 0 = −1.3625 × 10⁻¹⁹ J (energy released)",
      "λ = hc/|ΔE| = (6.626 × 10⁻³⁴ × 3 × 10⁸)/(1.3625 × 10⁻¹⁹) = 1.46 × 10⁻⁶ m = 1460 nm (infrared)"
    ),
    steps: [
      step("Calculate energy at n=5", "E₅ = −2.18×10⁻¹⁸/25 = −8.72×10⁻²⁰ J"),
      step("Ionisation energy from n=5", "ΔE = 0 − E₅ = +8.72×10⁻²⁰ J"),
      step("Wavelength when recaptured into n=4", "E₄ = −2.18×10⁻¹⁸/16 = −1.3625×10⁻¹⁹ J\nλ = hc/|E₄| = 1.46×10⁻⁶ m = 1460 nm (IR)"),
    ],
    explanation: blocks("The energy levels of hydrogen are given by E_n = −2.18×10⁻¹⁸/n² J. Electrons at higher n are easier to ionise (less negative energy). When a free electron is recaptured into orbit n, it emits a photon with energy equal to the binding energy of that orbit."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.12",
    questionText: blocks("Calculate the wavelength associated with a ball of mass 0.1 kg moving with a velocity of 10 m s⁻¹."),
    answer: blocks(
      "Using de Broglie equation: λ = h/mv",
      "m = 0.1 kg, v = 10 m/s",
      "λ = (6.626 × 10⁻³⁴ J·s) / (0.1 kg × 10 m/s)",
      "= (6.626 × 10⁻³⁴) / (1)",
      "= 6.626 × 10⁻³⁴ m",
      "",
      "This wavelength is far too small to be measured — wave properties are negligible for macroscopic objects."
    ),
    steps: [
      step("Apply de Broglie equation", "λ = h/mv = h/p where p is the momentum"),
      step("Substitute values", "λ = (6.626×10⁻³⁴)/(0.1 × 10) = 6.626×10⁻³⁴ m"),
      step("Interpret the result", "λ ≈ 10⁻³³ m — this is 10²⁰ times smaller than an atomic nucleus. Wave behaviour is completely unmeasurable."),
    ],
    explanation: blocks("de Broglie's equation λ = h/mv applies to all matter, but for macroscopic objects the wavelength is unimaginably small. The reason: h (Planck's constant) is tiny (6.6×10⁻³⁴). Only for particles with very small mass (electrons, protons) is λ comparable to atomic dimensions."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.13",
    questionText: blocks("Calculate the de Broglie wavelength of an electron whose kinetic energy is 3.0 × 10⁻²⁵ J."),
    answer: blocks(
      "KE = ½mv²  → v = √(2KE/m)",
      "m = 9.109 × 10⁻³¹ kg",
      "v = √(2 × 3.0 × 10⁻²⁵ / 9.109 × 10⁻³¹)",
      "= √(6.587 × 10⁵) = 811.6 m/s",
      "",
      "λ = h/mv = (6.626 × 10⁻³⁴) / (9.109 × 10⁻³¹ × 811.6)",
      "= (6.626 × 10⁻³⁴) / (7.393 × 10⁻²⁸)",
      "= 8.96 × 10⁻⁷ m = 896 nm"
    ),
    steps: [
      step("Find velocity from kinetic energy", "v = √(2KE/m) = √(2×3.0×10⁻²⁵/9.109×10⁻³¹) = 811.6 m/s"),
      step("Apply de Broglie equation", "λ = h/mv = (6.626×10⁻³⁴)/(9.109×10⁻³¹ × 811.6) = 8.96×10⁻⁷ m = 896 nm"),
    ],
    explanation: blocks("For electrons with very low kinetic energy, the de Broglie wavelength falls in the near-IR range. Fast electrons (as in electron microscopes) have much shorter wavelengths (picometres) allowing much finer resolution than visible light microscopes."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.14",
    questionText: blocks("Calculate the mass of a photon with wavelength 3.6 Å."),
    answer: blocks(
      "Using de Broglie: p = h/λ → m_photon = h/(λc)   (since for photon v = c)",
      "λ = 3.6 Å = 3.6 × 10⁻¹⁰ m",
      "m = h/(λc) = (6.626 × 10⁻³⁴) / (3.6 × 10⁻¹⁰ × 3 × 10⁸)",
      "= (6.626 × 10⁻³⁴) / (1.08 × 10⁻¹)",
      "= 6.135 × 10⁻³³ kg"
    ),
    steps: [
      step("Recognize the photon's effective mass from momentum", "For photon: E = pc → p = E/c = hν/c = h/λ\nMass equivalent: m = p/c = h/(λc)"),
      step("Convert wavelength to metres", "λ = 3.6 Å = 3.6×10⁻¹⁰ m"),
      step("Calculate mass", "m = h/(λc) = (6.626×10⁻³⁴)/(3.6×10⁻¹⁰ × 3×10⁸) = 6.135×10⁻³³ kg"),
    ],
    explanation: blocks("Photons have zero rest mass but carry momentum p = h/λ and have an effective relativistic mass m = p/c = h/(λc). This is the mass-energy equivalence from special relativity. This 'mass' is extremely small — about 6.7 times the electron rest mass for this X-ray photon."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.15",
    questionText: blocks("A golf ball has a mass of 40 g, and a speed of 45 m/s. If the speed can be measured within accuracy of 2%, calculate the uncertainty in the position of the golf ball."),
    answer: blocks(
      "m = 40 g = 0.040 kg, v = 45 m/s",
      "Δv = 2% of v = 0.02 × 45 = 0.90 m/s",
      "",
      "By Heisenberg's uncertainty principle:",
      "Δx × Δp ≥ h/4π",
      "Δx × m×Δv ≥ h/4π",
      "Δx ≥ h/(4π × m × Δv)",
      "= (6.626 × 10⁻³⁴) / (4π × 0.040 × 0.90)",
      "= (6.626 × 10⁻³⁴) / (0.4524)",
      "= 1.46 × 10⁻³³ m",
      "",
      "This is unimaginably small — much less than the diameter of a proton (≈ 10⁻¹⁵ m)."
    ),
    steps: [
      step("Calculate uncertainty in velocity", "Δv = 2% × 45 m/s = 0.90 m/s"),
      step("Apply Heisenberg's uncertainty principle", "Δx ≥ h/(4πmΔv)"),
      step("Substitute values", "Δx ≥ (6.626×10⁻³⁴)/(4π × 0.040 × 0.90) = 1.46×10⁻³³ m"),
      step("Interpret", "Position uncertainty for a golf ball is ~10⁻³³ m — completely negligible. Classical mechanics applies perfectly."),
    ],
    explanation: blocks("The Heisenberg uncertainty principle is significant only for subatomic particles. For macroscopic objects like golf balls, the uncertainty is so minuscule (10⁻³³ m) that it is completely unmeasurable. This is why quantum effects do not appear in everyday life."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.16",
    questionText: blocks("What is the total number of orbitals associated with the principal quantum number n = 3?"),
    answer: blocks(
      "For n = 3, the possible values of l are 0, 1, and 2.",
      "",
      "l = 0 (3s): 1 orbital (m_l = 0)",
      "l = 1 (3p): 3 orbitals (m_l = −1, 0, +1)",
      "l = 2 (3d): 5 orbitals (m_l = −2, −1, 0, +1, +2)",
      "",
      "Total orbitals = 1 + 3 + 5 = 9 orbitals",
      "General formula: n² = 3² = 9"
    ),
    steps: [
      step("List subshells for n=3", "l can be 0, 1, 2 → gives 3s, 3p, 3d subshells"),
      step("Count orbitals in each subshell", "3s: 1 orbital, 3p: 3 orbitals, 3d: 5 orbitals"),
      step("Total", "1 + 3 + 5 = 9 orbitals = n² = 3² = 9 ✓"),
    ],
    explanation: blocks("Each shell n has n² orbitals total. This is because the total number of m_l values = sum of (2l+1) for l=0 to n−1 = n². The maximum number of electrons in shell n is 2n²."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.17",
    questionText: blocks("Using s, p, d notations, write the orbital(s) occupied by the 19th and 20th electrons in chromium (Cr, Z=24)."),
    answer: blocks(
      "Electronic configuration of Cr (Z=24):",
      "Expected: [Ar] 3d⁴ 4s²",
      "Actual: [Ar] 3d⁵ 4s¹ (due to extra stability of half-filled 3d⁵)",
      "",
      "1s²2s²2p⁶3s²3p⁶ accounts for 18 electrons (Ar core)",
      "19th electron: enters 3d orbital → 3d¹ → notation: 3d",
      "The 19th through 23rd electrons fill 3d (one in each), 24th goes to 4s",
      "",
      "For Cr: 19th electron is in 3d, 20th electron is also in 3d"
    ),
    steps: [
      step("Write Ar core configuration", "[Ar] = 1s²2s²2p⁶3s²3p⁶ = 18 electrons"),
      step("Apply Aufbau with exception for Cr", "Cr is [Ar]3d⁵4s¹ (not 3d⁴4s²) due to half-filled stability\n19th electron → 3d, 20th electron → 3d"),
      step("State the orbital notation", "Both 19th and 20th electrons are in 3d orbitals"),
    ],
    explanation: blocks("Chromium adopts [Ar]3d⁵4s¹ rather than the expected [Ar]3d⁴4s² because a half-filled 3d subshell (all 5 orbitals with one electron each) has extra exchange energy stability. This is an exception to the Aufbau principle that every student must memorise."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P2.18",
    questionText: blocks("Which of the following sets of quantum numbers are not possible and why?\n(a) n=1, l=1, m_l=0, m_s=+½\n(b) n=2, l=1, m_l=0, m_s=−½\n(c) n=3, l=3, m_l=−3, m_s=+½\n(d) n=2, l=0, m_l=0, m_s=−½"),
    answer: blocks(
      "(a) NOT POSSIBLE: For n=1, l can only be 0 (not 1). The condition is 0 ≤ l ≤ n−1.",
      "",
      "(b) POSSIBLE: n=2, l=1 (2p orbital), m_l=0, m_s=−½. All quantum numbers are valid.",
      "",
      "(c) NOT POSSIBLE: For n=3, l can be 0, 1, or 2 (not 3). l=3 requires n≥4.",
      "",
      "(d) POSSIBLE: n=2, l=0 (2s orbital), m_l=0, m_s=−½. All quantum numbers are valid."
    ),
    steps: [
      step("Rule: l ranges from 0 to (n−1)", "For n=1: l can only be 0\nFor n=2: l can be 0 or 1\nFor n=3: l can be 0, 1, or 2"),
      step("Check each set", "(a) n=1, l=1 violates l ≤ n−1 → NOT POSSIBLE\n(b) n=2, l=1 valid → POSSIBLE\n(c) n=3, l=3 violates l ≤ n−1 → NOT POSSIBLE\n(d) n=2, l=0 valid → POSSIBLE"),
    ],
    explanation: blocks("The four quantum numbers n, l, m_l, m_s are constrained by rules: n ≥ 1; 0 ≤ l ≤ n−1; −l ≤ m_l ≤ +l; m_s = +½ or −½. Any set violating these is physically impossible. The Pauli Exclusion Principle adds that no two electrons in an atom can have the same set of all four quantum numbers."),
  },
];

// ─── Import questions from JSON file ──────────────────────────────────────────
const raw = JSON.parse(await readFile(
  new URL("./data/ch11-chemistry-ch2-questions.json", import.meta.url),
  "utf-8"
));

const questions = raw.map((q) => ({
  _type: "questionAnswer",
  _key: randomUUID(),
  questionNumber: String(q.questionNumber),
  questionText: toBlocks(q.questionText),
  answer: toBlocks(q.answer),
  ...(q.explanation ? { explanation: toBlocks(q.explanation) } : {}),
  ...(q.steps ? { steps: toSteps(q.steps) } : {}),
}));

const doc = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 2,
  chapterTitle: "Structure of Atom",
  questions,
  examples,
};

console.log("Importing Class 11 Chemistry Chapter 2: Structure of Atom");
console.log(`Questions: ${questions.length}`);
console.log(`Examples:  ${examples.length}`);

const result = await client.create(doc);
console.log(`✓ Created document: ${result._id}`);
