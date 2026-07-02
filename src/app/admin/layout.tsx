import { requireAdmin } from "@/lib/admin/dal";
import { AdminSidebar } from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#15191e" }}>
      <AdminSidebar email={admin.email} />
      <div
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: "#1b2027", borderTopLeftRadius: "18px", color: "rgba(255,255,255,0.87)" }}
      >
        {children}
      </div>
    </div>
  );
}
