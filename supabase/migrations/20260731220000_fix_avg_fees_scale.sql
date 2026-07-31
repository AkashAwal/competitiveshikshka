-- avg_fees_lpa represents total 4-year B.Tech cost (matching the display
-- convention and college_courses.fees_total_lpa), but 8 colleges were
-- accidentally seeded with the annual tuition figure instead. Correct to
-- the total figure, matching each college's own course-level fees where set.
update public.colleges set avg_fees_lpa = 8.0 where slug = 'iit-dhanbad';
update public.colleges set avg_fees_lpa = 8.0 where slug = 'iit-palakkad';
update public.colleges set avg_fees_lpa = 8.24 where slug = 'iit-mandi';
update public.colleges set avg_fees_lpa = 8.6 where slug = 'iit-bhu-varanasi';
update public.colleges set avg_fees_lpa = 8.8 where slug = 'iit-patna';
update public.colleges set avg_fees_lpa = 9.6 where slug = 'iit-gandhinagar';
update public.colleges set avg_fees_lpa = 10.2 where slug = 'iit-kharagpur';
update public.colleges set avg_fees_lpa = 12.87 where slug = 'iit-kanpur';
