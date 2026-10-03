import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  getCurrentPercent,
  getGrade,
  getObtainedMarks,
  getRemainingWeight,
  getRequiredPercent,
} from '../calculations';
import { colors } from '../theme';
import Card from './Card';
import FilterChip from './FilterChip';

const TARGETS = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

export default function GradePlanner({ marks }) {
  const [target, setTarget] = useState('B+');

  const obtained = getObtainedMarks(marks);
  const remaining = getRemainingWeight(marks);
  const current = getCurrentPercent(marks);

  // Everything is marked: just show the final result
  if (remaining === 0) {
    return (
      <Card title="Grade Planner">
        <Text style={styles.summary}>All assessments are marked.</Text>
        <Text style={styles.big}>
          {obtained.toFixed(1)} / 100 → {getGrade(obtained)}
        </Text>
      </Card>
    );
  }

  const required = getRequiredPercent(marks, target);

  let message;
  let bg;
  let color;
  if (required === 0) {
    message = `You have already secured ${target}! 🎉`;
    bg = colors.mint;
    color = colors.mintDark;
  } else if (required > 100) {
    message = `${target} is not possible anymore. Try a lower target.`;
    bg = colors.pink;
    color = colors.pinkDark;
  } else {
    const neededMarks = ((required * remaining) / 100).toFixed(1);
    message = `You need ${neededMarks} out of the remaining ${remaining} marks (${Math.ceil(required)}%).`;
    bg = required > 80 ? colors.peach : colors.sky;
    color = required > 80 ? colors.peachDark : colors.skyDark;
  }

  return (
    <Card title="Grade Planner">
      <Text style={styles.summary}>
        You have {obtained.toFixed(1)} marks so far
        {current === null ? '.' : ` (${current.toFixed(0)}%, grade ${getGrade(current)}).`}
      </Text>

      <Text style={styles.label}>Target grade</Text>
      <View style={styles.chips}>
        {TARGETS.map((grade) => (
          <FilterChip key={grade} label={grade} selected={grade === target} onPress={() => setTarget(grade)} />
        ))}
      </View>

      <View style={[styles.result, { backgroundColor: bg }]}>
        <Text style={[styles.resultText, { color }]}>{message}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  summary: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 12,
  },
  big: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.lavenderDark,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  result: {
    borderRadius: 14,
    padding: 12,
    marginTop: 6,
  },
  resultText: {
    fontWeight: '700',
    lineHeight: 20,
  },
});
