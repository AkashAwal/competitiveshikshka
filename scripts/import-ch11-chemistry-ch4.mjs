import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
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

const IMG_DIR = resolve(root, "scripts/data/ch4-images");

// ─── content-building helpers ──────────────────────────────────────────────
function block(text) {
  return {
    _type: "block", _key: randomUUID(), style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }],
    markDefs: [],
  };
}
function textBlocks(text) {
  return text.split("\n").map((line) => block(line));
}
function img(file) {
  return { __img: file };
}
function content(...parts) {
  const out = [];
  for (const p of parts) {
    if (typeof p === "string") out.push(...textBlocks(p));
    else out.push(p);
  }
  return out;
}

const assetCache = new Map();
async function resolveImages(nodes) {
  const out = [];
  for (const node of nodes) {
    if (node.__img) {
      let assetId = assetCache.get(node.__img);
      if (!assetId) {
        const buf = await readFile(resolve(IMG_DIR, node.__img));
        const asset = await client.assets.upload("image", buf, { filename: node.__img });
        assetId = asset._id;
        assetCache.set(node.__img, assetId);
        console.log(`  uploaded ${node.__img} -> ${assetId}`);
      }
      out.push({ _type: "image", _key: randomUUID(), asset: { _type: "reference", _ref: assetId } });
    } else {
      out.push(node);
    }
  }
  return out;
}

