import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function PatientHistory({ history }: { history: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico Médico</Text>
      <Text style={styles.text}>{history}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default PatientHistory;
