-- Add field-of-study to colleges, used for public filtering (institution type stays separate).
alter table public.colleges
  add column if not exists field text
  check (field in ('Engineering', 'Medical', 'Management', 'Architecture', 'Pharmacy', 'Law', 'Design', 'Other'));

update public.colleges
set field = case
  when type = 'Medical' then 'Medical'
  else 'Engineering'
end
where field is null;

alter table public.colleges alter column field set not null;
alter table public.colleges alter column field set default 'Engineering';
