
-- Indira Gandhi Delhi Technical University for Women (IGDTUW), Delhi
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Indira Gandhi Delhi Technical University for Women', 'State', 'Engineering', 'Government', null, 'Delhi', 'Delhi', 'https://www.igdtuw.ac.in', 'Indira Gandhi Delhi Technical University for Women, Kashmere Gate, Delhi - 110006, India',
  'ugadmissions@igdtuw.ac.in', '011-23900220', 'Established in 1998 (as the Indira Gandhi Institute of Technology) and upgraded into a full-fledged state technical university for women in 2013, IGDTUW is run by the Government of NCT of Delhi and is the sister institution of DTU and NSUT within Delhi''s state technical university family. It is India''s only exclusively women''s technical university offering B.Tech programs, spanning core engineering along with newer AI/ML and data-science specializations, admitting students through the same JAC Delhi process used by DTU and NSUT. NIRF 2025 places it in the 201-300 band for Engineering rather than assigning it a specific numeric rank.', array['Central Library','Women-only hostels','Health Centre','Sports and gymnasium facilities','Wi-Fi campus','Computer Centre','Innovation and Incubation Cell','Auditorium'], 'UG (B.Tech) admission is through JEE Main rank followed by JAC Delhi (Joint Admission Counselling Delhi) — the same centralized counselling process used by DTU and NSUT. Around 85% of seats are reserved for Delhi-domicile candidates, with the remaining 15% open to all-India candidates; there is no separate institute-level entrance test.',
  'JEE Main (JAC Delhi)', null, null, 18.47, 52.89,
  87.31, 'Microsoft, Adobe, Cisco, JP Morgan', 2025, 'igdtuw-delhi'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'igdtuw-delhi') and name in ('B.Tech Computer Science and Engineering','B.Tech Information Technology','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Mechanical and Automation Engineering','B.Tech Artificial Intelligence and Machine Learning','B.Tech Artificial Intelligence and Data Science');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, 'AIR ~13000-28000 (2026, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Mechanical and Automation Engineering', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Artificial Intelligence and Machine Learning', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'B.Tech Artificial Intelligence and Data Science', '4 years', '10+2 with PCM, JEE Main (JAC Delhi)', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'igdtuw-delhi');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'How can I get admission into IGDTUW''s B.Tech program?', 'Through JEE Main rank followed by JAC Delhi (Joint Admission Counselling Delhi) — the same centralized process used by DTU and NSUT. Around 85% of seats are reserved for Delhi-domicile candidates and 15% for all-India candidates; there is no separate institute entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'What makes IGDTUW distinctive?', 'It is India''s only exclusively women''s technical university, run by the Government of NCT of Delhi as a sister institution to DTU and NSUT, offering B.Tech programs across core and computing/AI specializations.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'Where is the campus located?', 'Kashmere Gate, Delhi - 110006, near the Kashmere Gate metro station.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'igdtuw-delhi'), 'What is the official admissions contact?', 'ugadmissions@igdtuw.ac.in, phone 011-23900220.', 3);

-- JNTUH College of Engineering, Hyderabad (Kukatpally campus)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'JNTUH College of Engineering, Hyderabad', 'State', 'Engineering', 'Government', 'Tier 2', 'Hyderabad', 'Telangana', 'https://jntuhceh.ac.in', 'JNTUH College of Engineering Hyderabad, Kukatpally, Hyderabad - 500085, Telangana, India',
  'info.ceh@jntuh.ac.in', '8179887877', 'Established in 1965, JNTUH College of Engineering Hyderabad (at Kukatpally) is the flagship constituent engineering college of Jawaharlal Nehru Technological University Hyderabad (JNTUH), a Telangana state government university, and predates the university itself (JNTUH was carved out in 1972). Note: similar to how NIRF ranks Anna University rather than its individual constituent colleges, NIRF ranks Jawaharlal Nehru Technological University Hyderabad as a whole rather than this specific Kukatpally campus alone, since JNTUH also has other constituent/affiliated colleges (e.g. Sultanpur, Manthani); the Engineering rank recorded here is therefore the university-level NIRF Engineering rank. The Kukatpally campus offers a wide range of core and computing engineering branches and is one of the oldest and largest state-run technical education institutions in Telangana.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds','Wi-Fi campus','Engineering department labs and workshops','Training and Placement Cell','Innovation and Incubation Centre'], 'UG (B.Tech) admission is through TG EAPCET (Telangana State Engineering, Agriculture and Pharmacy Common Entrance Test) rank, followed by centralized counselling conducted by the Telangana State Council of Higher Education (TSCHE), with the counselling process itself managed by JNTUH. There is no separate institute-level entrance exam and the college does not participate in JoSAA.',
  'TG EAPCET', 94, null, 10.67, 30,
  null, 'Microsoft, Amazon, Google, TCS, Wipro, Infosys, Deloitte, Accenture', 2025, 'jntuh-ceh'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'jntuh-ceh') and name in ('B.Tech Civil Engineering','B.Tech Mechanical Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Electronics and Communication Engineering','B.Tech Computer Science and Engineering','B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)','B.Tech Computer Science and Engineering (Data Science)','B.Tech Information Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, 'Rank ~806 (2025, Phase 1, OC category, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Computer Science and Engineering (Artificial Intelligence and Machine Learning)', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Computer Science and Engineering (Data Science)', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 2025, 94)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'jntuh-ceh');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'How can I get admission into JNTUH College of Engineering Hyderabad''s B.Tech program?', 'Through TG EAPCET rank followed by Telangana State Council of Higher Education (TSCHE) centralized counselling, which is administratively managed by JNTUH. There is no separate institute entrance test and it does not use JoSAA/JEE Main.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'Is the NIRF rank for this specific Kukatpally campus or for JNTUH as a whole?', 'NIRF ranks Jawaharlal Nehru Technological University Hyderabad as a single university entity, similar to how Anna University is ranked rather than each constituent college separately — JNTUH has other constituent and affiliated campuses besides this flagship Kukatpally college, so the recorded rank reflects the university level.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'Where is the campus located?', 'Kukatpally, Hyderabad - 500085, Telangana.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'jntuh-ceh'), 'What is the official admissions contact?', 'info.ceh@jntuh.ac.in, phone 8179887877.', 3);

