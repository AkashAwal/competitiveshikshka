import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const providers = (user.identities ?? []).map(i => i.provider);
  const hasPassword = providers.includes("email");

  const { data: profile } = await supabase.from("profiles").select("stream").eq("id", user.id).single();

  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Settings</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Manage your preferences and account.</p>
      <SettingsClient
        email={user.email ?? ""}
        providers={providers}
        hasPassword={hasPassword}
        stream={profile?.stream ?? ""}
      />
    </div>
  );
}
