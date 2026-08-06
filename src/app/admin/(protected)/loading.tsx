export default function AdminLoading() {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <div className="h-8 w-48 rounded-lg mb-2 animate-pulse" style={{ backgroundColor: "rgba(var(--fg-rgb),0.08)" }} />
      <div className="h-4 w-64 rounded-lg mb-8 animate-pulse" style={{ backgroundColor: "rgba(var(--fg-rgb),0.05)" }} />

      <div
        className="rounded-2xl h-96 animate-pulse"
        style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)" }}
      />
    </div>
  );
}
