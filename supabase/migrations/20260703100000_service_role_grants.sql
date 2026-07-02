-- service_role is meant to bypass RLS entirely, but BYPASSRLS only skips
-- row-level policy checks — it does not substitute for the base table-level
-- GRANT, which never got applied automatically since these tables were
-- created via CLI migration rather than the Supabase dashboard's Table
-- Editor. Confirmed via direct testing: the admin service-role client got
-- "permission denied for table colleges" even with a valid service_role key.
--
-- Scoped to only the tables this app added — not a schema-wide grant.

grant all privileges on table
  public.mentorship_applications,
  public.colleges,
  public.college_courses,
  public.questions,
  public.exams
to service_role;
