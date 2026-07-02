import { Sparkles } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function PremiumPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Get Premium</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Unlock the full CompetitiveShiksha experience.</p>
      <ComingSoon
        icon={<Sparkles className="h-7 w-7" />}
        title="Premium coming soon"
        description="Priority mentorship, ad-free experience, and exclusive test series."
        storageKey="cs-notify-premium"
        accent="#fbbf24"
      />
    </div>
  );
}
