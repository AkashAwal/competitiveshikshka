import { createAdminClient, listAllAuthUsers } from "@/lib/supabase/admin";
import { StudentsTable, type StudentRow } from "./StudentsTable";

export default async function AdminStudentsPage() {
  const supabase = createAdminClient();

  const [{ data: profiles }, authUsers] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, class, stream, target_exam, target_year, streak, created_at, is_admin")
      .order("created_at", { ascending: false }),
    listAllAuthUsers(),
  ]);

  const authById = new Map(authUsers.map(u => [u.id, u]));

  const rows: StudentRow[] = (profiles ?? []).map(p => {
    const authUser = authById.get(p.id);
    return {
      id: p.id,
      fullName: authUser?.user_metadata?.full_name ?? "Unnamed",
      email: authUser?.email ?? "—",
      class: p.class ?? "—",
      stream: p.stream ?? "—",
      targetExam: p.target_exam ?? "—",
      streak: p.streak ?? 0,
      isAdmin: p.is_admin ?? false,
      joinedAt: p.created_at ?? authUser?.created_at ?? "",
    };
  });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Students</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{rows.length} registered students.</p>

      <StudentsTable rows={rows} />
    </div>
  );
}
