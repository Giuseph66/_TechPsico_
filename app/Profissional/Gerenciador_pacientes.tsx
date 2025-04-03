import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const initialPatients = [
  { id: '1', name: 'João Silva', age: 30 },
  { id: '2', name: 'Maria Oliveira', age: 25 },
  { id: '3', name: 'Carlos Santos', age: 40 },
];

const PatientManager = () => {
  const [patients, setPatients] = useState(initialPatients);
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.patientContainer}>
      <Text style={styles.patientName}>{item.name}</Text>
      <Text>Idade: {item.age}</Text>
      <Button
        title="Ver Detalhes"
        onPress={() => router.push(`/Profissional/paciente/Detalhes_paciente?id=${item.id}`)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Pacientes</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: {
    paddingBottom: 20,
  },
  patientContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default PatientManager;
