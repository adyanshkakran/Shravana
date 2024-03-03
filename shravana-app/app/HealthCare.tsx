import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Modal, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

const HealthCareScreen = () => {
  const [date, setDate] = useState('');
  const [doctorTypeModalVisible, setDoctorTypeModalVisible] = useState(false);
  const [recurringFrequencyModalVisible, setRecurringFrequencyModalVisible] = useState(false);
  const [doctorType, setDoctorType] = useState('');
  const [recurringFrequency, setRecurringFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [ModalVisible, setModalVisible] = useState(false)

  const doctorTypes = ['General Surgeon', 'Psychologist', 'Dentist', 'Pulmonologist']; // Add more doctor types as needed
  const recurringFrequencies = ['None','Weekly', 'Biweekly', 'Monthly']; // Add more recurring frequencies as needed

  const handleBookAppointment = () => {
    // Perform actions to book appointment here
    // For now, let's just display an alert with the entered data
    const message = `Appointment booked with ${doctorType} ${recurringFrequency ? `(Recurring every ${recurringFrequency})` : ''}. Additional notes: ${notes}`;
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setDoctorType('');
    setDate('');
    setRecurringFrequency('');
    setNotes('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Button title={doctorType || 'Select Doctor Type'} onPress={() => setDoctorTypeModalVisible(true)} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Enter Date (e.g., MM/DD/YYYY)"
      />
      <View style={styles.dropdownContainer}>
        <Button title={recurringFrequency || 'Select Recurring Frequency'} onPress={() => setRecurringFrequencyModalVisible(true)} />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setNotes}
        value={notes}
        placeholder="Additional Notes"
      />
      <Button title="Book Appointment" onPress={handleBookAppointment} />

      {/* Doctor Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={doctorTypeModalVisible}
        onRequestClose={() => setDoctorTypeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {doctorTypes.map((item, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => {setDoctorType(item); setDoctorTypeModalVisible(false);}}>
                  <View style={styles.modalItem}>
                    <Text>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Recurring Frequency Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={recurringFrequencyModalVisible}
        onRequestClose={() => setRecurringFrequencyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {recurringFrequencies.map((item, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => {setRecurringFrequency(item); setRecurringFrequencyModalVisible(false);}}>
                  <View style={styles.modalItem}>
                    <Text>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={ModalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Appointment booked with {doctorType} {recurringFrequency ? `(Recurring ${recurringFrequency})` : ''}!</Text>
          <Button title="Close" onPress={onModalClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    paddingVertical: 100
  },
});

export default HealthCareScreen;

