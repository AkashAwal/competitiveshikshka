import { StickyNote } from "lucide-react";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export default function NotesPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Notes</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Your study notes, organised by subject and chapter.</p>
      <ComingSoon
        icon={<StickyNote className="h-7 w-7" />}
        title="Notes coming soon"
        description="Create and manage your revision notes here."
        storageKey="cs-notify-notes"
        accent="#a78bfa"
      />
    </div>
  );
}
