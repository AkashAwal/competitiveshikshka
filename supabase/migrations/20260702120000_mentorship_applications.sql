-- Mentorship application submissions from the public "Apply for Mentorship" form.
create table if not exists public.mentorship_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  contact_no text not null,
  email text not null,
  city text not null,
  class text not null check (class in ('11th', '12th', 'Dropper')),
  plan text not null check (plan in ('mentorship', 'premium')),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.mentorship_applications enable row level security;

-- Anyone (logged in or anonymous) can submit an application, but only
-- CompetitiveShiksha staff (via the dashboard/service role) can read them.
create policy "Anyone can submit a mentorship application"
  on public.mentorship_applications
  for insert
  to anon, authenticated
  with check (true);
