import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("class, stream, state, strong_subject, weak_subject, coaching, school, avatar_style, target_exam, target_year, daily_goal_hours, streak")
    .eq("id", user.id)
    .single();

  return (
    <div className="px-6 py-8 max-w-5xl">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(255,255,255,0.95)" }}>Profile</h1>
      <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
        Manage your account and study preferences.
      </p>

      <ProfileForm
        userId={user.id}
        email={user.email ?? ""}
        initialName={user.user_metadata.full_name ?? "Student"}
        initialAvatarStyle={profile?.avatar_style ?? ""}
        googleAvatarUrl={user.user_metadata.avatar_url ?? ""}
        streak={profile?.streak ?? 0}
        initial={{
          class: profile?.class ?? "",
          stream: profile?.stream ?? "",
          state: profile?.state ?? "",
          strong_subject: profile?.strong_subject ?? "",
          weak_subject: profile?.weak_subject ?? "",
          coaching: profile?.coaching ?? "",
          school: profile?.school ?? "",
          target_exam: profile?.target_exam ?? "",
          target_year: profile?.target_year ? String(profile.target_year) : "",
          daily_goal_hours: profile?.daily_goal_hours
            ? (profile.daily_goal_hours >= 6 ? "6+ hrs" : profile.daily_goal_hours === 1 ? "1 hr" : `${profile.daily_goal_hours} hrs`)
            : "",
        }}
      />
    </div>
  );
}
