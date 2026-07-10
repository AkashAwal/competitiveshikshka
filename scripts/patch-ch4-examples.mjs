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
  return { _type: "exampleStep", _key: randomUUID(), stepTitle: title, content: blocks(...lines) };
}

const examples = [
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P4.1",
    questionText: blocks("Write the Lewis dot structure of the CO molecule."),
    answer: blocks(
      "Valence electrons available: C (2s² 2p²) contributes 4, O (2s² 2p⁴) contributes 6, total = 10 electrons.",
      "A single bond between C and O uses 2 electrons and completes the octet on O, leaving the remaining 6 electrons as 2 lone pairs on O and 1 lone pair on C — but this leaves carbon with only 4 electrons around it (1 bond pair + 1 lone pair), which does not complete its octet.",
      "To satisfy the octet on both atoms, C and O must share 3 electron pairs (a triple bond), giving:",
      ":C≡O:  — with 1 lone pair on C and 1 lone pair on O, each atom now surrounded by 8 electrons."
    ),
    steps: [
      step("Count total valence electrons", "C: 2s² 2p² → 4 valence electrons\nO: 2s² 2p⁴ → 6 valence electrons\nTotal = 4 + 6 = 10 electrons"),
      step("Write the skeletal structure", "C  O (only two atoms, so they must be bonded directly)"),
      step("Try a single bond first and check octets", "A single C–O bond (2 electrons) + 2 lone pairs on O (completes O's octet, using 6 of the 10 electrons) + 1 lone pair placed on C leaves C with only 1 bond pair + 1 lone pair = 4 electrons around C — octet on C is incomplete."),
      step("Resort to multiple bonding to complete carbon's octet", "Converting the single bond into a triple bond (sharing 3 electron pairs) gives C 3 bond pairs + 1 lone pair = 8 electrons, and O 3 bond pairs + 1 lone pair = 8 electrons.\nFinal structure: :C≡O: (one lone pair on each atom)"),
    ],
    explanation: blocks("Whenever a single (or double) bond leaves an atom short of an octet even after all lone pairs are assigned, the fix is to convert existing lone pairs on the neighbouring atom into extra shared (bonding) pairs — this is exactly how CO ends up with a triple bond, even though carbon's usual valence is 4 and oxygen's is 2."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P4.2",
    questionText: blocks("Write the Lewis structure of the nitrite ion, NO2⁻."),
    answer: blocks(
      "Valence electrons: N (2s² 2p³) contributes 5, each O (2s² 2p⁴) contributes 6, plus 1 extra electron for the single negative charge.",
      "Total = 5 + (2 × 6) + 1 = 18 electrons.",
      "Skeletal structure: O–N–O (N is the least electronegative and therefore the central atom).",
      "A single bond to each O completes both oxygen octets (using 4 electrons for bonds + 12 as lone pairs = 16 electrons), leaving only 2 electrons — placed as a lone pair on N. This gives N only 2 bond pairs + 1 lone pair = 6 electrons, so nitrogen's octet is still incomplete.",
      "To complete nitrogen's octet, one N–O single bond is converted into a double bond, giving the resonance structures:",
      "[ :Ö–N=Ö: ]⁻ ↔ [ :Ö=N–Ö: ]⁻"
    ),
    steps: [
      step("Count total valence electrons", "N: 5, O: 6 each (×2 = 12), plus 1 for the negative charge\nTotal = 5 + 12 + 1 = 18 electrons"),
      step("Write the skeletal structure", "O – N – O (nitrogen is less electronegative than oxygen, so it occupies the central position)"),
      step("Distribute electrons as single bonds first", "2 N–O single bonds use 4 electrons. Completing the octet on each O (needing 6 more electrons each) uses 12 more electrons. Total used = 16, leaving 2 electrons as a lone pair on N — but N then has only 2 bond pairs + 1 lone pair = 6 electrons, short of an octet."),
      step("Convert one lone pair on an O into a second N–O bond", "Making one N–O bond a double bond gives N 3 bond pairs + 1 lone pair = 8 electrons (octet complete), while both O atoms still have an octet.\nSince either of the two oxygens could take the double bond, this gives two equivalent resonance structures."),
    ],
    explanation: blocks("NO2⁻ is a good preview of resonance (covered fully in section 4.3.5): a single Lewis structure with one N=O and one N–O⁻ is not enough on its own, because both oxygens are experimentally equivalent. The true structure is the resonance hybrid of the two forms shown."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P4.3",
    questionText: blocks("Explain the structure of CO3²⁻ ion in terms of resonance."),
    answer: blocks(
      "A single Lewis structure for CO3²⁻ — with one C=O double bond and two C–O⁻ single bonds — is inadequate, because it represents unequal C–O bonds (one shorter double bond, two longer single bonds).",
      "Experimentally, all three carbon-to-oxygen bonds in CO3²⁻ are found to be equivalent in length (intermediate between a single and a double bond).",
      "The carbonate ion is therefore best described as a resonance hybrid of three equivalent canonical forms (I, II, III), in each of which the double bond is drawn to a different one of the three oxygen atoms:",
      "[O=C(–O⁻)(–O⁻)] ↔ [⁻O–C(=O)(–O⁻)] ↔ [⁻O–C(–O⁻)(=O)]"
    ),
    steps: [
      step("Draw one valid Lewis structure", "One C=O double bond + two C–O⁻ single bonds satisfies the octet rule and the −2 overall charge, but predicts two different bond lengths."),
      step("Compare with experimental data", "All three C–O bonds in CO3²⁻ are measured to be equal in length — contradicting any single structure with 1 double + 2 single bonds."),
      step("Write all equivalent canonical forms", "Since any of the three O atoms could equally be the one double-bonded to C, there are 3 equivalent canonical (resonance) structures, differing only in which O carries the double bond."),
      step("State the resonance hybrid", "The true structure of CO3²⁻ is the resonance hybrid of all three forms — each C–O bond has partial double-bond character, consistent with the observed equal bond lengths."),
    ],
    explanation: blocks("This is the same reasoning used for O3 in section 4.3.5, now applied to a triatomic-plus-one-more case. Whenever multiple equivalent canonical structures can be drawn just by moving where the double bond sits, that's the signature of resonance."),
  },
  {
    _type: "workedExample", _key: randomUUID(),
    questionNumber: "P4.4",
    questionText: blocks("Explain the structure of the CO2 molecule."),
    answer: blocks(
      "The experimentally determined carbon-to-oxygen bond length in CO2 is 115 pm. For comparison, a normal C=O double bond is 121 pm and a C≡O triple bond is 110 pm.",
      "Since the observed CO2 bond length (115 pm) lies between these two values, a single Lewis structure (such as O=C=O, with two ordinary double bonds) cannot depict this intermediate bond length accurately.",
      "CO2 is therefore best described as a resonance hybrid of more than one canonical form — the familiar O=C=O structure (I) along with structures having a triple bond to one oxygen and a single bond to the other, such as ⁻O–C≡O⁺ (II) and O⁺≡C–O⁻ (III)."
    ),
    steps: [
      step("Compare the observed bond length to reference values", "C=O double bond = 121 pm; C≡O triple bond = 110 pm; observed CO2 bond length = 115 pm — between the two."),
      step("Recognise that no single structure fits", "The simple structure O=C=O (two pure double bonds) would predict a bond length of 121 pm for both C–O bonds, not the shorter 115 pm actually observed."),
      step("Write additional canonical forms with partial triple-bond character", "Structures with one C≡O and one C–O (with appropriate formal charges) shift the average bond order above 2, shortening the predicted bond length towards the observed value."),
      step("State the resonance hybrid", "CO2's true structure is the hybrid of structures I, II and III — giving each C–O bond an effective bond order between 2 and 3, matching the intermediate 115 pm bond length."),
    ],
    explanation: blocks("Bond length is one of the most direct experimental clues that a molecule needs a resonance description: whenever a measured bond length falls strictly between two reference values (here, double- and triple-bond C–O lengths), no single classical Lewis structure can be exactly right."),
  },
];

const doc = await client.fetch(
  '*[_type == "ncertSolution" && class == 11 && subject == "Chemistry" && chapter == 4][0]'
);
if (!doc) { console.error("Document not found"); process.exit(1); }
console.log(`Found document: ${doc._id}`);

await client.patch(doc._id).set({ examples }).commit();
console.log(`Added ${examples.length} worked examples (in-text problems P4.1-P4.4).`);
