
-- Indian Institute of Technology Gandhinagar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Gandhinagar', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Gandhinagar', 'Gujarat', 'https://iitgn.ac.in', 'Palaj, Near Village Palaj, Gandhinagar - 382055, Gujarat, India',
  'admission@iitgn.ac.in', '079-23972583', 'IIT Gandhinagar is one of eight new Indian Institutes of Technology established by an Act of Parliament in 2008. Its permanent 400-acre campus sits on the banks of the Sabarmati River in Palaj, and is noted as one of India''s first 5-star GRIHA-rated campuses for environmental sustainability. Known for a flexible, interdisciplinary undergraduate curriculum with liberal arts and minors alongside core engineering, IITGN has built a reputation for research output and holistic education relative to its size.', array['12 hostel blocks for UG and PG students','Central Library','Sports complex (football, hockey, cricket, volleyball, basketball courts)','Swimming pool and two natural lakes on campus','Gymnasium and rooftop open-air theatres','Career Development Services (CDS) placement cell','Central dining/mess facilities','Wi-Fi enabled academic and residential campus'], 'Undergraduate (B.Tech) admission is exclusively through JEE Advanced followed by centralized counseling via JoSAA, which allocates seats based on JEE Advanced rank, category, and branch/institute preferences. No separate IITGN-specific entrance test exists for B.Tech.',
  'JEE Main, JEE Advanced', 25, 2.4, null, null,
  null, 'Amazon, Google, Microsoft, DE Shaw, Infosys, Oracle, Deloitte, Goldman Sachs, Samsung, Adobe', 2025, 'iit-gandhinagar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-gandhinagar') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Materials Engineering','B.Tech Artificial Intelligence','B.Tech Integrated Circuit Design and Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 60, 9.6, 'AIR ~905-1872 (General, 2025)', 'Female-only: ~3718-4556; PwD: 58', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 50, 9.6, 'AIR ~2282-3826 (General, 2025)', 'Female-only: ~7968-9096; PwD: 69', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 50, 9.6, 'AIR ~4409-6359 (General, 2025)', 'Female-only: ~12719-13774; PwD: 70', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 50, 9.6, 'AIR ~6377-7744 (General, 2025)', 'Female-only: ~13566-14377', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', 40, 9.6, 'AIR ~8115-9864 (General, 2025)', 'Female-only: ~15658-17377', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Materials Engineering', '4 years', '10+2 with PCM, JEE Advanced', 40, 9.6, 'AIR ~7239-10372 (General, 2025)', 'Female-only: ~16100-17772', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Artificial Intelligence', '4 years', '10+2 with PCM, JEE Advanced', 40, 9.6, 'AIR ~1771-2159 (General, 2025)', 'Female-only: ~4811-5140', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'B.Tech Integrated Circuit Design and Technology', '4 years', '10+2 with PCM, JEE Advanced', 30, 9.6, 'AIR ~2295-4331 (General, 2025)', 'Female-only: ~6639-6999', null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 2023, 18)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 2024, 18)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 2025, 25)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-gandhinagar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'How can I get admission into IIT Gandhinagar''s B.Tech program?', 'Admission is only through JEE Advanced followed by JoSAA centralized counseling; there is no separate IITGN entrance exam for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'What B.Tech branches does IIT Gandhinagar offer?', 'Eight branches: Computer Science & Engineering, Electrical Engineering, Mechanical Engineering, Chemical Engineering, Civil Engineering, Materials Engineering, Artificial Intelligence, and Integrated Circuit Design & Technology.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'What is IIT Gandhinagar''s NIRF ranking?', 'IIT Gandhinagar was ranked 25th in the Engineering category in NIRF 2025, down from 18th in NIRF 2024 and 2023.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-gandhinagar'), 'Is financial aid available for B.Tech students?', 'Students from families with annual income below ₹5 lakh are typically eligible for tuition fee waivers, with additional scholarships/need-based aid available; exact current thresholds should be confirmed on the official admissions page as policy can be revised each year.', 3);

