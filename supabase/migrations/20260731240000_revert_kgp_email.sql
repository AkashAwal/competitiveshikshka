-- The webteam.iitkgp.ernet.in address is a legacy/uncertain contact;
-- revert IIT Kharagpur's admission_email to null as it was before,
-- rather than publish a possibly-stale address.
update public.colleges set admission_email = null where slug = 'iit-kharagpur';