-- Zakir Husain College of Engineering and Technology, Aligarh Muslim University (AMU)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Zakir Husain College of Engineering and Technology, Aligarh Muslim University', 'Other', 'Engineering', 'Government', 'Tier 2', 'Aligarh', 'Uttar Pradesh', 'https://www.amu.ac.in/colleges/zakir-husain-college-of-engineering-and-technology', 'Zakir Husain College of Engineering and Technology, Aligarh Muslim University, Aligarh - 202002, Uttar Pradesh, India',
  'da.admission@amuonline.in', '9240224339', 'Established in 1935, ZHCET is the engineering faculty of Aligarh Muslim University (AMU) — a Central Government university created by an Act of Parliament, and hence a fully government (not privately trust-run) institution. Unlike most JoSAA-participating government engineering colleges, ZHCET has historically conducted, and continues to conduct, its own entrance test (AMUEEE) for B.Tech admission rather than relying on JEE Main and JoSAA. It offers seven B.Tech specializations spanning core, computing, and petrochemical engineering.', array['Central Library','Hostels for men and women','Health Centre','Sports facilities','Wi-Fi campus','Engineering department labs and workshops','Training and Placement Cell','Central Workshop'], 'B.Tech admission is through AMUEEE (Aligarh Muslim University Engineering Entrance Examination) — the university''s own entrance test — followed by AMU''s own counselling based on the AMUEEE merit rank. It does not use JEE Main/JoSAA for its regular B.Tech admissions. Candidates must also have at least 50% aggregate marks in Physics, Chemistry, Mathematics and English at Class 12.',
  'AMUEEE (AMU''s own entrance exam)', 32, 0.34, 5.63, null,
  null, null, 2024, 'amu-zakir-husain'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'amu-zakir-husain') and name in ('B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Electrical Engineering','B.Tech Chemical Engineering','B.Tech Computer Engineering','B.Tech Electronics Engineering','B.Tech Petrochemical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'B.Tech Petrochemical Engineering', '4 years', '10+2 with PCM and English (50% aggregate), AMUEEE', null, 0.34, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 2024, 32)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'amu-zakir-husain');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'How can I get admission into ZHCET AMU''s B.Tech program?', 'Through AMUEEE, AMU''s own entrance examination, followed by the university''s own counselling based on the AMUEEE merit rank. ZHCET does not use JEE Main or JoSAA for regular B.Tech admissions.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'Is Aligarh Muslim University a government or privately-run institution?', 'AMU is a Central Government university established by an Act of Parliament, making ZHCET a fully government institution rather than a privately trust-run college, even though it is not part of the JoSAA/GFTI or state-university admission systems.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'Where is the campus located?', 'Aligarh Muslim University campus, Aligarh - 202002, Uttar Pradesh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'amu-zakir-husain'), 'What is the official admissions contact?', 'da.admission@amuonline.in, phone 9240224339.', 3);

