import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Button,
  View,
  Alert,
  Modal,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";

const HomeMaintenanceScreen = () => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [ModalVisible, setModalVisible] = useState(false);

  const services = ["Plumbing", "Electrical", "Carpentry"]; // Add more services as needed

  const handleBookAppointment = () => {
    setModalVisible(true);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setService("");
    setDate("");
    setTime("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/homem.png")}
        style={styles.smallImage}
      />
      <TouchableWithoutFeedback onPress={() => setServiceModalVisible(true)}>
        <View style={styles.dropdown}>
          <Text>{service || "Select Service"}</Text>
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
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    setService(item);
                    setServiceModalVisible(false);
                  }}
                >
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
      <Modal visible={ModalVisible} onDismiss={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text>
            Appointment booked for {service} on {date} at {time}!
          </Text>
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
  dropdown: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: 300,
    width: "80%",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    paddingVertical: 100,
  },
  smallImage: { 
    width: 100,
    height: 100,
    marginTop: 100,
    marginBottom: 50
  },
});

export default HomeMaintenanceScreen;
