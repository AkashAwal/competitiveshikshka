"use client";

const exams = [
  { name: "JEE Main",            tag: "2026 Qs Added" },
  { name: "JEE Advanced",        tag: "2026 Qs Added" },
  { name: "NTA Abhyas (JEE)",    tag: "2026 Qs Added" },
  { name: "BITSAT",              tag: "2026 Qs Added" },
  { name: "MHT CET",             tag: "2026 Qs Added" },
  { name: "KCET",                tag: "2026 Qs Added" },
  { name: "WBJEE",               tag: "2026 Qs Added" },
  { name: "TS EAMCET",           tag: "2026 Qs Added" },
  { name: "AP EAMCET",           tag: "2026 Qs Added" },
  { name: "VITEEE",              tag: "2026 Qs Added" },
  { name: "NDA",                 tag: "2026 Qs Added" },
  { name: "IAT (IISER)",         tag: "2026 Qs Added" },
];

export function PYQBankSection() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-base" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>
          Chapter wise PYQ Bank
        </p>
        <button
          className="text-xs font-bold cursor-pointer transition-opacity hover:opacity-70"
          style={{ color: "#60a5fa" }}
        >
          VIEW ALL
        </button>
      </div>

      {/* 2-row horizontal scroll grid */}
      <div
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(2, auto)",
            gridAutoFlow: "column",
            gridAutoColumns: "140px",
            gap: "10px",
          }}
        >
          {exams.map((exam, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl p-3 cursor-pointer transition-colors"
              style={{
                background: "linear-gradient(145deg, rgba(var(--fg-rgb),0.07) 0%, rgba(var(--fg-rgb),0.03) 100%)",
                border: "1px solid rgba(var(--fg-rgb),0.09)",
                height: "72px",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(var(--fg-rgb),0.08)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(var(--fg-rgb),0.04)"}
            >
              <p className="text-sm font-semibold leading-tight" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>
                {exam.name}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#60a5fa" }}>
                {exam.tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
