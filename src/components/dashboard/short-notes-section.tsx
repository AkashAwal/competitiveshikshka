"use client";

import { useState } from "react";
import { Atom, FlaskConical, Sigma, Microscope, BookOpen } from "lucide-react";

const subjectsByStream: Record<string, string[]> = {
  PCM:  ["Physics", "Chemistry", "Maths"],
  PCB:  ["Physics", "Chemistry", "Biology"],
  PCMB: ["Physics", "Chemistry", "Maths", "Biology"],
};

const subjectMeta: Record<string, { color: string; iconBg: string; icon: React.ElementType }> = {
  Physics:   { color: "#f97316", iconBg: "#c2410c", icon: Atom },
  Chemistry: { color: "#22c55e", iconBg: "#15803d", icon: FlaskConical },
  Maths:     { color: "#3b82f6", iconBg: "#1d4ed8", icon: Sigma },
  Biology:   { color: "#ef4444", iconBg: "#b91c1c", icon: Microscope },
};

const CARD_BG = "rgba(255,255,255,0.04)";
const CARD_BORDER = "rgba(255,255,255,0.08)";

interface Props {
  stream: string;
}

export function ShortNotesSection({ stream }: Props) {
  const subjects = subjectsByStream[stream] ?? subjectsByStream["PCM"];
  const [active, setActive] = useState(subjects[0]);
  const meta = subjectMeta[active];

  return (
    <div className="flex flex-col gap-3">
      {/* Pill tabs */}
      <div className="flex items-center gap-2">
        {subjects.map(subject => {
          const isActive = active === subject;
          const { iconBg, color, icon: Icon } = subjectMeta[subject];
          return (
            <button
              key={subject}
              onClick={() => setActive(subject)}
              className="flex items-center gap-2.5 select-none transition-colors"
              style={{
                height: "40px",
                paddingInline: "14px",
                backgroundColor: isActive ? CARD_BG : "transparent",
                border: `1px solid ${isActive ? CARD_BORDER : "transparent"}`,
                borderRadius: "100px",
                outline: "none",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                boxShadow: isActive ? `inset 0 0 0 1px ${color}30` : "none",
              }}
            >
              <span
                className="flex items-center justify-center rounded-lg shrink-0"
                style={{ width: "26px", height: "26px", backgroundColor: iconBg }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: "#fff" }} />
              </span>
              <span
                className="text-sm"
                style={{
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)",
                }}
              >
                {subject}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div
        style={{
          backgroundColor: "#171b20",
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: "16px",
        }}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.5)" }}>Recent chapters</p>
          <button
            className="text-xs font-bold cursor-pointer transition-opacity hover:opacity-70"
            style={{ color: "#60a5fa" }}
          >
            VIEW ALL
          </button>
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div
            className="flex items-center justify-center rounded-2xl h-12 w-12"
            style={{ backgroundColor: `${meta.color}18` }}
          >
            <BookOpen className="h-5 w-5" style={{ color: meta.color }} />
          </div>
          <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
            {active} notes coming soon
          </p>
          <p className="text-xs text-center max-w-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Chapter-wise short notes will appear here once uploaded.
          </p>
        </div>
      </div>
    </div>
  );
}
