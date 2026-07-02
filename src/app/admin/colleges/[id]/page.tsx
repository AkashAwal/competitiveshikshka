import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { CollegeEditForm } from "./CollegeEditForm";
import { CoursesManager } from "./CoursesManager";

export default async function AdminCollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [{ data: college }, { data: courses }] = await Promise.all([
    supabase.from("colleges").select("*").eq("id", id).single(),
    supabase.from("college_courses").select("*").eq("college_id", id).order("name"),
  ]);

  if (!college) notFound();

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <Link href="/admin/colleges" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
        <ArrowLeft className="h-4 w-4" /> Back to colleges
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>{college.name}</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{college.type} · {college.city}, {college.state}</p>
        </div>
        {college.slug && (
          <Link
            href={`/colleges/${college.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg"
            style={{ color: "#60a5fa", backgroundColor: "rgba(96,165,250,0.1)" }}
          >
            View public page <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <CollegeEditForm college={college} />
        <CoursesManager collegeId={id} rows={courses ?? []} />
      </div>
    </div>
  );
}
