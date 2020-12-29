import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  tour: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
  },
});
 
const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.tour}>Tour App</Text>
    </View>
  );
};
 
export default Splash;