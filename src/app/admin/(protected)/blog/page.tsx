import { createAdminClient } from "@/lib/supabase/admin";
import { BlogManager } from "./BlogManager";

export default async function AdminBlogPage() {
  const supabase = createAdminClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, category, author_name, published")
    .order("created_at", { ascending: false });

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black mb-1" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>Blog</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{posts?.length ?? 0} posts in the database.</p>

      <BlogManager rows={posts ?? []} />
    </div>
  );
}
