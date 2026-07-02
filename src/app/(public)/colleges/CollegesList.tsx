"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Award, ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollegeCard {
  slug: string;
  name: string;
  type: string;
  city: string | null;
  state: string | null;
  nirf_rank: number | null;
  avg_fees_lpa: number | null;
}

const TYPES = ["All", "IIT", "NIT", "IIIT", "GFTI", "State", "Private", "Medical", "Other"];

export function CollegesList({ colleges }: { colleges: CollegeCard[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colleges.filter(c => {
      const matchesType = type === "All" || c.type === type;
      const matchesQuery = !q ||
        c.name.toLowerCase().includes(q) ||
        (c.city ?? "").toLowerCase().includes(q) ||
        (c.state ?? "").toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [colleges, query, type]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by college, city or state..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2563eb]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer border",
                type === t ? "bg-[#2563eb] text-white border-[#2563eb]" : "bg-white text-zinc-600 border-border hover:border-[#2563eb]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} college{filtered.length === 1 ? "" : "s"} found</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white p-16 text-center">
          <GraduationCap className="h-8 w-8 text-zinc-300" />
          <p className="text-sm font-semibold text-zinc-500">No colleges match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => (
            <Link
              key={c.slug}
              href={`/colleges/${c.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-white p-6 transition-all duration-200 hover:border-[#2563eb] hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563eb]/10">
                  <GraduationCap className="h-5 w-5 text-[#2563eb]" />
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">{c.type}</span>
              </div>

              <div>
                <h3 className="font-bold text-zinc-900 mb-1 leading-snug">{c.name}</h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {c.city ?? "—"}{c.state ? `, ${c.state}` : ""}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
                {c.nirf_rank && (
                  <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-[#fbbf24]" /> NIRF #{c.nirf_rank}</span>
                )}
                {c.avg_fees_lpa && <span>₹{c.avg_fees_lpa} LPA avg fees</span>}
              </div>

              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[#2563eb] opacity-0 group-hover:opacity-100 transition-opacity">
                View details <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
