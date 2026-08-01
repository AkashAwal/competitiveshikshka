
-- BITS Pilani, Pilani Campus
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'BITS Pilani, Pilani Campus', 'Private', 'Engineering', 'Deemed', 'Tier 1', 'Pilani', 'Rajasthan', 'https://www.bits-pilani.ac.in/pilani', 'Birla Institute of Technology & Science, Pilani Campus, Vidya Vihar, Pilani, Rajasthan - 333031, India',
  'bitsat@pilani.bits-pilani.ac.in', '01596-255294', 'BITS Pilani was established in 1964 as a deemed-to-be university, evolving from Birla Engineering College with technical collaboration input from MIT (USA) under a Ford Foundation grant. The Pilani campus, spread over roughly 328 acres in Rajasthan, is the original and flagship campus of the BITS Pilani group and is recognized by the Government of India as an Institution of Eminence. It admits students purely through BITSAT, not JEE/JoSAA, and is consistently ranked the top private engineering institute in India by NIRF.', array['13 academic departments','AI Centre and CREST research centre','Central Instrumentation Facility','Central Workshop','Medical Center','Central Library','Teaching Learning Centre','Residential campus with hostels for 4000+ students'], 'Admission is entirely through BITSAT (BITS Admission Test), a computer-based online test conducted by BITS Pilani itself — the campus does not participate in JEE/JoSAA counselling. After the test, eligible candidates submit branch/campus preferences (Pilani, Goa, Hyderabad); seats are allotted by BITSAT merit score through an iterative online allocation process.',
  'BITSAT', 11, 24.5, 19.7, 65,
  80.03, 'Google, Microsoft, Amazon, Adobe, Deloitte, Oracle, Dell, JPMorgan Chase', 2024, 'bits-pilani'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'bits-pilani') and name in ('B.E. Chemical Engineering','B.E. Civil Engineering','B.E. Computer Science','B.E. Electrical and Electronics Engineering','B.E. Electronics and Instrumentation Engineering','B.E. Electronics and Communication Engineering','B.E. Mathematics and Computing','B.E. Mechanical Engineering','B.E. Manufacturing Engineering','B.E. Environmental and Sustainability Engineering','B.Pharm.');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Chemical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Civil Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Computer Science', '4 years', '10+2 with PCM, BITSAT', null, 24.5, 'BITSAT ~304 (2025, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Electrical and Electronics Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Mathematics and Computing', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Manufacturing Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, 'Offered only at Pilani campus among the three Indian campuses', null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.E. Environmental and Sustainability Engineering', '4 years', '10+2 with PCM or PCB, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-pilani'), 'B.Pharm.', '4 years', '10+2 with PCB or PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-pilani'), 2023, 25)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-pilani'), 2024, 20)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-pilani'), 2025, 11)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'bits-pilani');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-pilani'), 'Does BITS Pilani (Pilani Campus) accept JEE scores?', 'No. Admission to BITS Pilani is solely through BITSAT, its own computer-based entrance test; it does not participate in JEE Main/Advanced counselling or JoSAA.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-pilani'), 'Is BITS Pilani a government institute like the IITs?', 'No. BITS Pilani is a private, deemed-to-be university. It is recognized as an Institution of Eminence by the Government of India but is privately run and charges significantly higher fees than government IITs/NITs.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-pilani'), 'How is the NIRF rank reported for BITS Pilani campuses?', 'NIRF publishes a single combined rank for ''BITS Pilani'' covering the Pilani, Goa and Hyderabad campuses together — it does not rank individual campuses separately. In NIRF 2025, this combined Engineering rank was 11.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-pilani'), 'Can I choose which BITS campus (Pilani/Goa/Hyderabad) I get after BITSAT?', 'Applicants submit branch-and-campus preferences after BITSAT, and allocation is by BITSAT merit score through an iterative online process; Pilani campus typically has the highest cutoffs of the three.', 3);

