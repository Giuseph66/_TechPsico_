import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animatedValue, fadeAnim, scaleAnim]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push('./Paciente/diario/Capa');
  };

  return (
    <ImageBackground
      source={require('../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.card,
            { 
              backgroundColor: colors.cardBackground,
              opacity: fadeAnim,
              transform: [
                { translateY },
                { scale: scaleAnim }
              ] 
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={[styles.logoWrapper, { backgroundColor: colors.buttonBackground }]}>
              <Ionicons name="heart" size={40} color={colors.buttonText} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Bem-vindo</Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Faça login para continuar</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, { backgroundColor: colors.inputBackground }]}>
              <Ionicons name="mail-outline" size={20} color={colors.text} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email"
                placeholderTextColor={colors.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={[styles.inputWrapper, { backgroundColor: colors.inputBackground }]}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.text} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Senha"
                placeholderTextColor={colors.placeholder}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={colors.text} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[
              styles.button,
              { backgroundColor: colors.buttonBackground },
              isLoading && styles.buttonDisabled
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.buttonText} />
            ) : (
              <>
                <Ionicons name="log-in-outline" size={20} color={colors.buttonText} style={styles.buttonIcon} />
                <Text style={[styles.buttonText, { color: colors.buttonText }]}>Entrar</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.professionalTextContainer, { backgroundColor: colors.inputBackground }]}
            onPress={() => router.push('./Profissional/Cadastro_prof')}
          >
            <Ionicons name="person-outline" size={20} color={colors.text} style={styles.professionalIcon} />
            <Text style={[styles.professionalText, { color: colors.text }]}>
              Sou um Profissional
            </Text>
            <Ionicons name="arrow-forward" size={16} color={colors.text} />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 35,
    width: '100%',
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
    marginLeft: 8,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  professionalTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  professionalIcon: {
    marginRight: 8,
  },
  professionalText: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: '500',
  },
});
