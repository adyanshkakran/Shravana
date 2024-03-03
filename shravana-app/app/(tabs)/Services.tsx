import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

export default function Services() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Services</Text>
      <View style={styles.gridContainer}>
        <Link href='/HealthCare'>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../images/healthcare.webp')} style={styles.smallImage} />
            <Text style={styles.buttonText}>Healthcare</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/Retail'>
          <TouchableOpacity style={styles.button}>
          <Image source={require('../../images/retail.png')} style={styles.smallImage} />
          <Text style={styles.buttonText}>Retail Shopping</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.gridContainer}>
        <Link href='/Delivery'>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../images/scooter.png')} style={styles.smallImage} />
            <Text style={styles.buttonText}>Delivery/Pickup</Text>
          </TouchableOpacity>
        </Link>
        <Link href='/home'>
          <TouchableOpacity style={styles.button}>
            <Image source={require('../../images/homem.png')} style={styles.smallImage} />
            <Text style={styles.buttonText}>Home Maintenance</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 18,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    marginTop: 8,
    fontWeight: 'bold',
  },
  smallImage: {
    width: 100, // Set the width to the desired size
    height: 100, // Set the height to the desired size
    resizeMode: 'contain',
  },
});
