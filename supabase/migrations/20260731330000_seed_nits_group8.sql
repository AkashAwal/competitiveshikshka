
-- Malaviya National Institute of Technology Jaipur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Malaviya National Institute of Technology Jaipur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Jaipur', 'Rajasthan', 'https://www.mnit.ac.in', 'Malaviya National Institute of Technology Jaipur, Jawahar Lal Nehru Marg, Jaipur - 302017, Rajasthan, India',
  'csab2026help@mnit.ac.in', '0141-2715082', 'MNIT Jaipur was established in 1963 as Malaviya Regional Engineering College, a joint venture of the Government of India and the Government of Rajasthan, and was renamed MNIT in 2002. It was declared an Institute of National Importance by an Act of Parliament in 2007. The 312-acre campus sits in the heart of Jaipur, known for strong placements in Computer Science and core engineering branches.', array['Central Library (~1.3 lakh volumes)','Hostels (capacity 3000+ boys, 1000+ girls)','Primary health centre / dispensary','Bank and post office on campus','Gymnasium and playing fields','Guest houses','Shopping complex and canteen'], 'B.Tech admission is entirely through JEE Main followed by JoSAA counselling (and subsequent CSAB rounds for leftover seats); there is no separate institute-level entrance test.',
  'JEE Main', 42, 6.76, 12.85, 64,
  79.08, 'Microsoft, Amazon, TCS, Infosys, L&T, Bajaj, Adobe, Samsung', 2025, 'mnit-jaipur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'mnit-jaipur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, 'AIR ~5179 (2025, other-state)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.76, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 2023, 37)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 2024, 43)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 2025, 42)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'mnit-jaipur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'How can I get admission to B.Tech at MNIT Jaipur?', 'Through JEE Main followed by JoSAA counselling; leftover seats are filled via CSAB special rounds.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'Is there a home-state quota at MNIT Jaipur?', 'Yes, like other NITs, MNIT Jaipur reserves a share of seats for Rajasthan (home-state) candidates.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'What is MNIT Jaipur''s latest NIRF Engineering rank?', 'MNIT Jaipur was ranked 42nd in the NIRF 2025 Engineering category.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnit-jaipur'), 'Does MNIT Jaipur offer fee waivers?', 'Yes, full tuition fee waivers are available for SC/ST/PwD students and students from economically weaker families.', 3);

-- Motilal Nehru National Institute of Technology Allahabad
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Motilal Nehru National Institute of Technology Allahabad', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Prayagraj (Allahabad)', 'Uttar Pradesh', 'https://www.mnnit.ac.in', 'Motilal Nehru National Institute of Technology Allahabad, Prayagraj - 211004, Uttar Pradesh, India',
  'pa-director@mnnit.ac.in', '0532-2545404', 'MNNIT Allahabad was established in 1961 as Motilal Nehru Regional Engineering College, a joint venture of the Government of India and the Government of Uttar Pradesh. It was granted National Institute of Technology status and Institute of National Importance recognition in 2002. The 222-acre campus is located in Prayagraj (Allahabad).', array['Central Library (~1 lakh+ books)','12 hostels (9 boys, 3 girls; 2000+ capacity)','Sports facilities (cricket, football, hockey, tennis, basketball)','Gymnasium and yoga room','Health centre','Computer/networked labs'], 'B.Tech admission is via JEE Main scores and JoSAA centralized counselling; seats are allocated on rank, category, and home-state/other-state quota, with CSAB handling any leftover seats.',
  'JEE Main', 62, 6.57, 20.43, 72,
  83.29, 'Microsoft, Amazon, Samsung, Adobe, TCS, Wipro, L&T, Qualcomm', 2025, 'mnnit-allahabad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'mnnit-allahabad') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Biotechnology and Biochemical Engineering','B.Tech Production and Industrial Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, 'AIR ~4594-11552 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, 'AIR ~3471-15690 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, 'AIR ~17753-18641 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, 'AIR ~30528-31443 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Biotechnology and Biochemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, 'AIR ~32380-48979 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.57, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 2022, 47)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 2023, 49)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 2025, 62)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'mnnit-allahabad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'How is B.Tech admission done at MNNIT Allahabad?', 'Via JEE Main and JoSAA centralized counselling, with CSAB handling any leftover seats.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'What is MNNIT Allahabad''s most recent NIRF Engineering rank?', 'MNNIT Allahabad was ranked 62nd in NIRF 2025 Engineering, down from 49th in NIRF 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'Where exactly is MNNIT Allahabad located?', 'It is in Prayagraj (formerly Allahabad), Uttar Pradesh, at Teliyarganj, PIN 211004.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'mnnit-allahabad'), 'Which branch has the highest packages at MNNIT?', 'Computer Science and Engineering typically records the highest average and highest packages, contributing heavily to the reported 2025 overall average of ₹20.43 LPA and highest of ₹72 LPA.', 3);

-- Visvesvaraya National Institute of Technology Nagpur
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Visvesvaraya National Institute of Technology Nagpur', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Nagpur', 'Maharashtra', 'https://vnit.ac.in', 'Visvesvaraya National Institute of Technology, South Ambazari Road, Nagpur, Maharashtra - 440010, India',
  'registrar_office@vnit.ac.in', '0712-2801370', 'VNIT Nagpur traces its origin to 1960, when it was formed by amalgamating the State Government Engineering College into a Regional Engineering College, then known as Visvesvaraya Regional College of Engineering (VRCE). It became a National Institute of Technology and Institute of National Importance in 2002. The 215-acre campus is near Ambazari Lake, close to Nagpur''s railway station and airport, and is widely regarded as one of the top NITs.', array['Independent three-storied central library','11 hostels (7 boys, 4 girls)','Sports facilities and grounds','Health centre','Wi-Fi enabled campus/labs','Guest house','Proximity to Ambazari Lake, railway station and airport'], 'B.Tech admission is through JEE Main and JoSAA centralized counselling (with CSAB for leftover seats); foreign nationals/NRIs can apply separately via DASA.',
  'JEE Main', 44, 5.57, 10.68, 64,
  85.16, 'Morgan Stanley, Qualcomm, Tata Motors, ABB, Hyundai Mobis, L&T, Amazon, JPMorgan Chase', 2025, 'vnit-nagpur'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'vnit-nagpur') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Information Technology','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, 'AIR ~6359-7203 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, 'AIR ~11000 (approx, 2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, 5.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, 'AIR ~52313 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.57, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 2023, 41)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 2024, 39)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 2025, 44)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'vnit-nagpur');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'How can I get into VNIT Nagpur for B.Tech?', 'Through JEE Main followed by JoSAA counselling; NRIs/foreign nationals can apply via DASA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'What is VNIT Nagpur''s current NIRF Engineering rank?', 'VNIT Nagpur was ranked 44th in NIRF 2025 Engineering, after being ranked 39th in 2024.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'Is there tuition fee waiver at VNIT?', 'Yes — SC/ST/PwD students get a full tuition fee waiver, and economically weaker students get 100% tuition remission.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vnit-nagpur'), 'Where is VNIT Nagpur located?', 'On South Ambazari Road, Nagpur, Maharashtra, near Ambazari Lake and close to the city''s railway station and airport.', 3);

