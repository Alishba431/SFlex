import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import AttendanceBox from '../components/AttendanceBox';
import GradePlanner from '../components/GradePlanner';
import Header from '../components/Header';
import MarksForm from '../components/MarksForm';
import ScoreList from '../components/ScoreList';
import { ASSESSMENTS } from '../constants';

const QUIZZES = ASSESSMENTS.find((a) => a.key === 'quizzes');
const ASSIGNMENTS = ASSESSMENTS.find((a) => a.key === 'assignments');

export default function CourseScreen({ course, onBack, onMarkAttendance, onSaveMarks }) {
  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Header title={course.code} subtitle={course.title} onBack={onBack} />
        <AttendanceBox course={course} onMark={onMarkAttendance} />
        <GradePlanner marks={course.marks} />
        <ScoreList
          assessment={QUIZZES}
          itemName="Quiz"
          marks={course.marks}
          onChange={(list) => onSaveMarks(course.id, { quizzes: list })}
        />
        <ScoreList
          assessment={ASSIGNMENTS}
          itemName="Assignment"
          marks={course.marks}
          onChange={(list) => onSaveMarks(course.id, { assignments: list })}
        />
        <MarksForm course={course} onSave={onSaveMarks} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
});
