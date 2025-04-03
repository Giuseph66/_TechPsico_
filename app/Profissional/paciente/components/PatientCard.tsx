import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function PatientCard({ patient, onPressDetails }: { patient: any; onPressDetails: () => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{patient.name}</Text>
      <Text>Idade: {patient.age}</Text>
      <Button title="Ver Detalhes" onPress={onPressDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PatientCard;
