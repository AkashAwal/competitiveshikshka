export default function NotesPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Notes</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Your study notes, organised by subject and chapter.</p>
      <div
        className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{ background: "#171b20", border: "1px solid rgba(255,255,255,0.13)", minHeight: "300px" }}
      >
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Notes coming soon</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Create and manage your revision notes here.</p>
      </div>
    </div>
  );
}
