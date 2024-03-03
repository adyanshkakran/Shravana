import React, { useState } from "react";
import { StyleSheet, TextInput, Button, View, Alert, Text, Image } from "react-native";
import { Modal } from "react-native-paper";

const DeliveryScreen = () => {
  const [fromaddr, setfromaddr] = useState("");
  const [toaddress, settoaddr] = useState("");
  const [weight, setweight] = useState("");
  const [ModalVisible, setModalVisible] = useState(false);

  const handleScheduleDelivery = () => {
    const message = `Scheduled delivery/pickup from ${fromaddr} at ${toaddress}. Your item weighs: ${weight} kg`;
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setfromaddr('');
    settoaddr('');
    setweight('');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/scooter.png')} style={styles.smallImage} />
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
      <Modal
        visible={ModalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Delivery Scheduled from {fromaddr} to {toaddress}!</Text>
          <Button title="Close" onPress={onModalClose} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    paddingVertical: 100
  },
  smallImage: {
    width: 100,
    height: 100,
    marginTop: 100,
    marginBottom: 50,
  },
});

export default DeliveryScreen;
