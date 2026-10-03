import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { attendanceMessage, getAttendance, getCurrentPercent, getGrade, getStatus } from '../calculations';
import { colors, statusStyles } from '../theme';
import ProgressBar from './ProgressBar';

export default function CourseCard({ course, onPress }) {
  const attendance = getAttendance(course);
  const status = statusStyles[getStatus(course)];
  const percent = getCurrentPercent(course.marks);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.row}>
        <View style={styles.titleBox}>
          <Text style={styles.code}>{course.code}</Text>
          <Text style={styles.title}>{course.title}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: status.bg }]}>
          <Text style={[styles.badgeText, { color: status.text }]}>{status.label}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.attendance, { color: status.text }]}>{attendance}%</Text>
        <Text style={styles.grade}>
          {percent === null ? 'No marks yet' : `Grade so far: ${getGrade(percent)}`}
        </Text>
      </View>
      <ProgressBar percent={attendance} color={status.bar} />
      <Text style={styles.message}>{attendanceMessage(course)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBox: {
    flex: 1,
    marginRight: 8,
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.muted,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  attendance: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
  },
  grade: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 10,
  },
  message: {
    fontSize: 13,
    color: colors.text,
  },
});
