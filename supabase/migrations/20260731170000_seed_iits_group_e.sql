
-- Indian Institute of Technology Palakkad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Palakkad', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Palakkad', 'Kerala', 'https://iitpkd.ac.in', 'Indian Institute of Technology Palakkad, Kanjikode West, Palakkad, Kerala 678623, India',
  'info@iitpkd.ac.in', '04923-226315', 'IIT Palakkad was established in 2015 as one of the second wave of new IITs and became a full-fledged autonomous institute in 2016. It operates from its permanent campus at Nila Campus, Kanjikode, near Palakkad, Kerala. The institute is known for a research-driven, interdisciplinary curriculum and has climbed steadily in national engineering rankings since its founding.', array['Six hostels across Nila and Sahyadri campuses','Central Library with digital databases','Sports complex (cricket, football, badminton, TT, volleyball, athletics)','Gymnasiums at Nila and Ahalia campuses','Campus-wide WiFi and IT infrastructure','Medical insurance scheme with tie-ups to nearby hospitals','ATM, bank, mini supermarket, food court, bus service'], 'UG admission to the B.Tech programs is exclusively through JEE Advanced followed by centralized seat allocation via JoSAA, which also handles CSAB special rounds for leftover seats.',
  'JEE Main, JEE Advanced', 64, 2, 13.24, 52,
  86.67, 'Google, Accenture, Texas Instruments, AMD, MediaTek, Maruti Suzuki, MathWorks, TCS, Infosys, HCL', 2025, 'iit-palakkad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-palakkad') and name in ('B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, 'AIR ~12540-15812 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, 'AIR ~4800-6199 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, 'AIR ~9625 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, 8, 'AIR ~12540 (General, 2024)', null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-palakkad'), 2023, 69)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-palakkad'), 2024, 64)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-palakkad'), 2025, 64)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-palakkad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'What exams does IIT Palakkad accept for B.Tech admission?', 'Only JEE Advanced rank (after qualifying JEE Main) via JoSAA counselling is accepted for B.Tech admission.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'Is hostel accommodation guaranteed for all B.Tech students?', 'IIT Palakkad provides hostel accommodation across six hostels in the Nila and Sahyadri campuses on a twin-sharing basis.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'Does IIT Palakkad offer fee waivers?', 'As per government of India norms applicable to all IITs, tuition fee is waived for SC/ST/PwD students and reduced for students from families with annual income below ₹5 lakh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-palakkad'), 'What is IIT Palakkad''s latest NIRF Engineering rank?', 'IIT Palakkad was ranked 64th in the NIRF 2025 Engineering category, an improvement from 69th in 2023.', 3);

-- Indian Institute of Technology Tirupati
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Tirupati', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Tirupati (Yerpedu)', 'Andhra Pradesh', 'https://www.iittp.ac.in', 'Indian Institute of Technology Tirupati, Venkatagiri Road, Yerpedu Post, Tirupati District, Andhra Pradesh - 517619, India',
  'admissions@iittp.ac.in', '0877-2503532', 'IIT Tirupati was established in 2015 as part of the second wave of new IITs under the Ministry of Education. Its permanent campus spans roughly 530 acres in Yerpedu village, about 30 km from Tirupati city. The institute was mentored in its early years by IIT Madras and has grown its research and placement footprint steadily.', array['Boys'' and girls'' hostels with WiFi, laundry, common rooms','Central Library with digital and physical resources','Sports facilities (cricket, basketball, football, volleyball, badminton)','Gymnasium','Medical clinic/health center','Campus-wide WiFi','Auditorium and cafeteria','Campus transport/shuttle service'], 'B.Tech admission is through JEE Advanced (after qualifying JEE Main) followed by JoSAA centralized counselling for seat allocation; leftover seats may be filled via CSAB special rounds.',
  'JEE Main, JEE Advanced', 57, null, 17.58, 65,
  null, 'Amazon, ICICI Bank, Deloitte, IBM, Paytm', 2025, 'iit-tirupati'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-tirupati') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Chemical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~4500 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-tirupati'), 2023, 59)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-tirupati'), 2024, 61)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-tirupati'), 2025, 57)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-tirupati');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'What exams does IIT Tirupati accept for B.Tech admission?', 'JEE Advanced (after qualifying JEE Main), with seats allocated via JoSAA counselling.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'Where is the IIT Tirupati campus located?', 'The permanent campus is in Yerpedu village, about 30 km from Tirupati city, Andhra Pradesh, spread over roughly 530 acres.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'Is fee waiver available for economically weaker students?', 'As per standard IIT-wide policy, tuition fees are waived for SC/ST/PwD students and reduced for students from families with annual income below ₹5 lakh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-tirupati'), 'What is IIT Tirupati''s latest NIRF Engineering rank?', 'IIT Tirupati was ranked 57th in the NIRF 2025 Engineering category, up from 61st in 2024.', 3);

