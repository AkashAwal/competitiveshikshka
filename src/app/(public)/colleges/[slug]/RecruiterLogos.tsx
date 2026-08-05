"use client";

import { useState } from "react";
import { companyDomain } from "@/lib/companyLogos";

const AVATAR_COLORS = ["#1c67f6", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0891b2"];

function avatarColor(name: string) {
  const hash = name.split("").reduce((h, ch) => h + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

const FAVICON_SIZE = 128;
// Google's favicon service returns HTTP 200 with a generic 16x16 globe
// placeholder (not a 404) when it has no real favicon for a domain, while
// every real favicon we've seen comes back 32x32 or larger. Use that to
// tell "no logo" apart from a real (if small) logo, since onError never
// fires for the placeholder.
const GENERIC_PLACEHOLDER_SIZE = 32;

function RecruiterLogo({ name }: { name: string }) {
  const domain = companyDomain(name);
  const [failed, setFailed] = useState(!domain);

  return (
    <div className="flex w-20 flex-col items-center gap-1.5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
        {domain && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=${FAVICON_SIZE}`}
            alt={name}
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
            onLoad={e => {
              if (e.currentTarget.naturalWidth < GENERIC_PLACEHOLDER_SIZE) setFailed(true);
            }}
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor(name) }}
          >
            {name.trim().charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <span className="text-center text-xs font-semibold text-muted-foreground leading-tight">{name}</span>
    </div>
  );
}

export function RecruiterLogos({ names }: { names: string[] }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {names.map(name => <RecruiterLogo key={name} name={name} />)}
    </div>
  );
}
