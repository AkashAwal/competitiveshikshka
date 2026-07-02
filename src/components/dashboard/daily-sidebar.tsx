"use client";

import { useState, useEffect, useRef } from "react";
import { FlaskConical, BookOpen, Eye, EyeOff, ListTodo, Plus, X, Check } from "lucide-react";

const formulas = [
  {
    subject: "Physics",
    topic: "Kinematics",
    color: "#60a5fa",
    formula: "v² = u² + 2as",
    note: "v = final velocity, u = initial velocity, a = acceleration, s = displacement",
  },
  {
    subject: "Maths",
    topic: "Quadratic Roots",
    color: "#a78bfa",
    formula: "x = (−b ± √(b²−4ac)) / 2a",
    note: "Discriminant D = b²−4ac. D > 0: real roots, D = 0: equal roots, D < 0: complex roots",
  },
  {
    subject: "Chemistry",
    topic: "Ideal Gas Law",
    color: "#34d399",
    formula: "PV = nRT",
    note: "P = pressure, V = volume, n = moles, R = 8.314 J/mol·K, T = temperature in Kelvin",
  },
  {
    subject: "Physics",
    topic: "Gravitation",
    color: "#60a5fa",
    formula: "F = Gm₁m₂ / r²",
    note: "G = 6.674×10⁻¹¹ N·m²/kg². Force is always attractive.",
  },
  {
    subject: "Maths",
    topic: "Integration by Parts",
    color: "#a78bfa",
    formula: "∫u dv = uv − ∫v du",
    note: "Choose u using ILATE: Inverse trig → Logarithm → Algebraic → Trig → Exponential",
  },
  {
    subject: "Chemistry",
    topic: "pH",
    color: "#34d399",
    formula: "pH = −log₁₀[H⁺]",
    note: "pH < 7 acidic, pH = 7 neutral, pH > 7 basic. pOH = 14 − pH at 25°C",
  },
  {
    subject: "Physics",
    topic: "De Broglie Wavelength",
    color: "#60a5fa",
    formula: "λ = h / mv",
    note: "h = 6.626×10⁻³⁴ J·s (Planck's constant), m = mass, v = velocity",
  },
  {
    subject: "Maths",
    topic: "Binomial Theorem",
    color: "#a78bfa",
    formula: "(x+y)ⁿ = Σ ⁿCᵣ · xⁿ⁻ʳ · yʳ",
    note: "General term: Tᵣ₊₁ = ⁿCᵣ · xⁿ⁻ʳ · yʳ, where r goes from 0 to n",
  },
  {
    subject: "Chemistry",
    topic: "Bohr Model Energy",
    color: "#34d399",
    formula: "Eₙ = −13.6 / n² eV",
    note: "Energy is negative (bound state). For hydrogen atom. n = principal quantum number.",
  },
  {
    subject: "Physics",
    topic: "Snell's Law",
    color: "#60a5fa",
    formula: "n₁ sin θ₁ = n₂ sin θ₂",
    note: "n = refractive index. Light bends toward normal when entering denser medium.",
  },
  {
    subject: "Maths",
    topic: "Area Under Curve",
    color: "#a78bfa",
    formula: "A = ∫ₐᵇ |f(x)| dx",
    note: "Always take absolute value to get positive area. Split integral where f(x) = 0.",
  },
  {
    subject: "Chemistry",
    topic: "Faraday's Law",
    color: "#34d399",
    formula: "m = (M × I × t) / (n × F)",
    note: "m = mass deposited, M = molar mass, I = current, t = time, F = 96485 C/mol",
  },
];

