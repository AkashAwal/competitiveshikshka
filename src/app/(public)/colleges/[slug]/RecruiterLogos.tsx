"use client";

import { companyDomain } from "@/lib/companyLogos";

export function RecruiterLogos({ names }: { names: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {names.map(name => {
        const domain = companyDomain(name);
        return (
          <div key={name} className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg border border-border bg-background">
            {domain && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://logo.clearbit.com/${domain}?size=64`}
                alt=""
                className="h-5 w-5 rounded-sm object-contain shrink-0"
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
            )}
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">{name}</span>
          </div>
        );
      })}
    </div>
  );
}
