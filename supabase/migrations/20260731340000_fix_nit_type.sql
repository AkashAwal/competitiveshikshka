-- The seed generator script (reused from the IIT batch) hardcoded
-- type = 'IIT' for every row, so all 31 newly seeded NITs got the wrong
-- institution type. Correct them.
update public.colleges
set type = 'NIT'
where slug like 'nit-%' or slug in ('mnit-jaipur', 'mnnit-allahabad', 'vnit-nagpur', 'manit-bhopal');
