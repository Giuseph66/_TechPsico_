import React, { useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';

const initialCases = [
  { id: '1', title: 'Caso 1', description: 'Descrição do caso 1', status: 'Aberto' },
  { id: '2', title: 'Caso 2', description: 'Descrição do caso 2', status: 'Em andamento' },
  { id: '3', title: 'Caso 3', description: 'Descrição do caso 3', status: 'Fechado' },
];

const ManageCasesScreen = () => {
  const [cases, setCases] = useState(initialCases);

  const updateCaseStatus = (id, newStatus) => {
    setCases(prevCases =>
      prevCases.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleMarkAsClosed = (id) => {
    Alert.alert(
      "Confirmar",
      "Deseja marcar este caso como Fechado?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: () => updateCaseStatus(id, "Fechado") },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.caseContainer}>
      <Text style={styles.caseTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.caseStatus}>Status: {item.status}</Text>
      {item.status !== 'Fechado' && (
        <Button title="Marcar como Fechado" onPress={() => handleMarkAsClosed(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Casos</Text>
      <FlatList
        data={cases}
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
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  caseContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  caseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caseStatus: {
    marginBottom: 10,
    fontStyle: 'italic',
  },
});

export default ManageCasesScreen;
