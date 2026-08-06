import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import { PostEditForm } from "./PostEditForm";

export default async function AdminPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single();

  if (!post) notFound();

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6" style={{ color: "rgba(var(--fg-rgb),0.5)" }}>
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "rgba(var(--fg-rgb),0.95)" }}>{post.title}</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(var(--fg-rgb),0.4)" }}>{post.category || "Uncategorized"}</p>
        </div>
        {post.slug && post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full"
            style={{ color: "#60a5fa", backgroundColor: "rgba(96,165,250,0.1)" }}
          >
            View public page <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <PostEditForm post={post} />
    </div>
  );
}
