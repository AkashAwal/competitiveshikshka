
-- Veermata Jijabai Technological Institute (VJTI), Mumbai
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Veermata Jijabai Technological Institute, Mumbai', 'State', 'Engineering', 'Government', null, 'Mumbai', 'Maharashtra', 'https://vjti.ac.in', 'H R Mahajani Marg, Matunga East, Mumbai - 400019, Maharashtra, India',
  'admissions@vjti.ac.in', '022-24198102', 'Established in 1887 as the Victoria Jubilee Technical Institute and renamed after Veermata Jijabai in 1980, VJTI is one of India''s oldest engineering institutes and an autonomous institute of the Government of Maharashtra. It carries a ''Centre of Excellence'' status and is especially well regarded for its Computer Engineering, Information Technology, and Electronics programs, with a large and influential alumni network across Indian industry.', array['Central Library','Hostels for men and women','Health Centre','Sports complex and gymkhana','Wi-Fi campus','Central Workshop','Innovation and Incubation Cell','Auditorium'], 'UG (B.Tech) admission is primarily through MHT-CET score/percentile followed by the Maharashtra State CET Cell''s Centralized Admission Process (CAP) counselling; a smaller number of All-India/Out-of-State seats are filled via JEE Main rank. There is no separate institute-level entrance test.',
  'MHT-CET, JEE Main', null, null, null, 54,
  82, 'Google, Microsoft, Amazon, HDFC Bank, JLL, Byju''s, Aakash', 2025, 'vjti-mumbai'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'vjti-mumbai') and name in ('B.Tech Computer Engineering','B.Tech Information Technology','B.Tech Electronics Engineering','B.Tech Electronics and Telecommunication Engineering','B.Tech Mechanical Engineering','B.Tech Civil Engineering','B.Tech Production Engineering','B.Tech Textile Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Computer Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Electronics Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Electronics and Telecommunication Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Mechanical Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Civil Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Production Engineering', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'B.Tech Textile Technology', '4 years', '10+2 with PCM, MHT-CET', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'vjti-mumbai');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'How can I get admission into VJTI Mumbai''s B.Tech program?', 'Primarily through MHT-CET score/percentile and Maharashtra State CAP counselling; a limited number of All-India seats are filled via JEE Main. VJTI does not conduct its own separate entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'What makes VJTI distinctive among Maharashtra''s engineering colleges?', 'Founded in 1887, it is one of India''s oldest engineering institutes, holds ''Centre of Excellence'' status from the Government of Maharashtra, and is particularly well known for Computer Engineering and IT placements.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'Where is VJTI located?', 'H R Mahajani Marg, Matunga East, Mumbai - 400019, Maharashtra.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'vjti-mumbai'), 'What is the official admissions contact for VJTI?', 'admissions@vjti.ac.in, phone 022-24198102.', 3);

