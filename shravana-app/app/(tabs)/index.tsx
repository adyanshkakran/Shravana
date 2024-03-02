import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Modal, Button, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const med = { key: 'med', color: '#329da8', selectedDotColor: '#329da8' };
const delivery = { key: 'delivery', color: '#ed6039', selectedDotColor: '#ed6039' };
const cleaning = { key: 'cleaning', color: '#c2b60e', selectedDotColor: '#c2b60e' };

export default function HomePage() {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const onDayPress = (day: any) => {
    setSelected(day.dateString);
    setModalVisible(true);
  };

  useEffect(() => {
    setMarkedDates({
      [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
    });
  }, [selected]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Loved Ones' Calendar</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Calendar
        markingType={'multi-dot'}
        onDayPress={onDayPress}
        markedDates={markedDates}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{new Date(selected).toLocaleDateString('en-GB', { weekday: 'long' })}, {new Date(selected).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
            <Text style={[styles.modalText, { backgroundColor: 'white', padding: 10, width: '100%' }]}>Your Events of the Day</Text>
            <Text style={[styles.modalText, { backgroundColor: '#329da8', padding: 10, width: '100%' }]}>Medical Check-up</Text>
            <Text style={[styles.modalText, { backgroundColor: '#ed6039', padding: 10, width: '100%' }]}>Delivery Expected!</Text>
            <Text style={[styles.modalText, { backgroundColor: '#c2b60e', padding: 10, width: '100%' }]}>Home Cleaning</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});