"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";
import { createAdminClient } from "@/lib/supabase/admin";

export interface QuestionInput {
  bank: "pyq" | "practice";
  exam: string;
  subject: string;
  topic: string;
  year: number | null;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: "A" | "B" | "C" | "D";
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export async function createQuestion(input: QuestionInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("questions").insert(input);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions");
}

export async function updateQuestion(id: string, input: QuestionInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("questions")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions");
}

export async function deleteQuestion(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("questions").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions");
}

export interface BulkRowResult {
  row: number;
  ok: boolean;
  error?: string;
}

export async function createQuestionsBulk(inputs: QuestionInput[]): Promise<BulkRowResult[]> {
  await requireAdmin();
  const supabase = createAdminClient();

  const results: BulkRowResult[] = [];
  for (let i = 0; i < inputs.length; i++) {
    const { error } = await supabase.from("questions").insert(inputs[i]);
    results.push({ row: i, ok: !error, error: error?.message });
  }

  revalidatePath("/admin/questions");
  return results;
}
