import { createClient } from "@/lib/supabase/server";
import { ContentGate } from "@/components/content-gate";

export default async function CalculatorsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const content = (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
        Rank <span className="text-[#2563eb]">Calculator</span>
      </h1>
      <p className="text-muted-foreground mb-10">Enter your marks and instantly estimate your rank, percentile and college chances.</p>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <div className="h-4 w-48 bg-zinc-100 rounded mb-3" />
            <div className="h-10 w-full bg-zinc-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );

  if (user) return content;

  return <ContentGate previewHeight={400}>{content}</ContentGate>;
}
