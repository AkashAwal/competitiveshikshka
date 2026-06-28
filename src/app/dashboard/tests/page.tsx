export default function TestsPage() {
  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Tests</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Practice tests and mock exams for JEE and NEET.</p>
      <div
        className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.13)", minHeight: "300px" }}
      >
        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Tests coming soon</p>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Full test series with analytics will be available here.</p>
      </div>
    </div>
  );
}
