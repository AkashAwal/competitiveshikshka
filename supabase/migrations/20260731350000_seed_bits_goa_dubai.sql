
-- BITS Pilani, K.K. Birla Goa Campus
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'BITS Pilani, K.K. Birla Goa Campus', 'Private', 'Engineering', 'Deemed', 'Tier 1', 'Zuarinagar', 'Goa', 'https://www.bits-pilani.ac.in/goa', 'BITS Pilani, K.K. Birla Goa Campus, NH-17B, Zuarinagar, Goa - 403726, India',
  'admissions.office@goa.bits-pilani.ac.in', '0832-2580126', 'BITS Pilani K.K. Birla Goa Campus was established in August 2004 as one of the constituent campuses of BITS Pilani (the parent institution founded in 1964 in Rajasthan), named after former BITS Chancellor Krishna Kumar Birla. It is a fully residential campus offering integrated undergraduate, postgraduate and doctoral programmes across ten academic departments. Admission is entirely through BITSAT (not JEE/JoSAA). BITS Pilani is recognized by UGC as an ''Institution of Eminence'' and is consistently rated the top private engineering institute in India by NIRF.', array['37,000 sq ft indoor sports complex (badminton, TT, squash, gym)','BCCI-maintained cricket ground and AIFF-approved football ground','25m x 12.5m swimming pool','Central Library with IEEE Xplore, ScienceDirect, ACM digital access','Computer Centre with 300+ networked workstations','Fully residential hostels (11 boys, 1 girls complex)','24x7 Medical Centre','On-campus supermarket, cafeteria, bank branches and ATMs'], 'Admission to the Integrated First Degree (B.E./B.Pharm/M.Sc.) programmes is solely through BITSAT, a computer-based test held in two sessions; JoSAA is not used. Candidates register at admission.bits-pilani.ac.in, sit BITSAT, submit Class 12 marks and campus/branch preferences, and are allotted seats purely by BITSAT score across the three Indian campuses (Pilani, Goa, Hyderabad).',
  'BITSAT', 11, 25.29, 22.28, null,
  82.1, 'Google, Microsoft, DE Shaw, Adobe, Deloitte, Dell, BCG, McKinsey', 2025, 'bits-goa'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'bits-goa') and name in ('B.E. Computer Science','B.E. Electronics and Computer Engineering','B.E. Electronics and Communication Engineering','B.E. Electrical and Electronics Engineering','B.E. Mechanical Engineering','B.E. Chemical Engineering','B.E. Electronics and Instrumentation Engineering','B.E. Environmental and Sustainability Engineering');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Computer Science', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~274 (2025, General)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Electronics and Computer Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~262 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Electronics and Communication Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~258 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Electrical and Electronics Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~243 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Mechanical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~220 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Chemical Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~210 (2025)', null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Electronics and Instrumentation Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-goa'), 'B.E. Environmental and Sustainability Engineering', '4 years', '10+2 with PCM, BITSAT', null, 25.29, 'BITSAT ~189 (2025)', null, null);
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-goa'), 2024, 20)
on conflict (college_id, year) do update set rank = excluded.rank;
insert into public.college_rankings (college_id, year, rank)
values ((select id from public.colleges where slug = 'bits-goa'), 2025, 11)
on conflict (college_id, year) do update set rank = excluded.rank;
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'bits-goa');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-goa'), 'Does BITS Pilani Goa Campus accept JEE scores?', 'No. Admission is exclusively via BITSAT; JEE Main/Advanced scores are not used for BITS Pilani campuses.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-goa'), 'Is BITS Pilani Goa a government or private institute?', 'It is a private deemed-to-be-university, recognized as an ''Institution of Eminence'' by the UGC but not a government-funded IIT/NIT.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-goa'), 'What is the minimum BITSAT score needed for Computer Science at Goa?', 'The final BITSAT 2025 cutoff for B.E. Computer Science at Goa Campus (General category) was 274.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-goa'), 'Is hostel accommodation compulsory at BITS Goa?', 'Yes, the campus is fully residential and hostel accommodation is provided to and expected of all enrolled students.', 3);

