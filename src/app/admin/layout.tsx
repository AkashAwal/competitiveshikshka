import { requireAdmin } from "@/lib/admin/dal";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--surface-sidebar)" }}>
      <AdminSidebar email={admin.email} />
      <div
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "var(--surface-content)", borderTopLeftRadius: "18px", color: "rgba(var(--fg-rgb),0.87)" }}
      >
        {children}
      </div>
    </div>
  );
}
