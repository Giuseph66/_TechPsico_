import React, { useState } from 'react';
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
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { TextInputMask } from 'react-native-masked-text'; // Adicione esta importação

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro do Psicólogo</Text>

        <Controller
          control={control}
          name="fullName"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                onBlur={onBlur}
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
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>E-mail</Text>
              <TextInput
                style={[
                  styles.input,
                  value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? { borderColor: 'red' } : {},
                ]}
                placeholder="email@exemplo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>Confirmar Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
            </View>
          )}
        />

        <View style={styles.row}>
          <Controller
            control={control}
            name="crpNumber"
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputContainer, styles.smallInputContainer]}>
                <Text>CRP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123456"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.crpNumber && <Text style={styles.errorText}>{errors.crpNumber.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="crpState"
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputContainer, styles.smallInputContainer]}>
                <Text>Estado(CRP)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SP"
                  maxLength={2}
                  autoCapitalize="characters"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text.toUpperCase())}
                  value={value}
                />
                {errors.crpState && <Text style={styles.errorText}>{errors.crpState.message}</Text>}
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name="cpf"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>CPF</Text>
              <TextInputMask
                type="cpf"
                style={styles.input}
                placeholder="000.000.000-00"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.cpf && <Text style={styles.errorText}>{errors.cpf.message}</Text>}
            </View>
          )}
        />

        <View style={styles.row}>
        <Controller
        control={control}
        name="birthDate"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.inputContainer, styles.smallInputContainer]}>
            <Text>
              Data de Nascimento
            </Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>
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
                  // Se o usuário confirmar a seleção (não cancelar)
                  if (selectedDate && event.type === 'set') {
                    const formattedDate = selectedDate.toISOString();
                    console.log('Data selecionada (formatação ISO):', formattedDate);
                    console.log('Data selecionada (formatada):', format(selectedDate, 'dd/MM/yyyy'));
                    onChange(formattedDate); // Atualiza o valor no formulário
                  }
                }}
              />
            )}
            {errors.birthDate && (
              <Text style={styles.errorText}>{errors.birthDate.message}</Text>
            )}
          </View>
        )}
      />

          <Controller
            control={control}
            name="phone"
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputContainer, styles.smallInputContainer]}>
                <Text>Telefone</Text>
                <TextInputMask
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  style={styles.input}
                  placeholder="(00) 00000-0000"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
              </View>
            )}
          />
        </View>

        <Text style={styles.sectionTitle}>Endereço</Text>

        <View style={styles.row}>
          <Controller
            control={control}
            name="cep"
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputContainer, styles.smallInputContainer]}>
                <Text>CEP</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CEP"
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.cep && <Text style={styles.errorText}>{errors.cep.message}</Text>}
              </View>
            )}
          />

          <Controller
            control={control}
            name="number"
            render={({ onChange, onBlur, value }) => (
              <View style={[styles.inputContainer, styles.smallInputContainer]}>
                <Text>Número</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {errors.number && <Text style={styles.errorText}>{errors.number.message}</Text>}
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name="street"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>Rua</Text>
              <TextInput
                style={styles.input}
                placeholder="Rua"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.street && <Text style={styles.errorText}>{errors.street.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({ onChange, onBlur, value }) => (
            <View style={[styles.inputContainer, styles.smallInputContainer]}>
              <Text>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Cidade"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.city && <Text style={styles.errorText}>{errors.city.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="state"
          render={({ onChange, onBlur, value }) => (
            <View style={[styles.inputContainer, styles.smallInputContainer]}>
              <Text>Estado (Ex: SP)</Text>
              <TextInput
                style={styles.input}
                placeholder="Estado"
                maxLength={2}
                autoCapitalize="characters"
                onBlur={onBlur}
                onChangeText={(text) => onChange(text.toUpperCase())}
                value={value}
              />
              {errors.state && <Text style={styles.errorText}>{errors.state.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="specialty"
          render={({ onChange, onBlur, value }) => (
            <View style={styles.inputContainer}>
              <Text>Especialidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Psicologia Clínica"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              {errors.specialty && <Text style={styles.errorText}>{errors.specialty.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="diploma"
          render={({ value }) => (
            <View style={styles.inputContainer}>
              <Text>Diploma (Anexar arquivo)</Text>
              <Button
                title={value ? "Arquivo selecionado" : "Selecionar arquivo"}
                onPress={() => pickDocument('diploma')}
              />
              {errors.diploma && <Text style={styles.errorText}>{errors.diploma.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="identity"
          render={({ value }) => (
            <View style={styles.inputContainer}>
              <Text>Documento de Identidade (Anexar arquivo)</Text>
              <Button
                title={value ? "Arquivo selecionado" : "Selecionar arquivo"}
                onPress={() => pickDocument('identity')}
              />
              {errors.identity && <Text style={styles.errorText}>{errors.identity.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="terms"
          render={({ onChange, value }) => (
            <View style={styles.inputContainer}>
              <View style={styles.termsContainer}>
                <Switch value={value} onValueChange={onChange} />
                <Text style={{ marginLeft: 8 }}>Aceito os termos de uso</Text>
              </View>
              {errors.terms && <Text style={styles.errorText}>{errors.terms.message}</Text>}
            </View>
          )}
        />

        <Button title="Cadastrar" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  smallInputContainer: {
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RegistrationScreen;
