import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ASSESSMENTS } from '../constants';
import { colors } from '../theme';
import Card from './Card';

// Quizzes and assignments have their own ScoreList, this form handles the rest
const SINGLE_ASSESSMENTS = ASSESSMENTS.filter((a) => a.type === 'single');

// Turns the saved marks into text for the inputs (null becomes an empty box)
function marksToText(marks) {
  const text = {};
  SINGLE_ASSESSMENTS.forEach((a) => {
    text[a.key] = marks[a.key] === null ? '' : String(marks[a.key]);
  });
  return text;
}

export default function MarksForm({ course, onSave }) {
  const [inputs, setInputs] = useState(marksToText(course.marks));
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function handleChange(key, value) {
    setInputs({ ...inputs, [key]: value });
    setErrors({ ...errors, [key]: null });
    setSaved(false);
  }

  function handleSave() {
    const newMarks = {};
    const newErrors = {};

    SINGLE_ASSESSMENTS.forEach((a) => {
      const text = inputs[a.key].trim();
      const value = Number(text);

      if (text === '') {
        newMarks[a.key] = null; // not marked yet
      } else if (isNaN(value) || value < 0 || value > a.weight) {
        newErrors[a.key] = `Enter a number from 0 to ${a.weight}`;
      } else {
        newMarks[a.key] = value;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSave(course.id, newMarks);
    setSaved(true);
  }

  return (
    <Card title="Sessionals, Project & Final">
      <Text style={styles.hint}>Leave a box empty if it hasn't been marked yet.</Text>

      {SINGLE_ASSESSMENTS.map((a) => (
        <View key={a.key} style={styles.field}>
          <View style={styles.row}>
            <Text style={styles.label}>{a.label}</Text>
            <TextInput
              style={[styles.input, errors[a.key] && styles.inputError]}
              value={inputs[a.key]}
              onChangeText={(value) => handleChange(a.key, value)}
              keyboardType="numeric"
              maxLength={4}
              placeholder="–"
              placeholderTextColor={colors.muted}
            />
            <Text style={styles.outOf}>/ {a.weight}</Text>
          </View>
          {errors[a.key] ? <Text style={styles.error}>{errors[a.key]}</Text> : null}
        </View>
      ))}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Marks</Text>
      </Pressable>
      {saved ? <Text style={styles.savedText}>Marks saved ✓</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 10,
  },
  field: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  input: {
    width: 70,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.pinkDark,
    backgroundColor: colors.pink,
  },
  outOf: {
    width: 40,
    marginLeft: 8,
    color: colors.muted,
  },
  error: {
    color: colors.pinkDark,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: colors.lavender,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  saveText: {
    color: colors.lavenderDark,
    fontSize: 16,
    fontWeight: '800',
  },
  savedText: {
    color: colors.mintDark,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '700',
  },
});
