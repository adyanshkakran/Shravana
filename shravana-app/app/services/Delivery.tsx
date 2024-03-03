import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';

const DeliveryScreen = () => {
  const [fromaddr, setfromaddr] = useState('');
  const [toaddress, settoaddr] = useState('');
  const [weight, setweight] = useState('');

  const handleScheduleDelivery = () => {
    // Perform actions to schedule delivery here
    // For now, let's just display an alert with the entered data
    const message = `Scheduled delivery/pickup from ${fromaddr} at ${toaddress}. Your item weighs: ${weight} kg`;
    Alert.alert('Scheduled!', message);
    console.log('Scheduled!', message);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setfromaddr}
        value={fromaddr}
        placeholder="Source Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={settoaddr}
        value={toaddress}
        placeholder="Destination Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setweight}
        value={weight}
        placeholder="Weight of item (in kg)"
      />
      <Button title="Schedule Delivery" onPress={handleScheduleDelivery} />
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
});

export default DeliveryScreen;