-- Institute of Chemical Technology, Mumbai
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Institute of Chemical Technology, Mumbai', 'State', 'Engineering', 'Deemed', 'Tier 2', 'Mumbai', 'Maharashtra', 'https://www.ictmumbai.edu.in', 'Nathalal Parekh Marg, Matunga, Mumbai - 400019, Maharashtra, India',
  'admission@ictmumbai.edu.in', '022-33611111', 'Established in 1933 as the Department of Chemical Technology of the University of Bombay, ICT Mumbai became an autonomous, UGC-recognised Deemed-to-be-University in 2008. It is widely regarded as India''s premier institute for chemical engineering, pharmaceutical sciences, and allied process technologies, consistently ranking among the very top nationally in NIRF''s Engineering and Pharmacy categories. ICT also operates satellite campuses at Bhubaneswar (ICT-IOC) and Marathwada (Jalna).', array['Central Library','Hostels for men and women','Health Centre','Pilot plant and process engineering labs','Wi-Fi campus','Sports facilities','Innovation and startup incubation cell','Training and Placement Cell'], 'UG (B.Chem.Engg / B.Pharm) admission is through MHT-CET or JEE Main scores followed by the Maharashtra State CET Cell''s Centralized Admission Process (CAP) counselling, since ICT participates in both the Maharashtra state quota and an all-India quota; there is no separate institute-level entrance test.',
  'MHT-CET, JEE Main', 41, 3.56, 10, 60,
  95, 'Reliance, Indian Oil, Asian Paints, TCS, BPCL, Honeywell, Larsen & Toubro, Unilever', 2025, 'ict-mumbai'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'ict-mumbai') and name in ('B.Chem.Engg Chemical Engineering','B.Pharm Pharmaceutical Sciences and Technology','B.Chem.Engg Fibres and Textile Processing Technology','B.Chem.Engg Food Engineering and Technology','B.Chem.Engg Oil Technology','B.Chem.Engg Polymer and Surface Coating Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Chem.Engg Chemical Engineering', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Pharm Pharmaceutical Sciences and Technology', '4 years', '10+2 with PCB/PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Chem.Engg Fibres and Textile Processing Technology', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Chem.Engg Food Engineering and Technology', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Chem.Engg Oil Technology', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'B.Chem.Engg Polymer and Surface Coating Technology', '4 years', '10+2 with PCM, MHT-CET/JEE Main', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'ict-mumbai'), 2025, 41)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'ict-mumbai');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'How can I get admission into ICT Mumbai''s B.Chem.Engg/B.Pharm program?', 'Through MHT-CET or JEE Main scores followed by Maharashtra State CAP counselling — ICT participates in both the state quota and an all-India quota; there is no separate institute entrance exam.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'Is ICT Mumbai a government or deemed university?', 'It is a Deemed-to-be-University (autonomous, UGC-recognised since 2008), not a directly government-run institute — hence its ownership is classified as Deemed rather than Government.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'What is ICT Mumbai best known for?', 'It is India''s top-ranked institute for chemical engineering and pharmaceutical technology, with NIRF 2025 ranks of 41 in Engineering and 6 in Pharmacy.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'ict-mumbai'), 'Where is the ICT Mumbai campus and what is the admissions contact?', 'Nathalal Parekh Marg, Matunga, Mumbai - 400019; admission@ictmumbai.edu.in, phone 022-33611111.', 3);

-- Anna University, College of Engineering, Guindy (CEG Campus)
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'Anna University, College of Engineering, Guindy (CEG Campus)', 'State', 'Engineering', 'Government', 'Tier 1', 'Chennai', 'Tamil Nadu', 'https://www.ceg.annauniv.edu', 'College of Engineering Guindy Campus, Anna University, Sardar Patel Road, Guindy, Chennai - 600025, Tamil Nadu, India',
  'deanceg@annauniv.edu', '044-22357004', 'Tracing its origins to the Madras Survey School founded in 1794, the College of Engineering, Guindy (CEG) is one of the oldest engineering institutions in Asia and now functions as the flagship constituent college of Anna University. It offers a wide spread of undergraduate and postgraduate engineering programs across core, electrical, and computing disciplines, is consistently ranked among India''s top state-run engineering colleges, and has an extensive multi-generational alumni network across Indian industry and academia.', array['Central Library','Hostels for men and women','Health Centre','Sports grounds and stadium','Wi-Fi campus','Central Workshop','Multiple specialized research centres','Training and Placement Cell'], 'UG (B.E./B.Tech) admission to CEG is through Tamil Nadu Engineering Admissions (TNEA), based on normalised aggregate marks scored in Physics, Chemistry and Mathematics in the Class 12 board examination — there is no entrance test. Counselling and seat allotment is conducted centrally by the Directorate of Technical Education, Tamil Nadu, with CEG traditionally commanding among the highest closing cutoffs in the state.',
  'TNEA', 20, 1.38, 7.5, 53,
  null, 'Microsoft, Google, Amazon, TCS, Infosys, Cognizant, Samsung, Bosch', 2025, 'anna-university-ceg'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'anna-university-ceg') and name in ('B.E. Civil Engineering','B.E. Mechanical Engineering','B.E. Electrical and Electronics Engineering','B.E. Electronics and Communication Engineering','B.E. Computer Science and Engineering','B.Tech Information Technology');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.E. Civil Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.E. Electrical and Electronics Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.E. Computer Science and Engineering', '4 years', '10+2 with PCM, TNEA', null, null, 'Normalised marks ~197+/200 (2025, OC category, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'B.Tech Information Technology', '4 years', '10+2 with PCM, TNEA', null, null, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 2025, 20)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'anna-university-ceg');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'How can I get admission into CEG Guindy''s B.E./B.Tech program?', 'Entirely through Tamil Nadu Engineering Admissions (TNEA), based on normalised Class 12 PCM marks — there is no written entrance exam. Seats are allotted via centralized counselling by the Directorate of Technical Education, Tamil Nadu.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'What makes CEG Guindy distinctive?', 'Tracing its roots to 1794, it is one of the oldest engineering institutions in Asia and now serves as the flagship constituent college of Anna University, with historically the highest TNEA cutoffs in Tamil Nadu.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'Where is the CEG campus located?', 'Sardar Patel Road, Guindy, Chennai - 600025, Tamil Nadu.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'anna-university-ceg'), 'What is the admissions contact for CEG?', 'deanceg@annauniv.edu, phone 044-22357004 (Anna University main contact).', 3);

