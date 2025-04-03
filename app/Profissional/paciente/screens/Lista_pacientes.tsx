import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { PatientCard } from '../components/PatientCard';
import { patientDetails } from '../utils/patientData';

const PatientList = () => {
  const router = useRouter();
  const patients = Object.values(patientDetails);

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onPressDetails={() => router.push(`/Profissional/paciente/screens/Detalhes_paciente?id=${item.id}`)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default PatientList;
