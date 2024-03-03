// // create a similar dummy page for "home maitenance" as well.

// // Path: shravana-app/app/services/HomeMaintenance.tsx
// //
// import { StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// const HomeMaintenanceScreen = () => {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Home Maintenance Screen</Text>
//         <Text>This is a dummy home maintenance screen.</Text>
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

// export default HomeMaintenanceScreen;


// Similar to Delivery.tsx, create a page for Home Maintenance where u can book in advance for home maintenance services.

// Path: app/services/HomeMaintenance.tsx

import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert, Modal, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';

const HomeMaintenanceScreen = () => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const services = ['Plumbing', 'Electrical', 'Carpentry']; // Add more services as needed

  const handleBookAppointment = () => {
    // Perform actions to book appointment here
    // For now, let's just display an alert with the entered data
    const message = `Appointment booked for ${service} on ${date} at ${time}. Additional notes: ${notes}`;
    Alert.alert('Appointment Booked!', message);
    console.log('Appointment Booked!', message);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setServiceModalVisible(true)}>
        <View style={styles.dropdown}>
          <Text>{service || 'Select Service'}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
        animationType="slide"
        transparent={true}
        visible={serviceModalVisible}
        onRequestClose={() => setServiceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {services.map((item, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => {setService(item); setServiceModalVisible(false);}}>
                  <View style={styles.modalItem}>
                    <Text>{item}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        onChangeText={setDate}
        value={date}
        placeholder="Date (e.g., MM/DD/YYYY)"
      />
      <TextInput
        style={styles.input}
        onChangeText={setTime}
        value={time}
        placeholder="Time (e.g., HH:MM AM/PM)"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNotes}
        value={notes}
        placeholder="Additional Notes"
      />
      <Button title="Book Appointment" onPress={handleBookAppointment} />
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
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default HomeMaintenanceScreen;