// ─── 40 questions ───────────────────────────────────────────────────────────
const raw = [
  {
    n: "1",
    q: "Explain the formation of a chemical bond.",
    a: content(
      "A chemical bond is an attractive force that binds the constituents of a chemical species together.",
      "Several theories explain chemical bond formation: valence shell electron pair repulsion (VSEPR) theory, electronic theory, molecular orbital theory and valence bond theory.",
      "Bond formation is driven by a system's tendency to achieve stability. Noble gases are inert because their outermost orbitals are completely filled. Elements with a deficiency of electrons in their outermost shell are comparatively unstable, so atoms combine with one another to complete their octets (or duplets) and achieve the stable configuration of the nearest noble gas.",
      "This combination can happen by sharing electrons (a covalent bond) or by transfer of electrons from one atom to another (an ionic bond)."
    ),
    exp: content("Every bond-formation theory ultimately traces back to one idea: atoms are more stable with a full valence shell, and bonding is simply the mechanism (sharing or transferring electrons) by which they get there."),
  },
  {
    n: "2",
    q: "Write Lewis dot symbols for atoms of the following elements: (a) Mg (b) Na (c) B (d) O (e) N (f) Br",
    a: content(
      "a) Mg — the magnesium atom has 2 valence electrons.",
      img("p02_img1.png"),
      "b) Na — the sodium atom has 1 valence electron: Na•",
      "c) B — the boron atom has 3 valence electrons.",
      img("p02_img2.png"),
      "d) O — the oxygen atom has 6 valence electrons.",
      img("p02_img3.png"),
      "e) N — the nitrogen atom has 5 valence electrons.",
      img("p03_img4.png"),
      "f) Br — the bromine atom has 7 valence electrons.",
      img("p03_img5.png")
    ),
    exp: content("A Lewis dot symbol places one dot for every valence electron around the element's symbol — it's a direct readout of the group number (main-group elements only)."),
  },
  {
    n: "3",
    q: "Write Lewis symbols for the following atoms and ions: S and S²⁻; Al and Al³⁺; H and H⁻",
    a: content(
      "For S and S²⁻: the sulphur atom has 6 valence electrons.",
      img("p03_img6.png"),
      "The 2− charge means sulphur has gained 2 electrons, giving 6 + 2 = 8 valence electrons shown in brackets with the charge.",
      img("p04_img7.png"),
      "For Al and Al³⁺: an aluminium atom has 3 valence electrons.",
      img("p04_img8.png"),
      "The 3+ charge means aluminium has donated all 3 valence electrons: Al³⁺ (no dots left).",
      "For H and H⁻: the hydrogen atom has 1 valence electron: H˙",
      "The single negative charge means hydrogen has gained 1 electron, giving 2 electrons shown in brackets with the charge.",
      img("p05_img9.png")
    ),
    exp: content("Cations lose the electrons shown in the neutral atom's Lewis symbol; anions gain enough electrons to complete an octet (or, for H⁻, a duplet) — the bracket-and-superscript notation just records that change in electron count."),
  },
  {
    n: "4",
    q: "Draw the Lewis structures for the following molecules and ions: H₂S, SiCl₄, BeF₂, CO₃²⁻, HCOOH",
    a: content(
      "H2S",
      img("p05_img10.png"),
      "SiCl4",
      img("p06_img11.png"),
      "BeF2",
      img("p06_img12.png"),
      "CO3^2-",
      img("p06_img13.png"),
      "HCOOH",
      img("p07_img14.png")
    ),
  },
  {
    n: "5",
    q: "Define the octet rule. Write its significance and limitations.",
    a: content(
      "The octet rule states that atoms combine either by transfer of valence electrons from one atom to another, or by sharing valence electrons, in order to achieve the nearest inert gas configuration by having an octet (8 electrons) in their valence shell.",
      "Significance: the octet rule explains chemical bond formation based on the electronic nature of the elements involved.",
      "Limitations:",
      "(a) It fails to predict the relative stability and shape of molecules.",
      "(b) It is based on the inert nature of noble gases, but some noble gases (Kr, Xe) do form compounds, e.g. KrF2, XeF2.",
      "(c) For elements beyond the 3rd period, the octet rule cannot be applied, because the central atom can accommodate more than 8 valence electrons, e.g. SF6, PF5.",
      img("p08_img15.png"),
      "(d) For molecules with an odd number of electrons, the octet rule does not apply, e.g. NO2 and NO.",
      img("p08_img16.png"),
      "(e) If a compound has fewer than 8 electrons around the central atom, the octet rule does not apply, e.g. BeH2, AlCl3, LiCl.",
      img("p08_img17.png")
    ),
  },
  {
    n: "6",
    q: "Write the favourable factors for the formation of an ionic bond.",
    a: content(
      "An ionic bond forms through the transfer of one or more electrons from one atom to another, so its formation depends on how readily neutral atoms lose or gain electrons, and on the lattice energy of the resulting compound.",
      "Favourable factors:",
      "(a) High electron affinity (electron gain enthalpy) of the non-metal atom.",
      "(b) High lattice energy of the compound formed.",
      "(c) Low ionization enthalpy of the metal atom."
    ),
  },
  {
    n: "7",
    q: "Discuss the shape of the following molecules using the VSEPR model: BeCl₂, BCl₃, SiCl₄, AsF₅, H₂S, PH₃",
    a: content(
      "BeCl2 — no lone pair, 2 bond pairs → shape AB2, linear.",
      img("p09_img18.png"),
      "BCl3 — no lone pair, 3 bond pairs → shape AB3, trigonal planar.",
      img("p10_img19.png"),
      "SiCl4 — no lone pair, 4 bond pairs → shape AB4, tetrahedral.",
      img("p10_img20.png"),
      "AsF5 — no lone pair, 5 bond pairs → shape AB5, trigonal bipyramidal.",
      img("p11_img21.png"),
      "H2S — 1 lone pair, 2 bond pairs → shape AB2E, bent.",
      img("p11_img22.png"),
      "PH3 — 1 lone pair, 3 bond pairs → shape AB3E, pyramidal.",
      img("p11_img23.png")
    ),
  },
  {
    n: "8",
    q: "Although geometries of NH₃ and H₂O molecules are distorted tetrahedral, the bond angle in water is less than that of ammonia. Discuss.",
    a: content(
      "H–Ö–H is bent (2 lone pairs on O); the O–H bond dipoles combine to a resultant along the lone-pair axis. H–N̈(–H)(–H) is pyramidal (1 lone pair on N).",
      "The central atom (N) in ammonia has 1 lone pair and 3 bond pairs. The central atom (O) in water has 2 lone pairs and 2 bond pairs.",
      "The two lone pairs on O repel the two bond pairs more strongly than the single lone pair on N repels its three bond pairs (lone pair–lone pair repulsion > lone pair–bond pair repulsion > bond pair–bond pair repulsion, and water simply has more of the strongest kind).",
      "Hence the bond angle in H2O (≈104.5°) is less than in NH3 (≈107°), even though both are distorted-tetrahedral."
    ),
    exp: content("VSEPR repulsion strength ranks lone pair–lone pair > lone pair–bond pair > bond pair–bond pair. Water has two lone pairs doing the squeezing, ammonia only one, so water's bond angle is compressed further from the ideal 109.5°."),
  },
  {
    n: "9",
    q: "How do you express the bond strength in terms of bond order?",
    a: content("Bond strength is represented by the extent of bonding between two atoms in a molecule. As bond order increases, the bond becomes stronger (and shorter)."),
  },
  {
    n: "10",
    q: "Define Bond length.",
    a: content("Bond length is the equilibrium distance between the nuclei of two bonded atoms in a molecule."),
  },
  {
    n: "11",
    q: "Explain the important aspects of resonance with reference to the CO₃²⁻ ion.",
    a: content(
      "Experimental results show that all three C–O bonds in CO3^2- are equivalent (equal bond length), even though a single Lewis structure would show one double bond and two single bonds.",
      "It is therefore inadequate to represent CO3^2- by a single Lewis structure. Instead, it is represented as a resonance hybrid of three equivalent canonical structures:",
      img("p13_img24.png")
    ),
    exp: content("Resonance structures aren't real, rapidly-interconverting molecules — they're a bookkeeping device. The true CO3²⁻ ion is a single hybrid where all three C–O bonds are identical, roughly 1⅓ bonds each, exactly midway between a single and a double bond."),
  },
  {
    n: "12",
    q: "H₃PO₃ can be represented by structures 1 and 2 shown below. Can these two structures be taken as the canonical forms of the resonance hybrid representing H₃PO₃? If not, give reasons for the same.",
    a: content(
      img("p13_img25.png"),
      "No. In structures (1) and (2) the position of the atoms themselves has changed — one H atom is bonded directly to a P–H bond in one structure and to an O–H bond in the other. Canonical (resonance) structures must have the same arrangement of atomic nuclei and differ only in the arrangement of electrons.",
      "Since the atoms have moved, (1) and (2) are different compounds (structural/tautomeric forms), not resonance structures of one another."
    ),
    exp: content("The single most important rule for resonance structures: only electrons may move between canonical forms. If a nucleus (an atom) moves, you no longer have resonance — you have two genuinely different structures, at best tautomers."),
  },
  {
    n: "13",
    q: "Write the resonance structures for SO₃, NO₂, and NO₃⁻.",
    a: content(
      "SO3",
      img("p14_img26.png"),
      "NO2",
      img("p14_img27.png"),
      "NO3⁻ — nitrate is trigonal planar with the negative charge and the N=O double bond delocalised equally over all three oxygen atoms, so it is represented as a resonance hybrid of three equivalent canonical structures (each with one N=O double bond and two N–O⁻ single bonds, exactly analogous to the CO3^2- resonance structures in Q11), giving each N–O bond a bond order of 4/3."
    ),
    exp: content("SO3, CO3²⁻ and NO3⁻ are a classic family: all trigonal planar, all with one central atom double-bonded to one of three identical oxygens in any single Lewis structure, and all better described as a hybrid of three equivalent resonance forms."),
  },
  {
    n: "14",
    q: "Use Lewis symbols to show electron transfer between the following atoms to form cations and anions: (i) K and S (ii) Ca and O (iii) Al and N.",
    a: content(
      "(i) K and S — electronic configurations: S: 2,8,6; K: 2,8,8,1. K has 1 more electron than the nearest inert gas (Ne... actually Ar), while S needs 2 electrons to complete its octet. Two K atoms each donate 1 electron to S:",
      img("p16_img29.png"),
      "(ii) Ca and O — electronic configurations: O: 2,6; Ca: 2,8,8,2. Ca has 2 more electrons than the nearest inert gas (Ar), while O needs 2 electrons to complete its octet:",
      img("p16_img30.png"),
      "(iii) Al and N — electronic configurations: N: 2,5; Al: 2,8,3. Al has 3 more electrons than the nearest inert gas (Ne), while N needs 3 electrons to complete its octet:",
      img("p17_img31.png")
    ),
  },
  {
    n: "15",
    q: "Although both CO₂ and H₂O are triatomic molecules, the shape of the H₂O molecule is bent while that of CO₂ is linear. Explain this on the basis of dipole moment.",
    a: content(
      "The dipole moment of CO2 is 0, which is only possible if the molecule is linear — the two equal and opposite C=O bond dipoles point in exactly opposite directions and cancel.",
      img("p17_img32.png"),
      "H2O has a dipole moment of 1.84 D. A non-zero dipole moment means the two O–H bond dipoles do not cancel, which is only possible if the molecule is bent (the two bond dipoles then combine to a non-zero resultant).",
      img("p18_img33.png")
    ),
    exp: content("Dipole moment is a vector sum. In a linear symmetric molecule (X=C=X) the two identical bond dipoles point in opposite directions and exactly cancel; bend the molecule even slightly and they no longer cancel, so a non-zero dipole moment is direct experimental evidence of a bent shape."),
  },
  {
    n: "16",
    q: "Write the significance/applications of dipole moment.",
    a: content(
      "Significance of dipole moment:",
      "• It helps determine the shape/symmetry of a molecule — symmetrical (e.g. linear) molecules tend to have zero dipole moment, while non-symmetrical (bent, angular) molecules have a non-zero dipole moment.",
      "• It helps determine the polarity of a molecule — a greater dipole moment means greater polarity.",
      "• A molecule with zero dipole moment is non-polar; a molecule with a non-zero dipole moment is polar."
    ),
  },
  {
    n: "17",
    q: "Define electronegativity. How does it differ from electron gain enthalpy?",
    a: content(
      "Electronegativity is the ability of an atom in a chemical compound to attract a shared (bond) pair of electrons towards itself.",
      "Electronegativity vs. electron gain enthalpy:",
      "1. Electronegativity is the tendency of an atom within a compound to attract the shared pair of electrons; electron gain enthalpy is the tendency of an isolated gaseous atom to gain an electron.",
      "2. Electronegativity varies with the element to which the atom is bonded; electron gain enthalpy does not.",
      "3. Electronegativity is not constant for a given element; electron gain enthalpy is constant for a given element.",
      "4. Electronegativity is not a directly measurable quantity; electron gain enthalpy is measurable."
    ),
  },
  {
    n: "18",
    q: "Explain with the help of a suitable example a polar covalent bond.",
    a: content(
      "When two different atoms with distinct electronegativities form a covalent bond, the shared (bond) pair of electrons is not shared equally — the more electronegative atom's nucleus attracts the bond pair more strongly, distorting the electron cloud towards itself.",
      "This makes the more electronegative atom slightly negatively charged (δ⁻) and the other atom slightly positively charged (δ⁺), creating two opposite poles in the molecule — this is called a polar covalent bond.",
      "Example: HCl. Chlorine is more electronegative than hydrogen, so the bond pair shifts towards Cl, giving H a partial positive charge and Cl a partial negative charge.",
      img("p19_img34.png")
    ),
  },
  {
    n: "19",
    q: "Arrange the bonds in order of increasing ionic character in the molecules: LiF, K₂O, N₂, SO₂, and ClF₃.",
    a: content(
      "The ionic character of a bond depends on the difference in electronegativity between the bonded atoms — the greater the difference, the greater the ionic character.",
      "Increasing order of ionic character: N2 < SO2 < ClF3 < K2O < LiF."
    ),
    exp: content("N2 (identical atoms, zero electronegativity difference) is purely covalent; LiF pairs the most electropositive common metal with the most electronegative element, giving it the largest electronegativity gap and hence the most ionic character."),
  },
  {
    n: "20",
    q: "The skeletal structure of CH₃COOH shown below is correct, but some of the bonds are shown incorrectly. Write the correct Lewis structure for acetic acid.",
    a: content(
      "Skeletal structure given in the question (with incorrect bonding — a double bond drawn to a terminal H, and no double bond to the carbonyl O):",
      img("p20_img35.png"),
      "Correct Lewis structure of CH3COOH:",
      img("p20_img36.png")
    ),
    exp: content("Hydrogen can only ever form one bond (it has just one valence electron to share), so any structure showing H with a double bond is automatically wrong — the double bond in acetic acid belongs on the carbonyl C=O."),
  },
  {
    n: "21",
    q: "Apart from tetrahedral geometry, another possible geometry for CH₄ is square planar with the four H atoms at the corners of the square and the C atom at its centre. Explain why CH₄ is not square planar.",
    a: content(
      "Electronic configuration of carbon (Z=6): 1s² 2s² 2p². In the excited state, carbon's orbital picture is:",
      img("p21_img37.png"),
      "Carbon undergoes sp3 hybridisation in methane, giving a tetrahedral structure:",
      img("p21_img38.png"),
      "A square planar geometry would require dsp2 hybridisation, but carbon has no d-orbital available at this energy level, so it cannot undergo dsp2 hybridisation — methane's geometry cannot be square planar.",
      "Also, in a square planar geometry the bond angle would be 90°, which gives much greater bond-pair–bond-pair repulsion and lower stability than the 109.5° tetrahedral angle. By VSEPR theory, methane's tetrahedral structure is the stable one."
    ),
  },
  {
    n: "22",
    q: "Explain why BeH₂ molecule has a zero dipole moment although the Be–H bonds are polar.",
    a: content(
      "Lewis structure of BeH2:",
      img("p22_img39.png"),
      "The central Be atom has no lone pair and 2 bond pairs, so its shape is AB2 — linear.",
      img("p22_img40.png"),
      "Because the molecule is linear, the two Be–H bond dipoles are equal in magnitude and point in exactly opposite directions, so they cancel each other. Hence the net dipole moment of BeH2 is zero, even though each individual Be–H bond is polar."
    ),
  },
  {
    n: "23",
    q: "Which out of NH₃ and NF₃ has the higher dipole moment, and why?",
    a: content(
      "N is the central atom in both NF3 and NH3. In both, the central atom has 1 lone pair and 3 bond pairs, so both have shape AB3E — pyramidal.",
      "Since F is more electronegative than H, one might expect NF3 to have the higher dipole moment. But experimentally, the dipole moment of NH3 (1.46 D) is higher than that of NF3 (0.24 D).",
      "The reason becomes clear from the direction of the individual bond dipoles:",
      img("p23_img41.png"),
      "In NH3, both the N–H bond dipoles and the lone-pair dipole point in the same general direction, so they add up. In NF3, the N–F bond dipoles point opposite to the lone-pair dipole, so they partly cancel it.",
      "Hence the dipole moment of NH3 is higher than that of NF3."
    ),
    exp: content("Electronegativity alone doesn't decide dipole moment — direction matters just as much as magnitude. NF3's highly polar N–F bonds actually work against the lone pair's contribution, while NH3's N–H bonds reinforce it."),
  },
  {
    n: "24",
    q: "What is meant by hybridisation of atomic orbitals? Describe the shapes of sp, sp², sp³ hybrid orbitals.",
    a: content(
      "Hybridisation is the intermixing of a set of atomic orbitals of slightly different energies, giving a new set of orbitals of equivalent energies and shapes.",
      "(a) sp hybrid orbital — 1 s-orbital hybridises with 1 p-orbital to form 2 sp hybrid orbitals. Shape: linear.",
      img("p24_img42.png"),
      "(b) sp2 hybrid orbital — 1 s-orbital hybridises with 2 p-orbitals to form 3 sp2 hybrid orbitals. Shape: trigonal planar.",
      img("p24_img43.png"),
      "(c) sp3 hybrid orbital — 1 s-orbital hybridises with 3 p-orbitals to form 4 sp3 hybrid orbitals. Shape: tetrahedral.",
      img("p25_img44.png")
    ),
  },
  {
    n: "25",
    q: "Describe the change in hybridisation (if any) of the Al atom in the following reaction: AlCl₃ + Cl⁻ → AlCl₄⁻",
    a: content(
      "Ground state valence orbitals of Al:",
      img("p25_img45.png"),
      "Excited state orbital picture of Al:",
      img("p26_img46.png"),
      "Al in AlCl3 undergoes sp2 hybridisation, giving a trigonal planar geometry. When AlCl4⁻ forms, the vacant 3pz orbital also gets involved (it accepts the lone pair donated by Cl⁻), so Al's hybridisation changes from sp2 to sp3, giving a tetrahedral structure."
    ),
  },
  {
    n: "26",
    q: "Is there any change in the hybridisation of B and N atoms as a result of the following reaction? BF₃ + NH₃ → F₃B.NH₃",
    a: content(
      "N in NH3 has sp3 hybridisation:",
      img("p26_img47.png"),
      "B in BF3 has sp2 hybridisation:",
      img("p26_img48.png"),
      "When NH3 and BF3 react to form F3B.NH3, the B atom's hybridisation changes from sp2 to sp3 (its empty p-orbital accepts the lone pair donated by N, becoming a fourth hybrid orbital), while the N atom's hybridisation remains sp3, unchanged."
    ),
  },
  {
    n: "27",
    q: "Draw diagrams showing the formation of a double bond and a triple bond between carbon atoms in C₂H₄ and C₂H₂ molecules.",
    a: content(
      "C2H4 (ethene): each carbon is sp2 hybridised. One sp2 orbital of each C atom overlaps with an sp2 orbital of the other C atom to form a C–C sigma bond. The 2 remaining sp2 orbitals of each carbon form sp2–s sigma bonds with 2 H atoms. The unhybridised p orbital of one C atom overlaps sideways with the unhybridised p orbital of the other C atom, forming a pi bond. The double bond in C2H4 therefore consists of 1 sigma bond + 1 pi bond.",
      img("p28_img49.png"),
      "C2H2 (ethyne): each carbon is sp hybridised, with 2 unhybridised p orbitals remaining on each carbon. One sp orbital of each C atom overlaps along the internuclear axis to form the C–C sigma bond; the second sp orbital of each carbon overlaps with a half-filled 1s orbital of H to form a C–H sigma bond. The two unhybridised p orbitals on each carbon overlap sideways with the corresponding p orbitals of the other carbon, forming 2 pi bonds. The triple bond in C2H2 therefore consists of 1 sigma bond + 2 pi bonds.",
      img("p29_img50.jpg")
    ),
  },
  {
    n: "28",
    q: "What is the total number of sigma and pi bonds in the following molecules? (a) C₂H₂ (b) C₂H₄",
    a: content(
      "A sigma (σ) bond forms by end-to-end (axial) overlap of orbitals; a pi (π) bond forms by sideways overlap of orbitals. Every multiple bond contains exactly one σ bond, with the rest being π bonds — a triple bond is 1σ + 2π.",
      "(a) C2H2:",
      img("p30_img51.png"),
      "C2H2 has 3 σ bonds (2 C–H, 1 C–C) and 2 π bonds (part of the C≡C triple bond).",
      "(b) C2H4:",
      img("p30_img52.png"),
      "C2H4 has 5 σ bonds (4 C–H, 1 C–C) and 1 π bond (part of the C=C double bond)."
    ),
  },
  {
    n: "29",
    q: "Considering the x-axis as the internuclear axis, which of the following will not form a sigma bond, and why? (a) 1s and 1s (b) 1s and 2px (c) 2py and 2py (d) 1s and 2s",
    a: content(
      "(c) 2py and 2py will not form a sigma bond.",
      "With the x-axis as the internuclear axis, 2py orbitals point perpendicular to that axis. Two 2py orbitals can only overlap sideways (laterally), which forms a pi bond, not a sigma bond. Options (a), (b), and (d) all involve orbitals whose lobes point along the internuclear axis, so they can overlap end-to-end and form sigma bonds."
    ),
  },
  {
    n: "30",
    q: "Which hybrid orbitals are used by carbon atoms in the following molecules? (a) CH₃–CH₃ (b) CH₃–CH=CH₂ (c) CH₃CH₂–OH (d) CH₃–CHO (e) CH₃COOH",
    a: content(
      "(a) CH3–CH3: C1 and C2 both have sp3 hybridisation.",
      img("p31_img53.png"),
      "(b) CH3–CH=CH2: C3 and C2 (the doubly-bonded carbons) have sp2 hybridisation; C1 has sp3 hybridisation.",
      img("p32_img54.png"),
      "(c) CH3–CH2–OH: C1 and C2 both have sp3 hybridisation.",
      img("p32_img55.png"),
      "(d) CH3–CHO: C1 has sp3 hybridisation; C2 (the carbonyl carbon) has sp2 hybridisation.",
      img("p32_img56.png"),
      "(e) CH3COOH: C1 has sp3 hybridisation; C2 (the carbonyl/carboxyl carbon) has sp2 hybridisation.",
      img("p33_img57.png")
    ),
    exp: content("A quick rule of thumb: a carbon involved in any double bond (C=C or C=O) is sp2; a carbon with only single bonds is sp3."),
  },
  {
    n: "31",
    q: "What do you understand by bond pairs and lone pairs of electrons? Illustrate by giving one example of each type.",
    a: content(
      "When two atoms form a covalent bond by sharing their valence electrons, the shared pairs of electrons between the bonded atoms are called bond pairs. Electron pairs that do not participate in bonding are called lone pairs.",
      "e.g. a) Ethane has 7 bond pairs and zero lone pairs.",
      img("p33_img58.png"),
      "b) Water has 2 bond pairs and 2 lone pairs on the O atom.",
      img("p34_img59.png")
    ),
  },
  {
    n: "32",
    q: "Distinguish between a sigma and a pi bond.",
    a: content(
      "Pi bond vs. Sigma bond:",
      "1. A pi bond forms by lateral (sideways) overlap of orbitals; a sigma bond forms by end-to-end overlap of orbitals.",
      "2. A pi bond is comparatively weak; a sigma bond is comparatively strong.",
      "3. Pi bonds only form from p–p overlap; sigma bonds can form from s–s, s–p, or p–p overlap.",
      "4. Rotation around a pi bond is restricted; rotation around a sigma bond is free.",
      "5. The electron cloud of a pi bond is not symmetrical about the internuclear axis; the electron cloud of a sigma bond is symmetrical about it.",
      "6. A pi bond has two electron clouds, one above and one below the plane of the nuclei; a sigma bond has one electron cloud, symmetrical about the internuclear axis."
    ),
  },
  {
    n: "33",
    q: "Explain the formation of the H₂ molecule on the basis of valence bond theory.",
    a: content(
      "Consider 2 H atoms, A and B, with nuclei NA/NB and electrons eA/eB. When far apart, there is no interaction between them; as they approach, both attractive and repulsive forces come into play.",
      "Repulsive forces act: (i) between the two electrons, eA and eB, and (ii) between the two nuclei, NA and NB.",
      "Attractive forces act: (i) between the electron and nucleus of the same atom, NA–eA and NB–eB, and (ii) between the electron of one atom and the nucleus of the other, NA–eB and NB–eA.",
      "Repulsive forces:",
      img("p35_img60.png"),
      "Attractive forces:",
      img("p36_img61.png"),
      "The magnitude of the attractive forces exceeds that of the repulsive forces, so the two atoms are drawn together and the system's potential energy decreases. A point is eventually reached where the repulsive and attractive forces balance and the system reaches minimum energy — this is the stable H2 molecule."
    ),
  },
  {
    n: "34",
    q: "Write the important conditions required for the linear combination of atomic orbitals to form molecular orbitals.",
    a: content(
      "Conditions for the linear combination of atomic orbitals (LCAO):",
      "(i) The combining atomic orbitals must have approximately the same energy. For example, in a homonuclear molecule, the 1s orbital of one atom can combine with the 1s orbital of the other, but not with a 2s orbital.",
      "(ii) The combining atomic orbitals must have proper orientation to give maximum overlap.",
      "(iii) The extent of overlap between the atomic orbitals must be as large as possible."
    ),
  },
  {
    n: "35",
    q: "Use molecular orbital theory to explain why the Be₂ molecule does not exist.",
    a: content(
      "Electronic configuration of Be: 1s² 2s².",
      "Molecular orbital configuration of Be2: σ(1s)² σ*(1s)² σ(2s)² σ*(2s)².",
      "Bond order = 0.5 × (Nb − Na), where Nb = number of bonding electrons, Na = number of anti-bonding electrons.",
      "Bond order of Be2 = 0.5 × (4 − 4) = 0.",
      "A bond order of zero means the molecule is unstable, so Be2 does not exist."
    ),
  },
  {
    n: "36",
    q: "Compare the relative stability of the following species and indicate their magnetic properties: O₂, O₂⁺, O₂⁻ (superoxide), O₂²⁻ (peroxide)",
    a: content(
      "O2 has 16 electrons (8 from each O atom). Since the 1s orbital of each O atom does not take part in bonding, only the remaining electrons are considered.",
      "O2: σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)¹=π*(2py)¹. Nb = 8, Na = 4. Bond order = 0.5(8−4) = 2. Two half-filled π* orbitals make O2 paramagnetic.",
      "O2⁺: σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)¹. Nb = 8, Na = 3. Bond order = 0.5(8−3) = 2.5. One unpaired electron → paramagnetic.",
      "O2⁻ (superoxide): σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)²=π*(2py)¹. Nb = 8, Na = 5. Bond order = 0.5(8−5) = 1.5. One unpaired electron → paramagnetic.",
      "O2²⁻ (peroxide): σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)²=π*(2py)². Nb = 8, Na = 6. Bond order = 0.5(8−6) = 1. All electrons paired → diamagnetic.",
      "Since bond dissociation energy (and stability) is directly proportional to bond order, the decreasing order of stability is: O2⁺ > O2 > O2⁻ > O2²⁻."
    ),
  },
  {
    n: "37",
    q: "Write the significance of a plus and a minus sign shown in representing the orbitals.",
    a: content(
      "A molecular (or atomic) orbital is represented by a wave function. A plus (+) sign represents a positive phase of the wave function, and a minus (−) sign represents a negative phase of the wave function."
    ),
  },
  {
    n: "38",
    q: "Describe the hybridisation in case of PCl₅. Why are the axial bonds longer as compared to equatorial bonds?",
    a: content(
      "Ground state valence orbitals of phosphorus:",
      img("p39_img62.png"),
      "Excited state orbital picture of phosphorus:",
      img("p39_img63.png"),
      "Phosphorus undergoes sp3d hybridisation. These 5 orbitals are then filled by electron pairs donated by 5 Cl atoms:",
      img("p40_img64.png"),
      "The 5 sp3d hybrid orbitals point towards the 5 corners of a trigonal bipyramid, giving PCl5 this geometry:",
      img("p40_img65.png"),
      "Of the 5 P–Cl sigma bonds, 3 lie in one plane at 120° to each other — these are the equatorial bonds. The remaining 2 bonds lie one above and one below the equatorial plane, at 180° to each other — these are the axial bonds.",
      "The equatorial bond pairs experience only 90° repulsions from 2 axial bonds each, whereas each axial bond pair experiences 90° repulsions from all 3 equatorial bonds. This greater repulsion pushes the axial bonds further from the nucleus, so axial bonds are slightly longer than equatorial bonds."
    ),
  },
  {
    n: "39",
    q: "Define hydrogen bond. Is it weaker or stronger than the van der Waals forces?",
    a: content(
      "A hydrogen bond is an attractive force acting between the hydrogen atom (attached to an electronegative atom of one molecule) and an electronegative atom of a different molecule (or a different part of the same molecule).",
      "Because of the electronegativity difference, the bond pair between the electronegative atom and the hydrogen atom is drawn away from H, so the hydrogen atom becomes electropositive relative to the other atom and acquires a partial positive charge.",
      "The strength of an H-bond is minimum in the gaseous state and maximum in the solid state.",
      "There are two types of hydrogen bonds: (a) intramolecular hydrogen bond, e.g. o-nitrophenol, and (b) intermolecular hydrogen bond, e.g. HF, H2O.",
      img("p41_img66.png"),
      "Hydrogen bonds are stronger than van der Waals forces, since an H-bond is regarded as an extreme form of dipole–dipole interaction."
    ),
  },
  {
    n: "40",
    q: "What is meant by the term bond order? Calculate the bond order of: N₂, O₂, O₂⁺ and O₂⁻.",
    a: content(
      "Bond order is defined as 0.5 times the difference between the number of electrons in bonding orbitals (Nb) and the number of electrons in anti-bonding orbitals (Na) of a molecule: Bond order = 0.5(Nb − Na).",
      "O2 (16 electrons; 1s orbitals not involved in bonding): σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)¹=π*(2py)¹. Nb = 8, Na = 4. Bond order = 0.5(8−4) = 2.",
      "O2⁻: σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)²=π*(2py)¹. Nb = 8, Na = 5. Bond order = 0.5(8−5) = 1.5.",
      "O2⁺: σ(2s)² σ*(2s)² σ(2pz)² π(2px)²=π(2py)² π*(2px)¹. Nb = 8, Na = 3. Bond order = 0.5(8−3) = 2.5.",
      "N2 (14 electrons): σ(2s)² σ*(2s)² π(2px)²=π(2py)² σ(2pz)². Nb = 10, Na = 4. Bond order = 0.5(10−4) = 3."
    ),
  },
];

// ─── build + import ─────────────────────────────────────────────────────────
console.log("Resolving images and building question blocks...");
const questions = [];
for (const item of raw) {
  const answer = await resolveImages(item.a);
  questions.push({
    _type: "questionAnswer",
    _key: randomUUID(),
    questionNumber: item.n,
    questionText: textBlocks(item.q),
    answer,
    ...(item.exp ? { explanation: await resolveImages(item.exp) } : {}),
  });
  console.log(`Built Q${item.n}`);
}

const doc = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 4,
  chapterTitle: "Chemical Bonding and Molecular Structure",
  questions,
};

console.log("Importing Class 11 Chemistry Chapter 4: Chemical Bonding and Molecular Structure");
console.log(`Questions: ${questions.length}`);
console.log(`Images uploaded: ${assetCache.size}`);

const result = await client.create(doc);
console.log(`✓ Created document: ${result._id}`);
