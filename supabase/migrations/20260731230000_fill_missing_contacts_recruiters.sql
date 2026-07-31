-- Fill in previously-unverified admission contact emails and recruiter
-- lists for 4 colleges, per user-supplied official data.

update public.colleges set admission_email = 'swoffice@iitjammu.ac.in' where slug = 'iit-jammu';
update public.colleges set admission_email = 'acadoffice@iitmandi.ac.in' where slug = 'iit-mandi';
update public.colleges set admission_email = 'registrar@iitp.ac.in' where slug = 'iit-patna';
update public.colleges set admission_email = 'infocell@webteam.iitkgp.ernet.in' where slug = 'iit-kharagpur';

update public.colleges
set top_recruiters = 'Amazon, Microsoft, Google, Goldman Sachs, Nvidia, Qualcomm, Samsung, Adobe'
where slug = 'iit-jammu';

update public.colleges
set top_recruiters = 'Amazon, Microsoft, Google, Oracle, TCS, Texas Instruments, Infosys, Deloitte'
where slug = 'iit-dharwad';
