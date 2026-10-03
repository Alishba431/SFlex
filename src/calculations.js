import { ASSESSMENTS, GRADES, MIN_ATTENDANCE, WARNING_ATTENDANCE } from './constants';

// ---------- Attendance ----------

export function getAttendance(course) {
  if (course.held === 0) return 100;
  return Math.floor((course.attended / course.held) * 100);
}

export function getStatus(course) {
  const percent = getAttendance(course);
  if (percent < MIN_ATTENDANCE) return 'danger';
  if (percent < WARNING_ATTENDANCE) return 'warning';
  return 'safe';
}

// How many more classes can be missed and still stay at MIN_ATTENDANCE
export function classesCanMiss(course) {
  const result = Math.floor((course.attended * 100) / MIN_ATTENDANCE - course.held);
  return Math.max(0, result);
}

// How many classes in a row must be attended to get back to MIN_ATTENDANCE
export function classesToRecover(course) {
  const result = Math.ceil((MIN_ATTENDANCE * course.held - 100 * course.attended) / (100 - MIN_ATTENDANCE));
  return Math.max(0, result);
}

export function attendanceMessage(course) {
  if (getStatus(course) === 'danger') {
    const needed = classesToRecover(course);
    return `Attend the next ${needed} ${needed === 1 ? 'class' : 'classes'} to reach ${MIN_ATTENDANCE}%`;
  }
  const canMiss = classesCanMiss(course);
  if (canMiss === 0) return 'You cannot miss any more classes';
  return `You can still miss ${canMiss} ${canMiss === 1 ? 'class' : 'classes'}`;
}

// ---------- Marks ----------

// Marks (out of the assessment's weight) for one assessment, or null if not marked yet.
// For quizzes/assignments every item counts equally:
// average of (obtained / total) for all items, scaled to the weight.
export function getAssessmentMarks(marks, assessment) {
  const value = marks[assessment.key];
  if (assessment.type === 'list') {
    if (value.length === 0) return null;
    const totalPercent = value.reduce((sum, item) => sum + item.obtained / item.total, 0);
    return (totalPercent / value.length) * assessment.weight;
  }
  return value;
}

// Only assessments that have been marked
function markedAssessments(marks) {
  return ASSESSMENTS.filter((a) => getAssessmentMarks(marks, a) !== null);
}

export function getObtainedMarks(marks) {
  return markedAssessments(marks).reduce((sum, a) => sum + getAssessmentMarks(marks, a), 0);
}

export function getMarkedWeight(marks) {
  return markedAssessments(marks).reduce((sum, a) => sum + a.weight, 0);
}

export function getRemainingWeight(marks) {
  return 100 - getMarkedWeight(marks);
}

// Percentage so far, or null if nothing has been marked
export function getCurrentPercent(marks) {
  const weight = getMarkedWeight(marks);
  if (weight === 0) return null;
  return (getObtainedMarks(marks) / weight) * 100;
}

export function getGrade(percent) {
  return GRADES.find((g) => percent >= g.min).grade;
}

// % needed in the remaining assessments to reach a target grade
export function getRequiredPercent(marks, targetGrade) {
  const target = GRADES.find((g) => g.grade === targetGrade).min;
  const needed = target - getObtainedMarks(marks);
  const remaining = getRemainingWeight(marks);
  if (needed <= 0) return 0;
  if (remaining === 0) return Infinity;
  return (needed / remaining) * 100;
}