-- BITS Pilani, Hyderabad Campus
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'BITS Pilani, Hyderabad Campus', 'Private', 'Engineering', 'Deemed', 'Tier 1', 'Hyderabad', 'Telangana', 'https://www.bits-pilani.ac.in/hyderabad', 'Birla Institute of Technology & Science, Pilani, Hyderabad Campus, Jawahar Nagar, Kapra Mandal, Medchal District - 500078, Telangana, India',
  'gad@hyderabad.bits-pilani.ac.in', '040-66303999', 'BITS Pilani (the group) was founded in 1964; the Hyderabad campus is its newest Indian campus, established in 2008 with the first graduating batch in 2012. Spread over about 200 acres in Jawahar Nagar, Shameerpet, it is a fully residential campus roughly 70 km from Rajiv Gandhi International Airport. Like the Pilani campus, it is part of an Institution of Eminence and admits students only via BITSAT. The campus is known for strong sustainability infrastructure (rooftop solar, water recycling, biogas) alongside its engineering and pharmacy programs.', array['12 academic departments','Clean Room: Micro and Nano Fabrication Facility','Central Analytical Laboratory','Technology Business Incubator','On-campus housing for 6,000+ students','Medical Center and Library','949 KWp rooftop solar power plant','Sewage treatment and water recycling systems'], 'Admission is entirely through BITSAT, a computer-based test conducted centrally by BITS Pilani (not JEE/JoSAA). After the test, candidates submit branch/campus preferences (Pilani, Goa, Hyderabad) in an online application; seats are allotted by BITSAT merit score in an iterative process. Hyderabad campus cutoffs are typically the lowest of the three Indian campuses for shared branches.',
  'BITSAT', 11, 24.5, 20.78, null,
  81.01, 'Accenture, EY, IBM, General Electric, Volvo Eicher, Deloitte, TCS, Infosys', 2024, 'bits-hyderabad'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'bits-hyderabad') and name in ('B.E. Chemical Engineering','B.E. Civil Engineering','B.E. Computer Science','B.E. Electronics and Communication Engineering','B.E. Electrical and Electronics Engineering','B.E. Electronics and Instrumentation Engineering','B.E. Mathematics and Computing','B.E. Mechanical Engineering','B.E. Environmental and Sustainability Engineering','B.Pharm.');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Chemical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Civil Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Computer Science', '4 years', '10+2 with PCM, BITSAT', null, 24.5, 'BITSAT ~270 (2025, closing)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Electrical and Electronics Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Mathematics and Computing', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.E. Environmental and Sustainability Engineering', '4 years', '10+2 with PCM or PCB, BITSAT', null, 24.5, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'B.Pharm.', '4 years', '10+2 with PCB or PCM, BITSAT', null, 24.5, null, null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 2023, 25)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 2024, 20)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 2025, 11)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'bits-hyderabad');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'How is BITS Hyderabad different from BITS Pilani (Pilani Campus)?', 'Hyderabad is BITS Pilani''s newest Indian campus (established 2008 vs. 1964 for Pilani). It does not offer B.E. Manufacturing Engineering, which is exclusive to the Pilani campus, and its BITSAT cutoffs are generally the lowest of the three Indian campuses for the same branch.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'Is BITS Hyderabad''s placement report published separately from Pilani/Goa?', 'Yes, BITS publishes separate official campus-wise placement statistics for Pilani, Goa and Hyderabad, though it also issues a combined placement brochure covering all three campuses together.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'Does BITS Hyderabad accept JEE or state exam scores (e.g., TS EAMCET)?', 'No, for the standard B.E./B.Pharm./M.Sc. first-degree programmes, admission is via BITSAT only, regardless of the applicant''s home state.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-hyderabad'), 'What is the NIRF rank of BITS Hyderabad specifically?', 'NIRF does not rank BITS Hyderabad separately — it reports one combined ''BITS Pilani'' rank (11th in Engineering, NIRF 2025) that covers Pilani, Goa and Hyderabad campuses together.', 3);