-- University College of Engineering, Osmania University
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'University College of Engineering, Osmania University', 'State', 'Engineering', 'Government', null, 'Hyderabad', 'Telangana', 'https://www.uceou.edu', 'University College of Engineering, Osmania University, Amberpet, Hyderabad - 500007, Telangana, India',
  'webmaster@uceou.edu', '08331997138', 'Established in 1929, the University College of Engineering (UCE), Osmania University is the oldest and largest engineering college in Telangana and among the earliest engineering colleges founded in British India. A constituent college of Osmania University, it offers B.E. programs spanning core branches like Civil, Mechanical and Electrical Engineering alongside newer disciplines such as Artificial Intelligence & Machine Learning and Biomedical Engineering, and carries strong regional recognition with a large public-sector and IT-industry alumni base.', array['Central Library','Hostels','Health Centre','Sports grounds','Wi-Fi campus','Engineering workshops and labs','Training and Placement Cell','NCC/NSS units'], 'UG (B.E.) admission is through TG EAPCET (Telangana State Engineering, Agriculture and Pharmacy Common Entrance Test — the renamed successor to TS EAMCET since 2024) rank, followed by centralized counselling conducted by the Telangana State Council of Higher Education (TSCHE); there is no separate institute-level entrance exam.',
  'TG EAPCET', null, null, 10, 45,
  null, 'Amazon, Oracle, IBM, ITC, Infosys, Deloitte, DE Shaw, Juspay', 2025, 'osmania-university-coe'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'osmania-university-coe') and name in ('B.E. Civil Engineering','B.E. Mechanical Engineering','B.E. Electrical Engineering','B.E. Electronics and Communication Engineering','B.E. Computer Science and Engineering','B.E. Mining Engineering','B.E. Biomedical Engineering','B.E. Artificial Intelligence and Machine Learning');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Civil Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Electrical Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Computer Science and Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, 'Rank ~1058-2000 (2026, Round 1, General, approx.)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Mining Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Biomedical Engineering', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'B.E. Artificial Intelligence and Machine Learning', '4 years', '10+2 with PCM, TG EAPCET', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'osmania-university-coe');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'How can I get admission into Osmania University College of Engineering?', 'Through TG EAPCET (the renamed successor to TS EAMCET) rank followed by centralized counselling conducted by the Telangana State Council of Higher Education — there is no separate institute entrance test.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'What makes this college distinctive?', 'Established in 1929, it is the oldest and largest engineering college in Telangana, and a constituent college of Osmania University with a very large alumni base across the public sector and IT industry.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'Where is the campus located?', 'Osmania University campus, Amberpet, Hyderabad - 500007, Telangana.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'osmania-university-coe'), 'What is the admissions contact?', 'webmaster@uceou.edu, phone 08331997138.', 3);
