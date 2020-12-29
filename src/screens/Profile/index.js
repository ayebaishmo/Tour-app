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

const Profile = () => {
  const authReducer = useSelector((state) => state.authReducer);
  // const { error, loading } = categoryReducer;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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
export default Profile
