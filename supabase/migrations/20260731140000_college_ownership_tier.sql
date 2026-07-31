-- Ownership and tier as their own badges, distinct from `type` (which mixes
-- institution category like IIT/NIT with things like Medical/Other).
alter table public.colleges
  add column if not exists ownership text
    check (ownership in ('Government', 'Private', 'Deemed')),
  add column if not exists tier text
    check (tier in ('Tier 1', 'Tier 2', 'Tier 3'));

update public.colleges
set ownership = case
  when type in ('IIT', 'NIT', 'IIIT', 'GFTI', 'State', 'Medical') then 'Government'
  when type = 'Private' then 'Private'
  else ownership
end
where ownership is null;

update public.colleges
set tier = case
  when nirf_rank is not null and nirf_rank <= 25 then 'Tier 1'
  when nirf_rank is not null and nirf_rank <= 100 then 'Tier 2'
  when nirf_rank is not null then 'Tier 3'
  else tier
end
where tier is null;
