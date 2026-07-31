-- Restore the KGP admission contact email supplied earlier — undoing
-- the previous migration's revert to null.
update public.colleges set admission_email = 'infocell@webteam.iitkgp.ernet.in' where slug = 'iit-kharagpur';
