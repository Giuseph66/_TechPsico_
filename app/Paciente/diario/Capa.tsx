import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, Animated, Dimensions } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Capa() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const lockAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const lockTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => {
      if (lockTimer.current) {
        clearTimeout(lockTimer.current);
      }
    };
  }, []);

  const resetLock = () => {
    setIsLocked(true);
    Animated.timing(lockAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleLockPress = async () => {
    if (isAuthenticating) return;
    setIsAuthenticating(true);

    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Erro', 'Dispositivo não suporta autenticação biométrica.');
        setIsAuthenticating(false);
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('Erro', 'Nenhuma biometria ou rosto cadastrado.');
        setIsAuthenticating(false);
        return;
      }

      // Animação do cadeado
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(lockAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para acessar o diário',
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        setIsLocked(false);
        
        // Configurar temporizador para fechar o cadeado após 10 segundos
        if (lockTimer.current) {
          clearTimeout(lockTimer.current);
        }
        lockTimer.current = setTimeout(() => {
          resetLock();
        }, 1000);

        setTimeout(() => {
          router.push('./Corpo');
        }, 500);
      } else {
        Alert.alert('Erro', 'Autenticação falhou. Tente novamente.');
        resetLock();
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro durante a autenticação.');
      resetLock();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const lockRotation = lockAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <ImageBackground
      source={require('../../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>Meu Diário</Text>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            Seu espaço seguro para reflexões
          </Text>
          
          <Animated.View 
            style={[
              styles.lockContainer,
              { 
                transform: [
                  { scale: scaleAnim },
                  { rotate: lockRotation }
                ]
              }
            ]}
          >
            <TouchableOpacity
              style={[styles.lockButton, { backgroundColor: colors.buttonBackground }]}
              onPress={handleLockPress}
              disabled={isAuthenticating}
            >
              <Ionicons 
                name={isLocked ? "lock-closed" : "lock-open"} 
                size={40} 
                color={colors.buttonText} 
              />
            </TouchableOpacity>
          </Animated.View>

          <Text style={[styles.hint, { color: colors.text }]}>
            {isAuthenticating ? 'Autenticando...' : 'Toque no cadeado para abrir'}
          </Text>

          <TouchableOpacity
            style={[styles.managerButton, { backgroundColor: colors.buttonBackground }]}
            onPress={() => router.push('../gerenciador_diario')}
          >
            <Ionicons name="calendar" size={24} color={colors.buttonText} />
            <Text style={[styles.managerButtonText, { color: colors.buttonText }]}>
              Gerenciar Diário
            </Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: height * 0.1, // Ajuste para baixar a capa
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    opacity: 0.8,
  },
  lockContainer: {
    marginBottom: 30,
  },
  lockButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  hint: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  managerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  managerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
