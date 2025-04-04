import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

export default function GerenciadorDiario() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];

  const menuItems = [
    {
      title: 'Novo Diário',
      icon: 'add-circle-outline',
      route: '/Paciente/diario/Capa',
    },
    {
      title: 'Diários Anteriores',
      icon: 'time-outline',
      route: '/Paciente/diario/anteriores',
    },
    {
      title: 'Pensamentos do Dia',
      icon: 'bulb-outline',
      route: '/Paciente/diario/Fundo',
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.text }]}>Meu Diário</Text>
          
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
              onPress={() => router.push(item.route)}
            >
              <Ionicons name={item.icon} size={24} color={colors.text} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

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
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
});
