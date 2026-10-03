import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

export default function ProgressBar({ percent, color }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(percent, 100)}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  fill: {
    height: 10,
    borderRadius: 5,
  },
});
