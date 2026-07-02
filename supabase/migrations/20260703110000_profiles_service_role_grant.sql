-- profiles predates this session's migrations but has the same grant gap as
-- the tables in 20260703100000 — confirmed via an identical "permission
-- denied for table profiles" error with the exact same GRANT hint from
-- Postgres. Read-only: no admin feature currently needs to write profiles
-- directly (student edits go through the regular authenticated client).
grant select on public.profiles to service_role;
