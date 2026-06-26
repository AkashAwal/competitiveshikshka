import { createClient } from "@/lib/supabase/server";
import { ContentGate } from "@/components/content-gate";

export default async function PYQsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const content = (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-5xl font-black tracking-tight text-zinc-900 mb-2">
        Previous Year <span className="text-[#2563eb]">Questions</span>
      </h1>
      <p className="text-muted-foreground mb-10">JEE and NEET PYQs with detailed answer keys and topic-wise filters.</p>

      {/* Placeholder content rows to show behind the gate */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-white p-5 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="h-4 w-64 bg-zinc-100 rounded" />
              <div className="h-3 w-40 bg-zinc-50 rounded mt-1" />
            </div>
            <div className="h-8 w-20 bg-zinc-100 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );

  if (user) return content;

  return <ContentGate previewHeight={400}>{content}</ContentGate>;
}
