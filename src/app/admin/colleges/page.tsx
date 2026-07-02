import { createAdminClient } from "@/lib/supabase/admin";
import { CollegesManager } from "./CollegesManager";

export default async function AdminCollegesPage() {
  const supabase = createAdminClient();
  const { data: colleges } = await supabase
    .from("colleges")
    .select("id, name, type, city, state, nirf_rank, avg_fees_lpa")
    .order("name");

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Colleges</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>{colleges?.length ?? 0} colleges in the database.</p>

      <CollegesManager rows={colleges ?? []} />
    </div>
  );
}
