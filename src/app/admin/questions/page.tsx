import { createAdminClient } from "@/lib/supabase/admin";
import { QuestionsManager } from "./QuestionsManager";

export default async function AdminQuestionsPage() {
  const supabase = createAdminClient();
  const { data: questions } = await supabase.from("questions").select("*").order("created_at", { ascending: false });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Questions</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>{questions?.length ?? 0} questions across PYQ and practice banks.</p>

      <QuestionsManager rows={questions ?? []} />
    </div>
  );
}
