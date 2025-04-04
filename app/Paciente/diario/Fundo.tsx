import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated,Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const thoughts = [
  {
    text: 'Acredite em você mesmo.',
    icon: 'heart',
  },
  {
    text: 'Cada dia é uma nova oportunidade.',
    icon: 'sunny',
  },
  {
    text: 'Seja gentil consigo mesmo.',
    icon: 'happy',
  },
  {
    text: 'Você é mais forte do que imagina.',
    icon: 'fitness',
  },
  {
    text: 'Respire fundo e siga em frente.',
    icon: 'leaf',
  },
  {
    text: 'A jornada é tão importante quanto o destino.',
    icon: 'walk',
  },
];

export default function Fundo() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.buttonText} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>Pensamentos do Dia</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {thoughts.map((thought, index) => (
            <Animated.View
              key={index}
              style={[
                styles.thoughtCard,
                { 
                  backgroundColor: colors.cardBackground,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    })
                  }]
                }
              ]}
            >
              <Ionicons name={thought.icon} size={32} color={colors.text} />
              <Text style={[styles.thoughtText, { color: colors.text }]}>
                {thought.text}
              </Text>
            </Animated.View>
          ))}
        </ScrollView>
      </Animated.View>
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
  container: {
    flex: 1,
    padding: 20,
    marginTop: height * 0.05,
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
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  thoughtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thoughtText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
});
