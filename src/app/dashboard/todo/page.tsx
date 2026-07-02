export default function TodoPage() {
  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>To Do</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>Track your daily study tasks and goals.</p>
      <div
        className="rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3"
        style={{ background: "var(--surface-card)", border: "1px solid rgba(var(--fg-rgb),0.13)", minHeight: "300px" }}
      >
        <p className="text-sm font-semibold" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>To Do list coming soon</p>
        <p className="text-xs" style={{ color: "rgba(var(--fg-rgb),0.25)" }}>Set daily targets and mark chapters complete.</p>
      </div>
    </div>
  );
}
