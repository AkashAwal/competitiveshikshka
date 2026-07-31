-- FAQs and year-over-year NIRF rank history, both per-college and both
-- optional (public page hides the section entirely when empty).

create table if not exists public.college_faqs (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists college_faqs_college_id_idx
  on public.college_faqs (college_id);

alter table public.college_faqs enable row level security;

create policy "Anyone can view college faqs"
  on public.college_faqs
  for select
  using (true);

create policy "Admins can insert college faqs"
  on public.college_faqs
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update college faqs"
  on public.college_faqs
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete college faqs"
  on public.college_faqs
  for delete
  to authenticated
  using (public.is_admin());

create table if not exists public.college_rankings (
  id uuid primary key default gen_random_uuid(),
  college_id uuid not null references public.colleges(id) on delete cascade,
  year int not null,
  rank int not null,
  created_at timestamptz not null default now(),
  unique (college_id, year)
);

create index if not exists college_rankings_college_id_idx
  on public.college_rankings (college_id);

alter table public.college_rankings enable row level security;

create policy "Anyone can view college rankings"
  on public.college_rankings
  for select
  using (true);

create policy "Admins can insert college rankings"
  on public.college_rankings
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update college rankings"
  on public.college_rankings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete college rankings"
  on public.college_rankings
  for delete
  to authenticated
  using (public.is_admin());

-- RLS alone isn't enough — see 20260703090000_table_grants.sql / 100000_service_role_grants.sql.
grant select on public.college_faqs to anon, authenticated;
grant insert, update, delete on public.college_faqs to authenticated;
grant select on public.college_rankings to anon, authenticated;
grant insert, update, delete on public.college_rankings to authenticated;
grant all privileges on table public.college_faqs, public.college_rankings to service_role;
