export default function BookmarksPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Bookmarks</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Saved questions, solutions and resources for quick revision.</p>
      <div
        className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{ background: "#171b20", border: "1px solid rgba(255,255,255,0.13)", minHeight: "300px" }}
      >
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Bookmarks coming soon</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Save PYQs and NCERT solutions to revisit later.</p>
      </div>
    </div>
  );
}
