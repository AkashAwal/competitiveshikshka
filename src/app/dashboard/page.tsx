import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DailySidebar } from "@/components/dashboard/daily-sidebar";
import { DailyGoal } from "@/components/dashboard/daily-goal";
import { ResourcesSection } from "@/components/dashboard/resources-section";
import { PYQBankSection } from "@/components/dashboard/pyq-bank-section";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex gap-6 px-6 py-8 h-full min-h-0">
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <DailyGoal />
        <ResourcesSection />
        <PYQBankSection />
        {/* Premium banner */}
        <div
          className="rounded-2xl px-6 flex items-center justify-between overflow-hidden relative"
          style={{
            height: "72px",
            background: "linear-gradient(100deg, #1e3a5f 0%, #1b2a4a 50%, #2d1b4e 100%)",
            border: "1px solid rgba(96,165,250,0.2)",
          }}
        >
          {/* Glow blobs */}
          <div className="absolute left-0 top-0 h-full w-40 opacity-20" style={{ background: "radial-gradient(ellipse at left center, #60a5fa, transparent)" }} />
          <div className="absolute right-0 top-0 h-full w-40 opacity-20" style={{ background: "radial-gradient(ellipse at right center, #a78bfa, transparent)" }} />

          <div className="relative flex flex-col">
            <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.95)" }}>
              Live Sessions & DPPs with an IIT Alumni
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Solve curated DPPs daily · Get live guidance from someone who cracked it
            </p>
          </div>

          <button
            className="relative shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#60a5fa", color: "#0f1318" }}
          >
            Upgrade Now
          </button>
        </div>
      </div>
      <DailySidebar />
    </div>
  );
}
