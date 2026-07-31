"use client";

import { useState } from "react";
import { companyDomain } from "@/lib/companyLogos";

const AVATAR_COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0891b2"];

function avatarColor(name: string) {
  const hash = name.split("").reduce((h, ch) => h + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function RecruiterLogo({ name }: { name: string }) {
  const domain = companyDomain(name);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg border border-border bg-background">
      {domain && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          className="h-5 w-5 rounded-sm object-contain shrink-0"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-[10px] font-bold text-white"
          style={{ backgroundColor: avatarColor(name) }}
        >
          {name.trim().charAt(0).toUpperCase()}
        </span>
      )}
      <span className="text-sm font-semibold text-foreground whitespace-nowrap">{name}</span>
    </div>
  );
}

export function RecruiterLogos({ names }: { names: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {names.map(name => <RecruiterLogo key={name} name={name} />)}
    </div>
  );
}
