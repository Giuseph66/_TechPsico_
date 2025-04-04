import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Dimensions, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const patientDetails = {
  '1': { 
    name: 'João Silva', 
    age: 30, 
    history: 'Histórico médico do João.',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    lastAppointment: '15/03/2024',
    nextAppointment: '22/03/2024'
  },
  '2': { 
    name: 'Maria Oliveira', 
    age: 25, 
    history: 'Histórico médico da Maria.',
    email: 'maria@email.com',
    phone: '(11) 98888-8888',
    address: 'Av. Paulista, 1000 - São Paulo/SP',
    lastAppointment: '14/03/2024',
    nextAppointment: '21/03/2024'
  },
  '3': { 
    name: 'Carlos Santos', 
    age: 40, 
    history: 'Histórico médico do Carlos.',
    email: 'carlos@email.com',
    phone: '(11) 97777-7777',
    address: 'Rua Augusta, 500 - São Paulo/SP',
    lastAppointment: '13/03/2024',
    nextAppointment: '20/03/2024'
  },
};

const PatientDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const patient = patientDetails[id as keyof typeof patientDetails];

  if (!patient) {
    return (
      <ImageBackground
        source={require('../../../assets/images/fundo.png')}
        style={[styles.background, { backgroundColor: colors.background }]}
        imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
      >
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
        <View style={styles.container}>
          <Text style={[styles.errorText, { color: colors.text }]}>Paciente não encontrado.</Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.backButtonText, { color: colors.buttonText }]}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={[
            styles.card,
            { 
              backgroundColor: colors.cardBackground,
              opacity: animatedValue,
              transform: [{ translateY }]
            }
          ]}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.buttonText} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>Detalhes do Paciente</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações Pessoais</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Nome:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Idade:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.age} anos</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Email:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Telefone:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Endereço:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.address}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Consultas</Text>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Última Consulta:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.lastAppointment}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.label, { color: colors.text }]}>Próxima Consulta:</Text>
              <Text style={[styles.value, { color: colors.text }]}>{patient.nextAppointment}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Histórico Médico</Text>
            <Text style={[styles.historyText, { color: colors.text }]}>{patient.history}</Text>
          </View>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 120,
  },
  value: {
    fontSize: 16,
    flex: 1,
  },
  historyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PatientDetails;
