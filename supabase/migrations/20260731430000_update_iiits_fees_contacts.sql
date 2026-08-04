-- Patch fees/contact/placement gaps identified after the group2-5 IIIT seed,
-- from user-supplied data. Two categories of conflicting figures were
-- deliberately left untouched here (kept at their agent-researched values):
--   - nirf_rank for iiit-hyderabad/iiit-delhi/iiit-bangalore (7/85/74 proposed
--     vs 38/63/69 already stored) — user chose to keep the existing numbers.
--   - avg_package_lpa for iiit-naya-raipur (12.6 proposed vs 18.9 stored),
--     placement_percentage for iiit-naya-raipur (100 proposed vs 90 stored),
--     highest_package_lpa for iiit-manipur (24 proposed vs 40 stored), and
--     admission_email for iiit-sri-city (contact@iiits.in proposed vs
--     admissions@iiits.in stored) — same reasoning, not requested explicitly
--     but consistent with "keep what was already sourced when it conflicts".
-- Only genuinely empty (null) fields are filled in below.

update public.colleges set avg_fees_lpa = 8.5, updated_at = now() where slug = 'iiitdm-kurnool';
update public.colleges set avg_fees_lpa = 12.0, phone = '0361-2630015', updated_at = now() where slug = 'iiit-guwahati';
update public.colleges set avg_fees_lpa = 13.2, updated_at = now() where slug = 'iiit-pune';
update public.colleges set avg_fees_lpa = 10.8, updated_at = now() where slug = 'iiit-lucknow';
update public.colleges set avg_fees_lpa = 12.8, updated_at = now() where slug = 'iiit-nagpur';
update public.colleges set avg_fees_lpa = 8.8, updated_at = now() where slug = 'iiit-vadodara';
update public.colleges set admission_email = 'admissions@iiitbhopal.ac.in', updated_at = now() where slug = 'iiit-bhopal';

update public.colleges set avg_fees_lpa = 9.6, phone = '033-2978 0204', updated_at = now() where slug = 'iiit-kalyani';
update public.colleges set avg_fees_lpa = 8.4, phone = '0651-2956021', updated_at = now() where slug = 'iiit-ranchi';
update public.colleges set avg_fees_lpa = 7.2, updated_at = now() where slug = 'iiit-kota';
update public.colleges set avg_fees_lpa = 9.7, updated_at = now() where slug = 'iiit-sri-city';
update public.colleges set avg_fees_lpa = 9.6, placement_percentage = 88, updated_at = now() where slug = 'iiit-trichy';
update public.colleges set avg_fees_lpa = 7.2, updated_at = now() where slug = 'iiit-una';
update public.colleges set avg_fees_lpa = 7.2, placement_percentage = 85, updated_at = now() where slug = 'iiit-sonepat';

update public.colleges set avg_fees_lpa = 7.3, avg_package_lpa = 8.5, placement_percentage = 82, updated_at = now() where slug = 'iiit-manipur';
update public.colleges set avg_fees_lpa = 8.6, top_recruiters = 'TCS, Accenture, Infosys, Capgemini', updated_at = now() where slug = 'iiit-dharwad';
update public.colleges set avg_fees_lpa = 8.2, placement_percentage = 80, top_recruiters = 'TCS, Infosys, Capgemini, Cognizant', updated_at = now() where slug = 'iiit-agartala';
update public.colleges set avg_fees_lpa = 10.4, highest_package_lpa = 57, top_recruiters = 'Google, Amazon, Microsoft, Adobe, NVIDIA, Deloitte', updated_at = now() where slug = 'iiit-naya-raipur';
update public.colleges set avg_fees_lpa = 8.6, top_recruiters = 'TCS, Infosys, Capgemini', updated_at = now() where slug = 'iiit-raichur';
update public.colleges set avg_fees_lpa = 11.2, updated_at = now() where slug = 'iiit-hyderabad';
update public.colleges set avg_fees_lpa = 19.6, top_recruiters = 'Google, Microsoft, Amazon, Adobe, Atlassian, Goldman Sachs', updated_at = now() where slug = 'iiit-delhi';
update public.colleges set avg_fees_lpa = 22.1, updated_at = now() where slug = 'iiit-bangalore';
