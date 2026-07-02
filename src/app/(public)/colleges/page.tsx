import { ShieldCheck, RefreshCw, Ban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CollegesList } from "./CollegesList";

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Verified against official prospectuses & NIRF data" },
  { icon: RefreshCw,   text: "Cutoffs and fees updated every admission cycle" },
  { icon: Ban,         text: "No sponsored rankings — every listing is free" },
];

export default async function CollegesPage() {
  const supabase = await createClient();
  const { data: colleges } = await supabase
    .from("colleges")
    .select("slug, name, type, city, state, nirf_rank, avg_fees_lpa")
    .not("slug", "is", null)
    .order("nirf_rank", { ascending: true, nullsFirst: false })
    .order("name");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
        Find your <span className="text-[#2563eb]">college</span>
      </h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Rankings, cutoffs, fees and placements for every top engineering and medical college — verified and kept up to date.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
        {TRUST_POINTS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-[#2563eb] shrink-0" />
            {text}
          </div>
        ))}
      </div>

      <CollegesList colleges={colleges ?? []} />
    </div>
  );
}
