import { groq } from "next-sanity";

export const ncertSubjectsByClassQuery = groq`
  *[_type == "ncertSolution" && class == $class] | order(subject asc) {
    subject,
    "chapters": count(*[_type == "ncertSolution" && class == ^.class && subject == ^.subject])
  }
`;

export const ncertChaptersBySubjectQuery = groq`
  *[_type == "ncertSolution" && class == $class && subject == $subject] | order(chapter asc) {
    chapter,
    chapterTitle,
    "questionCount": count(questions)
  }
`;

export const ncertChapterQuery = groq`
  *[_type == "ncertSolution" && class == $class && subject == $subject && chapter == $chapter][0] {
    class,
    subject,
    chapter,
    chapterTitle,
    questions[] {
      questionNumber,
      questionText,
      answer,
      explanation,
      steps[] { stepTitle, content }
    }
  }
`;

export const ncertClassesQuery = groq`
  array::unique(*[_type == "ncertSolution"].class) | order(@ asc)
`;
