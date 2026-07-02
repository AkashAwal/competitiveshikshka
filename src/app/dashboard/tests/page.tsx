import { BookCheck } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function TestsPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Tests</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Practice tests and mock exams for JEE and NEET.</p>
      <ComingSoon
        icon={<BookCheck className="h-7 w-7" />}
        title="Tests coming soon"
        description="Full test series with detailed analytics will be available here."
        storageKey="cs-notify-tests"
        accent="#60a5fa"
      />
    </div>
  );
}
