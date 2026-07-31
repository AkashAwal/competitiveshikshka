
-- Indian Institute of Technology Goa
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Goa', 'IIT', 'Engineering', 'Government', null, 'Ponda', 'Goa', 'https://iitgoa.ac.in', 'Indian Institute of Technology Goa, At Goa College of Engineering Campus, Farmagudi, Ponda - 403401, Goa, India',
  'academic@iitgoa.ac.in', '0832-2490894', 'IIT Goa was established in 2016 as a second-generation IIT, mentored by IIT Bombay during its formative years (2016-2020). It currently operates from a temporary campus shared with Goa College of Engineering at Farmagudi, Ponda, while its permanent ~320-acre campus at Rivona, South Goa is under construction. The institute offers B.Tech, M.Tech, and PhD programs across Computer Science, Electrical, Mechanical, and Mathematics & Computing.', array['Academic blocks and laboratories (temporary campus, shared with Goa College of Engineering)','Hostels (temporary campus)','Library','Career Development Cell','Permanent 320-acre campus at Rivona, South Goa under development'], 'UG admission to B.Tech programs is based solely on JEE Advanced rank, through the centralized JoSAA counseling process common to all IITs. There is no separate application to IIT Goa for B.Tech.',
  'JEE Main, JEE Advanced', null, 8.53, 17.83, 60,
  92.24, 'Google, Nvidia, Samsung, Texas Instruments, Siemens, MathWorks', 2025, 'iit-goa'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-goa') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-goa'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 40, 8.53, 'AIR ~5626-6242 (General, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-goa'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 40, 8.53, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-goa'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 45, 8.53, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-goa'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 25, 8.53, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-goa');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-goa'), 'Is the IIT Goa campus permanent yet?', 'No. IIT Goa currently operates from a temporary shared campus at Goa College of Engineering, Farmagudi. Its permanent 320-acre campus at Rivona, South Goa, is still under construction.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-goa'), 'Which exams does IIT Goa accept for B.Tech admission?', 'Admission is exclusively through JEE Advanced rank via JoSAA counseling; there is no separate application process.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-goa'), 'Has IIT Goa ever been ranked in the top 100 by NIRF?', 'No. In NIRF 2025 it was placed in the 101-150 band for Engineering, the highest publicly confirmed tier to date.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-goa'), 'What B.Tech branches does IIT Goa offer?', 'Four branches: Computer Science and Engineering, Electrical Engineering, Mechanical Engineering, and Mathematics and Computing.', 3);

-- Indian Institute of Technology Jammu
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Jammu', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Jammu', 'Jammu and Kashmir', 'https://www.iitjammu.ac.in', 'Indian Institute of Technology Jammu, Jagti, NH-44, PO Nagrota, Jammu - 181221, Jammu & Kashmir, India',
  null, '0191-2570631', 'IIT Jammu was established in 2016 as one of the new-generation IITs, mentored by IIT Delhi during its founding phase. It has moved from a temporary campus at Paloura to its permanent ~400-acre campus at Jagti on NH-44. It offers B.Tech, M.Tech, and PhD programs and has shown a consistent climb in NIRF Engineering rankings in recent years.', array['Permanent campus at Jagti (~400 acres)','Hostels','Library','Medical Center','Career Development Services (CDS)'], 'B.Tech admission is based on JEE Advanced rank, allotted through JoSAA''s centralized counseling process across all IITs; candidates must first qualify JEE Main to sit for JEE Advanced.',
  'JEE Main, JEE Advanced', 56, 8.3, 12.93, 53,
  86, null, 2024, 'iit-jammu'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-jammu') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 40, 8.3, 'AIR ~6600 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.3, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.3, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.3, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8.3, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-jammu'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 40, 8.3, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jammu'), 2023, 67)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jammu'), 2024, 62)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-jammu'), 2025, 56)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-jammu');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jammu'), 'Does IIT Jammu operate from a permanent campus?', 'Yes. IIT Jammu moved from a temporary site at Paloura to its permanent ~400-acre campus at Jagti, on NH-44 near Nagrota.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jammu'), 'Which exams are needed for B.Tech admission?', 'JEE Main followed by JEE Advanced; the final seat is allotted via JoSAA counseling.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jammu'), 'Has IIT Jammu''s NIRF rank been improving?', 'Yes — it rose from rank 67 (2023) to 62 (2024) to 56 (2025) in NIRF''s Engineering category.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-jammu'), 'Who mentored IIT Jammu during its setup phase?', 'IIT Delhi served as the mentor institute during IIT Jammu''s founding years after its 2016 establishment.', 3);

