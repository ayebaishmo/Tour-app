import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text>Public Sign In Screen</Text>
    </View>
  );
};
 
export default SignIn;