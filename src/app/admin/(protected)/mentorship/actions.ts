"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/dal";
import { createAdminClient } from "@/lib/supabase/admin";

export type ApplicationStatus = "new" | "contacted" | "enrolled" | "rejected";

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  await requireAdmin();
  const supabase = createAdminClient();
  const { error } = await supabase.from("mentorship_applications").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/mentorship");
}
