// // Just like Delivery.tsx, make this page too, but with "HealthCare" as the title and "This is a dummy health care screen.

// // Path: shravana-app/app/services/HealthCare.tsx

// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// const HealthCareScreen = () => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>HealthCare Screen</Text>
//         <Text>This is a dummy health care screen.</Text>
//       </View>
//     );
//   }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
// });

// export default HealthCareScreen;


// import React, { useState } from 'react';
// import { StyleSheet, TextInput, Button, View, Alert, Platform } from 'react-native';
// import DatePicker from '@react-native-community/datetimepicker';

// const HealthCareScreen = () => {
//   const [date, setDate] = useState(new Date());
//   const [doctor, setDoctor] = useState('');
//   const [isRecurring, setIsRecurring] = useState(false);
//   const [recurringFrequency, setRecurringFrequency] = useState('');
//   const [notes, setNotes] = useState('');
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const handleBookAppointment = () => {
//     // Perform actions to book appointment here
//     // For now, let's just display an alert with the entered data
//     const message = `Appointment booked with ${doctor} on ${date.toDateString()}${isRecurring ? ` (Recurring every ${recurringFrequency})` : ''}. Additional notes: ${notes}`;
//     Alert.alert('Appointment Booked!', message);
//     console.log('Appointment Booked!', message);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         onChangeText={setDoctor}
//         value={doctor}
//         placeholder="Doctor's Name"
//       />
//       <View style={styles.datePickerContainer}>
//         <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
//         {showDatePicker && (
//           <DatePicker
//             value={date}
//             mode="date"
//             onChange={handleDateChange}
//           />
//         )}
//       </View>
//       <View style={styles.checkboxContainer}>
//         <Button
//           title="Recurring Appointment"
//           onPress={() => setIsRecurring(!isRecurring)}
//           color={isRecurring ? 'green' : 'gray'}
//         />
//       </View>
//       {isRecurring && (
//         <TextInput
//           style={styles.input}
//           onChangeText={setRecurringFrequency}
//           value={recurringFrequency}
//           placeholder="Recurring Frequency (e.g., Weekly, Monthly)"
//         />
//       )}
//       <TextInput
//         style={styles.input}
//         onChangeText={setNotes}
//         value={notes}
//         placeholder="Additional Notes"
//       />
//       <Button title="Book Appointment" onPress={handleBookAppointment} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   datePickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
// });

// export default HealthCareScreen;

import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Modal, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

const HealthCareScreen = () => {
  const [date, setDate] = useState('');
  const [doctorTypeModalVisible, setDoctorTypeModalVisible] = useState(false);
  const [recurringFrequencyModalVisible, setRecurringFrequencyModalVisible] = useState(false);
  const [doctorType, setDoctorType] = useState('');
  const [recurringFrequency, setRecurringFrequency] = useState('');
  const [notes, setNotes] = useState('');

  const doctorTypes = ['General Surgeon', 'Psychologist', 'Dentist', 'Pulmonologist']; // Add more doctor types as needed
  const recurringFrequencies = ['None','Weekly', 'Biweekly', 'Monthly']; // Add more recurring frequencies as needed

  const handleBookAppointment = () => {
    // Perform actions to book appointment here
    // For now, let's just display an alert with the entered data
    const message = `Appointment booked with ${doctorType} ${recurringFrequency ? `(Recurring every ${recurringFrequency})` : ''}. Additional notes: ${notes}`;
    Alert.alert('Appointment Booked!', message);
    console.log('Appointment Booked!', message);
  };

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
});

export default HealthCareScreen;

