"use client";

import { useEffect, useState } from "react";
import { PortableText } from "@/components/portable-text";

type Step = { stepTitle: string; content: unknown[] };

export function StepsSection({ steps, accentColor = "blue" }: { steps: Step[]; accentColor?: "blue" | "emerald" }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cs-study");
      if (raw) {
        const prefs = JSON.parse(raw);
        setExpanded(!!prefs.stepsExpanded);
      }
    } catch { /* noop */ }
  }, []);

  const color = accentColor === "emerald" ? "#10b981" : "#3b82f6";
  const colorDark = accentColor === "emerald" ? "#34d399" : "#60a5fa";
  const label = accentColor === "emerald" ? "emerald" : "blue";

  return (
    <div className="border-t border-border pt-8 mt-8">
      <p className={`mb-4 text-xs font-bold uppercase tracking-wide text-${label}-600 dark:text-${label}-400`}>
        Step-by-Step
      </p>
      <div className="space-y-2">
        {steps.map((step, i) => (
          <details key={i} className="group rounded-xl border border-border overflow-hidden" open={expanded}>
            <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-3 px-4 py-3 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium">{step.stepTitle}</span>
              </div>
              <svg className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border bg-muted/20">
              <PortableText value={step.content as unknown[]} />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
