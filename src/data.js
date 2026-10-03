export const STUDENT = {
  name: 'Ali',
  rollNo: '22I-1234',
  semester: 'Fall 2026 · Semester 7',
};

// quizzes / assignments: list of { id, obtained, total } — they share the weight equally.
// Other marks are out of their weight (e.g. sessional1 out of 15). null = not marked yet.
export const COURSES = [
  {
    id: 1,
    code: 'CS4041',
    title: 'Software for Mobile Devices',
    held: 20,
    attended: 18,
    marks: {
      quizzes: [
        { id: 1, obtained: 9, total: 10 },
        { id: 2, obtained: 8, total: 10 },
      ],
      assignments: [{ id: 1, obtained: 45, total: 50 }],
      sessional1: 12,
      sessional2: null,
      project: null,
      final: null,
    },
  },
  {
    id: 2,
    code: 'CS4072',
    title: 'Information Security',
    held: 20,
    attended: 15,
    marks: {
      quizzes: [
        { id: 1, obtained: 6, total: 10 },
        { id: 2, obtained: 5, total: 10 },
        { id: 3, obtained: 7, total: 10 },
      ],
      assignments: [{ id: 1, obtained: 14, total: 20 }],
      sessional1: 8.5,
      sessional2: null,
      project: null,
      final: null,
    },
  },
  {
    id: 3,
    code: 'CS3006',
    title: 'Parallel & Distributed Computing',
    held: 18,
    attended: 15,
    marks: {
      quizzes: [
        { id: 1, obtained: 7, total: 10 },
        { id: 2, obtained: 8, total: 10 },
        { id: 3, obtained: 6, total: 10 },
      ],
      assignments: [
        { id: 1, obtained: 40, total: 50 },
        { id: 2, obtained: 16, total: 20 },
      ],
      sessional1: 10,
      sessional2: 11,
      project: null,
      final: null,
    },
  },
  {
    id: 4,
    code: 'CS4063',
    title: 'Natural Language Processing',
    held: 8,
    attended: 8,
    marks: {
      quizzes: [],
      assignments: [],
      sessional1: null,
      sessional2: null,
      project: null,
      final: null,
    },
  },
  {
    id: 5,
    code: 'MG4011',
    title: 'Entrepreneurship',
    held: 14,
    attended: 13,
    marks: {
      quizzes: [{ id: 1, obtained: 9, total: 10 }],
      assignments: [],
      sessional1: 13,
      sessional2: null,
      project: null,
      final: null,
    },
  },
];
