import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  LogBox,
} from 'react-native';

const Home = () => {
  const authReducer = useSelector((state) => state.authReducer);
  // const { error, loading } = categoryReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    createTwoButtonAlert();
  }, []);

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Welcome!",
      "Let's tour Uganda",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Text>
        Let's tour
      </Text>
      
      <View>
        <Text>
        
        </Text>    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
})
export default Home
