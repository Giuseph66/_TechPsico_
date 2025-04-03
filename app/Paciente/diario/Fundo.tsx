import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const thoughts = [
  'Acredite em você mesmo.',
  'Cada dia é uma nova oportunidade.',
  'Seja gentil consigo mesmo.',
  'Você é mais forte do que imagina.',
];

export default function Fundo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pensamentos do Dia</Text>
      {thoughts.map((thought, index) => (
        <Text key={index} style={styles.thought}>
          - {thought}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  thought: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