-- BITS Pilani, Dubai Campus
insert into public.colleges (
  name, type, field, ownership, tier, city, state, website, address,
  admission_email, phone, overview, campus_facilities, admission_process,
  accepts_exams, nirf_rank, avg_fees_lpa, avg_package_lpa, highest_package_lpa,
  placement_percentage, top_recruiters, placement_year, slug
) values (
  'BITS Pilani, Dubai Campus', 'Private', 'Engineering', 'Deemed', null, 'Dubai International Academic City', 'Dubai, UAE', 'https://www.bits-dubai.ac.ae', 'BITS Pilani Dubai Campus, Dubai International Academic City, P.O. Box 345055, Dubai, United Arab Emirates',
  'admission@bitspilanidubai.ae', '+9714-2753711', 'BITS Pilani Dubai Campus is the international campus of BITS Pilani, located in Dubai International Academic City on a roughly 14-acre site with five dedicated buildings. It is one of the largest institutions dedicated to Engineering and Technology in the UAE, with over 58% of students coming from outside the UAE. It offers 14 B.E. specializations, each including a 7.5-month industrial Practice School internship, some tailored to the UAE market such as Architectural & Urban Engineering and Robotics and Industrial Automation. As it is outside India, it is not covered by NIRF. Fees are charged in UAE Dirhams (AED): tuition is approximately AED 27,750 per regular semester (AY2026-27), with additional one-time admission, activity and caution-deposit fees.', array['Separate boys'' and girls'' hostels with mess and gym','Two-floor Library Block with cafeteria','Football, cricket, tennis and basketball grounds','Four-floor academic block with auditorium and conference halls','Mechanical Block with workshop and engineering labs','International Student Centre for counseling, advising and visa support'], 'Applicants apply online, pay an application fee (AED 220 incl. VAT), and submit Class 12/A-Level (or equivalent) mark sheets showing an overall aggregate of at least 60% with Physics, Mathematics and Chemistry/Biology. English proficiency is required (TOEFL iBT 61+ or IELTS 6.0+), waived for UAE MOE-curriculum graduates scoring 80%+ in English. BITSAT is optional, mainly to qualify for merit scholarships.',
  'Class 12/A-Level record + English proficiency (BITSAT optional, for scholarships)', null, null, null, null,
  80, 'AstraZeneca, PwC, Schindler, ESRI, Siemens, Zomato, Dabur, Aon', 2024, 'bits-dubai'
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

delete from public.college_courses where college_id = (select id from public.colleges where slug = 'bits-dubai') and name in ('B.E. Computer Science','B.E. Electronics and Communication Engineering','B.E. Electronics and Computer Engineering','B.E. Electrical and Electronics Engineering','B.E. Mechanical Engineering','B.E. Mechanical Engineering (Aerospace specialization)','B.E. Civil Engineering','B.E. Chemical Engineering','B.E. Chemical Engineering (Energy, Environment & Sustainability specialization)','B.E. Biotechnology','B.E. Architectural and Urban Engineering','B.E. Mathematics and Computing','B.E. Robotics and Industrial Automation');
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Computer Science', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Electronics and Communication Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Electronics and Computer Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Electrical and Electronics Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Mechanical Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Mechanical Engineering (Aerospace specialization)', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Civil Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Chemical Engineering', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Chemical Engineering (Energy, Environment & Sustainability specialization)', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Biotechnology', '4 years', 'Grade 12 with Physics, Biology, Chemistry, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Architectural and Urban Engineering', '4 years', 'Grade 12/equivalent, PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Mathematics and Computing', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
insert into public.college_courses (college_id, name, duration, eligibility, seats, fees_total_lpa, cutoff_general, cutoff_details, fees_details)
values ((select id from public.colleges where slug = 'bits-dubai'), 'B.E. Robotics and Industrial Automation', '4 years', 'Grade 12/equivalent, 60% aggregate PCM, English proficiency', null, null, null, null, null);
delete from public.college_faqs where college_id = (select id from public.colleges where slug = 'bits-dubai');
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-dubai'), 'Is BITSAT required to get into BITS Pilani Dubai?', 'No. BITSAT is optional for Dubai Campus admission — the primary basis is Class 12/A-Level academic performance plus English proficiency (TOEFL/IELTS); a BITSAT score can boost merit-scholarship eligibility.', 0);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-dubai'), 'Is BITS Dubai ranked by NIRF like the Indian campuses?', 'No. NIRF is an Indian government ranking framework and does not rank institutions outside India, so BITS Pilani Dubai Campus has no NIRF rank.', 1);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-dubai'), 'What currency are BITS Dubai fees charged in?', 'Fees are charged in UAE Dirhams (AED) — approximately AED 27,750 per regular semester in tuition for AY2026-27, plus hostel, activity and one-time fees.', 2);
insert into public.college_faqs (college_id, question, answer, sort_order)
values ((select id from public.colleges where slug = 'bits-dubai'), 'Does BITS Dubai offer the same engineering branches as the Indian campuses?', 'No — Dubai offers some UAE-market-oriented programmes such as Architectural & Urban Engineering and Robotics and Industrial Automation alongside common branches, and doesn''t offer every branch available in India.', 3);

