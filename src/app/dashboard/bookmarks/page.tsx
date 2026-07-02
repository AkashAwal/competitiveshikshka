import { Bookmark } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function BookmarksPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Bookmarks</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Saved questions, solutions and resources for quick revision.</p>
      <ComingSoon
        icon={<Bookmark className="h-7 w-7" />}
        title="Bookmarks coming soon"
        description="Save PYQs and NCERT solutions to revisit later."
        storageKey="cs-notify-bookmarks"
        accent="#34d399"
      />
    </div>
  );
}
