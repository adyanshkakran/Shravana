// Just like Delivery.tsx, make this page too, but with "HealthCare" as the title and "This is a dummy health care screen.

// Path: shravana-app/app/services/HealthCare.tsx

import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const HealthCareScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>HealthCare Screen</Text>
        <Text>This is a dummy health care screen.</Text>
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

export default HealthCareScreen;

