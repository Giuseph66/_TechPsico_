import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Animated, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const { height } = Dimensions.get('window');

export default function Corpo() {
  const router = useRouter();
  const [entry, setEntry] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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

  const saveEntry = async () => {
    if (isSaving) return;
    if (!entry.trim()) {
      Alert.alert('Erro', 'O diário não pode estar vazio.');
      return;
    }

    setIsSaving(true);
    try {
      // Aqui você pode implementar a lógica para salvar no banco de dados
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      
      // Simulando um delay para salvar
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Sucesso', `Entrada salva em ${formattedDate}!`);
      setEntry('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a entrada. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/fundo.png')}
      style={[styles.background, { backgroundColor: colors.background }]}
      imageStyle={[styles.backgroundImage, { tintColor: colors.imageTint }]}
    >
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.buttonText} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: colors.text }]}>
              {format(new Date(), "dd 'de' MMMM", { locale: ptBR })}
            </Text>
            <TouchableOpacity
              style={[styles.forwardButton, { backgroundColor: colors.buttonBackground }]}
              onPress={() => router.push('./Fundo')}
            >
              <Ionicons name="arrow-forward" size={24} color={colors.buttonText} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.textInput,
              { 
                backgroundColor: colors.inputBackground,
                color: colors.text,
                borderColor: colors.border
              }
            ]}
            placeholder="Como foi seu dia?"
            placeholderTextColor={colors.placeholder}
            multiline
            value={entry}
            onChangeText={setEntry}
            textAlignVertical="top"
          />

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.buttonBackground }]}
              onPress={saveEntry}
              disabled={isSaving}
            >
              <Ionicons name={isSaving ? "time" : "save"} size={24} color={colors.buttonText} />
              <Text style={[styles.saveButtonText, { color: colors.buttonText }]}>
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
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
  keyboardAvoidingView: {
    flex: 1,
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
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forwardButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
