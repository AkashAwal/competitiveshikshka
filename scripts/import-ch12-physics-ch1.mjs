import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: "cekjuoyu", dataset: "production",
  apiVersion: "2024-01-01", token: process.env.SANITY_API_TOKEN, useCdn: false,
});

function block(text) {
  return { _type: "block", _key: randomUUID(), style: "normal",
    children: [{ _type: "span", _key: randomUUID(), text, marks: [] }], markDefs: [] };
}
function toBlocks(text) { return String(text).split("\n").filter(Boolean).map(block); }
function toSteps(steps) {
  return (steps || []).map((s) => ({
    _type: "step", _key: randomUUID(), stepTitle: s.stepTitle,
    content: toBlocks(s.content),
  }));
}
function exStep(title, content) {
  return { _type: "exampleStep", _key: randomUUID(), stepTitle: title, content: toBlocks(content) };
}

const questions = JSON.parse(
  readFileSync(new URL("./data/ch12-physics-ch1-questions.json", import.meta.url), "utf-8")
);

const examples = [
  {
    questionNumber: "P1.1",
    questionText: "What is the force between two small charged spheres having charges of 2×10⁻⁷ C and 3×10⁻⁷ C placed 30 cm apart in air?",
    answer: "F = kq₁q₂/r² = (9×10⁹ × 2×10⁻⁷ × 3×10⁻⁷)/(0.3)² = 6×10⁻³ N (repulsive)",
    steps: [
      exStep("Apply Coulomb's law", "F = kq₁q₂/r²\nk = 9×10⁹ N·m²/C², q₁=2×10⁻⁷ C, q₂=3×10⁻⁷ C, r=0.3 m"),
      exStep("Calculate", "F = (9×10⁹ × 6×10⁻¹⁴)/0.09 = 6×10⁻³ N\nBoth charges positive → repulsive"),
    ],
    explanation: "Coulomb's law gives the electrostatic force magnitude. Like charges → repulsive; unlike charges → attractive.",
  },
  {
    questionNumber: "P1.2",
    questionText: "The electrostatic force on a small sphere of charge 0.4 μC due to another small sphere of charge –0.8 μC is 0.2 N. Find the distance and the force on the second sphere.",
    answer: "r = √(kq₁q₂/F) = 0.12 m = 12 cm; Force on 2nd sphere = 0.2 N toward 1st (Newton's 3rd law)",
    steps: [
      exStep("Solve for r from Coulomb's law", "r² = k|q₁||q₂|/F = 9×10⁹×0.4×10⁻⁶×0.8×10⁻⁶/0.2 = 0.0144\nr = 0.12 m"),
      exStep("Apply Newton's 3rd law", "Force on 2nd sphere = 0.2 N, opposite direction (attractive, toward 1st sphere)"),
    ],
    explanation: "Newton's 3rd law: forces are equal in magnitude, opposite in direction. Opposite charges → attractive → both spheres pulled toward each other.",
  },
  {
    questionNumber: "P1.3",
    questionText: "Find the electric field E at point P due to a charge Q = 30 nC located 15 cm away.",
    answer: "E = kQ/r² = (9×10⁹ × 30×10⁻⁹)/(0.15)² = 12000 N/C = 1.2×10⁴ N/C directed away from Q",
    steps: [
      exStep("Apply point-charge field formula: E = kQ/r²", "Q = 30×10⁻⁹ C, r = 0.15 m\nE = 9×10⁹ × 30×10⁻⁹ / (0.15)²"),
      exStep("Calculate", "E = 270/0.0225 = 1.2×10⁴ N/C\nDirection: away from +Q (field points radially outward)"),
    ],
    explanation: "Electric field due to a positive point charge points radially outward. For negative charge, it points inward. Magnitude decreases as 1/r².",
  },
  {
    questionNumber: "P1.4",
    questionText: "Two point charges q₁ = +4 μC and q₂ = –4 μC are placed at A and B, 10 cm apart. Find the electric field at the midpoint C of AB.",
    answer: "At midpoint C, both fields point from A to B:\nE₁ = kq₁/(0.05)² = 9×10⁹×4×10⁻⁶/0.0025 = 1.44×10⁷ N/C (away from q₁)\nE₂ = kq₂/(0.05)² = 1.44×10⁷ N/C (toward q₂ = same direction)\nE_net = 2.88×10⁷ N/C from A to B",
    steps: [
      exStep("Calculate field from each charge at midpoint (r = 5 cm)", "E₁ = 9×10⁹×4×10⁻⁶/(0.05)² = 1.44×10⁷ N/C (toward B from +q₁)\nE₂ = 9×10⁹×4×10⁻⁶/(0.05)² = 1.44×10⁷ N/C (toward −q₂ = toward B)"),
      exStep("Add vectorially", "Both E₁ and E₂ point from A toward B → add\nE_net = 1.44×10⁷ + 1.44×10⁷ = 2.88×10⁷ N/C (from A to B)"),
    ],
    explanation: "At the midpoint of a dipole, both charges contribute fields in the same direction. This is why the field at the midpoint of a dipole is 2E (not zero).",
  },
  {
    questionNumber: "P1.5",
    questionText: "An electric dipole with charges ±1 μC separated by 2 mm is placed in a uniform field E = 10⁵ N/C. Find the torque when the dipole is (a) parallel to E and (b) perpendicular to E.",
    answer: "p = q×d = 1×10⁻⁶ × 2×10⁻³ = 2×10⁻⁹ C·m\n(a) θ = 0°: τ = pE sin 0° = 0\n(b) θ = 90°: τ = pE sin 90° = 2×10⁻⁹ × 10⁵ × 1 = 2×10⁻⁴ N·m",
    steps: [
      exStep("Calculate dipole moment", "p = qd = 1×10⁻⁶ × 2×10⁻³ = 2×10⁻⁹ C·m"),
      exStep("Apply τ = pE sinθ for each orientation", "(a) θ=0°: τ = pE sin 0° = 0 (no torque — already aligned)\n(b) θ=90°: τ = 2×10⁻⁹ × 10⁵ = 2×10⁻⁴ N·m (maximum torque)"),
    ],
    explanation: "Torque on a dipole τ = pE sinθ is maximum (pE) when perpendicular to the field and zero when aligned or anti-aligned. The torque always acts to align the dipole with the field.",
  },
  {
    questionNumber: "P1.6",
    questionText: "Using Gauss's law, derive the electric field due to an infinitely long straight uniformly charged wire with linear charge density λ.",
    answer: "Choose a coaxial cylindrical Gaussian surface of radius r and length l.\nBy symmetry: E is radial and uniform over the curved surface.\nFlux through curved surface = E × 2πrl\nFlux through flat ends = 0 (E ⊥ normal)\nQ_enc = λl\nBy Gauss's law: E × 2πrl = λl/ε₀\nE = λ/(2πε₀r)",
    steps: [
      exStep("Choose cylindrical Gaussian surface", "Coaxial cylinder: radius r, length l\nBy cylindrical symmetry, E is radial and has the same magnitude everywhere on the curved surface"),
      exStep("Apply Gauss's law", "Φ = E × 2πrl = Q_enc/ε₀ = λl/ε₀\nE = λ/(2πε₀r) = 2kλ/r"),
    ],
    explanation: "The 1/r dependence (not 1/r²) of the line charge field reflects the cylindrical geometry. The field spreads in 2D (radially), not 3D. This is the field inside a coaxial cable between the inner conductor and outer shield.",
  },
  {
    questionNumber: "P1.7",
    questionText: "Using Gauss's law, obtain the expression for the electric field at a point outside a uniformly charged thin spherical shell.",
    answer: "Choose a spherical Gaussian surface of radius r > R (shell radius).\nBy spherical symmetry: E is radial and uniform on this surface.\nFlux: E × 4πr²\nQ_enc = Q (total charge on shell)\nE × 4πr² = Q/ε₀\nE = Q/(4πε₀r²) = kQ/r²\nThe shell behaves as a point charge at the centre for r > R.",
    steps: [
      exStep("Choose spherical Gaussian surface outside the shell", "Gaussian sphere of radius r > R (shell radius)\nBy symmetry, E is radial and uniform → Φ = E × 4πr²"),
      exStep("Apply Gauss's law", "E × 4πr² = Q/ε₀\nE = Q/(4πε₀r²) = kQ/r²\nIdentical to a point charge at the centre"),
    ],
    explanation: "The shell theorem: outside a uniformly charged spherical shell, the field is the same as if all the charge were concentrated at the centre. Inside the shell (r < R), the field is zero. This is why the Earth's gravitational field can be treated as coming from a point mass at the centre.",
  },
  {
    questionNumber: "P1.8",
    questionText: "Find the electric flux through a rectangular surface of dimensions 1 m × 2 m placed in a uniform field E = 100 N/C making an angle of 30° with the surface.",
    answer: "The angle between E and the surface is 30°, so the angle between E and the surface normal is 90° − 30° = 60°.\nArea A = 1 × 2 = 2 m²\nΦ = EA cos 60° = 100 × 2 × 0.5 = 100 N·m²/C",
    steps: [
      exStep("Find angle between E and normal to surface", "E makes 30° with surface → E makes 90°−30° = 60° with surface normal\nA = 1×2 = 2 m²"),
      exStep("Calculate flux: Φ = EA cosθ", "Φ = 100 × 2 × cos60° = 100 × 2 × 0.5 = 100 N·m²/C"),
    ],
    explanation: "Electric flux Φ = E·A·cosθ where θ is the angle between the field and the surface NORMAL. Always identify whether the angle given is to the surface or to the normal — these differ by 90°.",
  },
  {
    questionNumber: "P1.9",
    questionText: "A positive charge of 6.4 × 10⁻⁷ C is placed at the centre of a cube of side 20 cm. Calculate the flux through one face of the cube.",
    answer: "Total flux through the cube = Q/ε₀ = 6.4×10⁻⁷ / 8.854×10⁻¹² = 7.23×10⁴ N·m²/C\nBy symmetry, flux is equal through all 6 faces:\nFlux through one face = 7.23×10⁴ / 6 = 1.2×10⁴ N·m²/C",
    steps: [
      exStep("Total flux by Gauss's law", "Φ_total = Q/ε₀ = 6.4×10⁻⁷/8.854×10⁻¹² = 7.23×10⁴ N·m²/C"),
      exStep("Distribute equally among 6 faces", "Φ_one face = 7.23×10⁴/6 = 1.2×10⁴ N·m²/C"),
    ],
    explanation: "When a charge is at the exact centre of a cube, all six faces are symmetrically equivalent, so each receives exactly 1/6 of the total flux. Gauss's law gives the total; symmetry distributes it.",
  },
  {
    questionNumber: "P1.10",
    questionText: "The electric field components in the region x > 0 are Ex = αx½, Ey = 0, Ez = 0 where α = 800 N/C·m½. Calculate the flux through a cube of side 0.1 m placed with one vertex at the origin.",
    answer: "The field is in the x-direction only and varies with x.\nThe cube has faces at x=0, x=a (a=0.1m) and y=0,y=a,z=0,z=a.\n\nFlux through face at x = 0: E₀ = 0 → Φ₁ = 0\nFlux through face at x = a: Eₐ = α√a = 800 × √0.1 = 800 × 0.3162 = 252.98 N/C\nΦ₂ = Eₐ × a² = 252.98 × (0.1)² = 252.98 × 0.01 = 2.53 N·m²/C\n\nOther faces: Ey = Ez = 0 → zero flux\nNet Φ = 2.53 N·m²/C\nEnclosed charge Q = ε₀Φ = 8.854×10⁻¹² × 2.53 = 2.24×10⁻¹¹ C",
    steps: [
      exStep("Calculate E at x=0 and x=a faces", "Face at x=0: E = α√0 = 0 → Φ = 0\nFace at x=a=0.1m: E = 800×√0.1 = 252.98 N/C"),
      exStep("Calculate flux through each face", "Φ_x=a = E × a² = 252.98 × 0.01 = 2.53 N·m²/C\nOther faces: field perpendicular to normal → Φ = 0\nNet Φ = 2.53 N·m²/C"),
      exStep("Find enclosed charge", "Q = ε₀ × Φ = 8.854×10⁻¹² × 2.53 = 2.24×10⁻¹¹ C"),
    ],
    explanation: "When the field is non-uniform, flux must be calculated face by face. Only faces perpendicular to the field contribute. The variation of field with position gives a net non-zero flux, which Gauss's law tells us implies net enclosed charge.",
  },
];

const docData = {
  _type: "ncertSolution",
  class: 12,
  subject: "Physics",
  chapter: 1,
  chapterTitle: "Electric Charges and Fields",
  questions: questions.map((q) => ({
    _key: randomUUID(),
    questionNumber: q.questionNumber,
    questionText: toBlocks(q.questionText),
    answer: toBlocks(q.answer),
    steps: toSteps(q.steps),
    explanation: toBlocks(q.explanation),
  })),
  examples: examples.map((ex) => ({
    _key: randomUUID(),
    questionNumber: ex.questionNumber,
    questionText: toBlocks(ex.questionText),
    answer: toBlocks(ex.answer),
    steps: ex.steps,
    explanation: toBlocks(ex.explanation),
  })),
};

const existing = await client.fetch(
  '*[_type == "ncertSolution" && class == 12 && subject == "Physics" && chapter == 1][0]._id'
);
if (existing) {
  await client.delete(existing);
  console.log(`Deleted existing document: ${existing}`);
}

const result = await client.create(docData);
console.log(`✓ Created Class 12 Physics Ch.1: ${result._id} (${questions.length} exercises, ${examples.length} examples)`);
