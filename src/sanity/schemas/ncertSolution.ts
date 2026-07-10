import { defineField, defineType } from "sanity";

const equationType = {
  type: "object",
  name: "equation",
  title: "Equation",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX",
      type: "text",
      description: "LaTeX source, e.g. \\frac{P_1 V_1}{V_2}",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "latex" },
    prepare: ({ title }: { title?: string }) => ({ title: `∑ ${title ?? ""}` }),
  },
};

// A standalone equation (above) always renders on its own centered line —
// right for a full derivation step, wrong for a short formula embedded mid-
// sentence ("the molar mass of H2O is..."). This variant is a `block` child
// (declared via `of` below), so it renders inline within the paragraph flow
// instead of breaking it into a new block.
const inlineEquationType = {
  type: "object",
  name: "inlineEquation",
  title: "Inline Equation",
  fields: [
    defineField({
      name: "latex",
      title: "LaTeX",
      type: "text",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "latex" },
    prepare: ({ title }: { title?: string }) => ({ title: `∑ ${title ?? ""}` }),
  },
};

const richTextOf = [{ type: "block", of: [inlineEquationType] }, { type: "image" }, equationType];
const plainTextOf = [{ type: "block", of: [inlineEquationType] }, equationType];

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
              of: richTextOf,
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: richTextOf,
            }),
            defineField({
              name: "explanation",
              title: "Explanation (Why it works)",
              type: "array",
              of: plainTextOf,
              description: "Plain English explanation of the concept behind the answer",
            }),
            defineField({
              name: "steps",
              title: "Step-by-Step Breakdown",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "step",
                  fields: [
                    defineField({ name: "stepTitle", title: "Step Title", type: "string" }),
                    defineField({ name: "content", title: "Content", type: "array", of: plainTextOf }),
                  ],
                  preview: { select: { title: "stepTitle" } },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "questionNumber" },
            prepare: ({ title }) => ({ title: `Question ${title}` }),
          },
        },
      ],
    }),
    defineField({
      name: "examples",
      title: "Worked Examples",
      type: "array",
      of: [
        {
          type: "object",
          name: "workedExample",
          title: "Example",
          fields: [
            defineField({
              name: "questionNumber",
              title: "Example Number",
              type: "string",
              description: "e.g. P1.1, Ex1, DA-1",
            }),
            defineField({
              name: "questionText",
              title: "Problem",
              type: "array",
              of: richTextOf,
            }),
            defineField({
              name: "answer",
              title: "Solution",
              type: "array",
              of: richTextOf,
            }),
            defineField({
              name: "explanation",
              title: "Explanation (Why it works)",
              type: "array",
              of: plainTextOf,
            }),
            defineField({
              name: "steps",
              title: "Step-by-Step Breakdown",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "exampleStep",
                  fields: [
                    defineField({ name: "stepTitle", title: "Step Title", type: "string" }),
                    defineField({ name: "content", title: "Content", type: "array", of: plainTextOf }),
                  ],
                  preview: { select: { title: "stepTitle" } },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "questionNumber" },
            prepare: ({ title }) => ({ title: `Example ${title}` }),
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
