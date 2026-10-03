// Minimum attendance needed to sit the final exam
export const MIN_ATTENDANCE = 80;

// Below this (but above MIN_ATTENDANCE) a course is "Borderline"
export const WARNING_ATTENDANCE = 85;

// FAST marks distribution (total = 100)
// 'list' = many items (Quiz 1, Quiz 2...) that share the weight equally
// 'single' = one mark entered out of the weight
export const ASSESSMENTS = [
  { key: 'quizzes', label: 'Quizzes', weight: 10, type: 'list' },
  { key: 'sessional1', label: 'Sessional 1', weight: 15, type: 'single' },
  { key: 'sessional2', label: 'Sessional 2', weight: 15, type: 'single' },
  { key: 'assignments', label: 'Assignments', weight: 10, type: 'list' },
  { key: 'project', label: 'Project', weight: 10, type: 'single' },
  { key: 'final', label: 'Final Exam', weight: 40, type: 'single' },
];

// Grading scale, highest first
export const GRADES = [
  { grade: 'A', min: 86 },
  { grade: 'A-', min: 82 },
  { grade: 'B+', min: 78 },
  { grade: 'B', min: 74 },
  { grade: 'B-', min: 70 },
  { grade: 'C+', min: 66 },
  { grade: 'C', min: 62 },
  { grade: 'C-', min: 58 },
  { grade: 'D+', min: 54 },
  { grade: 'D', min: 50 },
  { grade: 'F', min: 0 },
];
