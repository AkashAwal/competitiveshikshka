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
function blocks(text) { return String(text).split("\n").filter(Boolean).map(block); }
function step(title, content) { return { _type: "step", _key: randomUUID(), stepTitle: title, content: blocks(content) }; }

const enrichments = {
  "3.1": {
    steps: [
      step("What does 'organisation' mean here?", "The periodic table groups elements with similar properties together, so we can study them as a family instead of learning each element individually."),
      step("How are elements arranged?", "Elements are placed in order of increasing atomic number. Horizontal rows are called periods, vertical columns are called groups."),
      step("Why does this organisation work?", "Elements in the same group have the same number of electrons in their outermost shell (valence electrons). Same valence electrons → same type of chemical reactions → similar properties."),
    ],
    explanation: "The main idea is simple: elements with the same number of valence electrons behave similarly. The periodic table uses this fact to group them together, making it easy to predict properties.",
  },
  "3.2": {
    steps: [
      step("What property did Mendeleev use?", "Mendeleev arranged elements in increasing order of atomic mass (also called atomic weight)."),
      step("Did he always follow atomic mass order?", "No. When following atomic mass order put similar elements in different groups, Mendeleev swapped them to keep similar elements together."),
      step("Give the Te and I example", "Tellurium (atomic mass 128) was placed before Iodine (atomic mass 127), even though I has lower mass. This is because iodine's properties match the halogen group (Group 17), not Group 16."),
    ],
    explanation: "Mendeleev valued chemical similarity over strict mass order. This was the right decision — he was unknowingly following atomic number, which Moseley later proved is the correct basis.",
  },
  "3.3": {
    steps: [
      step("Mendeleev's Periodic Law", "Properties of elements are a periodic function of their atomic masses. He used atomic mass as the organising property."),
      step("Modern Periodic Law (by Moseley, 1913)", "Properties of elements are a periodic function of their atomic numbers. Atomic number replaced atomic mass."),
      step("The key difference", "Atomic mass can differ for isotopes of the same element, but atomic number never changes. Atomic number (= proton count) is the true identity of an element."),
    ],
    explanation: "Changing from atomic mass to atomic number fixed all the problems in Mendeleev's table. For example, the Te–I reversal is perfectly explained because Te (Z=52) comes before I (Z=53) by atomic number.",
  },
  "3.4": {
    steps: [
      step("Which subshells fill in Period 6?", "In Period 6, the filling order is: 6s → 4f → 5d → 6p"),
      step("Count maximum electrons in each subshell", "6s: 2 electrons\n4f: 14 electrons\n5d: 10 electrons\n6p: 6 electrons"),
      step("Add them up", "Total elements = 2 + 14 + 10 + 6 = 32\nSo Period 6 must have 32 elements."),
    ],
    explanation: "Period 6 is special because it includes the f-block (lanthanoids, 4f filling) for the first time. Earlier periods only had s, p, and d subshells — that is why they had fewer elements.",
  },
  "3.5": {
    steps: [
      step("Write the electronic configuration of Z=114", "After Rn (Z=86): fill 5f¹⁴ (14e) + 6d¹⁰ (10e) + 7s² (2e) + 7p² (2e)\n86 + 14 + 10 + 2 + 2 = 114 ✓\nConfig: [Rn]5f¹⁴6d¹⁰7s²7p²"),
      step("Find the Period", "Highest shell is n=7 (7s and 7p are outermost) → Period 7"),
      step("Find the Group", "Valence configuration: 7s²7p² → same as ns²np² → Group 14\nSame group as C, Si, Ge, Sn, Pb"),
    ],
    explanation: "To find period and group from configuration: Period = highest n value in the configuration. For p-block: Group = 10 + (s electrons) + (p electrons). Here, 10 + 2 + 2 = Group 14.",
  },
  "3.6": {
    steps: [
      step("Understand what Period 3, Group 17 means", "Period 3 → outermost shell is n=3\nGroup 17 (halogens) → valence configuration is ns²np⁵"),
      step("Write full configuration", "1s²2s²2p⁶3s²3p⁵"),
      step("Count total electrons to get Z", "2 + 2 + 6 + 2 + 5 = 17\nZ = 17 → Chlorine (Cl)"),
    ],
    explanation: "Quick shortcut: Period 3 noble gas is Ar (Z=18). Group 17 is one position before the noble gas. So Z = 18 − 1 = 17, which is Cl.",
  },
  "3.7": {
    steps: [
      step("Lawrence Berkeley Laboratory", "The lab is named after Ernest O. Lawrence, inventor of the cyclotron.\nElement 103, Lawrencium (Lr), is named in honour of Lawrence and the lab."),
      step("Seaborg's group", "Glenn T. Seaborg's team synthesised many elements beyond uranium.\nElement 106 was named Seaborgium (Sg) after him. He was the only person to have an element named after him while still alive."),
    ],
    explanation: "It is a tradition in chemistry to name newly discovered (synthesised) elements after the scientists or laboratories responsible for their discovery. This is why many elements beyond uranium have names ending in '-ium' honoring physicists and chemists.",
  },
  "3.8": {
    steps: [
      step("The reason — same valence shell configuration", "Elements in the same group have the same number of electrons in their outermost shell (valence shell) with the same type of orbitals."),
      step("Example to make it clear", "All Group 1 elements (Li, Na, K) have ns¹ configuration → all have 1 valence electron → all form +1 ions → all react similarly with water."),
      step("What changes down a group?", "Only the principal quantum number n increases (n=2 for Li, n=3 for Na, etc.). This causes gradual changes in atomic size and reactivity, but the basic chemistry stays the same."),
    ],
    explanation: "Chemical properties depend on valence electrons only. Same valence electrons = same chemistry. This is the whole logic behind the periodic table — similar elements are in the same group.",
  },
  "3.9": {
    steps: [
      step("Atomic radius — what it means", "An atom has no sharp boundary. So we define atomic radius as half the distance between the nuclei of two identical bonded atoms.\nFor Cl₂: bond length = 198 pm → atomic radius of Cl = 99 pm"),
      step("Two types of atomic radius", "Covalent radius: for non-metals (from covalent bond distances)\nMetallic radius: for metals (from crystal packing distances)\nMetallic radius is always slightly larger than covalent radius for the same element."),
      step("Ionic radius", "Cation (lost electrons) → fewer electrons, same nuclear charge → electrons pulled in → smaller than parent atom\nAnion (gained electrons) → more electrons, same nuclear charge → cloud expands → larger than parent atom"),
    ],
    explanation: "Remember: cation is always smaller than the parent atom, anion is always larger. For Na: Na (186 pm) → Na⁺ (95 pm). For F: F (64 pm) → F⁻ (136 pm). These are standard examples to remember.",
  },
  "3.10": {
    steps: [
      step("Trend across a period (left → right)", "Nuclear charge increases, but electrons are added to the same shell (same n).\nMore nuclear charge with same shielding → electrons pulled in closer → atomic radius decreases.\nExample: Na(186) > Mg(160) > Al(143) > Si(117) > P(110) > S(104) > Cl(99) pm"),
      step("Trend down a group (top → bottom)", "New electron shells are added with each element going down a group.\nMore shells = electrons farther from nucleus = larger size.\nExample: Li(152) < Na(186) < K(231) < Rb(244) < Cs(262) pm"),
      step("Easy way to remember", "Across period: radius DECREASES (↓) because nuclear charge increases without new shells.\nDown group: radius INCREASES (↑) because new shells are added."),
    ],
    explanation: "Two factors control atomic size: nuclear charge (pulls electrons in, makes atom smaller) and number of shells (pushes electrons out, makes atom bigger). Across a period only nuclear charge changes. Down a group the new shell effect wins.",
  },
  "3.11": {
    steps: [
      step("What is isoelectronic?", "Isoelectronic species have the same number of electrons (and same electron configuration).\nTo find electrons: for atom = Z; for cation = Z − charge; for anion = Z + charge"),
      step("Count electrons for each", "F⁻: Z=9, gain 1e → 10 electrons\nAr: Z=18, neutral → 18 electrons\nMg²⁺: Z=12, lose 2e → 10 electrons\nRb⁺: Z=37, lose 1e → 36 electrons"),
      step("Name one isoelectronic species for each", "F⁻ (10e): Na⁺ (Z=11, loses 1e → 10e)\nAr (18e): Cl⁻ (Z=17, gains 1e → 18e)\nMg²⁺ (10e): Ne (Z=10, neutral → 10e)\nRb⁺ (36e): Kr (Z=36, neutral → 36e)"),
    ],
    explanation: "Isoelectronic species have the same electron configuration but different nuclear charges. They have similar electronic structures but different sizes — higher nuclear charge makes the ion smaller (more protons pulling the same electrons).",
  },
  "3.12": {
    steps: [
      step("What is common — count electrons", "N³⁻: 7+3=10e; O²⁻: 8+2=10e; F⁻: 9+1=10e; Na⁺: 11−1=10e; Mg²⁺: 12−2=10e; Al³⁺: 13−3=10e\nAll have 10 electrons → all isoelectronic (same configuration as Ne)"),
      step("Rule for isoelectronic sizes", "All have same number of electrons. The one with more protons (higher Z) holds electrons more tightly → smaller size.\nOrder of Z: N(7) < O(8) < F(9) < Na(11) < Mg(12) < Al(13)"),
      step("Write the order of increasing ionic radius", "Smallest to largest: Al³⁺ < Mg²⁺ < Na⁺ < F⁻ < O²⁻ < N³⁻\n(More protons → smaller; fewer protons → larger)"),
    ],
    explanation: "For isoelectronic species: more protons = smaller size. That is why cations (Na⁺, Mg²⁺, Al³⁺) are smaller than anions (F⁻, O²⁻, N³⁻) even though all have 10 electrons. The cations have more protons pulling those 10 electrons inward.",
  },
  "3.13": {
    steps: [
      step("Cation — losing electrons makes it smaller", "When an atom loses electrons, nuclear charge stays the same but electron count drops.\nSame number of protons now pulling fewer electrons → electrons pulled in closer → smaller size.\nExample: Na (186 pm) → Na⁺ (95 pm)"),
      step("Anion — gaining electrons makes it larger", "When an atom gains electrons, nuclear charge stays the same but electron count increases.\nMore electrons with the same nuclear charge → electrons spread out due to repulsion → larger size.\nExample: F (64 pm) → F⁻ (136 pm)"),
      step("Simple rule to remember", "Cation: lost electrons → same Z, fewer e⁻ → SMALLER\nAnion: gained electrons → same Z, more e⁻ → LARGER"),
    ],
    explanation: "Think of it as a tug-of-war: the nucleus pulls electrons in, and electron-electron repulsion pushes them out. Adding electrons increases repulsion and the cloud expands. Removing electrons reduces repulsion and the cloud contracts.",
  },
  "3.14": {
    steps: [
      step("Why 'isolated'?", "In solids or liquids, atoms are bonded to or surrounded by other atoms. These interactions add or remove energy.\nIsolated means the atom is completely alone — no bonds, no neighbours — so we measure only the atom's own property."),
      step("Why 'gaseous'?", "In gaseous state, atoms are far apart with no significant forces between them. This is the easiest way to have isolated atoms in practice."),
      step("Why 'ground state'?", "Ground state = lowest energy state of the atom (no extra energy stored).\nIf the atom were in an excited state, it would already have extra energy, and the IE measured would be artificially low.\nStarting from ground state gives the true, reproducible value."),
    ],
    explanation: "These three conditions (isolated, gaseous, ground state) make the measurement standard and fair. Without them, different labs would get different values. With them, every lab gets the same result because the starting condition is exactly defined.",
  },
  "3.15": {
    steps: [
      step("Energy needed to ionise one H atom", "Ground state energy of H = −2.18 × 10⁻¹⁸ J\nIonisation means removing the electron completely, so final energy = 0\nEnergy needed = 0 − (−2.18 × 10⁻¹⁸) = +2.18 × 10⁻¹⁸ J per atom"),
      step("Scale to one mole", "IE per mole = 2.18 × 10⁻¹⁸ J × 6.022 × 10²³ mol⁻¹\n= 13.128 × 10⁵ J mol⁻¹"),
      step("Convert to standard form", "= 1.312 × 10⁶ J mol⁻¹ = 1312 kJ mol⁻¹\nThis is the accepted ionisation enthalpy of hydrogen."),
    ],
    explanation: "The calculation is straightforward: IE per atom = |ground state energy|. Then multiply by Avogadro's number to get per mole. The answer (1312 kJ/mol) matches the experimental value — confirming Bohr's model for hydrogen.",
  },
  "3.16": {
    steps: [
      step("Why Be (2s²) has higher IE than B (2p¹)", "Be removes a 2s electron. B removes a 2p electron.\n2s is closer to the nucleus and lower in energy than 2p.\nAlso, 2p is partially shielded by the 2s electrons below it.\nSo it is easier to remove B's 2p electron than Be's 2s electron.\nIE(Be) > IE(B)"),
      step("Why O (2p⁴) has lower IE than N (2p³)", "N has 2p³: each of the three 2p orbitals has exactly one electron. No pairing. Very stable (half-filled, Hund's rule).\nO has 2p⁴: one 2p orbital must have 2 paired electrons. Paired electrons repel each other extra.\nThis extra repulsion in O makes it easier to remove one electron.\nIE(O) < IE(N)"),
      step("Summary of the two exceptions", "Be > B: because 2s removes before 2p (subshell jump)\nN > O: because half-filled 2p³ in N has extra stability (no pairing repulsion)"),
    ],
    explanation: "These two exceptions are very important for boards and competitive exams. Remember: (1) 2s electron is harder to remove than 2p → Be > B. (2) Half-filled p³ is extra stable → N > O. The same pattern repeats in Period 3: Mg > Al and P > S.",
  },
  "3.17": {
    steps: [
      step("First IE: Na < Mg (expected trend)", "Na has Z=11, Mg has Z=12. Mg has higher nuclear charge.\nHigher nuclear charge holds the 3s electrons more tightly → harder to remove one → IE₁(Mg) > IE₁(Na).\nNa: 496 kJ/mol, Mg: 737 kJ/mol"),
      step("Second IE: Na >> Mg (reversal)", "After removing 1 electron:\nNa⁺ has [Ne] configuration — a noble gas core. Breaking into this needs very high energy.\nMg⁺ has [Ne]3s¹ — still has an outer electron available. Removing it is much easier.\nIE₂(Na) = 4562 kJ/mol >> IE₂(Mg) = 1450 kJ/mol"),
      step("The key concept", "A huge jump in successive IE means the next electron is coming from an inner (noble gas) shell.\nFor Na: huge jump from 1st to 2nd IE → 1 valence electron → Group 1"),
    ],
    explanation: "This is how chemists find the group of an unknown element — by looking at where the big jump occurs in successive ionisation enthalpies. The jump after the 1st IE for Na tells us it has only 1 valence electron.",
  },
  "3.18": {
    steps: [
      step("Factor 1: Atomic radius increases down a group", "Each new element down a group has electrons in a higher shell (n increases).\nOutermost electrons are farther from the nucleus → nuclear attraction is weaker → IE decreases."),
      step("Factor 2: Shielding increases down a group", "More inner shells = more inner electrons shielding the valence electron from the full nuclear charge.\nThe valence electron feels less of the actual nuclear charge → easier to remove."),
      step("Result", "Both factors work together to reduce IE going down a group.\nExample: IE₁ values (kJ/mol): Li(520) > Na(496) > K(419) > Rb(403) > Cs(376)"),
    ],
    explanation: "Going down a group, two things make it easier to remove the valence electron: (1) it is farther from the nucleus, and (2) it is more shielded. Both reduce the effective nuclear charge felt by the outermost electron.",
  },
  "3.19": {
    steps: [
      step("Expected vs actual trend in Group 13", "Expected: B > Al > Ga > In > Tl (strictly decreasing)\nActual: B(801) > Al(577) ≈ Ga(579) > In(558) < Tl(589)\nTwo deviations: Ga ≈ Al and Tl > In"),
      step("Why Ga ≈ Al (d-block between them)", "Between Al(Z=13) and Ga(Z=31), 10 d-electrons are filled (3d¹⁰).\nd-electrons do not shield outer electrons well.\nSo Ga's 4p electron feels a higher nuclear charge than expected → IE of Ga is higher than expected, close to Al's."),
      step("Why Tl > In (f-block between them)", "Between In(Z=49) and Tl(Z=81), 14 f-electrons are filled (4f¹⁴, the lanthanoids).\nf-electrons shield even more poorly than d-electrons.\nTl's 6p electron feels a much higher effective nuclear charge → IE is higher than In's."),
    ],
    explanation: "The simple reason for both anomalies: d and f electrons are poor shielders. When d or f blocks are added between two elements of the same group, the lower element unexpectedly has a higher nuclear charge being felt by its valence electron. This is a standard NCERT topic — poor shielding by d and f electrons.",
  },
  "3.20": {
    steps: [
      step("Compare O vs F", "Both add an electron to the 2p orbital.\nF (Z=9) has higher nuclear charge than O (Z=8).\nHigher nuclear charge → added electron is attracted more strongly to F → more energy released.\nF has more negative ΔₑgH than O."),
      step("Compare F vs Cl", "F adds electron to a small, compact 2p orbital that already has 5 electrons — very crowded.\nExtra electron faces strong repulsion from electrons already there.\nCl adds electron to a larger 3p orbital — less crowded, less repulsion.\nDespite F having higher Z, Cl's less crowded orbital wins.\nCl has more negative ΔₑgH than F: Cl (−349) vs F (−328 kJ/mol)."),
      step("Clear answers", "(i) F has more negative ΔₑgH than O\n(ii) Cl has more negative ΔₑgH than F"),
    ],
    explanation: "The Cl > F exception is the most important one in this chapter. F has higher nuclear charge but its 2p orbital is so small and crowded that the incoming electron faces strong repulsion. Cl's bigger 3p orbital has more room. This is why Cl is actually a better oxidising agent in many reactions than F in terms of electron affinity.",
  },
  "3.21": {
    steps: [
      step("First electron gain enthalpy", "O(g) + e⁻ → O⁻(g)\nNeutral oxygen attracts the incoming electron.\nΔₑgH₁ = −141 kJ/mol (negative = energy released = exothermic)"),
      step("Second electron gain enthalpy", "O⁻(g) + e⁻ → O²⁻(g)\nNow the incoming electron is approaching an already negative ion.\nNegative ion repels the electron strongly → energy must be supplied.\nΔₑgH₂ = +780 kJ/mol (positive = energy absorbed = endothermic)"),
      step("Conclusion", "Second ΔₑgH is positive (endothermic).\nO²⁻ only exists in ionic compounds like MgO, CaO — the lattice energy of the crystal more than compensates for this energy cost."),
    ],
    explanation: "All second and higher electron gain enthalpies are always positive. Once the ion is negative, it repels any further electrons. This is why most anions in ionic compounds are 1− (like Cl⁻, F⁻, Br⁻). For 2− anions (O²⁻, S²⁻), energy must be supplied, but the crystal's stability makes up for it.",
  },
  "3.22": {
    steps: [
      step("Electron gain enthalpy (ΔₑgH)", "Measured for isolated gaseous atoms.\nX(g) + e⁻ → X⁻(g)\nIt is a specific, measurable value in kJ/mol.\nTells us how much energy is released or absorbed when an atom gains one electron."),
      step("Electronegativity", "Applies to atoms inside a molecule (bonded atoms).\nMeasures how strongly a bonded atom pulls the shared electron pair toward itself.\nNot directly measurable — given on scales like Pauling scale (F=4.0 is the highest).\nComparative in nature — only meaningful relative to the other atom in the bond."),
      step("Key difference", "ΔₑgH: isolated atom, free electron, thermodynamic measurement, gives kJ/mol\nElectronegativity: bonded atom, shared electrons, relative scale, no unit"),
    ],
    explanation: "Both measure 'desire for electrons' but in very different situations. ΔₑgH is about a lone atom grabbing a free electron. Electronegativity is about two bonded atoms competing for shared electrons. Both increase across a period and decrease down a group.",
  },
  "3.23": {
    steps: [
      step("Is electronegativity of N always 3.0?", "No. The value 3.0 on the Pauling scale is an average, standard reference value.\nElectronegativity actually changes depending on the bonding situation."),
      step("What affects electronegativity?", "1. Hybridisation: sp > sp² > sp³ (more s-character = more electronegative)\n2. Oxidation state: higher oxidation state = more electronegative\n3. Nature of bonding partners: different bonds, different electron pull"),
      step("Correct statement", "We say N has electronegativity approximately 3.0, but the exact value varies from compound to compound.\nThe given statement is an oversimplification."),
    ],
    explanation: "The Pauling scale values are approximate averages, not fixed constants. The most important variation for your exams: hybridisation changes electronegativity. sp-hybridised N (like in HCN) is more electronegative than sp³ N (like in NH₃).",
  },
  "3.24": {
    steps: [
      step("(a) Gaining an electron — becomes an anion", "Number of electrons increases, nuclear charge stays the same.\nMore electrons → more repulsion between electrons → cloud expands.\nRadius becomes larger than parent atom.\nExample: F (64 pm) → F⁻ (136 pm)"),
      step("(b) Losing an electron — becomes a cation", "Number of electrons decreases, nuclear charge stays the same.\nFewer electrons → less repulsion → same nuclear charge pulls remaining electrons closer.\nRadius becomes smaller than parent atom.\nExample: Na (186 pm) → Na⁺ (95 pm)"),
      step("Simple rule", "Gain electron → MORE electrons, same Z → BIGGER (anion)\nLose electron → FEWER electrons, same Z → SMALLER (cation)"),
    ],
    explanation: "Remember: anion is ALWAYS bigger than the parent atom. Cation is ALWAYS smaller than the parent atom. These are fixed rules for your exams — there are no exceptions for elements in the same period.",
  },
  "3.25": {
    steps: [
      step("What are isotopes?", "Isotopes of an element have the same atomic number (Z) but different mass numbers (A).\nSame Z = same number of protons = same number of electrons in the neutral atom."),
      step("What determines IE?", "IE depends on: nuclear charge (Z), number of electrons, and electron configuration.\nAll three are exactly the same for isotopes.\nNeutrons do not affect electronic energy at all."),
      step("Conclusion", "Since neutrons have no effect on IE, isotopes of the same element have the same (or nearly the same) first ionisation enthalpy.\nExample: ¹H and ²H (deuterium) have essentially the same IE = 1312 kJ/mol."),
    ],
    explanation: "This question tests a concept: IE is an electronic property. Neutrons add mass but do not change nuclear charge or electronic configuration. So isotopes are chemically identical — same IE, same reactivity, same compounds formed.",
  },
  "3.26": {
    steps: [
      step("Physical differences", "Metals: solid (mostly), shiny, malleable (can be hammered), ductile (can be drawn into wire), good conductors of heat and electricity.\nNon-metals: can be solid, liquid, or gas; not shiny; brittle solids; poor conductors (except graphite)."),
      step("Chemical differences", "Metals: low ionisation enthalpy, low electronegativity → lose electrons → form cations → basic oxides.\nNon-metals: high electron gain enthalpy, high electronegativity → gain electrons → form anions → acidic oxides."),
      step("Oxide example", "Na (metal) + O₂ → Na₂O → with water gives NaOH (basic)\nS (non-metal) + O₂ → SO₂/SO₃ → with water gives H₂SO₃/H₂SO₄ (acidic)"),
    ],
    explanation: "The basic difference comes down to how elements react: metals lose electrons, non-metals gain electrons. This single difference explains almost all physical and chemical differences between the two classes.",
  },
  "3.27": {
    steps: [
      step("(a) Five electrons in outer subshell", "p subshell with 5 electrons: np⁵ → Group 17 (halogens)\nExamples: F (2p⁵), Cl (3p⁵), Br (4p⁵)"),
      step("(b) and (c): Losing two / gaining two electrons", "(b) Loses 2 electrons: Group 2 (ns² configuration) → Mg, Ca, etc.\n(c) Gains 2 electrons: Group 16 (ns²np⁴, needs 2 more to complete octet) → O, S, etc."),
      step("(d) Group with metal, non-metal, liquid and gas", "Group 17 at room temperature:\nF₂ and Cl₂: gases; Br₂: liquid; I₂: solid non-metal; At: has some metallic character\n→ Group 17 has all physical states at room temperature"),
    ],
    explanation: "Group 17 is the only group where you can find all states of matter at room temperature, simply because molecular mass increases from F₂ to I₂, making intermolecular forces progressively stronger. Useful fact for MCQs.",
  },
  "3.28": {
    steps: [
      step("Group 1: reactivity increases down (Li < Na < K < Rb < Cs)", "Alkali metals react by losing electrons.\nGoing down: atomic size increases, IE decreases → valence electron is more loosely held → easier to lose → more reactive.\nCs is the most reactive alkali metal."),
      step("Group 17: reactivity decreases down (F > Cl > Br > I)", "Halogens react by gaining electrons.\nGoing down: atomic size increases, electron gain enthalpy becomes less negative → harder to attract an electron → less reactive.\nF is the most reactive halogen."),
      step("The key contrast", "Metals: more reactive = easier to LOSE electrons = lower IE\nNon-metals: more reactive = easier to GAIN electrons = more negative ΔₑgH\nThe trends go opposite ways because the mode of reaction is opposite."),
    ],
    explanation: "This is a very commonly asked question. The trick to remember: for metals, go DOWN the group for more reactivity. For non-metals, go UP the group for more reactivity. This is because metals react by losing electrons and non-metals react by gaining them.",
  },
  "3.29": {
    steps: [
      step("s-block configuration", "Group 1: ns¹ (1 valence electron)\nGroup 2: ns² (2 valence electrons)\n(n goes from 1 to 7)"),
      step("p-block and d-block", "p-block (Groups 13–18): ns²np¹⁻⁶ (n = 2 to 6)\nd-block (Groups 3–12): (n-1)d¹⁻¹⁰ ns⁰⁻² (n = 4 to 7)"),
      step("f-block configuration", "Lanthanoids: [Xe] 4f¹⁻¹⁴ 5d⁰⁻¹ 6s²\nActinoids: [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²"),
    ],
    explanation: "The block of an element tells you which subshell its last electron went into: s → s-block, p → p-block, d → d-block, f → f-block. Knowing this, you can determine the block from any configuration.",
  },
  "3.30": {
    steps: [
      step("Case (i): ns²np⁴, n=3", "Substitute n=3: 3s²3p⁴\nFull config: 1s²2s²2p⁶3s²3p⁴ → Z = 2+2+6+2+4 = 16 → Sulphur (S)\nPeriod 3, Group 16 (p-block, 6 valence electrons)"),
      step("Case (ii): (n-1)d²ns², n=4", "Substitute: 3d²4s²\nFull config: 1s²2s²2p⁶3s²3p⁶3d²4s² → Z = 22 → Titanium (Ti)\nPeriod 4, Group 4 (d-block, 2+2=4 outer electrons but d-block group = 3+d electrons = 4)"),
      step("Case (iii): (n-2)f⁷(n-1)d¹ns², n=6", "Substitute: 4f⁷5d¹6s²\nZ = 86 (Rn) + 7 + 1 + 2 = 96? → Let's count: [Xe]4f⁷5d¹6s² → 54+7+1+2=64 → Gadolinium (Gd)\nPeriod 6, f-block (lanthanoid)"),
    ],
    explanation: "Method: substitute n, write full configuration, count total electrons to get Z, then find the element. Period = highest n in configuration. Block = which subshell received the last electron.",
  },
  "3.31": {
    steps: [
      step("Find the element from the configuration", "The configuration tells us: period (highest n), block (last subshell), and group (valence electrons).\nSubstitute the given n value and identify the subshells being filled."),
      step("Determine period", "Period = n (the highest principal quantum number in the configuration)"),
      step("Determine group", "For s-block: Group = number of s electrons\nFor p-block: Group = 10 + s electrons + p electrons\nFor d-block: Group = s electrons + d electrons (from outer shells only)"),
    ],
    explanation: "Practice this method: write the configuration, identify the block from the last subshell, then count valence electrons for the group. Period is always the highest n value.",
  },
  "3.32": {
    steps: [
      step("What are valence electrons?", "Valence electrons are the electrons in the outermost shell of an atom.\nFor main group elements: electrons in the highest n shell.\nFor d-block elements: (n-1)d + ns electrons together act as valence electrons."),
      step("How to count from configuration", "Write the full or abbreviated configuration.\nFor s and p block: count electrons in the highest n shell only.\nFor d-block: count (n-1)d + ns electrons."),
      step("Why valence electrons matter", "Chemical reactions involve only valence electrons — sharing, gaining, or losing them.\nCore (inner) electrons are not involved in normal chemical bonding."),
    ],
    explanation: "Valence electrons determine all chemical properties — valency, reactivity, type of bond, type of ion formed. The number of valence electrons is directly related to the group number for main group elements.",
  },
  "3.33": {
    steps: [
      step("Write the electronic configuration", "Given atomic number or position in periodic table, write the configuration.\nUse Aufbau principle, Pauli exclusion, and Hund's rule."),
      step("Identify valence shell and electrons", "Valence shell = outermost shell (highest n)\nCount electrons in that shell to find valency and group number."),
      step("Predict chemical behaviour", "1 valence electron → Group 1 → loses 1e → +1 ion, highly reactive\n7 valence electrons → Group 17 → gains 1e → −1 ion, forms HX, MX type compounds"),
    ],
    explanation: "Electronic configuration is the foundation for predicting chemistry. The same valence configuration always leads to the same type of reactions and compounds. This is the power of the periodic table.",
  },
  "3.34": {
    steps: [
      step("Electronegativity trend across a period", "Left to right: nuclear charge increases, atomic size decreases.\nSmaller atom with higher charge pulls bonding electrons more strongly → electronegativity increases.\nF (top right) has the highest electronegativity (4.0 on Pauling scale)."),
      step("Electronegativity trend down a group", "Top to bottom: atomic size increases, outer electrons are farther from nucleus.\nAtom pulls shared electrons less strongly → electronegativity decreases.\nExample: F(4.0) > Cl(3.2) > Br(3.0) > I(2.7)"),
      step("Use of electronegativity", "Predicts bond polarity: the more electronegative atom gets the δ− charge.\nDifference in electronegativity > 1.7 → mostly ionic bond\nDifference < 1.7 → mostly covalent bond (polar or non-polar)"),
    ],
    explanation: "Electronegativity increases across a period (smaller atom, higher Z) and decreases down a group (larger atom, more shielding). F is always given as the most electronegative element — this is a fixed fact for all exams.",
  },
  "3.35": {
    steps: [
      step("What determines the nature of an oxide?", "Metal oxides are basic because the metal cation interacts with O²⁻, and the oxide reacts with water or acid.\nNon-metal oxides are acidic because the non-metal-oxygen bond is covalent and reacts with water to give oxyacids."),
      step("Trend across a period", "Left to right: oxides change from basic (Na₂O) → amphoteric (Al₂O₃) → acidic (P₄O₁₀, SO₃, Cl₂O₇)."),
      step("Trend down a group", "Down Group 1/2: oxides remain basic but basicity increases (CsOH is stronger base than LiOH).\nDown Group 14–17: higher oxides of heavier elements tend to be less acidic."),
    ],
    explanation: "The oxide nature (basic/acidic/amphoteric) follows the metal/non-metal nature of the element. This is a direct consequence of electronegativity: metals have low EN so they form ionic oxides (basic); non-metals have high EN so they form covalent oxides (acidic).",
  },
  "3.36": {
    steps: [
      step("Hydrides of Group 15, 16, 17", "Group 15: NH₃, PH₃, AsH₃, SbH₃\nGroup 16: H₂O, H₂S, H₂Se, H₂Te\nGroup 17: HF, HCl, HBr, HI"),
      step("Acid strength trend", "For Groups 15, 16, 17: acid strength INCREASES down the group.\nH-X bond strength decreases as X gets larger → easier to release H⁺.\nHI > HBr > HCl >> HF (acid strength in water)\nH₂Te > H₂Se > H₂S > H₂O"),
      step("HF is the exception", "HF has strong H–F bond (very short, very strong) → does not ionise easily → weak acid despite F being most electronegative.\nHF is a weak acid but HCl, HBr, HI are strong acids."),
    ],
    explanation: "Acid strength of hydrides increases down a group because the H–X bond gets weaker (X gets bigger, bond length increases, bond energy decreases). Easier to break the bond = easier to release H⁺ = stronger acid.",
  },
  "3.37": {
    steps: [
      step("Anomalous properties of the first element", "The first element of each group (Li, Be, B, C, N, O, F) often behaves differently from the rest of the group.\nMain reason: very small atomic size and high charge density of the first element."),
      step("Key differences for first elements", "Small size → higher polarising power → more covalent character (unlike heavier members which form ionic bonds)\nNo d orbitals in valence shell → maximum covalency is 4 (cannot expand octet)\nStrong π-bond formation → forms multiple bonds more easily (C=C, N≡N, O=O)"),
      step("Example: Li vs Na", "Li forms covalent compounds more readily (like organolithium compounds)\nLi₂CO₃ and LiNO₃ decompose on heating (unlike Na₂CO₃ which is stable)\nLi resembles Mg (diagonal relationship) more than Na"),
    ],
    explanation: "The first element in each group is special because of its small size. Small size means high charge density, which gives the first element unique properties compared to the rest of the group. This is why H, Li, Be, B, C, N, O, F all have anomalous behaviour in their respective groups.",
  },
  "3.38": {
    steps: [
      step("What is diagonal relationship?", "Elements that are diagonally related (upper left to lower right in the periodic table) show similar properties.\nMain pairs: Li–Mg, Be–Al, B–Si"),
      step("Why does diagonal similarity occur?", "Two effects cancel each other:\nAcross period: nuclear charge increases → properties change\nDown group: atomic size increases → properties change in opposite way\nMoving diagonally, these two opposite changes roughly cancel out → similar properties"),
      step("Examples of Li–Mg similarity", "Both form nitrides (Li₃N and Mg₃N₂) when burned in nitrogen.\nBoth form normal oxides (Li₂O and MgO) rather than peroxides.\nBoth have low solubility carbonates (Li₂CO₃ and MgCO₃)."),
    ],
    explanation: "Diagonal relationships arise because similar charge-to-size ratio (charge density) means similar polarising ability, leading to similar bonding and similar reactions. The Li–Mg, Be–Al, and B–Si pairs are the three standard examples you need to know.",
  },
  "3.39": {
    steps: [
      step("What is the shielding (screening) effect?", "Inner shell electrons reduce the effective nuclear charge felt by the outermost electrons.\nThe inner electrons 'screen' or 'shield' the valence electrons from the full pull of the nucleus."),
      step("Effective nuclear charge (Zeff)", "Zeff = Actual nuclear charge (Z) − Shielding constant (σ)\nHigher Zeff → electrons held more tightly → smaller size, higher IE, higher electronegativity\nLower Zeff → electrons held loosely → larger size, lower IE"),
      step("Shielding ability: s > p > d > f", "s electrons shield best (closest to nucleus)\np electrons shield moderately\nd and f electrons shield poorly (diffuse orbitals, spend little time near nucleus)\nPoor shielding by d and f electrons → unexpected properties in transition and inner transition metals"),
    ],
    explanation: "Shielding is the reason why effective nuclear charge is always less than the actual nuclear charge. Poor shielding by d and f electrons is the reason for the Group 13 anomaly (Ga ≈ Al IE) and the lanthanide contraction. This concept is repeatedly asked in board exams.",
  },
  "3.40": {
    steps: [
      step("Periodicity of properties — what it means", "Properties of elements repeat at regular intervals when arranged by atomic number.\nElements in the same group show similar properties because similar valence configurations repeat period after period."),
      step("Properties that show periodicity", "Atomic radius: decreases across period, increases down group\nIonisation enthalpy: increases across period, decreases down group\nElectronegativity: increases across period, decreases down group\nElectron gain enthalpy: generally more negative across period, less negative down group"),
      step("Why periodicity occurs", "Electron configuration repeats periodically. After each noble gas, the next period starts filling the same types of orbitals (s, p) again with a new n value.\nSame valence configuration → same properties → periodicity."),
    ],
    explanation: "Periodicity is the central idea of this chapter. All properties (size, IE, electronegativity, etc.) follow the same basic trends because they all depend on valence electron configuration, which itself repeats after each complete period.",
  },
};

const doc = await client.fetch(
  `*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 3][0]`
);

if (!doc) { console.error("Ch.3 document not found."); process.exit(1); }
console.log(`Found Ch.3 document: ${doc._id} (${doc.questions.length} questions)`);

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
console.log(`✓ Simplified steps and explanations for ${patched} Ch.3 questions.`);
