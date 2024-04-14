import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, Button, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import calendarData from "../data/calendar.ts";
import { Text, View } from '@/components/Themed';

const med = { key: 'med', color: '#329da8', selectedDotColor: '#329da8' };
const delivery = { key: 'delivery', color: '#ed6039', selectedDotColor: '#ed6039' };
const cleaning = { key: 'cleaning', color: '#c2b60e', selectedDotColor: '#c2b60e' };
const retail = { key: 'retail', color: '#0ca119', bookingDate: new Date()}

const screenHeight = Dimensions.get('window').height;

function CalendarCard(props: {title: string, amount: number, color: string, bookingDate: string}) {
  return (
    <View style={[styles.card, styles.highlightShadow]}>
      {/* <Image source={props.image} style={styles.smallImage} /> */}
      <View style={[styles.smallImage, { backgroundColor: props.color}]} />
      <View style={styles.innerView}>
        <Text style={{fontWeight: '600'}}>{props.title}</Text>
        <Text>{props.bookingDate}</Text>
      </View>
      <Text style={{fontWeight: '500', fontSize: 15, marginLeft: 'auto', marginRight: 20}}>₹{props.amount}</Text>
    </View>
  )
}

export default function HomePage() {

  return (
    <View style={styles.container}>
      <View style={styles.title}>Your Today's Events</View>
      <CalendarCard title="Retail Shopping" amount={100} color={retail.color} bookingDate='02-02-2024'/>
      <CalendarCard title="Healthcare" amount={200} color={med.color} bookingDate='01-02-2024'/>
      <CalendarCard title="Cafe Tamera Delivery" amount={100} color={retail.color} bookingDate='02-02-2024'/>
      <View style={styles.title}>Your Tomorrow's Events</View>
      <CalendarCard title="Home Maintenance" amount={500} color={cleaning.color} bookingDate='25-01-2024'/>
      <CalendarCard title="Delivery Services" amount={50} color={delivery.color} bookingDate='28-01-2024'/>
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
  },
  card: {
    width: 400,
    height: 80,
    margin: 10,
    borderRadius: 8,
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  highlightShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 8,
  },
  innerView: {
    display: "flex",
    justifyContent: 'space-evenly'
  }
});