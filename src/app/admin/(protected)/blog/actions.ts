"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/slugify";

export interface PostCoreInput {
  title: string;
  category: string;
  author_name: string;
}

export interface PostDetailsInput {
  title: string;
  category: string;
  author_name: string;
  excerpt: string;
  cover_image_url: string;
  content: string;
  published: boolean;
}

async function uniqueSlug(supabase: ReturnType<typeof createAdminClient>, title: string) {
  const base = slugify(title) || "post";
  let candidate = base;
  let attempt = 0;
  while (true) {
    const { data } = await supabase.from("posts").select("id").eq("slug", candidate).maybeSingle();
    if (!data) return candidate;
    attempt++;
    candidate = `${base}-${attempt + 1}`;
  }
}

export async function createPost(input: PostCoreInput) {
  await requireAdmin();
  const supabase = createAdminClient();
  const slug = await uniqueSlug(supabase, input.title);
  const { data, error } = await supabase.from("posts").insert({ ...input, slug }).select("id").single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  return data.id as string;
}

export async function updatePostDetails(id: string, input: PostDetailsInput) {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: existing, error: fetchError } = await supabase
    .from("posts")
    .select("published, published_at")
    .eq("id", id)
    .single();
  if (fetchError) throw new Error(fetchError.message);

  const published_at =
    input.published && !existing.published_at ? new Date().toISOString() : existing.published_at;

  const { error } = await supabase
    .from("posts")
    .update({ ...input, published_at, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