const problems = [
  {
    subject: "Physics · Kinematics",
    color: "#60a5fa",
    question: "A particle moves with acceleration a = (2t − 4) m/s² starting from rest. Find the distance traveled in the first 4 seconds.",
    answer: "v = ∫a dt = t² − 4t\nv = 0 at t = 0 and t = 4s → particle reverses at t = 2s\n\nDistance 0→2s: x = t³/3 − 2t² → |x(2)| = 8/3 − 8 = −16/3 → 16/3 m\nDistance 2→4s: |x(4)−x(2)| = |(64/3−32)−(8/3−8)| = 16/3 m\n\nTotal distance = 16/3 + 16/3 = 32/3 ≈ 10.67 m",
  },
  {
    subject: "Maths · Limits",
    color: "#a78bfa",
    question: "Evaluate: lim(x→0) [ (1 − cos 2x) / (x · sin x) ]",
    answer: "1 − cos 2x = 2sin²x\n\nlim = 2sin²x / (x · sin x) = 2 sin x / x\n\nAs x→0, sin x / x → 1\n\nAnswer = 2",
  },
  {
    subject: "Chemistry · Equilibrium",
    color: "#34d399",
    question: "For PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), Kp = 1.8 at 250°C. If initial pressure of PCl₅ is 2 atm, find the degree of dissociation α.",
    answer: "At equilibrium: P(PCl₅) = 2(1−α), P(PCl₃) = 2α, P(Cl₂) = 2α\nTotal P = 2(1+α)\n\nKp = [2α · 2α] / [2(1−α)] = 4α² / [2(1−α)] = 1.8\n\n2α² / (1−α) = 1.8\nFor small α: 2α² ≈ 1.8 → α² ≈ 0.9 → α ≈ 0.949\n\nVerifying: α ≈ 0.72 (solving full quadratic)\n2α² + 1.8α − 1.8 = 0 → α ≈ 0.6",
  },
  {
    subject: "Physics · Electricity",
    color: "#60a5fa",
    question: "Three capacitors of 2μF, 3μF and 6μF are connected in series across 12V. Find the charge on each capacitor and voltage across 3μF.",
    answer: "1/C_eq = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 1 μF\n\nCharge Q = C_eq × V = 1 × 12 = 12 μC (same on all in series)\n\nV across 3μF = Q/C = 12/3 = 4 V",
  },
  {
    subject: "Maths · Integration",
    color: "#a78bfa",
    question: "Evaluate: ∫ x² · eˣ dx",
    answer: "Using integration by parts twice (ILATE: Algebraic before Exponential):\n\n∫x²eˣ dx = x²eˣ − ∫2x·eˣ dx\n= x²eˣ − 2[xeˣ − eˣ] + C\n= eˣ(x² − 2x + 2) + C",
  },
  {
    subject: "Chemistry · Electrochemistry",
    color: "#34d399",
    question: "The standard EMF of Zn|Zn²⁺||Cu²⁺|Cu cell is 1.10V. If [Zn²⁺] = 0.1M and [Cu²⁺] = 0.01M at 25°C, find E_cell. (R=8.314, F=96500)",
    answer: "Nernst equation: E = E° − (RT/nF) ln Q\nn = 2, Q = [Zn²⁺]/[Cu²⁺] = 0.1/0.01 = 10\n\nE = 1.10 − (0.0592/2) log 10\nE = 1.10 − 0.0296 × 1\nE = 1.0704 V ≈ 1.07 V",
  },
  {
    subject: "Physics · Optics",
    color: "#60a5fa",
    question: "In Young's double slit experiment, the 10th bright fringe is at 5mm from centre. λ = 500nm, D = 1m. Find slit separation d.",
    answer: "Position of nth bright fringe: y = nλD/d\n\n5×10⁻³ = 10 × 500×10⁻⁹ × 1 / d\n\nd = (10 × 500×10⁻⁹) / (5×10⁻³)\nd = 5000×10⁻⁹ / 5×10⁻³\nd = 1×10⁻³ m = 1 mm",
  },
  {
    subject: "Maths · Probability",
    color: "#a78bfa",
    question: "A bag has 5 red and 3 blue balls. Two balls are drawn without replacement. Find P(both same colour).",
    answer: "P(both red) = (5/8) × (4/7) = 20/56\nP(both blue) = (3/8) × (2/7) = 6/56\n\nP(same colour) = 20/56 + 6/56 = 26/56 = 13/28",
  },
  {
    subject: "Chemistry · Organic",
    color: "#34d399",
    question: "How many structural isomers are possible for C₄H₁₀O (alcohols only)?",
    answer: "C₄H₁₀O alcohols (−OH group on C₄ chain):\n1. Butan-1-ol: CH₃CH₂CH₂CH₂OH\n2. Butan-2-ol: CH₃CH₂CH(OH)CH₃\n3. 2-Methylpropan-1-ol: (CH₃)₂CHCH₂OH\n4. 2-Methylpropan-2-ol: (CH₃)₃COH\n\nAnswer = 4 structural isomers",
  },
  {
    subject: "Physics · Waves",
    color: "#60a5fa",
    question: "Two open organ pipes of length 50cm and 51cm produce 6 beats/sec. Find the velocity of sound.",
    answer: "f₁ = v/2L₁ = v/1.0, f₂ = v/2L₂ = v/1.02\n\nBeats = f₁ − f₂ = v(1/1.0 − 1/1.02) = 6\n\nv × (1.02 − 1.0)/(1.0 × 1.02) = 6\nv × 0.02/1.02 = 6\nv = 6 × 1.02/0.02 = 306 m/s",
  },
];