-- Indian Institute of Technology Dharwad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Dharwad', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Dharwad', 'Karnataka', 'https://www.iitdh.ac.in', 'Indian Institute of Technology Dharwad, Chikkamalligawad, Dharwad - 580011, Karnataka, India',
  'pro@iitdh.ac.in', '+91-836-2309615', 'IIT Dharwad was established in August 2016, mentored by IIT Bombay during its initial years. It functioned from a temporary transit campus before moving into its permanent ~470-acre campus at Chikkamalligawad, inaugurated by the Prime Minister in March 2023 — making it one of the few new IITs with a fully operational independent permanent campus. It offers B.Tech, M.Tech, and PhD programs across nine engineering and science specializations.', array['Permanent campus (470 acres) operational since March 2023','Hostels','Career Development Centre (CDC)','Academic and laboratory blocks'], 'B.Tech admission is based on JEE Main followed by JEE Advanced rank, with final seat allotment through the centralized JoSAA counseling process common to all IITs.',
  'JEE Main, JEE Advanced', 77, 10.82, 14.78, null,
  84.35, null, 2024, 'iit-dharwad'
)
on conflict (slug) do update set
  type = excluded.type, field = excluded.field, ownership = excluded.ownership, tier = excluded.tier,
  city = excluded.city, state = excluded.state, website = excluded.website, address = excluded.address,
  admission_email = coalesce(excluded.admission_email, public.colleges.admission_email),
  phone = coalesce(excluded.phone, public.colleges.phone),
  overview = coalesce(excluded.overview, public.colleges.overview),
  campus_facilities = coalesce(excluded.campus_facilities, public.colleges.campus_facilities),
  admission_process = coalesce(excluded.admission_process, public.colleges.admission_process),
  accepts_exams = coalesce(excluded.accepts_exams, public.colleges.accepts_exams),
  nirf_rank = coalesce(excluded.nirf_rank, public.colleges.nirf_rank),
  avg_fees_lpa = coalesce(excluded.avg_fees_lpa, public.colleges.avg_fees_lpa),
  avg_package_lpa = coalesce(excluded.avg_package_lpa, public.colleges.avg_package_lpa),
  highest_package_lpa = coalesce(excluded.highest_package_lpa, public.colleges.highest_package_lpa),
  placement_percentage = coalesce(excluded.placement_percentage, public.colleges.placement_percentage),
  top_recruiters = coalesce(excluded.top_recruiters, public.colleges.top_recruiters),
  placement_year = coalesce(excluded.placement_year, public.colleges.placement_year),
  updated_at = now();

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-dharwad') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil and Infrastructure Engineering','B.Tech Chemical and Biochemical Engineering','B.Tech Engineering Physics','B.Tech Mathematics and Computing');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 65, 11.4, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Civil and Infrastructure Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 10.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Chemical and Biochemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 30, 10.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', null, 10.82, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'B.Tech Mathematics and Computing', '4 years', '10+2 with PCM, JEE Advanced', 30, 10.82, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-dharwad'), 2023, 93)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-dharwad'), 2025, 77)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-dharwad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'Does IIT Dharwad have its own permanent, independent campus?', 'Yes — unusually for a new IIT, its permanent 470-acre campus at Chikkamalligawad has been fully operational since it was inaugurated by the Prime Minister in March 2023.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'Which exams are accepted for B.Tech admission?', 'JEE Main followed by JEE Advanced, with seats allotted via JoSAA counseling.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'Who mentored IIT Dharwad in its early years?', 'IIT Bombay served as the mentor institute after IIT Dharwad''s establishment in August 2016.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dharwad'), 'Has IIT Dharwad''s NIRF Engineering rank improved recently?', 'Yes — it moved from rank 93 (2023) to rank 77 (2025).', 3);

