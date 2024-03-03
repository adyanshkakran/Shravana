import { Platform, StyleSheet, useColorScheme, Image } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Header() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.smallImage} />
      <View style={styles.right}>
        <Link href='/Wallet' style={styles.money} >
          <Text>₹82</Text>
        </Link>
        <Link href='/' >
          {colorScheme === 'dark' ? <Ionicons name='person-circle' size={24}/> : <Ionicons name='person-circle-outline' size={24} />}
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
  },
  money: {
    marginRight: 10,
    fontSize: 20,
    color: 'green',
  },
  smallImage: {
    width: 150,
    height: 50,    
  }
});
