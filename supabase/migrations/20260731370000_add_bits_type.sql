-- Add BITS as its own institution type (was lumped into 'Private'), so it
-- can be its own filter category alongside IIT/NIT.
alter table public.colleges drop constraint if exists colleges_type_check;
alter table public.colleges
  add constraint colleges_type_check
  check (type in ('IIT', 'NIT', 'IIIT', 'GFTI', 'State', 'Private', 'Medical', 'BITS', 'Other'));

update public.colleges set type = 'BITS' where slug in ('bits-pilani', 'bits-goa', 'bits-hyderabad', 'bits-dubai');
