import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSearchParams, useRouter } from 'expo-router';
import { PatientHistory } from '../components/PatientHistory';
import { patientDetails } from '../utils/patientData';

const PatientDetails = () => {
  const { id } = useSearchParams();
  const router = useRouter();

  const patient = patientDetails[id];

  if (!patient) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Paciente não encontrado.</Text>
        <Button title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Paciente</Text>
      <Text style={styles.detail}>Nome: {patient.name}</Text>
      <Text style={styles.detail}>Idade: {patient.age}</Text>
      <PatientHistory history={patient.history} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
});

export default PatientDetails;