// create a similar dummy page for "Retail" as well.
//
// Path: shravana-app/app/services/Retail.tsx
//
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const RetailScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Retail Screen</Text>
        <Text>This is a dummy retail screen.</Text>
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
        marginBottom: 16,
    },
});

export default RetailScreen;
