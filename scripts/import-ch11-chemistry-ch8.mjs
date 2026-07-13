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
      "Assign oxidation number to the underlined elements in each of the following species:\n(a) NaH2PO4 (b) NaHSO4 (c) H4P2O7 (d) K2MnO4\n(e) CaO2 (f) NaBH4 (g) H2S2O7 (h) KAl(SO4)2.12H2O",
    ],
    a: [
      "(a) Let x be the oxidation number of P in NaH2PO4. The oxidation numbers of Na, H and O are +1, +1 and −2 respectively.",
      { eq: "1(+1)+2(+1)+1(x)+4(-2)=0 \\Rightarrow x=+5" },
      "Therefore, the oxidation number of P in NaH2PO4 is +5.",
      "(b) Let x be the oxidation number of S in NaHSO4. The oxidation numbers of Na, H and O are +1, +1 and −2 respectively.",
      { eq: "1(+1)+1(+1)+1(x)+4(-2)=0 \\Rightarrow x=+6" },
      "Therefore, the oxidation number of S in NaHSO4 is +6.",
      "(c) Let x be the oxidation number of P in H4P2O7. The oxidation numbers of H and O are +1 and −2 respectively.",
      { eq: "4(+1)+2(x)+7(-2)=0 \\Rightarrow x=+5" },
      "Therefore, the oxidation number of P in H4P2O7 is +5.",
      "(d) Let x be the oxidation number of Mn in K2MnO4. The oxidation numbers of K and O are +1 and −2 respectively.",
      { eq: "2(+1)+1(x)+4(-2)=0 \\Rightarrow x=+6" },
      "Therefore, the oxidation number of Mn in K2MnO4 is +6.",
      "(e) Let x be the oxidation number of O in CaO2. The oxidation number of Ca is +2.",
      { eq: "1(+2)+2(x)=0 \\Rightarrow x=-1" },
      "Therefore, the oxidation number of O in CaO2 is −1 (a peroxide).",
      "(f) Let x be the oxidation number of B in NaBH4. The oxidation number of Na is +1 and, since this is a metal hydride, the oxidation number of H is −1.",
      { eq: "1(+1)+1(x)+4(-1)=0 \\Rightarrow x=+3" },
      "Therefore, the oxidation number of B in NaBH4 is +3.",
      "(g) Let x be the oxidation number of S in H2S2O7. The oxidation numbers of H and O are +1 and −2 respectively.",
      { eq: "2(+1)+2(x)+7(-2)=0 \\Rightarrow x=+6" },
      "Therefore, the oxidation number of S in H2S2O7 is +6.",
      "(h) Let x be the oxidation number of S in KAl(SO4)2·12H2O. Since the water of crystallization is neutral, it can be excluded from the calculation. The oxidation numbers of K, Al and O are +1, +3 and −2 respectively.",
      { eq: "1(+1)+1(+3)+2(x)+8(-2)=0 \\Rightarrow 2x=12 \\Rightarrow x=+6" },
      "Therefore, the oxidation number of S in KAl(SO4)2·12H2O is +6.",
    ],
  },
  {
    n: "2",
    q: [
      "What are the oxidation numbers of the underlined elements in each of the following and how do you rationalise these results?\n(a) KI3 (b) H2S4O6 (c) Fe3O4 (d) CH3CH2OH (e) CH3COOH",
    ],
    a: [
      "(a) In KI3, the oxidation number of K is +1. Hence, the average oxidation number of I works out to −1/3, which cannot be correct since oxidation numbers must be whole numbers. We must therefore consider the structure of KI3: an iodine atom forms a coordinate covalent bond with an iodine molecule (I2), i.e. K+[I-I← I]-. Hence, the oxidation number of the two I atoms forming the I2 part is 0, while the oxidation number of the I atom forming the coordinate bond is −1.",
      "(b) In H2S4O6, taking the oxidation number of H as +1 and O as −2, the average oxidation number of S works out to +2.5, which cannot be correct. Considering the structure HO3S-S-S-SO3H, two of the four S atoms (the terminal ones, each bonded to three oxygens) have oxidation number +5, and the other two S atoms (the central S−S atoms) have oxidation number 0.",
      "(c) In Fe3O4, taking the oxidation number of O as −2, the oxidation number of Fe works out to +8/3, which cannot be correct. Fe3O4 is in fact a mixed oxide, FeO·Fe2O3; one of the three Fe atoms has oxidation number +2, and the other two Fe atoms have oxidation number +3.",
      "(d) Let x be the oxidation number of C in CH3CH2OH (C2H6O). The oxidation numbers of H and O are +1 and −2 respectively.",
      { eq: "2(x)+6(+1)+1(-2)=0 \\Rightarrow x=-2" },
      "Hence, the oxidation number of C in CH3CH2OH is −2.",
      "(e) Let x be the average oxidation number of C in CH3COOH (C2H4O2). The oxidation numbers of H and O are +1 and −2 respectively.",
      { eq: "2(x)+4(+1)+2(-2)=0 \\Rightarrow x=0" },
      "However, 0 is only the average oxidation number of C in this molecule; the two carbon atoms are present in different chemical environments and therefore cannot have the same oxidation number. By counting bonds (a bond to a less electronegative atom, H or C, lowers a carbon's oxidation number by one per bond; a bond to the more electronegative O raises it by one per bond): the methyl carbon has three C–H bonds and one C–C bond, giving oxidation number −3, while the carboxyl carbon has one C–C bond, one C=O double bond and one C–O(H) bond, giving oxidation number +3. The two values average to 0, consistent with the calculation above.",
    ],
  },
  {
    n: "3",
    q: [
      "Justify that the following reactions are redox reactions:\n(a) CuO(s) + H2(g) → Cu(s) + H2O(g)\n(b) Fe2O3(s) + 3CO(g) → 2Fe(s) + 3CO2(g)\n(c) 4BCl3(g) + 3LiAlH4(s) → 2B2H6(g) + 3LiCl(s) + 3AlCl3(s)\n(d) 2K(s) + F2(g) → 2KF(s)\n(e) 4NH3(g) + 5O2(g) → 4NO(g) + 6H2O(g)",
    ],
    a: [
      "(a) The oxidation number of Cu decreases from +2 (in CuO) to 0 (in Cu), i.e. CuO is reduced to Cu. The oxidation number of H increases from 0 (in H2) to +1 (in H2O), i.e. H2 is oxidized to H2O. Hence, this is a redox reaction.",
      "(b) The oxidation number of Fe decreases from +3 (in Fe2O3) to 0 (in Fe), i.e. Fe2O3 is reduced to Fe. The oxidation number of C increases from +2 (in CO) to +4 (in CO2), i.e. CO is oxidized to CO2. Hence, this is a redox reaction.",
      "(c) The oxidation number of B decreases from +3 (in BCl3) to −3 (in B2H6), i.e. BCl3 is reduced to B2H6. The oxidation number of H increases from −1 (in LiAlH4) to +1 (in B2H6), i.e. LiAlH4 is oxidized. Hence, this is a redox reaction.",
      "(d) Each K atom loses one electron (oxidation number increases from 0 to +1), while F2 gains two electrons to form two F- ions (oxidation number decreases from 0 to −1). K is oxidized while F2 is reduced. Hence, this is a redox reaction.",
      "(e) The oxidation number of N increases from −3 (in NH3) to +2 (in NO), i.e. NH3 is oxidized. The oxidation number of O decreases from 0 (in O2) to −2 (in both NO and H2O), i.e. O2 is reduced. Hence, this is a redox reaction.",
    ],
  },
  {
    n: "4",
    q: [
      "Fluorine reacts with ice and results in the change: H2O(s) + F2(g) → HF(g) + HOF(g). Justify that this reaction is a redox reaction.",
    ],
    a: [
      "Oxidation numbers: H and O in H2O are +1 and −2; F2 is 0; H and F in HF are +1 and −1; H, O and F in HOF are +1, −2 and +1 respectively.",
      "The oxidation number of F increases from 0 (in F2) to +1 (in HOF) — oxidation — and simultaneously decreases from 0 (in F2) to −1 (in HF) — reduction. Since fluorine is both oxidized and reduced in this reaction, it is a redox reaction.",
    ],
  },
  {
    n: "5",
    q: [
      "Calculate the oxidation number of sulphur, chromium and nitrogen in H2SO5, Cr2O72- and NO3-. Suggest a structure for these compounds and account for the fallacy, if any.",
    ],
    a: [
      "H2SO5: Let x be the oxidation number of S; taking O as −2 and H as +1 throughout:",
      { eq: "2(+1)+1(x)+5(-2)=0 \\Rightarrow x=+8" },
      "This is not possible, since S has only 6 valence electrons and its oxidation number cannot exceed +6. The fallacy lies in treating all five oxygen atoms as being at −2: in H2SO5, two of the oxygen atoms are joined to each other in a peroxide (−O−O−) linkage, so those two oxygens each have oxidation number −1 rather than −2. Taking this into account:",
      { eq: "2(+1)+1(x)+3(-2)+2(-1)=0 \\Rightarrow x=+6" },
      "Hence, the oxidation number of S in H2SO5 is +6.",
      "Cr2O72-: Let x be the oxidation number of Cr.",
      { eq: "2(x)+7(-2)=-2 \\Rightarrow x=+6" },
      "Here no fallacy arises: the dichromate ion consists of two CrO4 tetrahedra sharing one bridging oxygen atom, and all seven oxygens are ordinary (non-peroxidic) oxide oxygens at −2, so each Cr atom independently has oxidation number +6.",
      "NO3-: Let x be the oxidation number of N.",
      { eq: "1(x)+3(-2)=-1 \\Rightarrow x=+5" },
      "No fallacy arises here either: the nitrate ion has a resonance structure in which N is bonded to two oxygens by double bonds (each −2) and to one oxygen by a single bond (−1, carrying the negative charge), consistent with N having oxidation number +5.",
    ],
  },
  {
    n: "6",
    q: [
      "Write formulas for the following compounds:\n(a) Mercury(II) chloride (b) Nickel(II) sulphate (c) Tin(IV) oxide (d) Thallium(I) sulphate (e) Iron(III) sulphate (f) Chromium(III) oxide",
    ],
    a: [
      "(a) Mercury(II) chloride: HgCl2",
      "(b) Nickel(II) sulphate: NiSO4",
      "(c) Tin(IV) oxide: SnO2",
      "(d) Thallium(I) sulphate: Tl2SO4",
      "(e) Iron(III) sulphate: Fe2(SO4)3",
      "(f) Chromium(III) oxide: Cr2O3",
    ],
  },
  {
    n: "7",
    q: [
      "Suggest a list of the substances where carbon can exhibit oxidation states from −4 to +4 and nitrogen from −3 to +5.",
    ],
    a: [
      "Carbon compounds spanning oxidation states −4 to +4:",
      "CH4: −4. H3C−CH3 (ethane): −3. CH3Cl: −2. CH2Cl2: 0. CHCl3 and CO: +2. Cl3C−CCl3: +3. CCl4 and CO2: +4. HC≡CH (acetylene): −1. ClC≡CCl: +1.",
      "Nitrogen compounds spanning oxidation states −3 to +5:",
      "NH3: −3. N2H4: −2. N2H2: −1. N2: 0. N2O: +1. NO: +2. N2O3: +3. NO2: +4. N2O5: +5.",
    ],
  },
  {
    n: "8",
    q: [
      "While sulphur dioxide and hydrogen peroxide can act as oxidising as well as reducing agents in their reactions, ozone and nitric acid act only as oxidants. Why?",
    ],
    a: [
      "SO2: The oxidation number of S in SO2 is +4, and S can range in oxidation number from +6 to −2. Since +4 lies between these extremes, SO2 can either gain or lose electrons, and so can act as both an oxidising and a reducing agent.",
      "H2O2: The oxidation number of O in H2O2 is −1, and O can range from 0 to −2. Since −1 lies between these extremes, H2O2 can also act as both an oxidising and a reducing agent.",
      "O3: The oxidation number of O in O3 is 0, which is already at the upper end of O's usual range (0 to −2). Since it cannot increase further, O3 can only be reduced, and so it acts only as an oxidant.",
      "HNO3: The oxidation number of N in HNO3 is +5, which is at the upper end of N's range (+5 to −3). Since it cannot increase further, HNO3 can only be reduced, and so it acts only as an oxidant.",
    ],
  },
  {
    n: "9",
    q: [
      "Consider the reactions:\n(a) 6CO2(g) + 6H2O(l) → C6H12O6(aq) + 6O2(g)\n(b) O3(g) + H2O2(l) → H2O(l) + 2O2(g)\nWhy is it more appropriate to write these reactions as follows?\n(a) 6CO2(g) + 12H2O(l) → C6H12O6(aq) + 6H2O(l) + 6O2(g)\n(b) O3(g) + H2O2(l) → H2O(l) + O2(g) + O2(g)\nAlso suggest a technique to investigate the path of these redox reactions.",
    ],
    a: [
      "(a) The reaction can be thought of as occurring in two steps:",
      "Step 1: Water is split into hydrogen and oxygen: 2H2O(l) → 2H2(g) + O2(g)",
      "Step 2: The hydrogen produced reduces CO2, giving glucose and regenerating water: 6CO2(g) + 12H2(g) → C6H12O6(aq) + 6H2O(l)",
      "Combining six times Step 1 with Step 2 gives the net reaction 6CO2(g) + 12H2O(l) → C6H12O6(aq) + 6H2O(l) + 6O2(g). Writing it this way correctly shows that water is both a reactant (12 molecules consumed) and a product (6 molecules regenerated) of the true mechanism (as occurs in photosynthesis), rather than obscuring this by cancelling down to a net 6 molecules of water.",
      "The path of the reaction can be investigated using isotopically labelled water, H2 18O, in place of ordinary water, to track whether the evolved O2 originates from water or from CO2.",
      "(b) Similarly, the reaction between ozone and hydrogen peroxide can be thought of as occurring in two steps:",
      "Step 1: O3(g) → O2(g) + O(g)",
      "Step 2: H2O2(l) + O(g) → H2O(l) + O2(g)",
      "Combining these gives the net reaction H2O2(l) + O3(g) → H2O(l) + O2(g) + O2(g), which correctly shows that O2 is produced from each of the two reactants separately, rather than writing it as a single combined \"2O2\" term.",
      "The path of this reaction can similarly be traced using isotopically labelled H218O2 or O318.",
    ],
  },
  {
    n: "10",
    q: [
      "The compound AgF2 is an unstable compound. However, if formed, the compound acts as a very strong oxidising agent. Why?",
    ],
    a: [
      "The oxidation number of Ag in AgF2 is +2, but +2 is a very unstable oxidation number for Ag. Hence, when AgF2 is formed, the silver readily accepts an electron and forms Ag+, decreasing its oxidation number from +2 to +1 — a much more stable state. Because of this strong tendency to be reduced, AgF2 acts as a very strong oxidising agent.",
    ],
  },
  {
    n: "11",
    q: [
      "Whenever a reaction between an oxidising agent and a reducing agent is carried out, a compound of lower oxidation state is formed if the reducing agent is in excess, and a compound of higher oxidation state is formed if the oxidising agent is in excess. Justify this statement giving three illustrations.",
    ],
    a: [
      "(i) P4 and F2 act as reducing and oxidising agents respectively.",
      "If excess P4 is reacted with F2, then PF3 is produced, in which the oxidation number of P is +3: P4(excess) + F2 → PF3",
      "If P4 is reacted with excess F2, then PF5 is produced, in which the oxidation number of P is +5: P4 + F2(excess) → PF5",
      "(ii) K and O2 act as reducing and oxidising agents respectively.",
      "If excess K reacts with O2, then K2O is produced, in which the oxidation number of O is −2: 4K(excess) + O2 → 2K2O",
      "If K reacts with excess O2, then K2O2 is produced, in which the oxidation number of O is −1: 2K + O2(excess) → K2O2",
      "(iii) C and O2 act as reducing and oxidising agents respectively.",
      "If excess C is reacted with an insufficient amount of O2, then CO is produced, in which the oxidation number of C is +2: C(excess) + O2 → CO",
      "If C is burnt in an excess of O2, then CO2 is produced, in which the oxidation number of C is +4: C + O2(excess) → CO2",
    ],
  },
  {
    n: "12",
    q: [
      "How do you account for the following observations?\n(a) Though alkaline potassium permanganate and acidic potassium permanganate are both used as oxidants, in the manufacture of benzoic acid from toluene we use alcoholic potassium permanganate as the oxidant. Why? Write a balanced redox equation for the reaction.\n(b) When concentrated sulphuric acid is added to an inorganic mixture containing chloride, we get a colourless, pungent-smelling gas (HCl), but if the mixture contains bromide, we get red vapours of bromine. Why?",
    ],
    a: [
      "(a) Alcoholic KMnO4 is used in preference to alkaline or acidic KMnO4 for two reasons: (i) in a neutral medium, OH- ions are themselves produced during the reaction, reducing the need to add extra acid or base; (ii) KMnO4 and alcohol are both polar (homogeneous with each other), and alcohol and toluene are both organic (homogeneous with each other), so the reaction proceeds faster than it would in a heterogeneous medium.",
      "The balanced redox equation is:",
      { eq: "C_6H_5CH_3 + 2MnO_4^-(aq) \\rightarrow C_6H_5COO^-(aq) + 2MnO_2(s) + H_2O(l) + OH^-(aq)" },
      "(b) When concentrated H2SO4 is added to a mixture containing bromide, HBr is first produced; being a strong reducing agent, HBr then reduces H2SO4 to SO2, releasing the red vapour of bromine:",
      { eq: "2NaBr(s) + 2H_2SO_4(l) \\rightarrow 2NaHSO_4(s) + 2HBr(g)" },
      { eq: "2HBr(g) + H_2SO_4(l) \\rightarrow Br_2(l) + SO_2(g) + 2H_2O(l)" },
      "With chloride, HCl is similarly first produced, but HCl is too weak a reducing agent to reduce H2SO4 to SO2, so only the pungent-smelling HCl gas is evolved:",
      { eq: "2NaCl(s) + 2H_2SO_4(l) \\rightarrow 2NaHSO_4(s) + 2HCl(g)" },
    ],
  },
  {
    n: "13",
    q: [
      "Identify the substance oxidised, reduced and the oxidising and reducing agents for each of the following reactions:\n(a) 2AgBr(s) + C6H6O2(aq) → 2Ag(s) + 2HBr(aq) + C6H4O2(aq)\n(b) HCHO(l) + 2[Ag(NH3)2]+(aq) + 3OH-(aq) → 2Ag(s) + HCOO-(aq) + 4NH3(aq) + 2H2O(l)\n(c) HCHO(l) + 2Cu2+(aq) + 5OH-(aq) → Cu2O(s) + HCOO-(aq) + 3H2O(l)\n(d) N2H4(l) + 2H2O2(l) → N2(g) + 4H2O(l)\n(e) Pb(s) + PbO2(s) + 2H2SO4(aq) → 2PbSO4(aq) + 2H2O(l)",
    ],
    a: [
      "(a) C6H6O2 → oxidised substance; AgBr → reduced substance; AgBr → oxidising agent; C6H6O2 → reducing agent.",
      "(b) HCHO → oxidised substance; [Ag(NH3)2]+ → reduced substance; [Ag(NH3)2]+ → oxidising agent; HCHO → reducing agent.",
      "(c) HCHO → oxidised substance; Cu2+ → reduced substance; Cu2+ → oxidising agent; HCHO → reducing agent.",
      "(d) N2H4 → oxidised substance; H2O2 → reduced substance; H2O2 → oxidising agent; N2H4 → reducing agent.",
      "(e) Pb → oxidised substance; PbO2 → reduced substance; PbO2 → oxidising agent; Pb → reducing agent.",
    ],
  },
  {
    n: "14",
    q: [
      "Consider the reactions:",
      { eq: "2S_2O_3^{2-}(aq) + I_2(s) \\rightarrow S_4O_6^{2-}(aq) + 2I^-(aq)" },
      { eq: "S_2O_3^{2-}(aq) + 2Br_2(l) + 5H_2O(l) \\rightarrow 2SO_4^{2-}(aq) + 4Br^-(aq) + 10H^+(aq)" },
      "Why does the same reductant, thiosulphate, react differently with iodine and bromine?",
    ],
    a: [
      "The average oxidation number of S in S2O32- is +2. The average oxidation number of S in S4O62- is +2.5, and the oxidation number of S in SO42- is +6.",
      "Since Br2 is a stronger oxidising agent than I2, it oxidises the S of S2O32- all the way to the higher oxidation number of +6 in SO42-. Since I2 is a weaker oxidising agent, it oxidises the S of S2O32- only to the lower oxidation number of +2.5 in S4O62-.",
    ],
  },
  {
    n: "15",
    q: [
      "Justify that among the halogens, fluorine is the best oxidant and among the hydrohalic compounds, hydroiodic acid (HI) is the best reductant.",
    ],
    a: [
      "F2 can oxidise Cl-, Br- and I- to their respective halogens, but Cl2, Br2 and I2 cannot oxidise F- to F2:",
      { eq: "F_2(aq) + 2Cl^-(aq) \\rightarrow 2F^-(aq) + Cl_2(g)" },
      { eq: "F_2(aq) + 2Br^-(aq) \\rightarrow 2F^-(aq) + Br_2(l)" },
      { eq: "F_2(aq) + 2I^-(aq) \\rightarrow 2F^-(aq) + I_2(s)" },
      "This shows that the oxidising power of the halogens increases in the order I2 < Br2 < Cl2 < F2, so F2 is the best oxidant among the halogens.",
      "HI and HBr can reduce H2SO4 to SO2, but HCl and HF cannot:",
      { eq: "2HI(aq) + H_2SO_4(aq) \\rightarrow I_2(s) + SO_2(g) + 2H_2O(l)" },
      { eq: "2HBr(aq) + H_2SO_4(aq) \\rightarrow Br_2(l) + SO_2(g) + 2H_2O(l)" },
      "Further, I- can reduce Cu2+ to Cu+, but Br- cannot:",
      { eq: "4I^-(aq) + 2Cu^{2+}(aq) \\rightarrow Cu_2I_2(s) + I_2(aq)" },
      "This shows that the reducing power of the hydrohalic compounds increases in the order HF < HCl < HBr < HI, so HI is the best reductant among these compounds.",
    ],
  },
  {
    n: "16",
    q: [
      "Why does the following reaction occur?",
      { eq: "XeO_6^{4-}(aq) + 2F^-(aq) + 6H^+(aq) \\rightarrow XeO_3(g) + F_2(g) + 3H_2O(l)" },
      "What conclusion about the compound Na4XeO6 (of which XeO64- is a part) can be drawn from the reaction?",
    ],
    a: [
      "The oxidation number of Xe decreases from +8 (in XeO64-) to +6 (in XeO3), and the oxidation number of F increases from −1 (in F-) to 0 (in F2). Since Xe is reduced and F is oxidised, this reaction occurs because Na4XeO6 (i.e. XeO64-) is a stronger oxidising agent than F2.",
    ],
  },
  {
    n: "17",
    q: [
      "Identify the substance oxidised and the substance reduced (and hence the oxidising and reducing agents) in each of the following reactions, and use these results to state which of Ag+ or Cu2+ is the stronger oxidising agent:\n(a) H3PO2(aq) + 4AgNO3(aq) + 2H2O(l) → H3PO4(aq) + 4Ag(s) + 4HNO3(aq)\n(b) H3PO2(aq) + 2CuSO4(aq) + 2H2O(l) → H3PO4(aq) + 2Cu(s) + H2SO4(aq)\n(c) C6H5CHO(l) + 2[Ag(NH3)2]+(aq) + 3OH-(aq) → C6H5COO-(aq) + 2Ag(s) + 4NH3(aq) + 2H2O(l)\n(d) C6H5CHO(l) + 2Cu2+(aq) + 5OH-(aq) → no change is observed",
    ],
    a: [
      "In (a) and (b), Ag+ and Cu2+ respectively act as oxidising agents (both oxidise H3PO2 to H3PO4, being themselves reduced to the metal). In (c), Ag+ (as [Ag(NH3)2]+) oxidises C6H5CHO to C6H5COO-. In (d), however, Cu2+ is unable to oxidise C6H5CHO at all. Therefore, Ag+ is a stronger oxidising agent compared to Cu2+.",
    ],
  },
  {
    n: "18",
    q: [
      "Balance the following redox reactions by ion-electron method:\n(a) MnO4-(aq) + I-(aq) → MnO2(s) + I2(s) (in basic medium)\n(b) MnO4-(aq) + SO2(g) → Mn2+(aq) + HSO4-(aq) (in acidic medium)\n(c) H2O2(aq) + Fe2+(aq) → Fe3+(aq) + H2O(l) (in acidic medium)\n(d) Cr2O72-(aq) + SO2(g) → Cr3+(aq) + SO42-(aq) (in acidic medium)",
    ],
    a: [
      "(a) The oxidation half-reaction is 2I-(aq) → I2(s) + 2e-. The oxidation number of Mn decreases from +7 to +4 in the reduction half-reaction, so 3 electrons are added: MnO4-(aq) + 3e- → MnO2(s). Adding 4OH- to the right-hand side balances the charge: MnO4-(aq) + 3e- → MnO2(s) + 4OH-. Since there are 6 oxygens on the right and 4 on the left, 2H2O are added to the left: MnO4-(aq) + 2H2O + 3e- → MnO2(s) + 4OH-. Multiplying the oxidation half-reaction by 3 and the reduction half-reaction by 2 and adding them gives the balanced equation:",
      { eq: "6I^-(aq) + 2MnO_4^-(aq) + 4H_2O(l) \\rightarrow 3I_2(s) + 2MnO_2(s) + 8OH^-(aq)" },
      "(b) The oxidation half-reaction is SO2(g) + 2H2O(l) → HSO4-(aq) + 3H+(aq) + 2e-. The reduction half-reaction is MnO4-(aq) + 8H+(aq) + 5e- → Mn2+(aq) + 4H2O(l). Multiplying the oxidation half-reaction by 5 and the reduction half-reaction by 2 and adding them gives:",
      { eq: "2MnO_4^-(aq) + 5SO_2(g) + 2H_2O(l) + H^+(aq) \\rightarrow 2Mn^{2+}(aq) + 5HSO_4^-(aq)" },
      "(c) The oxidation half-reaction is Fe2+(aq) → Fe3+(aq) + e-. The reduction half-reaction is H2O2(aq) + 2H+(aq) + 2e- → 2H2O(l). Multiplying the oxidation half-reaction by 2 and adding it to the reduction half-reaction gives:",
      { eq: "H_2O_2(aq) + 2Fe^{2+}(aq) + 2H^+(aq) \\rightarrow 2Fe^{3+}(aq) + 2H_2O(l)" },
      "(d) The oxidation half-reaction is SO2(g) + 2H2O(l) → SO42-(aq) + 4H+(aq) + 2e-. The reduction half-reaction is Cr2O72-(aq) + 14H+(aq) + 6e- → 2Cr3+(aq) + 7H2O(l). Multiplying the oxidation half-reaction by 3 and adding it to the reduction half-reaction gives:",
      { eq: "Cr_2O_7^{2-}(aq) + 3SO_2(g) + 2H^+(aq) \\rightarrow 2Cr^{3+}(aq) + 3SO_4^{2-}(aq) + H_2O(l)" },
    ],
  },
  {
    n: "19",
    q: [
      "Balance the following equations in basic medium by the ion-electron method and the oxidation number method, and identify the oxidising agent and the reducing agent in each case:\n(a) P4(s) + OH-(aq) → PH3(g) + HPO2-(aq)\n(b) N2H4(l) + ClO3-(aq) → NO(g) + Cl-(g)\n(c) Cl2O7(g) + H2O2(aq) → ClO2-(aq) + O2(g) + H+(aq)",
    ],
    a: [
      "(a) Oxidation number method: The oxidation number of P decreases from 0 (in P4) to −3 (in PH3) — a gain of 3 electrons per P atom (reduction). The oxidation number of P also increases from 0 (in P4) to +2 (in HPO2-) — a loss of 2 electrons per P atom (oxidation). Since P undergoes both oxidation and reduction, P4 acts as both the oxidising agent and the reducing agent (a disproportionation reaction).",
      "Ion-electron method — oxidation half-reaction:",
      { eq: "P_4(s) + 12OH^-(aq) \\rightarrow 4HPO_2^-(aq) + 4H_2O(l) + 8e^-" },
      "Reduction half-reaction:",
      { eq: "P_4(s) + 12H_2O(l) + 12e^- \\rightarrow 4PH_3(g) + 12OH^-(aq)" },
      "Multiplying the oxidation half-reaction by 3 and the reduction half-reaction by 2 and adding, the electrons cancel and the equation balances to:",
      { eq: "5P_4(s) + 12H_2O(l) + 12OH^-(aq) \\rightarrow 8PH_3(g) + 12HPO_2^-(aq)" },
      "(b) Oxidation number method: The oxidation number of N increases from −2 (in N2H4) to +2 (in NO) — a loss of 4 electrons per N atom, i.e. 8 electrons per N2H4 molecule (oxidation). The oxidation number of Cl decreases from +5 (in ClO3-) to −1 (in Cl-) — a gain of 6 electrons per Cl atom (reduction). Hence, N2H4 is the reducing agent and ClO3- is the oxidising agent.",
      "Ion-electron method — oxidation half-reaction:",
      { eq: "N_2H_4(l) + 8OH^-(aq) \\rightarrow 2NO(g) + 6H_2O(l) + 8e^-" },
      "Reduction half-reaction:",
      { eq: "ClO_3^-(aq) + 3H_2O(l) + 6e^- \\rightarrow Cl^-(aq) + 6OH^-(aq)" },
      "Multiplying the oxidation half-reaction by 3 and the reduction half-reaction by 4 and adding, the electrons and common terms cancel to give the balanced equation:",
      { eq: "3N_2H_4(l) + 4ClO_3^-(aq) \\rightarrow 6NO(g) + 4Cl^-(aq) + 6H_2O(l)" },
      "(c) Oxidation number method: The oxidation number of Cl decreases from +7 (in Cl2O7) to +3 (in ClO2-) — a gain of 4 electrons per Cl atom (reduction). The oxidation number of O increases from −1 (in H2O2) to 0 (in O2) — a loss of 1 electron per O atom (oxidation). Hence, H2O2 is the reducing agent and Cl2O7 is the oxidising agent.",
      "Ion-electron method — oxidation half-reaction:",
      { eq: "H_2O_2(aq) + 2OH^-(aq) \\rightarrow O_2(g) + 2H_2O(l) + 2e^-" },
      "Reduction half-reaction:",
      { eq: "Cl_2O_7(g) + 3H_2O(l) + 8e^- \\rightarrow 2ClO_2^-(aq) + 6OH^-(aq)" },
      "Multiplying the oxidation half-reaction by 4 and adding it to the reduction half-reaction, the electrons cancel and the equation simplifies to the balanced redox reaction:",
      { eq: "Cl_2O_7(g) + 4H_2O_2(aq) + 2OH^-(aq) \\rightarrow 2ClO_2^-(aq) + 4O_2(g) + 5H_2O(l)" },
    ],
  },
  {
    n: "20",
    q: [
      "What sort of information can you draw from the following reaction?",
      { eq: "(CN)_2(g) + 2OH^-(aq) \\rightarrow CN^-(aq) + CNO^-(aq) + H_2O(l)" },
    ],
    a: [
      "Let the oxidation number of C be y in each species (taking N as −3 throughout).",
      { eq: "\\text{In}\\ (CN)_2: 2(y-3)=0 \\Rightarrow y=+3" },
      { eq: "\\text{In}\\ CN^-: y-3=-1 \\Rightarrow y=+2" },
      { eq: "\\text{In}\\ CNO^-: y-3-2=-1 \\Rightarrow y=+4" },
      "Hence, the oxidation number of C is +3 in (CN)2, +2 in CN-, and +4 in CNO-. Since the oxidation number of C both decreases (+3 to +2, reduction, forming CN-) and increases (+3 to +4, oxidation, forming CNO-) starting from the same compound (CN)2, the same compound is simultaneously oxidised and reduced in this reaction. Reactions of this kind, in which the same species is both oxidised and reduced, are known as disproportionation reactions. Thus, the alkaline decomposition of cyanogen is an example of a disproportionation reaction.",
    ],
  },
  {
    n: "21",
    q: [
      "The Mn3+ ion is unstable in solution and undergoes disproportionation to give Mn2+, MnO2 and H+ ion. Write a balanced ionic equation for the reaction.",
    ],
    a: [
      "The reaction is: Mn3+(aq) → Mn2+(aq) + MnO2(s) + H+(aq)",
      "Oxidation half-reaction:",
      { eq: "Mn^{3+}(aq) + 2H_2O(l) \\rightarrow MnO_2(s) + e^- + 4H^+(aq)" },
      "Reduction half-reaction:",
      { eq: "Mn^{3+}(aq) + e^- \\rightarrow Mn^{2+}(aq)" },
      "Adding the two half-reactions gives the balanced equation:",
      { eq: "2Mn^{3+}(aq) + 2H_2O(l) \\rightarrow MnO_2(s) + 2Mn^{2+}(aq) + 4H^+(aq)" },
    ],
  },
  {
    n: "22",
    q: [
      "Consider the elements: Cs, Ne, I and F\n(a) Identify the element that exhibits only a negative oxidation state.\n(b) Identify the element that exhibits only a positive oxidation state.\n(c) Identify the element that exhibits both negative and positive oxidation states.\n(d) Identify the element that exhibits neither a negative nor a positive oxidation state.",
    ],
    a: [
      "(a) F exhibits only a negative oxidation number, namely −1.",
      "(b) Cs exhibits only a positive oxidation number, namely +1.",
      "(c) I exhibits both negative and positive oxidation numbers: −1, +1, +3, +5 and +7.",
      "(d) Ne exhibits neither a negative nor a positive oxidation number; its oxidation number is 0.",
    ],
  },
  {
    n: "23",
    q: [
      "Chlorine is used to purify drinking water. Excess of chlorine is harmful, and is removed by treating the water with sulphur dioxide. Present a balanced equation for this redox change taking place in water.",
    ],
    a: [
      "The redox reaction is: Cl2(s) + SO2(aq) + H2O(l) → Cl-(aq) + SO42-(aq)",
      "Oxidation half-reaction:",
      { eq: "SO_2(aq) + 2H_2O(l) \\rightarrow SO_4^{2-}(aq) + 4H^+(aq) + 2e^-" },
      "Reduction half-reaction:",
      { eq: "Cl_2(s) + 2e^- \\rightarrow 2Cl^-(aq)" },
      "Adding the two half-reactions gives the balanced equation:",
      { eq: "Cl_2(s) + SO_2(aq) + 2H_2O(l) \\rightarrow 2Cl^-(aq) + SO_4^{2-}(aq) + 4H^+(aq)" },
    ],
  },
  {
    n: "24",
    q: [
      "Refer to the periodic table given in your book, and answer the following questions:\n(a) Select the possible non-metals that can show disproportionation reactions.\n(b) Select three metals that show disproportionation reactions.",
    ],
    a: [
      "One of the two reacting species must contain an element capable of existing in at least three different oxidation states for a disproportionation reaction to be possible.",
      "(a) The non-metals that can show disproportionation reactions are P, Cl and S.",
      "(b) Three metals that can show disproportionation reactions are Mn, Ga and Cu.",
    ],
  },
  {
    n: "25",
    q: [
      "In Ostwald's process for the manufacture of nitric acid, the first step involves the oxidation of ammonia gas by oxygen gas to give nitric oxide gas and steam. What is the maximum weight of nitric oxide that can be obtained starting only with 10.00 g of ammonia and 20.00 g of oxygen?",
    ],
    a: [
      "The balanced reaction is:",
      { eq: "4NH_3(g) + 5O_2(g) \\rightarrow 4NO(g) + 6H_2O(g)" },
      "Molar masses: 4NH3 = 4×17 g = 68 g; 5O2 = 5×32 g = 160 g; 4NO = 4×30 g = 120 g; 6H2O = 6×18 g = 108 g.",
      "Thus, 68 g of NH3 reacts with 160 g of O2. Therefore, 10 g of NH3 would react with:",
      { eq: "\\frac{160\\times10}{68} = 23.53\\ g\\ \\text{of}\\ O_2" },
      "However, only 20 g of O2 is available, so O2 is the limiting reagent.",
      "Now, 160 g of O2 gives 120 g of NO. Therefore, 20 g of O2 gives:",
      { eq: "\\frac{120\\times20}{160} = 15\\ g\\ \\text{of}\\ NO" },
      "Therefore, a maximum of 15 g of nitric oxide can be obtained.",
    ],
  },
  {
    n: "26",
    q: [
      "Using the standard electrode potentials given in Table 8.1 of the textbook, predict if the reaction between the following is feasible:\n(a) Fe3+(aq) and I-(aq) (b) Ag+(aq) and Cu(s) (c) Fe3+(aq) and Cu(s)\n(d) Ag(s) and Fe3+(aq) (e) Br2(aq) and Fe2+(aq)",
    ],
    a: [
      "(a) The reaction is 2Fe3+(aq) + 2I-(aq) → 2Fe2+(aq) + I2(s). Oxidation half-reaction: 2I-(aq) → I2(s) + 2e-; E° = −0.54 V. Reduction half-reaction: [Fe3+(aq) + e- → Fe2+(aq)]×2; E° = +0.77 V. Overall: E° = +0.23 V. Since E° for the overall reaction is positive, the reaction between Fe3+(aq) and I-(aq) is feasible.",
      "(b) The reaction is 2Ag+(aq) + Cu(s) → 2Ag(s) + Cu2+(aq). Oxidation: Cu(s) → Cu2+(aq) + 2e-; E° = −0.34 V. Reduction: [Ag+(aq)+e- → Ag(s)]×2; E° = +0.80 V. Overall: E° = +0.46 V, which is positive. Hence, the reaction between Ag+(aq) and Cu(s) is feasible.",
      "(c) The reaction is 2Fe3+(aq) + Cu(s) → 2Fe2+(aq) + Cu2+(aq). Oxidation: Cu(s) → Cu2+(aq) + 2e-; E° = −0.34 V. Reduction: [Fe3+(aq)+e- → Fe2+(aq)]×2; E° = +0.77 V. Overall: E° = +0.43 V, which is positive. Hence, the reaction between Fe3+(aq) and Cu(s) is feasible.",
      "(d) The reaction is Ag(s) + Fe3+(aq) → Ag+(aq) + Fe2+(aq). Oxidation: Ag(s) → Ag+(aq) + e-; E° = −0.80 V. Reduction: Fe3+(aq) + e- → Fe2+(aq); E° = +0.77 V. Overall: E° = −0.03 V, which is negative. Hence, the reaction between Ag(s) and Fe3+(aq) is not feasible.",
      "(e) The reaction is Br2(aq) + 2Fe2+(aq) → 2Br-(aq) + 2Fe3+(aq). Oxidation: [Fe2+(aq) → Fe3+(aq) + e-]×2; E° = −0.77 V. Reduction: Br2(aq) + 2e- → 2Br-(aq); E° = +1.09 V. Overall: E° = +0.32 V, which is positive. Hence, the reaction between Br2(aq) and Fe2+(aq) is feasible.",
    ],
  },
  {
    n: "27",
    q: [
      "Predict the products of electrolysis in each of the following:\n(i) An aqueous solution of AgNO3 with silver electrodes\n(ii) An aqueous solution of AgNO3 with platinum electrodes\n(iii) A dilute solution of H2SO4 with platinum electrodes\n(iv) An aqueous solution of CuCl2 with platinum electrodes",
    ],
    a: [
      "(i) AgNO3 ionises in aqueous solution to form Ag+ and NO3- ions. On electrolysis, either Ag+ ions or H2O molecules can be reduced at the cathode, but the reduction potential of Ag+ (+0.80 V) is higher than that of H2O (−0.83 V). Therefore, Ag+ ions are reduced at the cathode. Similarly, either Ag metal or H2O molecules can be oxidised at the anode, but the oxidation potential of Ag (−0.80 V) is greater than that of H2O (−1.23 V). Hence, Ag metal is oxidised at the anode.",
      "(ii) Pt cannot be oxidised easily. Therefore, at the anode, oxidation of water occurs to liberate O2. At the cathode, Ag+ ions are reduced and get deposited as Ag metal.",
      "(iii) H2SO4 ionises in aqueous solution to give H+ and SO42- ions. On electrolysis, either H2O molecules or H+ ions can be reduced at the cathode, but the reduction potential of H+ (0.0 V) is higher than that of H2O (−0.83 V). Therefore, at the cathode, H+ ions are reduced to liberate H2 gas. At the anode, either H2O or SO42- can be oxidised; oxidation of SO42- involves breaking more bonds than that of H2O, so SO42- has a lower oxidation potential than H2O. Hence, H2O is oxidised at the anode to liberate O2.",
      "(iv) CuCl2 ionises in aqueous solution to give Cu2+ and Cl- ions. On electrolysis, either Cu2+ or H2O can be reduced at the cathode; the reduction potential of Cu2+ (+0.34 V) is higher than that of H2O (−0.83 V). Therefore, Cu2+ ions are reduced and deposited at the cathode. At the anode, either Cl- or H2O can be oxidised. Although the tabulated potentials might suggest otherwise, in practice the oxidation of H2O requires a much higher over-voltage (the extra voltage needed to actually liberate the gas at the electrode) than the oxidation of Cl-. As a result, Cl- ions are preferentially oxidised at the anode, liberating Cl2 gas.",
    ],
  },
  {
    n: "28",
    q: [
      "Arrange the following metals in the order in which they displace each other from the solution of their salts: Al, Cu, Fe, Mg and Zn.",
    ],
    a: [
      "The order of increasing reducing power of these metals is Cu < Fe < Zn < Al < Mg. A metal with greater reducing power can displace a metal of lower reducing power from its salt solution. Hence, the order in which these metals displace each other is:",
      "Mg > Al > Zn > Fe > Cu",
    ],
  },
  {
    n: "29",
    q: [
      "Given the standard electrode potentials:\nK+/K = −2.93 V, Ag+/Ag = +0.80 V, Hg2+/Hg = +0.79 V\nMg2+/Mg = −2.37 V, Cr3+/Cr = −0.74 V\nArrange these metals in their increasing order of reducing power.",
    ],
    a: [
      "The reducing power of a metal increases as its standard electrode (reduction) potential decreases. Hence, the increasing order of reducing power is:",
      "Ag < Hg < Cr < Mg < K",
    ],
  },
  {
    n: "30",
    q: [
      "Depict the galvanic cell in which the reaction Zn(s) + 2Ag+(aq) → Zn2+(aq) + 2Ag(s) takes place. Further show: (i) which of the electrode is negatively charged, (ii) the carriers of the current in the cell, and (iii) the individual reactions at each electrode.",
    ],
    a: [
      "The galvanic cell can be represented as: Zn(s) | Zn2+(aq) ‖ Ag+(aq) | Ag(s)",
      "(i) The zinc electrode is negatively charged, because at this electrode zinc is oxidised to Zn2+, and the electrons released accumulate on this electrode.",
      "(ii) The current in the cell is carried by the ions in solution (and by electrons through the external circuit).",
      "(iii) At the zinc electrode:",
      { eq: "Zn(s) \\rightarrow Zn^{2+}(aq) + 2e^-" },
      "At the silver electrode:",
      { eq: "Ag^+(aq) + e^- \\rightarrow Ag(s)" },
    ],
  },
];

const docData = {
  _type: "ncertSolution",
  class: 11,
  subject: "Chemistry",
  chapter: 8,
  chapterTitle: "Redox Reactions",
  questions: questions.map((item) => ({
    _type: "questionAnswer",
    _key: randomUUID(),
    questionNumber: item.n,
    questionText: rich(item.q),
    answer: rich(item.a),
  })),
};

const existing = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 8][0]._id'
);
if (existing) {
  await client.delete(existing);
  console.log(`Deleted existing document: ${existing}`);
}

const result = await client.create(docData);
console.log(`✓ Created Class 11 Chemistry Ch.8 (Q1-30): ${result._id} (${questions.length} questions)`);
