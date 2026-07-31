"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export interface CollegeCoreInput {
  name: string;
  type: string;
  field: string;
  ownership: string;
  tier: string;
  city: string;
  state: string;
  website: string;
}

export interface CollegeDetailsInput {
  address: string;
  overview: string;
  admission_email: string;
  phone: string;
  how_to_reach: string;
  campus_facilities: string[];
  admission_process: string;
  nirf_rank: number | null;
  avg_fees_lpa: number | null;
  website: string;
  accepts_exams: string;
  avg_package_lpa: number | null;
  highest_package_lpa: number | null;
  placement_percentage: number | null;
  top_recruiters: string;
  placement_year: number | null;
}

export interface CourseInput {
  name: string;
  duration: string;
  eligibility: string;
  seats: number | null;
  fees_total_lpa: number | null;
  fees_details: string;
  cutoff_general: string;
  cutoff_details: string;
}

export interface FaqInput {
  question: string;
  answer: string;
  sort_order: number;
}

export interface RankingInput {
  year: number;
  rank: number;
}

async function uniqueSlug(supabase: ReturnType<typeof createAdminClient>, name: string) {
  const base = slugify(name) || "college";
  let candidate = base;
  let attempt = 0;
  while (true) {
    const { data } = await supabase.from("colleges").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    attempt++;
    candidate = `${base}-${attempt + 1}`;
  }
}

export async function createCollege(input: CollegeCoreInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const slug = await uniqueSlug(supabase, input.name);
  const { data, error } = await supabase.from("colleges").insert({ ...input, slug }).select("id").single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/colleges");
  return data.id as string;
}

export async function updateCollegeDetails(id: string, input: CollegeDetailsInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("colleges")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${id}`);
  revalidatePath("/admin/colleges");
}

export async function deleteCollege(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("colleges").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/colleges");
}

export async function createCourse(collegeId: string, input: CourseInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_courses").insert({ ...input, college_id: collegeId });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function updateCourse(id: string, collegeId: string, input: CourseInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("college_courses")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function deleteCourse(id: string, collegeId: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function createFaq(collegeId: string, input: FaqInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_faqs").insert({ ...input, college_id: collegeId });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function updateFaq(id: string, collegeId: string, input: FaqInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("college_faqs")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function deleteFaq(id: string, collegeId: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function createRanking(collegeId: string, input: RankingInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_rankings").insert({ ...input, college_id: collegeId });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function updateRanking(id: string, collegeId: string, input: RankingInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_rankings").update(input).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}

export async function deleteRanking(id: string, collegeId: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("college_rankings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/colleges/${collegeId}`);
}
