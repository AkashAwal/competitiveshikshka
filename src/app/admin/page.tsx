import { createAdminClient } from "@/lib/supabase/admin";

const card = { background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" };

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000).toISOString();
}

function tally(values: (string | null | undefined)[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

function BarList({ title, data, color }: { title: string; data: { label: string; count: number }[]; color: string }) {
  const max = Math.max(1, ...data.map(d => d.count));
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4" style={card}>
      <p className="text-sm font-bold" style={{ color: "rgba(var(--fg-rgb),0.9)" }}>{title}</p>
      {data.length === 0 ? (
        <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.25)" }}>No data yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {data.slice(0, 8).map(({ label, count }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold" style={{ color: "rgba(var(--fg-rgb),0.7)" }}>
                <span>{label}</span>
                <span style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{count}</span>
              </div>
              <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: "rgba(var(--fg-rgb),0.06)" }}>
                <div className="h-1.5 rounded-full" style={{ width: `${(count / max) * 100}%`, backgroundColor: color }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AdminOverviewPage() {
  const supabase = createAdminClient();

  const [
    { count: totalStudents },
    { count: signups7d },
    { count: signups30d },
    { data: profiles },
    { data: applications },
    { count: collegesCount },
    { count: pyqCount },
    { count: practiceCount },
  ] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", daysAgo(7)),
    supabase.from("profiles").select("id", { count: "exact", head: true }).gte("created_at", daysAgo(30)),
    supabase.from("profiles").select("class, stream, target_exam, streak"),
    supabase.from("mentorship_applications").select("plan, status"),
    supabase.from("colleges").select("id", { count: "exact", head: true }),
    supabase.from("questions").select("id", { count: "exact", head: true }).eq("bank", "pyq"),
    supabase.from("questions").select("id", { count: "exact", head: true }).eq("bank", "practice"),
  ]);

  const avgStreak = profiles?.length
    ? Math.round((profiles.reduce((sum, p) => sum + (p.streak ?? 0), 0) / profiles.length) * 10) / 10
    : 0;

  const classDist = tally(profiles?.map(p => p.class) ?? []);
  const streamDist = tally(profiles?.map(p => p.stream) ?? []);
  const examDist = tally((profiles ?? []).flatMap(p => p.target_exam ? p.target_exam.split(",") : []));

  const appsByPlan = tally(applications?.map(a => a.plan) ?? []);
  const appsByStatus = tally(applications?.map(a => a.status) ?? []);

  const stats = [
    { label: "Total Students", value: String(totalStudents ?? 0), color: "#60a5fa", bg: "rgba(96,165,250,0.1)", icon: "🎓" },
    { label: "Signups (7d)", value: String(signups7d ?? 0), color: "#34d399", bg: "rgba(52,211,153,0.1)", icon: "📈" },
    { label: "Signups (30d)", value: String(signups30d ?? 0), color: "#a78bfa", bg: "rgba(167,139,250,0.1)", icon: "🗓️" },
    { label: "Avg Streak", value: String(avgStreak), color: "#fb923c", bg: "rgba(251,146,60,0.1)", icon: "🔥" },
    { label: "Mentorship Applications", value: String(applications?.length ?? 0), color: "#f472b6", bg: "rgba(244,114,182,0.1)", icon: "📝" },
    { label: "Colleges", value: String(collegesCount ?? 0), color: "#facc15", bg: "rgba(250,204,21,0.1)", icon: "🏛️" },
    { label: "PYQ Questions", value: String(pyqCount ?? 0), color: "#22d3ee", bg: "rgba(34,211,238,0.1)", icon: "📚" },
    { label: "Practice Questions", value: String(practiceCount ?? 0), color: "#4ade80", bg: "rgba(74,222,128,0.1)", icon: "✅" },
  ];

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Overview</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>Usage analytics across CompetitiveShiksha.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, color, bg, icon }) => (
          <div key={label} className="rounded-2xl p-5 flex flex-col gap-3" style={card}>
            <div className="flex items-center justify-between">
              <span className="text-xl">{icon}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-right" style={{ backgroundColor: bg, color }}>{label}</span>
            </div>
            <p className="text-3xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <BarList title="Class distribution" data={classDist} color="#60a5fa" />
        <BarList title="Stream distribution" data={streamDist} color="#a78bfa" />
        <BarList title="Target exam distribution" data={examDist} color="#34d399" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <BarList title="Mentorship applications by plan" data={appsByPlan} color="#f472b6" />
        <BarList title="Mentorship applications by status" data={appsByStatus} color="#facc15" />
      </div>
    </div>
  );
}
