import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { getAssessmentMarks } from '../calculations';
import { colors } from '../theme';
import Card from './Card';

// Used for both Quizzes and Assignments.
// assessment = item from ASSESSMENTS, itemName = 'Quiz' or 'Assignment'
export default function ScoreList({ assessment, itemName, marks, onChange }) {
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('10');
  const [error, setError] = useState('');

  const items = marks[assessment.key];
  const categoryMarks = getAssessmentMarks(marks, assessment);

  function handleAdd() {
    const obtainedNum = Number(obtained);
    const totalNum = Number(total);

    if (obtained.trim() === '' || total.trim() === '') {
      setError('Please fill both boxes');
    } else if (isNaN(obtainedNum) || isNaN(totalNum)) {
      setError('Only numbers are allowed');
    } else if (totalNum <= 0) {
      setError('Total must be more than 0');
    } else if (obtainedNum < 0 || obtainedNum > totalNum) {
      setError(`Obtained must be between 0 and ${totalNum}`);
    } else {
      onChange([...items, { id: Date.now(), obtained: obtainedNum, total: totalNum }]);
      setObtained('');
      setError('');
    }
  }

  function handleRemove(id) {
    onChange(items.filter((item) => item.id !== id));
  }

  return (
    <Card title={`${assessment.label} (${assessment.weight}%)`}>
      <Text style={styles.summary}>
        {categoryMarks === null
          ? `No ${itemName.toLowerCase()}s added yet`
          : `${categoryMarks.toFixed(1)} / ${assessment.weight} from ${items.length} ${itemName.toLowerCase()}(s)`}
      </Text>

      {items.map((item, index) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemName}>
            {itemName} {index + 1}
          </Text>
          <Text style={styles.itemScore}>
            {item.obtained} / {item.total}
          </Text>
          <Pressable onPress={() => handleRemove(item.id)} hitSlop={10}>
            <Text style={styles.remove}>✕</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={obtained}
          onChangeText={(text) => {
            setObtained(text);
            setError('');
          }}
          placeholder="Got"
          placeholderTextColor={colors.muted}
          keyboardType="numeric"
          maxLength={5}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          style={styles.input}
          value={total}
          onChangeText={(text) => {
            setTotal(text);
            setError('');
          }}
          placeholder="Total"
          placeholderTextColor={colors.muted}
          keyboardType="numeric"
          maxLength={5}
        />
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>+ Add</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  summary: {
    fontSize: 13,
    color: colors.muted,
    marginTop: -4,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  itemName: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  itemScore: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.lavenderDark,
    marginRight: 14,
  },
  remove: {
    fontSize: 16,
    color: colors.pinkDark,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  input: {
    width: 64,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
  slash: {
    marginHorizontal: 6,
    color: colors.muted,
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.lavender,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addText: {
    color: colors.lavenderDark,
    fontWeight: '800',
  },
  error: {
    color: colors.pinkDark,
    fontSize: 12,
    marginTop: 6,
  },
});
