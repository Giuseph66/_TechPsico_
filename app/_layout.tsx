import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack,useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      //router.replace('./Profissional/Gerenciador_pacientes');
      router.replace('./login');
      //router.replace('./Paciente/diario/Capa');
      //router.replace('./Paciente/gerenciador_diario');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="Profissional/Cadastro_prof" options={{ headerShown: false }} />
        <Stack.Screen name="Profissional/Gerenciador_pacientes" options={{ headerShown: false }} />
        <Stack.Screen name="Profissional/paciente/Detalhes_paciente" options={{ headerShown: false }} />
        <Stack.Screen name="Paciente/diario/Capa" options={{ headerShown: false }} />
        <Stack.Screen name="Paciente/diario/Corpo" options={{ headerShown: false }} />
        <Stack.Screen name="Paciente/diario/Fundo" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
