import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function EmptyState({ emoji, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  message: {
    color: colors.muted,
    textAlign: 'center',
  },
});
