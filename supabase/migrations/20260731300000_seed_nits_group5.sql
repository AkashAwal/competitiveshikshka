
-- National Institute of Technology Puducherry
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Puducherry', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Karaikal', 'Puducherry', 'https://www.nitpy.ac.in', 'National Institute of Technology Puducherry, Thiruvettakudy, Karaikal, Puducherry - 609609, India',
  'registrar@nitpy.ac.in', '04368-265235', 'NIT Puducherry (NITPY) is an Institute of National Importance established in 2010, operating from its campus at Thiruvettakudy near Karaikal in the Union Territory of Puducherry. It is one of the newer NITs formed in the second wave of NIT expansion. Fifty percent of its seats are reserved for candidates domiciled in the Union Territory of Puducherry, with the remainder filled via all-India JoSAA counselling.', array['Central Library','Hostels (boys and girls)','Computer Centre','Sports facilities','Health/Medical Centre','Central Workshop','Wi-Fi campus','Canteen/Mess'], 'UG admission is entirely through JEE Main scores, with seats allocated via JoSAA centralized counselling. Fifty percent of seats are reserved for Puducherry-domicile candidates (Home State quota) and the rest for Other State (all-India) candidates.',
  'JEE Main', 99, 5.94, 7.9, 24,
  65.98, 'ABB, L&T, Bosch, Ford, TCS, Infosys, Wipro', 2025, 'nit-puducherry'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-puducherry') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.94, 'AIR ~18515 (2024, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.94, 'AIR ~24073 (2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.94, 'AIR ~29032 (2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.94, 'AIR ~42247 (2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.94, 'AIR ~47854 (2024)', null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-puducherry'), 2024, 97)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-puducherry'), 2025, 99)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-puducherry');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'How can I get admission into NIT Puducherry for B.Tech?', 'Admission is through JEE Main scores and JoSAA counselling; 50% of seats are reserved for Puducherry UT domicile candidates and 50% for all-India candidates.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'Where is NIT Puducherry located?', 'The campus is at Thiruvettakudy, near Karaikal, in the Union Territory of Puducherry.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'When was NIT Puducherry established?', 'It was established in 2010 as one of the new-generation NITs.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-puducherry'), 'What was NIT Puducherry''s most recent NIRF Engineering rank?', 'Rank 99 in NIRF 2025, slightly down from 97 in 2024.', 3);

-- National Institute of Technology Raipur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Raipur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Raipur', 'Chhattisgarh', 'https://www.nitrr.ac.in', 'National Institute of Technology Raipur, G.E. Road, Raipur, Chhattisgarh - 492010, India',
  'ugadmission@nitrr.ac.in', '0771-2254200', 'NIT Raipur traces its origin to 1956 as the Government College of Mining and Metallurgy, later becoming a Regional Engineering College and was granted NIT/Institute of National Importance status in 2005. Located on a roughly 100-acre campus on G.E. Road in Raipur, Chhattisgarh, it has grown from two founding departments into a comprehensive multi-disciplinary technical institute.', array['Central Library','Boys'' and girls'' hostels','Central Workshop','Health Centre','Computer Centre','Sports complex','Wi-Fi campus','Guest House'], 'B.Tech/B.Arch admission to NIT Raipur is through JEE Main scores followed by JoSAA centralized counselling for seat allocation.',
  'JEE Main', 86, null, 11.1, 60,
  85, 'Oracle, Shree Cement, TCS, Infosys, Wipro, Cognizant', 2025, 'nit-raipur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-raipur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Electronics and Communication Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-raipur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~13559 (2024, other-state)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-raipur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', 115, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-raipur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', 115, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-raipur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-raipur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-raipur'), 2023, 70)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-raipur'), 2024, 71)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-raipur'), 2025, 86)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-raipur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-raipur'), 'What entrance exam is required for NIT Raipur B.Tech admission?', 'JEE Main, with seat allocation through JoSAA counselling.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-raipur'), 'What is the admission email for NIT Raipur UG queries?', 'ugadmission@nitrr.ac.in', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-raipur'), 'Where is NIT Raipur located?', 'On G.E. Road, Raipur, Chhattisgarh - 492010.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-raipur'), 'When did NIT Raipur become an Institute of National Importance?', 'In 2005, having originated in 1956 as the Government College of Mining and Metallurgy.', 3);

