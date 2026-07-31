"use client";

import { useEffect, useState } from "react";
import { companyDomain } from "@/lib/companyLogos";

const AVATAR_COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0891b2"];

function avatarColor(name: string) {
  const hash = name.split("").reduce((h, ch) => h + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

const FAVICON_SIZE = 128;
// Google's favicon service returns HTTP 200 with a generic globe placeholder
// (not a 404) when it has no real favicon for a domain. Fetch that
// placeholder's byte size once and compare every logo against it to detect
// this case, since onError never fires for it.
const PROBE_DOMAIN = "zzz-nonexistent-probe-9f3a1c.com";

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${FAVICON_SIZE}`;
}

let genericSizePromise: Promise<number | null> | null = null;
function getGenericFaviconSize() {
  if (!genericSizePromise) {
    genericSizePromise = fetch(faviconUrl(PROBE_DOMAIN))
      .then(res => (res.ok ? res.blob() : null))
      .then(blob => blob?.size ?? null)
      .catch(() => null);
  }
  return genericSizePromise;
}

function RecruiterLogo({ name }: { name: string }) {
  const domain = companyDomain(name);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(!domain);

  useEffect(() => {
    if (!domain) return;
    let cancelled = false;
    let objectUrl: string | null = null;

    (async () => {
      const [genericSize, res] = await Promise.all([
        getGenericFaviconSize(),
        fetch(faviconUrl(domain)).catch(() => null),
      ]);
      if (cancelled || !res || !res.ok) {
        if (!cancelled) setFailed(true);
        return;
      }
      const blob = await res.blob();
      if (cancelled) return;
      if (genericSize !== null && blob.size === genericSize) {
        setFailed(true);
        return;
      }
      objectUrl = URL.createObjectURL(blob);
      setLogoUrl(objectUrl);
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [domain]);

  return (
    <div className="flex w-20 flex-col items-center gap-1.5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center">
        {logoUrl && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt={name}
            className="h-full w-full object-contain"
            onError={() => setFailed(true)}
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