-- Indian Institute of Technology (Indian School of Mines), Dhanbad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology (Indian School of Mines), Dhanbad', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Dhanbad', 'Jharkhand', 'https://www.iitism.ac.in', 'IIT (ISM) Dhanbad, ISM Dhanbad Internal Road, Sardar Patel Nagar, Dhanbad - 826004, Jharkhand, India',
  'aradm@iitism.ac.in', '0326-2235001', 'Originally founded in 1926 as the Indian School of Mines, it was converted into a full-fledged IIT in 2016, retaining ''ISM'' in its legal name — Indian Institute of Technology (Indian School of Mines), Dhanbad. It is one of the oldest and most research-established of the newer-generation IITs, historically strong in mining, petroleum, and earth sciences alongside standard engineering branches. The 218-acre campus houses one of India''s largest technical libraries.', array['11 hostels (7 boys, 4 girls, plus international students'' hostel)','One of India''s largest technical libraries (120,000+ books)','Sports complex (badminton, basketball, cricket, football, squash, swimming pool, tennis)','24x7 operational Health Centre','Gymnasium and Students'' Activity Centre','Campus-wide WiFi','Auditorium, cafeteria, guest house'], 'B.Tech admission is via JEE Advanced (after qualifying JEE Main), with seats allocated through JoSAA centralized counselling; remaining seats filled via CSAB special rounds.',
  'JEE Main, JEE Advanced', 15, 2, 17.6, 83,
  80.13, 'Amazon, Microsoft, Google, Deloitte, Accenture', 2024, 'iit-dhanbad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-dhanbad') and name in ('B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Communication Engineering','B.Tech Engineering Physics','B.Tech Environmental Engineering','B.Tech Mechanical Engineering','B.Tech Mineral and Metallurgical Engineering','B.Tech Mining Engineering','B.Tech Mining Machinery Engineering','B.Tech Petroleum Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 55, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Advanced', 69, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', 139, 8, 'AIR ~2100-3610 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 123, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Advanced', 124, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Advanced', 31, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Environmental Engineering', '4 years', '10+2 with PCM, JEE Advanced', 48, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 131, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Mineral and Metallurgical Engineering', '4 years', '10+2 with PCM, JEE Advanced', 45, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Advanced', 117, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Mining Machinery Engineering', '4 years', '10+2 with PCM, JEE Advanced', 56, 8, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'B.Tech Petroleum Engineering', '4 years', '10+2 with PCM, JEE Advanced', 90, 8, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 2023, 17)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 2024, 15)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 2025, 15)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-dhanbad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'Why does IIT Dhanbad have ''ISM'' in its name?', 'It was originally the Indian School of Mines (founded 1926) and was converted into a full IIT in 2016 by an Act of Parliament, retaining ''ISM'' in its official legal name.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'What exams does IIT (ISM) Dhanbad accept for B.Tech admission?', 'JEE Advanced (after qualifying JEE Main), with seat allocation via JoSAA counselling.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'What makes IIT (ISM) Dhanbad''s course offering distinct from other IITs?', 'Due to its mining-institute origins, it uniquely offers B.Tech branches like Mining Engineering, Mining Machinery Engineering, Petroleum Engineering, and Mineral & Metallurgical Engineering alongside standard CSE/EE/ME/Civil branches.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-dhanbad'), 'What is IIT (ISM) Dhanbad''s latest NIRF Engineering rank?', 'It was ranked 15th in the NIRF 2025 Engineering category, up from 17th in 2023 — one of the highest ranks among the newer-generation IITs.', 3);

-- Indian Institute of Technology Bhilai
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indian Institute of Technology Bhilai', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Bhilai', 'Chhattisgarh', 'https://www.iitbhilai.ac.in', 'Indian Institute of Technology Bhilai, Kutelabhata, Bhilai, Chhattisgarh - 491002, India',
  'academics@iitbhilai.ac.in', '0788-2991609', 'IIT Bhilai is one of six new IITs established in 2016 by the Ministry of Education, inaugurated on 7 August 2016. It now operates from its permanent campus at Kutelabhata, Bhilai, which received a GRIHA 5-star sustainability rating for its master plan in 2022. As one of the newer and smaller IITs, it offers a compact set of B.Tech branches and a still-developing placement/ranking track record.', array['Boys'' and girls'' hostels with sports facilities','Well-stocked library','Medical centre','Cafeteria','Campus-wide WiFi network','Computer labs plus HPC cluster','GRIHA 5-star rated sustainable campus master plan'], 'B.Tech admission is through JEE Advanced (after qualifying JEE Main), with seats allocated via JoSAA centralized counselling; leftover seats filled through CSAB special rounds.',
  'JEE Main, JEE Advanced', 72, null, 13.28, null,
  73.54, 'Google, Infosys, TCS, HCL', 2025, 'iit-bhilai'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'iit-bhilai') and name in ('B.Tech Computer Science and Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Data Science and Artificial Intelligence');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR ~6516 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Advanced', null, null, 'AIR up to ~15871 (General, 2024)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'B.Tech Data Science and Artificial Intelligence', '4 years', '10+2 with PCM, JEE Advanced', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhilai'), 2023, 81)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhilai'), 2024, 73)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'iit-bhilai'), 2025, 72)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'iit-bhilai');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'How new is IIT Bhilai and does that affect reputation?', 'IIT Bhilai was established in 2016, making it one of the newer IITs. Its NIRF Engineering rank has been improving each year (81 in 2023, 73 in 2024, 72 in 2025), reflecting a growing but still-developing research and placement track record.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'What B.Tech branches does IIT Bhilai offer?', 'Four branches: Computer Science and Engineering, Electrical Engineering, Mechanical Engineering, and Data Science and Artificial Intelligence.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'What exams does IIT Bhilai accept for B.Tech admission?', 'JEE Advanced (after qualifying JEE Main), with seats allocated via JoSAA counselling.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'iit-bhilai'), 'What is IIT Bhilai''s latest NIRF Engineering rank?', '72nd in the NIRF 2025 Engineering category, improved from 73rd in 2024 and 81st in 2023.', 3);

