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
    q: ["Justify the position of hydrogen in the periodic table on the basis of its electronic configuration."],
    a: [
      "The 1st element in the periodic table is hydrogen. Hydrogen exhibits dual behaviour because it has only 1 electron in its single 's' shell, i.e., hydrogen resembles both alkali metals and halogens.",
      "Electronic configuration of hydrogen = 1s¹.",
      "Resemblance with alkali metals:",
      "Hydrogen has 1 valence electron, like alkali metals (1s¹ – H; [He]2s¹ – Li; [Ne]3s¹ – Na). It can lose this electron to form a uni-positive ion, and combines with electronegative elements to form halides, oxides and sulphides, just like alkali metals.",
      "Resemblance with halogens:",
      "Only 1 electron is needed to complete the octet for both hydrogen and halogens (H: 1s¹; F: 1s² 2s² 2p⁵; Cl: 1s² 2s² 2p⁶ 3s² 3p⁵). Like halogens, hydrogen forms diatomic molecules and several covalent compounds.",
      "However, hydrogen differs from both groups — it lacks metallic character, has a much higher ionisation enthalpy, and is less reactive than halogens. For these reasons, hydrogen cannot be placed permanently with either group and is best placed separately in the periodic table.",
    ],
  },
  {
    n: "2",
    q: ["Write the names of isotopes of hydrogen. What is the mass ratio of these isotopes?"],
    a: [
      "Hydrogen has 3 isotopes: (i) Protium (¹₁H), (ii) Deuterium (²₁H or D), and (iii) Tritium (³₁H or T).",
      "Mass ratio — Protium : Deuterium : Tritium = 1 : 2 : 3.",
    ],
  },
  {
    n: "3",
    q: ["Why does hydrogen occur in a diatomic form rather than in a monoatomic form under normal conditions?"],
    a: [
      "The ionisation enthalpy of a hydrogen atom is high, so removing its electron is difficult, and the atom does not favour existing as a stable free monoatomic species. Instead, two hydrogen atoms share electrons to form a covalent H–H bond, so hydrogen exists as the diatomic molecule H2 under normal conditions.",
    ],
  },
  {
    n: "4",
    q: ["How can the production of dihydrogen, obtained from 'coal gasification', be increased?"],
    a: [
      "In coal gasification, dihydrogen is produced as: C(s) + H2O(g) → CO(g) + H2(g).",
      "Passing the resulting carbon monoxide with more steam over a catalyst (iron chromate) converts it to carbon dioxide and additional hydrogen: CO(g) + H2O(g) → CO2(g) + H2(g).",
      "This is called the water-gas shift reaction, and it increases the yield of dihydrogen. The CO2 formed can be removed by scrubbing with sodium arsenite solution.",
    ],
  },
  {
    n: "5",
    q: ["Describe the bulk preparation of dihydrogen by the electrolytic method. What is the role of an electrolyte in this process?"],
    a: [
      "Dihydrogen is prepared in bulk by electrolysing acidified or alkaline water using platinum electrodes, typically with 15–20% acid (H2SO4) or base (NaOH) added.",
      "At the cathode: 2H2O + 2e⁻ → 2H2 + 2OH⁻ (reduction).",
      "At the anode: 2OH⁻ → H2O + ½O2 + 2e⁻ (oxidation).",
      "Net reaction: H2O(l) → H2(g) + ½O2(g).",
      "Pure water conducts electricity poorly because it has very few ions, so electrolysis is slow. Adding an electrolyte (acid or base) supplies ions that carry the current, speeding up the electrolysis.",
    ],
  },
  {
    n: "6",
    q: ["Complete the following reactions: (i) H2(g) + MmOo(g) → ; (ii) CO(g) + H2(g) → ; (iii) C3H8(g) + 3H2O(g) → ; (iv) Zn(g) + NaOH(aq) →"],
    a: [
      "(i) H2(g) + MmOo(g) → mM(s) + H2O(l)",
      "(ii) CO(g) + H2(g) → CH3OH(l)",
      "(iii) C3H8(g) + 3H2O(g) → 3CO(g) + 7H2(g)",
      "(iv) Zn(g) + NaOH(aq) → Na2ZnO2(aq) + H2(g)",
    ],
  },
  {
    n: "7",
    q: ["Discuss the consequences of the high enthalpy of the H–H bond in terms of the chemical reactivity of dihydrogen."],
    a: [
      "The H–H bond has a high bond dissociation enthalpy (1312 kJ mol⁻¹, comparable to halogens), so hydrogen has little tendency to form H⁺ ions. Hence, it forms:",
      "→ a large number of covalent bonds",
      "→ diatomic molecules (H2)",
      "→ hydrides with an element",
      "Hydrogen does not display metallic characteristics such as lustre or ductility, because this ionisation enthalpy is so high.",
    ],
  },
  {
    n: "8",
    q: ["What do you understand by (i) electron-rich, (ii) electron-precise, and (iii) electron-deficient compounds of hydrogen? Provide justification with suitable examples."],
    a: [
      "Molecular hydrides are classified by the number of electrons available relative to their conventional Lewis structure:",
      "1. Electron-deficient hydrides",
      "2. Electron-precise hydrides",
      "3. Electron-rich hydrides",
      "1. An electron-deficient hydride has fewer electrons than required for a conventional Lewis structure, e.g. BH3, AlH3. These exist as dimers such as B2H6 and Al2H6 to make up for the deficiency. In B2H6, of the 6 bonds present, 4 are regular 2-centre-2-electron bonds; the remaining 2 are 3-centre-2-electron bonds, i.e. 2 electrons shared by 3 atoms.",
      "2. An electron-precise hydride has exactly enough electrons for a conventional Lewis structure, e.g. CH4, SiH4. In these compounds, all 4 bonds are regular 2-centre-2-electron bonds.",
      "3. An electron-rich hydride contains excess valence electrons beyond what forms the covalent bonds, e.g. NH3, PH3. There are 3 regular bonds in all, with a lone pair of electrons on the central atom.",
    ],
  },
  {
    n: "9",
    q: ["What characteristics do you expect from an electron-deficient hydride with respect to its structure and chemical reactions?"],
    a: [
      "Electron-deficient compounds of hydrogen do not have enough electrons to form an octet. Examples of Group 13 hydrides such as BH3, AlH3 act as electron-deficient compounds.",
      "They exist in polymeric forms such as B2H6 and Al2H6 to overcome their deficiency.",
      "These compounds act as Lewis acids. They form a complex by accepting electron pairs from Lewis bases.",
      "B2H6 + 2NMe3 → 2BH3.NMe3",
      "B2H6 + 2CO → 2BH3.CO",
    ],
  },
  {
    n: "10",
    q: ["Do you expect the carbon hydrides of the type (CnH2n+2) to act as a 'Lewis' base or acid? Justify."],
    a: [
      "For carbon hydrides of type (CnH2n+2), the possible hydrides are:",
      "n = 1 ⇒ CH4",
      "n = 2 ⇒ C2H6",
      "n = 3 ⇒ C3H8",
      "For a hydride to act as a Lewis acid, it should be electron deficient (electron accepting). For a hydride to act as a Lewis base, it should be electron rich (electron donating).",
      "Taking C2H6 as an example, the total number of electrons is 14 and the total covalent bonds are 7 — all regular 2-electron-2-centred bonds. Hence C2H6 has sufficient electrons to be represented by a conventional Lewis structure; it is an electron-precise hydride with every atom having a complete octet.",
      "Thus, it can neither accept nor donate electrons, and hydrides of this type act as neither a Lewis acid nor a Lewis base.",
    ],
  },
  {
    n: "11",
    q: ["What do you understand by the term 'non-stoichiometric hydrides'? Do you expect this type of hydride to be formed by alkali metals? Justify your answer."],
    a: [
      "Non-stoichiometric hydrides are hydrogen-deficient compounds formed by the reaction of dihydrogen with d-block and f-block elements. These hydrides do not follow the law of constant composition.",
      "For example, LaH2.87, YbH2.55, TiH1.5–1.8, etc.",
      "Alkali metals form stoichiometric hydrides, which are naturally ionic. Hydride ions have a comparable size (208 pm) to alkali metal ions, resulting in a strong binding force between the metal and hydride ion.",
      "Hence, alkali metals will not form non-stoichiometric hydrides.",
    ],
  },
  {
    n: "12",
    q: ["How do you expect the metallic hydrides to be useful for hydrogen storage? Explain."],
    a: [
      "Metallic hydrides are hydrogen deficient. They don't follow the law of constant composition.",
      "In the hydrides of Pd, Ac, Ni and Ce, hydrogen occupies interstitial positions in the metal lattice, which allows further absorption of hydrogen on these metals.",
      "Metals like Pt and Pd have the capacity to accommodate a large volume of hydrogen. Hence, metallic hydrides serve as a source of energy and are used for the storage of hydrogen.",
    ],
  },
  {
    n: "13",
    q: ["How does the atomic hydrogen or oxy-hydrogen torch function for cutting and welding purposes? Explain."],
    a: [
      "The atomic hydrogen torch is also known as the oxyhydrogen torch. Hydrogen atoms are produced through dihydrogen dissociation with the help of an electric arc, which requires a huge amount of energy.",
      "Energy released = 435.88 kJ mol⁻¹",
      "This energy is used in generating a temperature of about 4000 K, which is used for cutting and welding metals — the atoms recombine on the surface to be welded, releasing this energy.",
    ],
  },
  {
    n: "14",
    q: ["Among NH3, H2O and HF, which would you expect to have the highest magnitude of hydrogen bonding and why?"],
    a: [
      "The extent of hydrogen bonding mainly depends on (i) electronegativity, and (ii) the number of hydrogen atoms available for bonding.",
      "Among oxygen, fluorine and nitrogen, the increasing order of electronegativity is N < O < F. Therefore, the expected order of the extent of hydrogen bonding is HF > H2O > NH3.",
      "But the actual order is H2O > HF > NH3.",
      "Even though fluorine is more electronegative than oxygen, the extent of hydrogen bonding is high in water. There is a shortage of hydrogens in HF, so only straight-chain bonding takes place, whereas water has exactly the right number of hydrogens to form an extensive ring-like structure through hydrogen bonding.",
      "The extent of hydrogen bonding is limited in ammonia because nitrogen has only 1 lone pair, so it cannot satisfy all its hydrogens.",
    ],
  },
  {
    n: "15",
    q: ["Saline hydrides are known to react with water violently, producing fire. Can CO2, a well-known fire extinguisher, be used in this case? Explain."],
    a: [
      "Saline hydrides, i.e. LiH, NaH etc., react with water to form hydrogen gas and a base. The chemical equation representing this reaction is:",
      "MH(s) + H2O(aq) → MOH(aq) + H2(g)",
      "This reaction behaves violently, and fire is produced from it.",
      "CO2 is commonly used as a fire extinguisher because it is heavier than dioxygen, so it covers a fire like a blanket and cuts off the oxygen supply, dousing the fire.",
      "It can be used in this scenario too — it weighs more than dihydrogen and is effective at isolating the burning surface from both dioxygen and dihydrogen.",
    ],
  },
  {
    n: "16",
    q: ["Arrange the following: (i) CaH2, BeH2 and TiH2 in order of increasing electrical conductance. (ii) LiH, NaH and CsH in order of increasing ionic character. (iii) H–H, D–D and F–F in order of increasing bond dissociation enthalpy. (iv) NaH, MgH2 and H2O in order of increasing reducing properties."],
    a: [
      "(i) The electrical conductance of a molecule mainly depends on its covalent or ionic nature. CaH2 is an ionic hydride which conducts electricity in the molten state. TiH2 is metallic in nature and conducts electricity at room temperature. BeH2 is a covalent hydride, so it does not conduct.",
      "Increasing order: BeH2 < CaH2 < TiH2",
      "(ii) The ionic character of a bond depends on the electronegativity difference between the atoms involved — the higher the difference, the greater the ionic character. Electronegativity decreases down the group from Li to Cs, so the ionic character of the hydrides increases.",
      "Increasing order: LiH < NaH < CsH",
      "(iii) The bond pair in the D–D bond is more strongly attracted by the nucleus than the bond pair in H–H, because of the higher nuclear mass of D2. The stronger the attraction, the greater the bond dissociation enthalpy. Bond dissociation enthalpy is minimum for F–F, because the bond pair experiences strong repulsion from lone pairs on each F-centre.",
      "Increasing order: F–F < H–H < D–D",
      "(iv) Ionic hydrides are strong reducing agents — NaH can easily donate its electrons, so it is most reducing. Both MgH2 and H2O are covalent hydrides; H2O is less reducing than MgH2 since its bond dissociation energy is higher.",
      "Increasing order: H2O < MgH2 < NaH",
    ],
  },
  {
    n: "17",
    q: ["Compare the structures of H2O and H2O2."],
    a: [
      "The water molecule has a bond angle of 104.5° and a bent shape in the gaseous phase. The O–H bond length is 95.7 pm.",
      "Hydrogen peroxide has a non-planar (open-book) structure in both the solid and gas phases. The dihedral angle between the two O–H bonds is 90.2° in the gas phase and 111.5° in the solid phase.",
    ],
  },
  {
    n: "18",
    q: ["What do you understand by the term 'auto-protolysis' of water? What is its significance?"],
    a: [
      "Auto-protolysis (self-ionisation) of water is a chemical reaction in which 2 water molecules react to produce a hydronium ion (H3O⁺) and a hydroxide ion (OH⁻). The reaction can be represented as:",
      "H2O(l) + H2O(l) ⇌ H3O⁺(aq) + OH⁻(aq)",
      "Auto-protolysis of water indicates its amphoteric nature, i.e., its ability to act as both an acid and a base.",
    ],
  },
  {
    n: "19",
    q: ["Consider the reaction of water with F2 and suggest, in terms of oxidation and reduction, which species are oxidised/reduced."],
    a: [
      "The reaction between water and fluorine can be represented as:",
      "2F2(g) + 2H2O(l) → 4H⁺(aq) + 4F⁻(aq) + O2(g)",
      "This is an example of a redox reaction — water is oxidised to oxygen, and fluorine is reduced to fluoride ions.",
      "Water is oxidised from (–2) to a zero oxidation state (as O2). An increase in oxidation state indicates oxidation of water.",
      "Fluorine is reduced from zero to (–1) oxidation state (as F⁻). A decrease in oxidation state indicates the reduction of fluorine.",
    ],
  },
  {
    n: "20",
    q: ["Complete the following chemical reactions and classify them into (a) Hydrolysis, (b) Redox and (c) Hydration reactions."],
    a: [
      "(i) PbS(g) + 4H2O2(aq) → PbSO4(s) + 4H2O(l)",
      "H2O2 acts as an oxidising agent in this reaction. Hence, it is a redox reaction.",
      "(ii) 2MnO4⁻(aq) + 5H2O2(aq) + 6H⁺(aq) → 2Mn²⁺(aq) + 8H2O(l) + 5O2(g)",
      "H2O2 acts as a reducing agent in the acidic medium, thereby oxidising MnO4⁻. Hence, the given reaction is a redox reaction.",
      "(iii) CaO(g) + H2O(g) → Ca(OH)2(aq)",
      "Reactions in which a compound reacts with water to produce other compounds are called hydrolysis reactions. Hence, this is a hydrolysis reaction.",
      "(iv) 2AlCl3(g) + 3H2O(l) → Al2O3(s) + 6HCl(aq)",
      "This represents the hydrolysis of AlCl3.",
      "(v) Ca3N2(s) + 6H2O(l) → 3Ca(OH)2(aq) + 2NH3(g)",
      "This represents the hydrolysis of Ca3N2.",
    ],
  },
  {
    n: "21",
    q: ["Describe the structure of the common form of ice."],
    a: [
      "Generally, ice is the crystalline form of water. It crystallises in a hexagonal form at atmospheric pressure; at very low temperatures, it condenses to a cubic form.",
      "In its 3-D structure, ice has extensive hydrogen bonding and a highly ordered lattice. Each oxygen atom is surrounded tetrahedrally by 4 other oxygen atoms at a distance of 276 pm. The structure of ice also contains wide holes that can hold molecules of particular sizes.",
    ],
  },
  {
    n: "22",
    q: ["What causes the temporary and permanent hardness of water?"],
    a: [
      "Permanent hardness is caused by the presence of soluble salts of calcium and magnesium in the form of chlorides in water.",
      "Temporary hardness is caused by the presence of soluble salts of calcium and magnesium in the form of hydrogen carbonates (bicarbonates) in water.",
    ],
  },
  {
    n: "23",
    q: ["Discuss the principle and method of softening of hard water with synthetic ion-exchange resins."],
    a: [
      "Treating the permanent hardness of water with synthetic resins is generally based on exchanging the anions and cations present in water for OH⁻ and H⁺ ions, respectively.",
      "The two types of synthetic resins are:",
      "1. Cation exchange resins",
      "2. Anion exchange resins",
      "Cation exchange resins are large organic molecules containing the –SO3H group. The resin is first converted to the RNa form by treating it with NaCl. This resin exchanges its Na⁺ ions for the Ca²⁺ and Mg²⁺ ions in the water, making it soft:",
      "2RNa + M²⁺(aq) → R2M(s) + 2Na⁺(aq)",
      "There are also cation exchange resins in the RH form, which exchange H⁺ ions for Na⁺, Ca²⁺ and Mg²⁺ ions:",
      "2RH + M²⁺(aq) ⇌ MR2(s) + 2H⁺(aq)",
      "Anion exchange resins exchange OH⁻ ions for anions such as Cl⁻, HCO3⁻ and SO4²⁻ present in the water:",
      "RNH2(s) + H2O(l) ⇌ RNH3⁺.OH⁻(s)",
      "RNH3⁺.X⁻(s) + OH⁻(aq) ⇌ RNH3⁺.OH⁻(s) + X⁻(aq)",
      "During the whole process, water first passes through the cation-exchange resin; the water obtained is free from mineral cations and is naturally acidic. This acidic water is then passed through the anion-exchange resin, where the OH⁻ ions neutralise the H⁺ ions, de-ionising the water.",
    ],
  },
  {
    n: "24",
    q: ["Write chemical reactions to show the amphoteric nature of water."],
    a: [
      "The amphoteric nature of water can be shown by the following reactions:",
      "1) Reaction with H2S:",
      "H2O(l) + H2S(aq) ⇌ H3O⁺(aq) + HS⁻(aq)",
      "In the forward reaction, H2O(l) accepts a proton from H2S(aq); therefore, it acts as a Brønsted base.",
      "2) Reaction with NH3:",
      "H2O(l) + NH3(aq) ⇌ OH⁻(aq) + NH4⁺(aq)",
      "In the forward reaction, H2O(l) donates its proton to NH3(aq); therefore, it acts as a Brønsted acid.",
      "3) Self-ionisation of water:",
      "2 water molecules react in this reaction as:",
      "H2O(l) + H2O(l) ⇌ H3O⁺(aq) + OH⁻(aq)",
    ],
  },
  {
    n: "25",
    q: ["Write chemical reactions to justify that hydrogen peroxide can function as an oxidising as well as a reducing agent."],
    a: [
      "Hydrogen peroxide acts as an oxidising agent as well as a reducing agent in both alkaline and acidic media.",
      "The reactions involved in oxidising action are given below:",
      "(i) Mn²⁺ + H2O2 → Mn⁴⁺ + 2OH⁻",
      "(ii) 2Fe²⁺ + H2O2 → 2Fe³⁺ + 2OH⁻",
      "(iii) 2Fe²⁺ + 2H⁺ + H2O2 → 2Fe³⁺ + 2H2O",
      "(iv) PbS + 4H2O2 → PbSO4 + 4H2O",
      "The reactions involved in reducing action are given below:",
      "(i) I2 + H2O2 + 2OH⁻ → 2I⁻ + 2H2O + O2",
      "(ii) 2MnO4⁻ + 3H2O2 → 2MnO2 + 3O2 + 2H2O + 2OH⁻",
      "(iii) 2MnO4⁻ + 6H⁺ + 5H2O2 → 2Mn²⁺ + 8H2O + 5O2",
      "(iv) HOCl + H2O2 → H3O⁺ + Cl⁻ + O2",
    ],
  },
  {
    n: "26",
    q: ["What is meant by 'demineralised' water, and how can it be obtained?"],
    a: [
      "This water is free from all soluble mineral salts, and it doesn't contain any cation or anion. It is obtained by passing water successively through a cation exchange resin and an anion exchange resin.",
      "During the cation exchange process, H⁺ exchanges for:",
      "→ Ca²⁺",
      "→ Na⁺",
      "→ Mg²⁺",
      "and other cations present in the water.",
    ],
  },
  {
    n: "27",
    q: ["Is demineralised or distilled water useful for drinking purposes? If not, how can it be made useful?"],
    a: [
      "Water is essential for our life. It consists of many dissolved nutrients that are required for us and also for plants and animals. Demineralised water is free from all soluble minerals, so it cannot be used for drinking purposes.",
      "After adding desired minerals in specific amounts required for growth, this water can be made useful.",
    ],
  },
  {
    n: "28",
    q: ["Describe the usefulness of water in the biosphere and biological systems."],
    a: [
      "Water is very necessary for all forms of life, constituting 65% of the human body and 95% of plants. It plays a vital role in the biosphere due to its:",
      "→ Thermal conductivity",
      "→ Dipole moment",
      "→ Specific heat",
      "→ Dielectric constant, and",
      "→ Surface tension",
      "For moderating the body temperature of all living beings and the atmospheric climate, (i) the heat capacity and (ii) the heat of vaporisation help a lot.",
      "It acts as a carrier of different nutrients required by animals and plants for various metabolic reactions.",
    ],
  },
  {
    n: "29",
    q: ["What properties of water make it useful as a solvent? What types of compound can it (i) dissolve and (ii) hydrolyse?"],
    a: [
      "A high dipole moment and dielectric constant (78.39 C²/Nm²) make water a universal solvent. Water is able to dissolve most covalent and ionic compounds. Owing to ion-dipole interaction, ionic compounds dissolve in water, whereas covalent compounds form hydrogen bonds and dissolve in water.",
      "Water can hydrolyse:",
      "→ metallic and non-metallic oxides",
      "→ nitrides",
      "→ phosphides",
      "→ carbides",
      "→ hydrides",
      "and various other salts. During hydrolysis, the H⁺ and OH⁻ ions of water interact with the reacting molecule. Certain reactions are given below:",
      "CaC2 + H2O → C2H2 + Ca(OH)2",
      "CaO + H2O → Ca(OH)2",
      "NaH + H2O → NaOH + H2",
    ],
  },
  {
    n: "30",
    q: ["Knowing the properties of H2O and D2O, do you think that D2O can be used for drinking purposes?"],
    a: [
      "D2O is known as heavy water, which acts as a moderator (slows down the rate of reaction). Due to this property, it cannot be used for drinking purposes because it slows down (i) catabolic reactions and (ii) anabolic reactions that take place in the body, which could lead to casualty.",
    ],
  },
  {
    n: "31",
    q: ["What is the difference between the terms 'hydrolysis' and 'hydration'?"],
    a: [
      "Hydration:",
      "The addition of 1 or more water molecules to a molecule or ion, resulting in the formation of a hydrated compound, is known as hydration.",
      "For example, CuSO4 + 5H2O → CuSO4.5H2O",
      "Hydrolysis:",
      "The chemical reaction in which the hydrogen and hydroxide ions of water react with a compound to form other products is called hydrolysis.",
      "For example, NaH + H2O → NaOH + H2",
    ],
  },
  {
    n: "32",
    q: ["How can saline hydrides remove traces of water from organic compounds?"],
    a: [
      "Saline hydrides are naturally ionic. They react with water, forming a metal hydroxide along with liberation of hydrogen gas. It is represented as:",
      "AH(s) + H2O(l) → AOH(aq) + H2(g)",
      "When added to an organic solvent, the hydride reacts with the water present in it. Hydrogen escapes into the atmosphere, leaving behind the metal hydroxide. The dry organic solvent then distils over, free of water.",
    ],
  },
  {
    n: "33",
    q: ["What do you expect the nature of hydrides is if formed by elements of atomic numbers 15, 19, 23 and 44 with dihydrogen? Compare their behaviour with water."],
    a: [
      "The elements of atomic number 15, 19, 23 and 44 are phosphorus, potassium, vanadium and ruthenium respectively.",
      "Hydride of Phosphorus",
      "Hydride of phosphorus (PH3) is covalent in nature. Due to the presence of excess electrons as a lone pair on phosphorus, it is electron rich.",
      "Hydride of Potassium",
      "Due to the highly electropositive nature of potassium, dihydrogen forms an ionic hydride with potassium. It is naturally non-volatile and crystalline.",
      "Hydrides of Vanadium",
      "Vanadium belongs to the d-block of the periodic table. Metals of the d-block form non-stoichiometric or metallic hydrides. Hydrides of vanadium are naturally metallic and show a deficiency of hydrogen.",
      "Hydrides of Ruthenium",
      "Ruthenium also belongs to the d-block of the periodic table. Ruthenium does not form hydrides on account of its low affinity for hydrogen in its normal oxidation states.",
      "Behaviour of the hydrides towards water",
      "Potassium hydride is an ionic compound that reacts violently with water to produce H2 gas:",
      "KH(s) + H2O(aq) → KOH(aq) + H2(g)",
    ],
  },
  {
    n: "34",
    q: ["Do you expect different products in solution when aluminium (III) chloride and potassium chloride are treated separately with (i) alkaline water, (ii) acidified water, and (iii) normal water? Write equations wherever necessary."],
    a: [
      "Potassium chloride (KCl) is the salt of a strong acid (HCl) and a strong base (KOH). Hence, it is neutral in nature and does not undergo hydrolysis in normal water. It dissociates into ions as follows:",
      "KCl(s) → K⁺(aq) + Cl⁻(aq)",
      "In acidified and alkaline water, these ions do not react and remain as such.",
      "Aluminium (III) chloride is the salt of a strong acid (HCl) and a weak base [Al(OH)3]. Hence, it undergoes hydrolysis in normal water:",
      "AlCl3(s) + 3H2O(l) → Al(OH)3(s) + 3H⁺(aq) + 3Cl⁻(aq)",
      "In acidified water, H⁺ ions react with Al(OH)3, forming water and giving Al³⁺ and Cl⁻ ions. In alkaline water, the following reaction takes place:",
      "Al(OH)3 + OH⁻ → [Al(OH)4]⁻",
    ],
  },
  {
    n: "35",
    q: ["How does H2O2 behave as a bleaching agent?"],
    a: [
      "Hydrogen peroxide acts as a strong oxidising agent in both basic and acidic media. When added to a stained cloth, it breaks the chemical bonds of the chromophores (colour-producing groups). Hence, visible light is no longer absorbed and the cloth gets whitened.",
    ],
  },
  {
    n: "36",
    q: ["What do you understand by the terms: (i) Hydrogen economy, (ii) Hydrogenation, (iii) 'syngas', (iv) Water-gas shift reaction and (v) Fuel cell?"],
    a: [
      "(i) Hydrogen economy",
      "Dihydrogen releases more energy than petrol and is more eco-friendly. Hence, it can be used in fuel cells to generate electric power. The hydrogen economy is a technique of using dihydrogen efficiently — it involves transporting and storing dihydrogen in liquid or gaseous form, and transmitting energy in the form of dihydrogen.",
      "(ii) Hydrogenation",
      "The process of adding dihydrogen to another reactant is known as hydrogenation. It is used to reduce a compound in the presence of a suitable catalyst. For example, hydrogenation of vegetable oil using nickel as a catalyst gives edible fats such as ghee and vanaspati.",
      "(iii) 'syngas'",
      "Syngas is a mixture of carbon monoxide and dihydrogen. Since this mixture is used for the synthesis of methanol, it is called syngas, synthesis gas, or water gas. Syngas is produced by the action of steam on hydrocarbons or coke at high temperature in the presence of a catalyst:",
      "CnH2n+2 + nH2O → nCO + (3n+1)H2",
      "e.g. CH4(g) + H2O(g) → CO(g) + 3H2(g)",
      "(iv) Water-gas shift reaction",
      "It is the reaction of the carbon monoxide in the syngas mixture with steam in the presence of a catalyst:",
      "CO(g) + H2O(g) → CO2(g) + H2(g)",
      "This reaction is used to increase the yield of dihydrogen obtained from the coal-gasification reaction:",
      "C(s) + H2O(g) → CO(g) + H2(g)",
      "(v) Fuel cell",
      "Fuel cells are devices for producing electricity from a fuel in the presence of an electrolyte. Dihydrogen can be used as fuel in these cells. It is preferred over other fuels because it is eco-friendly and releases greater energy per unit mass of fuel compared to gasoline and other conventional fuels.",
    ],
  },
];

const docData = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 9,
  chapterTitle: "Hydrogen",
  questions: questions.map((item) => ({
    _type: "questionAnswer",
    _key: randomUUID(),
    questionNumber: item.n,
    questionText: rich(item.q),
    answer: rich(item.a),
  })),
};

const existing = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 9][0]._id'
);
if (existing) {
  await client.delete(existing);
  console.log(`Deleted existing document: ${existing}`);
}

const result = await client.create(docData);
console.log(`✓ Created Class 11 Chemistry Ch.9 (Q1-36): ${result._id} (${questions.length} questions)`);
