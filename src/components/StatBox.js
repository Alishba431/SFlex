import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function StatBox({ label, value, bg, color }) {
  return (
    <View style={[styles.box, { backgroundColor: bg }]}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    marginHorizontal: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
});
