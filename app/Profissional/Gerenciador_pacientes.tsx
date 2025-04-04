import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Patient {
  id: string;
  name: string;
  age: number;
}

const initialPatients: Patient[] = [
  { id: '1', name: 'João Silva', age: 30 },
  { id: '2', name: 'Maria Oliveira', age: 25 },
  { id: '3', name: 'Carlos Santos', age: 40 },
];

const PatientManager = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
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

  const renderItem = ({ item }: { item: Patient }) => (
    <Animated.View 
      style={[
        styles.patientContainer,
        { 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          opacity: animatedValue,
          transform: [{ translateY }]
        }
      ]}
    >
      <View style={styles.patientInfo}>
        <Text style={[styles.patientName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.patientAge, { color: colors.text }]}>Idade: {item.age} anos</Text>
      </View>
      <TouchableOpacity
        style={[styles.detailsButton, { backgroundColor: colors.buttonBackground }]}
        onPress={() => router.push({
          pathname: `/Profissional/paciente/Detalhes_paciente`,
          params: { id: item.id },
        })}
      >
        <Ionicons name="chevron-forward" size={24} color={colors.buttonText} />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <View style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Gerenciar Pacientes</Text>
          </View>
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  patientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientAge: {
    fontSize: 14,
    opacity: 0.8,
  },
  detailsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientManager;
