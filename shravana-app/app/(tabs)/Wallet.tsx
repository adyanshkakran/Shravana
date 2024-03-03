import { StyleSheet, Image } from 'react-native';

import React from 'react';

import { Text, View } from '@/components/Themed';
import { Card, Button, TextInput, HelperText } from 'react-native-paper';
import calendar from "../data/calendar"

const med = { key: 'med', color: '#329da8', bookingDate: new Date() };
const delivery = { key: 'delivery', color: '#ed6039', bookingDate: new Date() };
const cleaning = { key: 'cleaning', color: '#c2b60e', bookingDate: new Date() };
const retail = { key: 'retail', color: '#0ca119', bookingDate: new Date()}

function TransactionCard(props: {title: string, amount: number, color: string, bookingDate: string}) {
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

export default function TabTwoScreen() {
  const [amount, setAmount] = React.useState(0);
  const [events, setEvents] = React.useState<any>([])

  const isNumber = () => {
    return isNaN(amount);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.balance}>
        {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
        <Card.Title title="Add Money" />
        <Card.Content>
          <TextInput
            mode='outlined'
            label="Amount"
            keyboardType="numeric"
            onChange={(e) => setAmount(parseFloat(e.nativeEvent.text))}
          />
          <HelperText type="error" visible={isNumber()}>
            Amount should be a number
          </HelperText>
        </Card.Content>
        <Card.Actions>
          <Button>Top Up</Button>
        </Card.Actions>
      </Card>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.transaction}>Your Transactions</Text>
      <TransactionCard title="Retail Shopping" amount={100} color={retail.color} bookingDate='02-02-2024'/>
      <TransactionCard title="Healthcare" amount={200} color={med.color} bookingDate='01-02-2024'/>
      <TransactionCard title="Home Maintenance" amount={500} color={cleaning.color} bookingDate='25-01-2024'/>
      <TransactionCard title="Delivery Services" amount={50} color={delivery.color} bookingDate='28-01-2024'/>
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
  },
  balance: {
    width: 300,
    margin: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  transaction: {
    fontSize: 20,
    fontWeight: '900',
  },
  card: {
    width: 300,
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
