import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { COURSES } from './src/data';
import CourseScreen from './src/screens/CourseScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme';

export default function App() {
  const [courses, setCourses] = useState(COURSES);
  const [screen, setScreen] = useState('home'); // 'home' | 'courses' | 'course'
  const [selectedId, setSelectedId] = useState(null);

  function openCourse(id) {
    setSelectedId(id);
    setScreen('course');
  }

  function markAttendance(id, present) {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, held: c.held + 1, attended: present ? c.attended + 1 : c.attended } : c
      )
    );
  }

  // changes = only the marks that changed, e.g. { quizzes: [...] } or { sessional1: 12 }
  function saveMarks(id, changes) {
    setCourses(courses.map((c) => (c.id === id ? { ...c, marks: { ...c.marks, ...changes } } : c)));
  }

  // Switch views using state (no navigation library)
  let content;
  if (screen === 'courses') {
    content = <CoursesScreen courses={courses} onBack={() => setScreen('home')} onOpenCourse={openCourse} />;
  } else if (screen === 'course') {
    content = (
      <CourseScreen
        course={courses.find((c) => c.id === selectedId)}
        onBack={() => setScreen('courses')}
        onMarkAttendance={markAttendance}
        onSaveMarks={saveMarks}
      />
    );
  } else {
    content = (
      <HomeScreen courses={courses} onOpenCourses={() => setScreen('courses')} onOpenCourse={openCourse} />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        {content}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
