-- RLS policies alone don't grant access — Postgres also requires a
-- table-level GRANT for each role, which the Supabase dashboard's Table
-- Editor applies automatically but raw SQL migrations do not. Confirmed via
-- direct REST API testing: every table below returned "permission denied"
-- for the anon role even with a matching "using (true)" RLS policy.

grant select on public.colleges to anon, authenticated;
grant insert, update, delete on public.colleges to authenticated;

grant select on public.college_courses to anon, authenticated;
grant insert, update, delete on public.college_courses to authenticated;

grant select on public.exams to anon, authenticated;
grant insert, update, delete on public.exams to authenticated;

-- Questions stay gated behind login (matches the PYQ page's ContentGate UX).
grant select on public.questions to authenticated;
grant insert, update, delete on public.questions to authenticated;

grant insert on public.mentorship_applications to anon, authenticated;
grant select, update on public.mentorship_applications to authenticated;

grant select, update on public.profiles to authenticated;
