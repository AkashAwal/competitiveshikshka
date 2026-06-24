import { defineField, defineType } from "sanity";

export const ncertSolution = defineType({
  name: "ncertSolution",
  title: "NCERT Solution",
  type: "document",
  fields: [
    defineField({
      name: "class",
      title: "Class",
      type: "number",
      validation: (r) => r.required().min(6).max(12),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      options: {
        list: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology",
          "English",
          "Hindi",
          "History",
          "Geography",
          "Political Science",
          "Economics",
          "Accountancy",
          "Business Studies",
          "Computer Science",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "chapter",
      title: "Chapter Number",
      type: "number",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "chapterTitle",
      title: "Chapter Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "questions",
      title: "Questions & Answers",
      type: "array",
      of: [
        {
          type: "object",
          name: "questionAnswer",
          title: "Q&A",
          fields: [
            defineField({
              name: "questionNumber",
              title: "Question Number",
              type: "string",
              description: "e.g. 1, 2a, 2b, 3",
            }),
            defineField({
              name: "questionText",
              title: "Question",
              type: "array",
              of: [{ type: "block" }, { type: "image" }],
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: [{ type: "block" }, { type: "image" }],
            }),
          ],
          preview: {
            select: { title: "questionNumber" },
            prepare: ({ title }) => ({ title: `Question ${title}` }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      class: "class",
      subject: "subject",
      chapter: "chapter",
      chapterTitle: "chapterTitle",
    },
    prepare: ({ class: cls, subject, chapter, chapterTitle }) => ({
      title: `Class ${cls} ${subject} — Chapter ${chapter}`,
      subtitle: chapterTitle,
    }),
  },
  orderings: [
    {
      title: "Class, Subject, Chapter",
      name: "classThenSubjectThenChapter",
      by: [
        { field: "class", direction: "asc" },
        { field: "subject", direction: "asc" },
        { field: "chapter", direction: "asc" },
      ],
    },
  ],
});
