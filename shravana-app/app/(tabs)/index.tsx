import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function HomePage() {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = (day) => {
    Alert.alert(
      "Selected Date",
      `Day: ${day.day}\nMonth: ${day.month}\nYear: ${day.year}\nQuote: "This is a day-wise quote."`,
      [{ text: "OK" }]
    );
    setSelected(day.dateString);
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
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Calendar 
        onDayPress={onDayPress} 
        markedDates={markedDates} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});