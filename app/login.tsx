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
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const imageTintColor = 'rgba(255,215,0,0.5)';

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

  return (
    <ImageBackground
      source={require('../assets/images/fundo.png')} // Corrigido para usar require com caminho relativo
      style={styles.background}
      imageStyle={[styles.backgroundImage, { tintColor: imageTintColor }]}
      >
      <View style={styles.overlay} />
      <Animated.View
        style={[
            styles.card,
            { opacity: animatedValue, transform: [{ translateY }] },
        ]}
        >
        <Image
          source={require('../assets/images/logo.png')} // Substitua pelo caminho correto da sua imagem
          style={[styles.logo,{ tintColor: '#000' }]}
          resizeMode="contain"
    />
        {/* Adicionando a imagem acima do formulário */}
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.professionalTextContainer}
        onPress={() => router.push('./Profissional/Cadastro_prof')}
      >
        <Text style={styles.professionalText}>Sou Um Profissional-&gt; </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'cover',
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.3,
  },
  card: {
    width: width * 0.8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#000',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  professionalTextContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  professionalText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
