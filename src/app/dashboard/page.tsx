import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DailySidebar } from "@/components/dashboard/daily-sidebar";
import { DailyGoal } from "@/components/dashboard/daily-goal";
import { ResourcesSection } from "@/components/dashboard/resources-section";
import { PYQBankSection } from "@/components/dashboard/pyq-bank-section";
import { ShortNotesSection } from "@/components/dashboard/short-notes-section";
import { TestCardsSection } from "@/components/dashboard/test-cards-section";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stream")
    .eq("id", user.id)
    .single();

  const stream = profile?.stream ?? "PCM";

  return (
    <div className="flex gap-6 px-6 py-8 max-w-7xl mx-auto w-full">
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <DailyGoal />
        <TestCardsSection />
        <ResourcesSection />
        <PYQBankSection />

        {/* Premium ad banner */}
        <div
          className="rounded-2xl overflow-hidden relative flex items-center justify-between px-10"
          style={{
            height: "160px",
            background: "linear-gradient(120deg, #0f1f3d 0%, #1a1040 40%, #2d1b4e 100%)",
            border: "1px solid rgba(139,92,246,0.25)",
          }}
        >
          {/* Glow blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -left-10 top-0 w-64 h-full opacity-30" style={{ background: "radial-gradient(ellipse at left center, #3b82f6, transparent 70%)" }} />
            <div className="absolute -right-10 top-0 w-64 h-full opacity-25" style={{ background: "radial-gradient(ellipse at right center, #a78bfa, transparent 70%)" }} />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-full opacity-10" style={{ background: "radial-gradient(ellipse at center, #f59e0b, transparent 70%)" }} />
          </div>

          {/* Left — copy */}
          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.3)" }}
              >
                Premium
              </span>
            </div>
            <p className="text-2xl font-black leading-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
              Crack JEE with an<br />
              <span style={{ color: "#818cf8" }}>IIT Alumni by your side</span>
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Live sessions · Curated DPPs · Personal mentorship
            </p>
          </div>

          {/* Right — CTA */}
          <div className="relative flex flex-col items-end gap-3 shrink-0">
            <button
              className="px-6 py-3 rounded-xl text-sm font-black cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
            >
              Upgrade Now →
            </button>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Cancel anytime</p>
          </div>
        </div>
        <ShortNotesSection stream={stream} />
      </div>
      <DailySidebar />
    </div>
  );
}
