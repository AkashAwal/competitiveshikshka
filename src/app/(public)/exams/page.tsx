import { ShieldCheck, RefreshCw, Ban } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ExamsGrid } from "./ExamsGrid";

const TRUST_POINTS = [
  { icon: ShieldCheck, text: "Verified against official exam-body notifications" },
  { icon: RefreshCw,   text: "Dates and cutoffs updated every exam cycle" },
  { icon: Ban,         text: "No sponsored placements — every exam is covered" },
];

export default async function ExamsPage({ searchParams }: { searchParams: Promise<{ exam?: string }> }) {
  const { exam } = await searchParams;
  const supabase = await createClient();
  const { data: exams } = await supabase
    .from("exams")
    .select("*")
    .not("slug", "is", null)
    .order("category")
    .order("name");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
        Entrance <span className="text-[#2563eb]">exams</span>
      </h1>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        Everything about every major exam — syllabus, marking scheme, dates, cutoffs and tips. Tap a card to read the full breakdown.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
        {TRUST_POINTS.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 text-[#2563eb] shrink-0" />
            {text}
          </div>
        ))}
      </div>

      {!exams || exams.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-16 text-center">
          <p className="text-sm font-semibold text-zinc-500">Exam guides are coming soon.</p>
        </div>
      ) : (
        <ExamsGrid exams={exams} initialSlug={exam} />
      )}
    </div>
  );
}
