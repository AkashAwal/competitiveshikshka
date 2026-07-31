
-- National Institute of Technology Silchar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Silchar', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Silchar', 'Assam', 'https://www.nits.ac.in', 'National Institute of Technology Silchar, Cachar, Assam - 788010, India',
  'registrar@nits.ac.in', '03842-242183', 'NIT Silchar was established in 1967 as a Regional Engineering College (REC) in Assam and was upgraded to National Institute of Technology status in 2002, later declared an Institute of National Importance under the NIT Act 2007. It is spread across a 600-acre campus about 8 km south of Silchar town, with strong placement outcomes including near 100% CSE placement in recent years.', array['Central Library','Separate boys'' and girls'' hostels','Wi-Fi campus','Health centre','Bank/ATM','Guest house','Gymkhana and sports facilities'], 'UG admission to B.Tech programs is entirely through JEE Main scores followed by JoSAA centralized counselling.',
  'JEE Main', 50, 7.11, 11.9, 54,
  null, 'Google, Microsoft, Amazon, Deloitte, Cisco, TCS, Infosys, Accenture', 2025, 'nit-silchar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-silchar') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Electronics and Instrumentation Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.11, 'AIR ~11696 (OS) / ~22340 (HS), 2025', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 81, 7.11, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.11, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.11, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.11, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-silchar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 7.11, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-silchar'), 2023, 40)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-silchar'), 2024, 40)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-silchar'), 2025, 50)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-silchar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-silchar'), 'How can I get admission to NIT Silchar B.Tech?', 'Admission is through JEE Main followed by JoSAA counselling; no separate institute-level entrance exam exists for B.Tech.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-silchar'), 'What is NIT Silchar''s NIRF Engineering rank?', 'NIT Silchar was ranked 50th in the NIRF 2025 Engineering category (down from 40th in 2024).', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-silchar'), 'What is the total B.Tech fee at NIT Silchar?', 'The approximate total 4-year B.Tech fee is around ₹7.11 lakh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-silchar'), 'Does NIT Silchar have good placements?', 'Yes — 2025 figures show an average package of about ₹11.9 LPA and a highest package of ₹54 LPA, with CSE recording close to 100% placement.', 3);

-- National Institute of Technology Srinagar
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Srinagar', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Srinagar', 'Jammu and Kashmir', 'https://www.nitsri.ac.in', 'National Institute of Technology Srinagar, Hazratbal, Srinagar - 190006, Jammu & Kashmir, India',
  'info@nitsri.ac.in', '0194-2422032', 'NIT Srinagar was established in 1960 as the Regional Engineering College (REC) Srinagar — the third REC set up in India — and was awarded NIT status in 2003. The 320-acre Hazratbal campus sits on the banks of Dal Lake, making it one of India''s most scenic engineering campuses. Its NIRF Engineering rank has improved for three consecutive years.', array['Central library with 40,000+ books','5 hostels (4 boys, 1 girls)','Medical unit with ambulance','Bank and shopping complex','Separate male/female gymnasiums','24x7 internet','Guest house'], 'UG admission to B.Tech programs is through JEE Main scores followed by JoSAA centralized counselling; fee concessions apply on an income-slab basis.',
  'JEE Main', 73, 6.03, 8.9, 35.5,
  76.94, 'Google, Microsoft, Deloitte, Amazon, Infosys, TCS, Accenture, Wipro', 2025, 'nit-srinagar'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-srinagar') and name in ('B.Tech Computer Science and Engineering','B.Tech Civil Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical Engineering','B.Tech Information Technology','B.Tech Mechanical Engineering','B.Tech Chemical Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', 62, 6.03, 'AIR ~22015-31866 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', 81, 6.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', 47, 6.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, 6.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.03, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.03, 'AIR ~55299 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.03, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-srinagar'), 2023, 82)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-srinagar'), 2024, 79)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-srinagar'), 2025, 73)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-srinagar');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'How can I get admission to NIT Srinagar B.Tech?', 'Admission is via JEE Main scores through JoSAA centralized counselling; there is no separate institute entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'What is NIT Srinagar''s current NIRF Engineering rank?', 'NIT Srinagar was ranked 73rd in the NIRF 2025 Engineering category, up from 79th in 2024 and 82nd in 2023.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'Is NIT Srinagar fee affordable for lower-income families?', 'Yes — the institute offers income-based tuition waivers, and SC/ST students get a full tuition waiver.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-srinagar'), 'What is the placement rate at NIT Srinagar?', 'In 2025, about 76.94% of eligible students were placed, with an average package of roughly ₹8.9 LPA and a highest package of ₹35.5 LPA.', 3);

