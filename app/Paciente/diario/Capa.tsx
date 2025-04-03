import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';

export default function Capa() {
  const router = useRouter();

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Erro', 'Dispositivo não suporta autenticação biométrica.');
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Erro', 'Nenhuma biometria ou rosto cadastrado.');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autentique-se para acessar o diário',
    });

    if (result.success) {
      router.push('./Corpo');
    } else {
      Alert.alert('Erro', 'Autenticação falhou.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Diário</Text>
      <Button title="Tentar novamente" onPress={authenticate} />
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
