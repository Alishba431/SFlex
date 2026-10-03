import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { getAttendance, getStatus } from '../calculations';
import CourseCard from '../components/CourseCard';
import EmptyState from '../components/EmptyState';
import FilterChip from '../components/FilterChip';
import Header from '../components/Header';
import { colors } from '../theme';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'danger', label: 'At risk' },
  { key: 'warning', label: 'Borderline' },
  { key: 'safe', label: 'Safe' },
];

export default function CoursesScreen({ courses, onBack, onOpenCourse }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const text = search.trim().toLowerCase();

  const visibleCourses = courses
    .filter((c) => c.code.toLowerCase().includes(text) || c.title.toLowerCase().includes(text))
    .filter((c) => filter === 'all' || getStatus(c) === filter)
    .sort((a, b) => getAttendance(a) - getAttendance(b)); // lowest attendance first

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Header title="My Courses" subtitle="Tap a course to see details" onBack={onBack} />

      <TextInput
        style={styles.search}
        value={search}
        onChangeText={setSearch}
        placeholder="🔍 Search by code or name"
        placeholderTextColor={colors.muted}
        autoCorrect={false}
      />

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <FilterChip key={f.key} label={f.label} selected={filter === f.key} onPress={() => setFilter(f.key)} />
        ))}
      </View>

      {visibleCourses.length === 0 ? (
        <EmptyState emoji="🔎" message="No courses match your search." />
      ) : (
        visibleCourses.map((course) => (
          <CourseCard key={course.id} course={course} onPress={() => onOpenCourse(course.id)} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  search: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
});
