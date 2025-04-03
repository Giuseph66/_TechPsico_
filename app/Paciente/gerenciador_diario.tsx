import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GerenciadorDiario() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciador de Diário</Text>
      <Text>Funcionalidade em desenvolvimento...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
