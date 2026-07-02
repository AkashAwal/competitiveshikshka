import { createAdminClient } from "@/lib/supabase/admin";
import { ExamsManager } from "./ExamsManager";

export default async function AdminExamsPage() {
  const supabase = createAdminClient();
  const { data: exams } = await supabase
    .from("exams")
    .select("id, name, category, conducting_body")
    .order("category")
    .order("name");

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Exams</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{exams?.length ?? 0} exams in the database.</p>

      <ExamsManager rows={exams ?? []} />
    </div>
  );
}
