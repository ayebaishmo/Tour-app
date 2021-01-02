import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  LogBox,
} from 'react-native';

import HomeCard from '../../components/HomeCard';

const Home = ({ navigation }) => {
  const authReducer = useSelector((state) => state.authReducer);
  // const { error, loading } = categoryReducer;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <HomeCard name="Hotels" icon="ios-restaurant-sharp" onPressed={() => navigation.navigate("HotelsScreen")} />
          <HomeCard name="Flights" icon="ios-airplane" />
          <HomeCard name="Boda" icon="ios-bicycle" />
          <HomeCard name="Taxi" icon="car-sport" />
          <HomeCard name="Events" icon="ios-alarm" />
          <HomeCard name="Places" icon="ios-map" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
})
export default Home
