import { createClient } from "@/lib/supabase/server";
import NotificationsClient from "./NotificationsClient";

export default async function ExamsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userExams: string[] = [];
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("target_exam")
      .eq("id", user.id)
      .single();

    if (profile?.target_exam) {
      userExams = (profile.target_exam as string)
        .split(",")
        .map((e: string) => e.trim())
        .filter(Boolean);
    }
  }

  return <NotificationsClient userExams={userExams} />;
}
