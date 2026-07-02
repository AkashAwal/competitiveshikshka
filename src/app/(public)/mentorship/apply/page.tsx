import { createClient } from "@/lib/supabase/server";
import { ApplyForm } from "./ApplyForm";

export default async function MentorshipApplyPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16 lg:py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight text-foreground">
            Apply for <span className="text-[#2563eb]">Mentorship</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Takes two minutes. We will match you with a mentor and reach out shortly after.
          </p>
        </div>

        <ApplyForm
          userId={user?.id ?? null}
          initialName={user?.user_metadata.full_name ?? ""}
          initialEmail={user?.email ?? ""}
        />
      </div>
    </section>
  );
}