const TODAY = new Date().toISOString().slice(0, 10);
const STORAGE_KEY = `cs-tasks-${TODAY}`;

interface Task { id: string; text: string; done: boolean }

export function DailyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setTasks(JSON.parse(saved));
    } catch {}
  }, []);

  function save(next: Task[]) {
    setTasks(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addTask() {
    const text = input.trim();
    if (!text) return;
    save([...tasks, { id: crypto.randomUUID(), text, done: false }]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggle(id: string) {
    save(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function remove(id: string) {
    save(tasks.filter(t => t.id !== id));
  }

  const done = tasks.filter(t => t.done).length;

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListTodo className="h-4 w-4" style={{ color: "#a78bfa" }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
            Today's Tasks
          </span>
        </div>
        {tasks.length > 0 && (
          <span className="text-[11px] font-semibold" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>
            {done}/{tasks.length}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(var(--fg-rgb),0.07)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(done / tasks.length) * 100}%`, backgroundColor: "#a78bfa" }}
          />
        </div>
      )}

      {/* Task list */}
      <div className="flex flex-col gap-1.5">
        {tasks.length === 0 && (
          <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.25)" }}>No tasks yet — add one below.</p>
        )}
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 group">
            <button
              onClick={() => toggle(task.id)}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded cursor-pointer transition-colors"
              style={{
                border: `1.5px solid ${task.done ? "#a78bfa" : "rgba(var(--fg-rgb),0.2)"}`,
                backgroundColor: task.done ? "#a78bfa" : "transparent",
              }}
            >
              {task.done && <Check className="h-2.5 w-2.5" style={{ color: "#fff" }} />}
            </button>
            <span
              className="flex-1 text-xs leading-snug"
              style={{
                color: task.done ? "rgba(var(--fg-rgb),0.25)" : "rgba(var(--fg-rgb),0.75)",
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button
              onClick={() => remove(task.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              style={{ color: "rgba(var(--fg-rgb),0.3)" }}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 mt-1">
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
          placeholder="Add a task…"
          className="flex-1 text-xs bg-transparent outline-none placeholder:opacity-30"
          style={{ color: "rgba(var(--fg-rgb),0.8)" }}
        />
        <button
          onClick={addTask}
          className="cursor-pointer transition-opacity hover:opacity-80"
          style={{ color: "#a78bfa" }}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function getDailyIndex(list: unknown[]) {
  return Math.floor(Date.now() / 86_400_000) % list.length;
}

export function DailySidebar() {
  const [answerVisible, setAnswerVisible] = useState(false);

  const formula = formulas[getDailyIndex(formulas)];
  const problem = problems[getDailyIndex(problems)];

  return (
    <div className="flex flex-col gap-4 w-full md:w-[300px] md:min-w-[300px] md:shrink-0">

      {/* Formula of the day */}
      <div
        className="rounded-xl p-5 flex flex-col gap-3"
        style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
      >
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4" style={{ color: formula.color }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: formula.color }}>
            Formula of the Day
          </span>
        </div>

        <div>
          <p className="text-[11px] mb-1" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
            {formula.subject} · {formula.topic}
          </p>
          <p
            className="text-lg font-black tracking-tight"
            style={{ color: "rgba(var(--fg-rgb),0.95)", fontFamily: "monospace" }}
          >
            {formula.formula}
          </p>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>
          {formula.note}
        </p>
      </div>

      {/* Problem of the day */}
      <div
        className="rounded-xl p-5 flex flex-col gap-3"
        style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" style={{ color: problem.color }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: problem.color }}>
            Problem of the Day
          </span>
        </div>

        <div>
          <p className="text-[11px] mb-2" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>
            {problem.subject}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>
            {problem.question}
          </p>
        </div>

        {/* Answer reveal */}
        <div>
          <button
            onClick={() => setAnswerVisible(v => !v)}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-opacity hover:opacity-80"
            style={{ color: problem.color }}
          >
            {answerVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {answerVisible ? "Hide answer" : "Reveal answer"}
          </button>

          {answerVisible && (
            <div
              className="mt-2 p-3 rounded-lg text-xs leading-relaxed whitespace-pre-line"
              style={{
                backgroundColor: `${problem.color}10`,
                border: `1px solid ${problem.color}25`,
                color: "rgba(var(--fg-rgb),0.75)",
              }}
            >
              {problem.answer}
            </div>
          )}
        </div>
      </div>

      <DailyTasks />
    </div>
  );
}
