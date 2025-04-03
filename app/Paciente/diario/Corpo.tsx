import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Corpo() {
  const [entry, setEntry] = useState('');

  const saveEntry = () => {
    if (!entry.trim()) {
      Alert.alert('Erro', 'O diário não pode estar vazio.');
      return;
    }

    // Salvar o texto do diário (pode ser integrado com uma API ou armazenamento local)
    Alert.alert('Sucesso', 'Entrada salva com sucesso!');
    setEntry('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escreva no seu Diário</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Digite aqui seus pensamentos..."
        multiline
        value={entry}
        onChangeText={setEntry}
      />
      <Button title="Salvar" onPress={saveEntry} />
    </View>
  );
}

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
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
});
