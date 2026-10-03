import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { attendanceMessage, getAttendance, getCurrentPercent, getStatus } from '../calculations';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import StatBox from '../components/StatBox';
import { MIN_ATTENDANCE } from '../constants';
import { STUDENT } from '../data';
import { chartConfig, colors, statusStyles } from '../theme';

export default function HomeScreen({ courses, onOpenCourses, onOpenCourse }) {
  const { width } = useWindowDimensions();
  const chartWidth = width - 64;

  // ----- Summary numbers -----
  const averageAttendance =
    courses.length === 0
      ? 0
      : Math.round(courses.reduce((sum, c) => sum + getAttendance(c), 0) / courses.length);

  const atRisk = courses.filter((c) => getStatus(c) === 'danger');

  const gradedCourses = courses.filter((c) => getCurrentPercent(c.marks) !== null);
  const averageMarks =
    gradedCourses.length === 0
      ? null
      : Math.round(gradedCourses.reduce((sum, c) => sum + getCurrentPercent(c.marks), 0) / gradedCourses.length);

  // Courses that are not safe, lowest attendance first
  const warnings = courses
    .filter((c) => getStatus(c) !== 'safe')
    .sort((a, b) => getAttendance(a) - getAttendance(b));

  // ----- Chart data -----
  const barData = {
    labels: courses.map((c) => c.code),
    datasets: [
      {
        data: courses.map((c) => getAttendance(c)),
        colors: courses.map((c) => () => statusStyles[getStatus(c)].bar),
      },
    ],
  };

  const pieData = ['safe', 'warning', 'danger']
    .map((status) => ({
      name: statusStyles[status].label,
      count: courses.filter((c) => getStatus(c) === status).length,
      color: statusStyles[status].bar,
      legendFontColor: colors.text,
      legendFontSize: 13,
    }))
    .filter((slice) => slice.count > 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title={`Hi ${STUDENT.name} 🌸`} subtitle={`${STUDENT.rollNo} · ${STUDENT.semester}`} />

      <View style={styles.stats}>
        <StatBox label="Avg attendance" value={`${averageAttendance}%`} bg={colors.lavender} color={colors.lavenderDark} />
        <StatBox label="At risk" value={atRisk.length} bg={colors.pink} color={colors.pinkDark} />
        <StatBox
          label="Avg marks"
          value={averageMarks === null ? '–' : `${averageMarks}%`}
          bg={colors.mint}
          color={colors.mintDark}
        />
      </View>

      <Card title="Needs attention">
        {warnings.length === 0 ? (
          <EmptyState emoji="✨" message="All your courses are above the attendance limit!" />
        ) : (
          warnings.map((course) => {
            const status = statusStyles[getStatus(course)];
            return (
              <Pressable
                key={course.id}
                style={[styles.warning, { backgroundColor: status.bg }]}
                onPress={() => onOpenCourse(course.id)}
              >
                <Text style={[styles.warningTitle, { color: status.text }]}>
                  {course.code} · {getAttendance(course)}%
                </Text>
                <Text style={styles.warningText}>{attendanceMessage(course)}</Text>
              </Pressable>
            );
          })
        )}
      </Card>

      <Pressable style={styles.coursesButton} onPress={onOpenCourses}>
        <Text style={styles.coursesButtonText}>📚 View all courses ({courses.length})</Text>
      </Pressable>

      {courses.length === 0 ? (
        <EmptyState emoji="📊" message="No courses to show in charts." />
      ) : (
        <>
          <Card title="Attendance by course">
            <Text style={styles.caption}>Pink bars are below {MIN_ATTENDANCE}%</Text>
            <BarChart
              data={barData}
              width={chartWidth}
              height={220}
              fromZero
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={chartConfig}
              withCustomBarColorFromData
              flatColor
              showValuesOnTopOfBars
              withInnerLines={false}
              style={styles.chart}
            />
          </Card>

          <Card title="Course status">
            <PieChart
              data={pieData}
              width={chartWidth}
              height={180}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="10"
              chartConfig={chartConfig}
              absolute
            />
          </Card>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 14,
  },
  warning: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  warningTitle: {
    fontWeight: '800',
    fontSize: 15,
  },
  warningText: {
    color: colors.text,
    marginTop: 2,
  },
  coursesButton: {
    backgroundColor: colors.lavender,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  coursesButtonText: {
    color: colors.lavenderDark,
    fontSize: 16,
    fontWeight: '800',
  },
  caption: {
    color: colors.muted,
    fontSize: 13,
    marginTop: -6,
    marginBottom: 8,
  },
  chart: {
    marginLeft: -10,
  },
});