-- Andhra University College of Engineering (AUCE), Visakhapatnam
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Andhra University College of Engineering, Visakhapatnam', 'State', 'Engineering', 'Government', 'Tier 2', 'Visakhapatnam', 'Andhra Pradesh', 'https://www.andhrauniversity.edu.in', 'Andhra University College of Engineering, Andhra University North Campus, Waltair Junction, Visakhapatnam - 530003, Andhra Pradesh, India',
  'auceaprincipal@andhrauniversity.edu.in', '0891-2844999', 'Founded in 1946, Andhra University College of Engineering (AUCE) is one of the oldest engineering colleges in South India and a constituent autonomous college of Andhra University, an Andhra Pradesh state government university established in 1926. It remains one of India''s few century-adjacent engineering institutions still directly run as a government college, offering thirteen B.Tech specializations across core, computing, and process/biotechnology streams, and holds NAAC A++ accreditation.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds','Wi-Fi campus','Engineering department labs and workshops','Training and Placement Cell','Innovation and Incubation Centre'], 'B.Tech admission is through AP EAPCET (Andhra Pradesh Engineering, Agriculture and Pharmacy Common Entrance Test) rank followed by state centralized counselling; seats are split between subsidized Regular and Self-Support fee categories drawn from the same AP EAPCET rank list. There is no separate institute-level entrance exam and the college does not participate in JoSAA.',
  'AP EAPCET', 88, null, 9.3, 84.5,
  null, 'Atlassian, WestLine Shipping', 2024, 'auce-visakhapatnam'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'auce-visakhapatnam') and name in ('B.Tech Computer Science and Engineering','B.Tech Electronics and Communication Engineering','B.Tech Electrical and Electronics Engineering','B.Tech Information Technology','B.Tech Chemical Engineering','B.Tech Biotechnology','B.Tech Civil Engineering','B.Tech Mechanical Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, 'Rank ~1220-74965 (2025, overall range, approx.)', null, 'Regular (subsidized) approx Rs.1.78 lakh total; Self-Support approx Rs.8 lakh total');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Electrical and Electronics Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Biotechnology', '4 years', '10+2 with PCM/PCB, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, AP EAPCET', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 2024, 90)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 2025, 88)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'auce-visakhapatnam');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'How can I get admission into AUCE Visakhapatnam''s B.Tech program?', 'Through AP EAPCET rank followed by Andhra Pradesh state centralized counselling; seats are split between subsidized Regular and Self-Support fee categories from the same rank list. There is no separate institute entrance exam and it does not use JoSAA/JEE Main.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'What makes AUCE Visakhapatnam distinctive?', 'Founded in 1946, it is one of the oldest engineering colleges in South India, run directly by the Government of Andhra Pradesh as a constituent college of Andhra University, and holds NAAC A++ accreditation.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'Where is the campus located?', 'Andhra University North Campus, Waltair Junction, Visakhapatnam - 530003, Andhra Pradesh.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'auce-visakhapatnam'), 'What is the official admissions contact?', 'auceaprincipal@andhrauniversity.edu.in, phone 0891-2844999.', 3);

-- Birsa Institute of Technology (BIT), Sindri
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Birsa Institute of Technology, Sindri', 'State', 'Engineering', 'Government', null, 'Sindri', 'Jharkhand', 'https://www.bitsindri.ac.in', 'Birsa Institute of Technology, Sindri, Dhanbad District - 828123, Jharkhand, India',
  null, '0326-2350495', 'Founded in 1949, BIT Sindri is one of the oldest engineering colleges in Jharkhand (undivided Bihar) and is a Jharkhand state government engineering institute, now academically affiliated to Jharkhand University of Technology (JUT), Ranchi, rather than standing as its own deemed or affiliating body. It offers ten B.Tech branches spanning core, metallurgical/mining, and computing engineering across a roughly 470-acre campus, admitting only Jharkhand-domicile candidates under a state-quota-only intake with no All-India quota seats. NIRF 2024 places it in the 201-300 band rather than assigning a specific numeric rank.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds','470-acre campus','Wi-Fi campus','Engineering department labs and workshops','Training and Placement Cell'], 'B.Tech admission is exclusively through JEE Main rank via JCECEB (Jharkhand Combined Entrance Competitive Examination Board) counselling; seats are filled entirely under the Jharkhand state quota, with Jharkhand domicile mandatory and no All-India quota. BIT Sindri does not participate in JoSAA.',
  'JEE Main (JCECEB, Jharkhand domicile only)', null, 0.69, 7.57, 16.5,
  null, null, 2025, 'bit-sindri'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'bit-sindri') and name in ('B.Tech Mechanical Engineering','B.Tech Production and Industrial Engineering','B.Tech Electrical Engineering','B.Tech Metallurgical Engineering','B.Tech Chemical Engineering','B.Tech Civil Engineering','B.Tech Electronics and Communication Engineering','B.Tech Mining Engineering','B.Tech Computer Science and Engineering','B.Tech Information Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Production and Industrial Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Electrical Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Metallurgical Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Chemical Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Electronics and Communication Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Mining Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Computer Science and Engineering', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bit-sindri'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, JEE Main (Jharkhand domicile), JCECEB', null, 0.69, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'bit-sindri');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bit-sindri'), 'How can I get admission into BIT Sindri''s B.Tech program?', 'Exclusively through JEE Main rank via JCECEB (Jharkhand Combined Entrance Competitive Examination Board) counselling. Seats are filled entirely under the Jharkhand state quota — Jharkhand domicile is mandatory and there is no All-India quota or JoSAA route.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bit-sindri'), 'Is BIT Sindri still a standalone institute?', 'It remains a distinct government engineering college (not merged into another institute), but its degrees are academically affiliated to Jharkhand University of Technology (JUT), Ranchi, rather than being self-affiliating like a deemed university.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bit-sindri'), 'Where is the campus located?', 'Sindri, Dhanbad District - 828123, Jharkhand, on a roughly 470-acre campus.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bit-sindri'), 'What is the official admissions contact?', 'Phone 0326-2350495; see the official website bitsindri.ac.in for the current admissions email.', 3);
