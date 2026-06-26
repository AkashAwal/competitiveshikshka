import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="px-6 py-8 max-w-2xl">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Profile</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Your account details.</p>

      <div
        className="rounded-xl p-6 flex items-center gap-5"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {user.user_metadata.avatar_url ? (
          <Image
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata.full_name ?? "Profile"}
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-black text-white"
            style={{ backgroundColor: "#2563eb" }}
          >
            {user.email?.[0].toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-lg font-black" style={{ color: "rgba(255,255,255,0.95)" }}>
            {user.user_metadata.full_name ?? "Student"}
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{user.email}</p>
        </div>
      </div>

      <div
        className="rounded-xl p-6 mt-4"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
          Profile settings
        </p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Extended profile options — target exam, class, subjects — coming soon.
        </p>
      </div>
    </div>
  );
}
