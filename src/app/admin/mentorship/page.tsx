import { createAdminClient } from "@/lib/supabase/admin";
import { MentorshipTable } from "./MentorshipTable";

export default async function AdminMentorshipPage() {
  const supabase = createAdminClient();
  const { data: applications } = await supabase
    .from("mentorship_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Mentorship applications</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>{applications?.length ?? 0} applications received.</p>

      <MentorshipTable rows={applications ?? []} />
    </div>
  );
}
