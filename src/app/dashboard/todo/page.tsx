import { DailyTasks } from "@/components/dashboard/daily-sidebar";

export default function TodoPage() {
  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>To Do</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.45)" }}>
        A quick daily checklist — saved on this device only, resets each day.
      </p>
      <DailyTasks />
    </div>
  );
}