-- National Institute of Technology Karnataka, Surathkal
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'National Institute of Technology Karnataka, Surathkal', 'IIT', 'Engineering', 'Government', 'Tier 1', 'Surathkal, Mangaluru', 'Karnataka', 'https://www.nitk.ac.in', 'National Institute of Technology Karnataka, Surathkal, Srinivasnagar Post - 575025, Mangaluru Taluk, Dakshina Kannada, Karnataka, India',
  'registrar@nitk.edu.in', '0824-2474000', 'NITK Surathkal was established in 1960 as a Regional Engineering College and is now one of India''s most reputed NITs, consistently ranked among the top engineering institutes nationally. Its 295-acre campus lies on the Arabian Sea coast along National Highway 66 near Mangaluru, housing 4,500+ students across 17 hostel blocks.', array['Three-storey digital library (130,000+ volumes)','12 boys'' hostel blocks, 5 girls'' hostel blocks','1,200-seat auditorium','Swimming pool','Cricket ground and multiple sports courts','Banks/ATMs and shopping complexes','Health centre'], 'UG admission to B.Tech programs is through JEE Main scores followed by JoSAA centralized counselling across multiple rounds; tuition fee is waived for SC/ST/PwD students.',
  'JEE Main', 17, 5.95, 17.48, 63.3,
  80.6, 'Google, Microsoft, Amazon, Goldman Sachs, Adobe, Oracle, Qualcomm, Texas Instruments', 2025, 'nit-surathkal'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-surathkal') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Mining Engineering','B.Tech Metallurgical and Materials Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, 'AIR ~2800 (HS) / ~1827 (OS), 2025', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', 58, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', 29, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'B.Tech Metallurgical and Materials Engineering', '4 years', '10+2 with PCM, JEE Main', null, 5.95, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surathkal'), 2023, 12)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surathkal'), 2024, 17)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surathkal'), 2025, 17)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-surathkal');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'How can I get admission to NITK Surathkal B.Tech?', 'Admission is entirely through JEE Main scores via JoSAA centralized counselling; there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'What is NITK''s NIRF Engineering rank?', 'NITK Surathkal retained its 17th rank in the NIRF 2025 Engineering category, the same as 2024 (it was 12th in 2023).', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'What is the placement record at NITK Surathkal?', 'In 2025, B.Tech placement stood at 80.6%, with an average package of ₹17.48 LPA and a highest package of ₹63.3 LPA.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surathkal'), 'Is B.Tech fee waived for SC/ST students at NITK?', 'Yes, tuition fee is fully waived for SC/ST and PwD category students; they still pay hostel and other nominal charges.', 3);

-- Sardar Vallabhbhai National Institute of Technology, Surat
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Sardar Vallabhbhai National Institute of Technology, Surat', 'IIT', 'Engineering', 'Government', 'Tier 2', 'Surat', 'Gujarat', 'https://www.svnit.ac.in', 'Sardar Vallabhbhai National Institute of Technology, Ichchhanath, Surat - 395007, Gujarat, India',
  'registrar@svnit.ac.in', '0261-2223371', 'SVNIT was established in June 1961 as the Sardar Vallabhbhai Regional College of Engineering and Technology, a joint venture of the Government of India and Government of Gujarat. It was granted Deemed University status in 2002 and became a National Institute of Technology thereafter. The campus spans roughly 250 hectares between Surat''s domestic airport and railway station.', array['Central library (est. 1968)','7 boys'' hostels, 1 girls'' hostel, 1 family hostel','Guest house','Research laboratories','Sports facilities','Mess and common rooms in each hostel'], 'UG admission to B.Tech programs is through JEE Main scores followed by JoSAA centralized counselling; SC/ST/PwD students are fully exempted from the tuition-fee component.',
  'JEE Main', 66, 6.7, 11.24, 74,
  82, 'Microsoft, Amazon, TCS, Cognizant, Wipro, Adobe, Infosys, Samsung', 2025, 'nit-surat'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'nit-surat') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics Engineering','B.Tech Electrical Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Chemical Engineering','B.Tech Computer Science and Engineering (Artificial Intelligence)','B.Tech Engineering Physics');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, 'AIR ~7203-8130 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Computer Science and Engineering (Artificial Intelligence)', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'nit-surat'), 'B.Tech Engineering Physics', '4 years', '10+2 with PCM, JEE Main', null, 6.7, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surat'), 2023, 65)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surat'), 2024, 59)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'nit-surat'), 2025, 66)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'nit-surat');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surat'), 'How can I get admission to SVNIT Surat B.Tech?', 'Admission is via JEE Main scores through JoSAA centralized counselling; there is no separate institute-level entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surat'), 'What is SVNIT''s current NIRF Engineering rank?', 'SVNIT Surat was ranked 66th in NIRF 2025 Engineering, down from 59th in 2024 (it was 65th in 2023).', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surat'), 'What is the B.Tech fee at SVNIT Surat?', 'The approximate total 4-year B.Tech fee is around ₹6.7 lakh; SC/ST/PwD students are exempt from the tuition component.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'nit-surat'), 'How were SVNIT placements in 2025?', 'The 2025 B.Tech placement rate was about 82%, with an average package of ~₹11.24 LPA and a highest package of ₹74 LPA; 205 companies visited campus.', 3);

