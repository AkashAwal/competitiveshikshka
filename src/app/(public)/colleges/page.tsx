import type { Metadata } from "next";
import { ShieldCheck, RefreshCw, Ban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CollegesList } from "./CollegesList";

export const metadata: Metadata = {
  title: "Top Colleges — Cutoffs, Fees, Placements & Admission Details",
  description:
    "Search verified rankings, cutoffs, fees and placement data for every top engineering and medical college in India. Free, unbiased and updated every admission cycle.",
  alternates: { canonical: "/colleges" },
  openGraph: { images: [{ url: "/api/og", width: 1200, height: 630 }] },
};

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Verified against official prospectuses & NIRF data" },
  { icon: RefreshCw,   text: "Cutoffs and fees updated every admission cycle" },
  { icon: Ban,         text: "No sponsored rankings — every listing is free" },
];

export default async function CollegesPage() {
  const supabase = await createClient();
  const { data: colleges } = await supabase
    .from("colleges")
    .select("slug, name, type, field, city, state, nirf_rank, avg_fees_lpa")
    .not("slug", "is", null)
    .order("nirf_rank", { ascending: true, nullsFirst: false })
    .order("name");

  return (
    <div>
      <section className="w-full bg-dot-pattern">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-2 sm:text-6xl">
            Find your <span className="text-primary">college</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Rankings, cutoffs, fees and placements for every top engineering and medical college — verified and kept up to date.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="h-4 w-4 text-primary shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <CollegesList colleges={colleges ?? []} />
      </div>
    </div>
  );
}
