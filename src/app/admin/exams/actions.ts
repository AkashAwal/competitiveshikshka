"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export interface ExamCoreInput {
  name: string;
  category: string;
  conducting_body: string;
}

export interface ExamDetailsInput {
  full_name: string;
  category: string;
  conducting_body: string;
  about: string;
  marking_scheme: string;
  application_window: string;
  exam_dates: string;
  official_link: string;
  eligible_institutes: string;
  recent_cutoffs: string;
  syllabus: string;
  tips_and_tricks: string;
}

async function uniqueSlug(supabase: ReturnType<typeof createAdminClient>, name: string) {
  const base = slugify(name) || "exam";
  let candidate = base;
  let attempt = 0;
  while (true) {
    const { data } = await supabase.from("exams").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    attempt++;
    candidate = `${base}-${attempt + 1}`;
  }
}

export async function createExam(input: ExamCoreInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const slug = await uniqueSlug(supabase, input.name);
  const { data, error } = await supabase.from("exams").insert({ ...input, slug }).select("id").single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/exams");
  return data.id as string;
}

export async function updateExamDetails(id: string, input: ExamDetailsInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("exams")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/exams/${id}`);
  revalidatePath("/admin/exams");
  revalidatePath("/exams");
}

export async function deleteExam(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("exams").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/exams");
  revalidatePath("/exams");
}
