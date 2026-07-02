import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS entirely — only import this
 * from server-only code under src/app/admin/** (pages, layouts, Server
 * Actions). Never import from a "use client" module or expose to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

/** All auth.users, paginated fully — listUsers() defaults to 50/page. */
export async function listAllAuthUsers() {
  const supabase = createAdminClient();
  const perPage = 1000;
  let page = 1;
  const all = [];

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    all.push(...data.users);
    if (data.users.length < perPage) break;
    page++;
  }

  return all;
}
