import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Flame, GraduationCap, MapPin, BookOpen } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

const card = { background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" };

function Field({ label, value }: { label: string; value: string | number | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(var(--fg-rgb),0.35)" }}>{label}</p>
      <p className="text-sm mt-1 font-medium" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{value || "—"}</p>
    </div>
  );
}

export default async function AdminStudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: profile }, { data: authUser }, { data: applications }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).single(),
    supabase.auth.admin.getUserById(id),
    supabase.from("mentorship_applications").select("*").eq("user_id", id).order("created_at", { ascending: false }),
  ]);

  if (!profile || !authUser?.user) notFound();

  const user = authUser.user;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <Link href="/admin/students" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
        <ArrowLeft className="h-4 w-4" /> Back to students
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-black text-white" style={{ backgroundColor: "#2563eb" }}>
          {(user.user_metadata?.full_name?.[0] ?? user.email?.[0] ?? "S").toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>{user.user_metadata?.full_name ?? "Unnamed student"}</h1>
          <p className="text-sm" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Flame, label: "Streak", value: `${profile.streak ?? 0} days`, color: "#fb923c" },
          { icon: GraduationCap, label: "Class", value: profile.class ?? "—", color: "#60a5fa" },
          { icon: BookOpen, label: "Stream", value: profile.stream ?? "—", color: "#a78bfa" },
          { icon: MapPin, label: "State", value: profile.state ?? "—", color: "#34d399" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-2xl p-4 flex flex-col gap-2" style={card}>
            <Icon className="h-4 w-4" style={{ color }} />
            <div>
              <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{label}</p>
              <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6 mb-4" style={card}>
        <p className="text-sm font-bold mb-4" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Profile</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <Field label="Target exam" value={profile.target_exam} />
          <Field label="Target year" value={profile.target_year} />
          <Field label="Daily goal" value={profile.daily_goal_hours ? `${profile.daily_goal_hours} hrs` : null} />
          <Field label="Strong subject" value={profile.strong_subject} />
          <Field label="Weak subject" value={profile.weak_subject} />
          <Field label="Coaching" value={profile.coaching} />
          <Field label="School" value={profile.school} />
          <Field label="Heard from" value={profile.heard_from} />
          <Field label="Joined" value={new Date(profile.created_at ?? user.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
        </div>
      </div>

      <div className="rounded-2xl p-6" style={card}>
        <p className="text-sm font-bold mb-4" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>Mentorship applications</p>
        {!applications || applications.length === 0 ? (
          <p className="text-sm" style={{ color: "rgba(var(--fg-rgb),0.3)" }}>No mentorship applications from this account.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map(app => (
              <div key={app.id} className="flex items-center justify-between rounded-xl p-4" style={{ backgroundColor: "rgba(var(--fg-rgb),0.04)", border: "1px solid rgba(var(--fg-rgb),0.06)" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.85)" }}>{app.plan === "premium" ? "Premium" : "Mentorship only"} · {app.class}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{app.city} · {app.contact_no}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: "rgba(96,165,250,0.12)", color: "#60a5fa" }}>{app.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