-- National Institute of Technology Rourkela
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Rourkela', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Rourkela', 'Odisha', 'https://www.nitrkl.ac.in', 'National Institute of Technology Rourkela, Rourkela, Odisha - 769008, India',
  'registrar@nitrkl.ac.in', '0661-2462020', 'NIT Rourkela began as Regional Engineering College Rourkela and was elevated to NIT (Institute of National Importance) status by the Government of India. It is one of the most prominent and highly ranked NITs, consistently placed in the top 15-20 nationally in NIRF''s Engineering category, with 20 academic departments and over 6,000 students.', array['Biju Patnaik Central Library','11 hostels (8 boys, 2 girls, 2 married-scholars)','Football-hockey stadium','Cricket ground','50m floodlit swimming pool','High Performance Computing Center','Health Centre with pharmacy','Central Workshop'], 'B.Tech admission to NIT Rourkela is via JEE Main scores followed by JoSAA centralized counselling across multiple rounds.',
  'JEE Main', 13, null, 13.29, 62.44,
  82.2, 'Microsoft, Amazon, TCS, Oracle, Samsung, Deloitte, Bosch, L&T', 2025, 'nit-rourkela'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-rourkela') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mechanical Engineering','B.Tech Electrical Engineering','B.Tech Civil Engineering','B.Tech Artificial Intelligence','B.Tech Biotechnology and Medical Engineering','B.Tech Ceramic Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~3431 (2025, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~5785 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Artificial Intelligence', '4 years', '10+2 with PCM, JEE Main', null, null, 'AIR ~4400-7400 (2025 range)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Biotechnology and Medical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'B.Tech Ceramic Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-rourkela'), 2023, 16)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-rourkela'), 2024, 19)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-rourkela'), 2025, 13)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-rourkela');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'What is NIT Rourkela''s current NIRF Engineering rank?', '13th in NIRF 2025 Engineering rankings, up from 19th in 2024.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'How do I apply for B.Tech at NIT Rourkela?', 'Through JEE Main and JoSAA counselling.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'What is NIT Rourkela''s placement rate for 2025?', '82.2% of the 2024-25 batch was placed, with 1,274 job offers from 373 recruiting companies.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-rourkela'), 'Where is NIT Rourkela located?', 'Rourkela, Odisha - 769008.', 3);

-- National Institute of Technology Sikkim
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Sikkim', 'IIT', 'Engineering', 'Government', null, 'Ravangla', 'Sikkim', 'https://nitsikkim.ac.in', 'National Institute of Technology Sikkim, Barfung Block, Ravangla Sub-Division, District Namchi, Sikkim - 737139, India',
  'info@nitsikkim.ac.in', '+91-7479013180', 'NIT Sikkim was established in August 2010 as one of the newer National Institutes of Technology and has been declared an Institute of National Importance by the Government of India. It currently operates from a temporary campus at Ravangla, while its permanent campus at Khamdong is under construction (expected completion around March 2027).', array['Central Library','Medical Unit','Hostels','Sports facilities','Transport services','Computer Centre','Wi-Fi campus'], 'B.Tech admission to NIT Sikkim is through JEE Main scores with seat allocation via JoSAA centralized counselling.',
  'JEE Main', null, null, 8.5, 44,
  86, 'Nvidia, Deloitte, IBM, Infosys', 2025, 'nit-sikkim'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-sikkim') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-sikkim');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'Where is NIT Sikkim currently located?', 'It operates from a temporary campus at Ravangla, Sikkim, while a permanent campus is being built at Khamdong.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'When was NIT Sikkim established?', 'August 2010.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'What entrance exam does NIT Sikkim accept for B.Tech?', 'JEE Main, with admission via JoSAA counselling.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-sikkim'), 'What was NIT Sikkim''s highest package in the 2025 placement season?', '₹44 LPA, offered to Electronics and Electrical Engineering students by Nvidia.', 3);

