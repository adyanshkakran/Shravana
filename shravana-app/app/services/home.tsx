// create a similar dummy page for "home maitenance" as well.

// Path: shravana-app/app/services/HomeMaintenance.tsx
//
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const HomeMaintenanceScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Maintenance Screen</Text>
        <Text>This is a dummy home maintenance screen.</Text>
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

export default HomeMaintenanceScreen;
