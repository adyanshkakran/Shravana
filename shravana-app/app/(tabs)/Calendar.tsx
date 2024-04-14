import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Button, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import calendarData from "../data/calendar.ts";
import { Text, View } from '@/components/Themed';

const med = { key: 'med', color: '#329da8', selectedDotColor: '#329da8' };
const delivery = { key: 'delivery', color: '#ed6039', selectedDotColor: '#ed6039' };
const cleaning = { key: 'cleaning', color: '#c2b60e', selectedDotColor: '#c2b60e' };

const screenHeight = Dimensions.get('window').height;

export default function CalendarPage() {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  const todayEvents = calendarData.events.filter(event => {
    if (event.date === today) {
      return true;
    }
    if (event.frequency === 'weekly') {
      const eventDate = new Date(event.date);
      const diffInDays = Math.floor((new Date(today).getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffInDays % 7 === 0;
    }
    return false;
  });

  const onDayPress = (day: any) => {
    setSelected(day.dateString);
    const eventsForDay = calendarData.events.filter(event => {
      if (event.date === day.dateString) {
        return true;
      }
      if (event.frequency === 'weekly') {
        const eventDate = new Date(event.date);
        const selectedDate = new Date(day.dateString);
        const diffInDays = Math.floor((selectedDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffInDays % 7 === 0;
      }
      return false;
    });
    setEvents(eventsForDay);
    setModalVisible(true);
  };

  useEffect(() => {
    const newMarkedDates = {};
    calendarData.events.forEach((item) => {
      const dots = [];
      if (item.type == 'med') dots.push(med);
      if (item.type == 'delivery') dots.push(delivery);
      if (item.type == 'cleaning') dots.push(cleaning);
      newMarkedDates[item.date] = { dots, selected: item.date === selected };

      // If the event has a weekly frequency, add a dot every 7 days
      if (item.frequency == 'weekly') {
        let date = new Date(item.date);
        for (let i = 0; i < 54; i++) { // for 4 weeks
          date.setDate(date.getDate() + 7);
          const dateString = date.toISOString().split('T')[0];
          newMarkedDates[dateString] = { dots, selected: dateString === selected };
        }
      }
    });
    setMarkedDates(newMarkedDates);
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
      <View style={[styles.table, { marginTop: screenHeight * 0.05 }]}>
        <Text style={styles.tableCell}>{new Date().toLocaleDateString('en-GB', { weekday: 'long' })}, {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
        <Text style={[styles.modalText, { backgroundColor: 'white', padding: 10, width: '100%' }]}>Today's Events</Text>
        {todayEvents.length > 0 ? (
          todayEvents.map(event => (
            <Text key={event.id} style={[styles.modalText, { backgroundColor: event.type === 'med' ? '#329da8' : event.type === 'delivery' ? '#ed6039' : '#c2b60e', padding: 10, width: '100%' }]}>{event.event}</Text>
          ))
        ) : (
          <Text style={styles.modalText}>No events</Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{new Date(selected).toLocaleDateString('en-GB', { weekday: 'long' })}, {new Date(selected).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
            <Text style={[styles.modalText, { backgroundColor: 'white', padding: 10, width: '100%' }]}>Your Events of the Day</Text>
            {events.length > 0 ? (
              events.map(event => (
                <Text key={event.id} style={[styles.modalText, { backgroundColor: event.type === 'med' ? '#329da8' : event.type === 'delivery' ? '#ed6039' : '#c2b60e', padding: 10, width: '100%' }]}>{event.event}</Text>
              ))
            ) : (
              <Text style={styles.modalText}>No events</Text>
            )}
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