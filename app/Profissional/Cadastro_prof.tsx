import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  Switch,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { TextInputMask } from 'react-native-masked-text';
import { useColorScheme } from '@/hooks/useColorScheme';
import { themeColors } from '@/constants/themeColors';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Validações com Yup
const schema = Yup.object().shape({
  fullName: Yup.string().required('Nome completo é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  crpNumber: Yup.string().required('Número do CRP é obrigatório'),
  crpState: Yup.string().length(2, 'Estado do CRP deve ter 2 letras').required('Estado do CRP é obrigatório'),
  cpf: Yup.string().matches(/^\d{11}$/, 'CPF deve ter 11 dígitos').required('CPF é obrigatório'),
  birthDate: Yup.date().required('Data de nascimento é obrigatória'),
  phone: Yup.string().required('Telefone é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
  street: Yup.string().required('Rua é obrigatória'),
  number: Yup.string().required('Número é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().length(2, 'Estado deve ter 2 letras').required('Estado é obrigatório'),
  specialty: Yup.string().required('Especialidade é obrigatória'),
  diploma: Yup.mixed().required('Diploma é obrigatório'),
  identity: Yup.mixed().required('Documento de identidade é obrigatório'),
  terms: Yup.bool().oneOf([true], 'Aceitar os termos é obrigatório'),
});

const RegistrationScreen = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      crpNumber: '',
      crpState: '',
      cpf: '',
      birthDate: new Date(),
      phone: '',
      cep: '',
      street: '',
      number: '',
      city: '',
      state: '',
      specialty: '',
      diploma: null,
      identity: null,
      terms: false,
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const colors = themeColors[colorScheme || 'light'];
  const router = useRouter();

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

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    // Aqui você pode enviar os dados para sua API ou processá-los conforme necessário
  };

  // Função para selecionar documentos (diploma e identidade)
  const pickDocument = async (fieldName) => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setValue(fieldName, result, { shouldValidate: true });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/fundo.png')}
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
          <Text style={[styles.title, { color: colors.text }]}>Cadastro do Psicólogo</Text>

          {/* Seção 1: Dados Pessoais */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dados Pessoais</Text>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Nome Completo</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="Seu nome completo"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>E-mail</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: colors.inputBackground, color: colors.text },
                      value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? { borderColor: 'red' } : {},
                    ]}
                    placeholder="email@exemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>CPF</Text>
                    <TextInputMask
                      type="cpf"
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="000.000.000-00"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="birthDate"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Data de Nascimento</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <Text style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}>
                        {value ? format(new Date(value), 'dd/MM/yyyy') : 'Selecione a data'}
                      </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={value ? new Date(value) : new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate && event.type === 'set') {
                            onChange(selectedDate.toISOString());
                          }
                        }}
                      />
                    )}
                    {errors?.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
                  </View>
                )}
              />
            </View>
          </View>

          {/* Seção 2: Dados Profissionais */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dados Profissionais</Text>
            <View style={styles.row}>
              <Controller
                control={control}
                name="crpNumber"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Número do CRP</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="123456"
                      keyboardType="numeric"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.crpNumber && <Text style={styles.errorText}>{errors.crpNumber.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="crpState"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Estado do CRP</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="SP"
                      maxLength={2}
                      autoCapitalize="characters"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.crpState && <Text style={styles.errorText}>{errors.crpState.message}</Text>}
                  </View>
                )}
              />
            </View>

            <Controller
              control={control}
              name="specialty"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Especialidade</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="Ex: Psicologia Clínica"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.specialty && <Text style={styles.errorText}>{errors.specialty.message}</Text>}
                </View>
              )}
            />
          </View>

          {/* Seção 3: Contato e Endereço */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Contato e Endereço</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Telefone</Text>
                  <TextInputMask
                    type="cel-phone"
                    options={{
                      maskType: 'BRL',
                      withDDD: true,
                      dddMask: '(99) ',
                    }}
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
                </View>
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                name="cep"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>CEP</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="00000-000"
                      keyboardType="numeric"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.cep && <Text style={styles.errorText}>{errors.cep.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="number"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Número</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="Número"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.number && <Text style={styles.errorText}>{errors.number.message}</Text>}
                  </View>
                )}
              />
            </View>

            <Controller
              control={control}
              name="street"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Rua</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="Nome da rua"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
                </View>
              )}
            />

            <View style={styles.row}>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Cidade</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="Cidade"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.inputContainer, styles.smallInputContainer]}>
                    <Text style={[styles.label, { color: colors.text }]}>Estado</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                      placeholder="UF"
                      maxLength={2}
                      autoCapitalize="characters"
                      placeholderTextColor={colors.placeholder}
                      onChangeText={onChange}
                      value={value}
                    />
                    {errors?.state && <Text style={styles.errorText}>{errors.state.message}</Text>}
                  </View>
                )}
              />
            </View>
          </View>

          {/* Seção 4: Documentos */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Documentos</Text>
            <Controller
              control={control}
              name="diploma"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Diploma</Text>
                  <TouchableOpacity
                    style={[styles.documentButton, { backgroundColor: colors.buttonBackground }]}
                    onPress={() => pickDocument('diploma')}
                  >
                    <Text style={[styles.documentButtonText, { color: colors.buttonText }]}>
                      {value ? 'Arquivo selecionado' : 'Selecionar arquivo'}
                    </Text>
                  </TouchableOpacity>
                  {errors?.diploma && <Text style={styles.errorText}>{errors.diploma.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="identity"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Documento de Identidade</Text>
                  <TouchableOpacity
                    style={[styles.documentButton, { backgroundColor: colors.buttonBackground }]}
                    onPress={() => pickDocument('identity')}
                  >
                    <Text style={[styles.documentButtonText, { color: colors.buttonText }]}>
                      {value ? 'Arquivo selecionado' : 'Selecionar arquivo'}
                    </Text>
                  </TouchableOpacity>
                  {errors?.identity && <Text style={styles.errorText}>{errors.identity.message}</Text>}
                </View>
              )}
            />
          </View>

          {/* Seção 5: Senha e Termos */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Senha e Termos</Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Senha</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="Sua senha"
                    secureTextEntry
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: colors.text }]}>Confirmar Senha</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    placeholderTextColor={colors.placeholder}
                    onChangeText={onChange}
                    value={value}
                  />
                  {errors?.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="terms"
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.termsContainer}>
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{ false: '#767577', true: colors.buttonBackground }}
                      thumbColor={value ? colors.buttonText : '#f4f3f4'}
                    />
                    <Text style={[styles.termsText, { color: colors.text }]}>
                      Eu concordo com os termos de uso e política de privacidade
                    </Text>
                  </View>
                  {errors?.terms && <Text style={styles.errorText}>{errors.terms.message}</Text>}
                </View>
              )}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.buttonBackground }]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Cadastrar</Text>
          </TouchableOpacity>

          {/* Botão temporário para o gerenciador de pacientes */}
          <TouchableOpacity
            style={[styles.tempButton, { backgroundColor: colors.buttonBackground }]}
            onPress={() => router.push('/Profissional/Gerenciador_pacientes')}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Ir para Gerenciador de Pacientes</Text>
          </TouchableOpacity>
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
  card: {
    width: width * 0.9,
    maxWidth: 500,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  termsText: {
    marginLeft: 10,
    flex: 1,
  },
  documentButton: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  documentButtonText: {
    fontSize: 16,
  },
  tempButton: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default RegistrationScreen;
