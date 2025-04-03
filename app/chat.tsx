import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const { width, height } = Dimensions.get('window');

export default function MyForm() {
  // Defina um defaultValue para o campo birthDate (por exemplo, string vazia ou data padrão)
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      birthDate: '', // ou new Date().toISOString()
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="birthDate"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.inputContainer, styles.smallInputContainer]}>
            <Text>
              Data de Nascimento{' '}
              {value ? `(${format(new Date(value), 'dd/MM/yyyy')})` : ''}
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
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  smallInputContainer: {
    // Customize conforme necessário
  },
  input: {
    fontSize: 18,
    paddingVertical: 8,
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
