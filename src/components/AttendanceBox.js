import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { attendanceMessage, getAttendance, getStatus } from '../calculations';
import { MIN_ATTENDANCE } from '../constants';
import { colors, statusStyles } from '../theme';
import Card from './Card';
import ProgressBar from './ProgressBar';

export default function AttendanceBox({ course, onMark }) {
  const attendance = getAttendance(course);
  const status = statusStyles[getStatus(course)];

  return (
    <Card title="Attendance">
      <Text style={[styles.percent, { color: status.text }]}>{attendance}%</Text>
      <ProgressBar percent={attendance} color={status.bar} />
      <Text style={styles.details}>
        Attended {course.attended} of {course.held} classes · minimum {MIN_ATTENDANCE}%
      </Text>

      <View style={[styles.messageBox, { backgroundColor: status.bg }]}>
        <Text style={[styles.message, { color: status.text }]}>{attendanceMessage(course)}</Text>
      </View>

      <Text style={styles.question}>Did you attend today's class?</Text>
      <View style={styles.buttons}>
        <Pressable style={[styles.button, { backgroundColor: colors.mint }]} onPress={() => onMark(course.id, true)}>
          <Text style={[styles.buttonText, { color: colors.mintDark }]}>✓ Present</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: colors.pink }]} onPress={() => onMark(course.id, false)}>
          <Text style={[styles.buttonText, { color: colors.pinkDark }]}>✗ Absent</Text>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  percent: {
    fontSize: 36,
    fontWeight: '800',
  },
  details: {
    fontSize: 13,
    color: colors.muted,
  },
  messageBox: {
    borderRadius: 14,
    padding: 12,
    marginTop: 12,
  },
  message: {
    fontWeight: '700',
  },
  question: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
