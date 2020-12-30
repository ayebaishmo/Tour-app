import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import {primaryColor} from './src/helpers';

import store from './src/store';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import Hotels from './src/screens/Hotels';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

console.log(Constants.manifest.extra.apiKey)
const TourApp = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home';
            // ios-home, ios-home-outline, user-alt, user
          } else if (route.name === 'Profile') {
            iconName = 'ios-person';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: `${primaryColor}`,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <Provider store={store} >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
            <RootStack.Screen name="TourApp" component={TourApp}  options={{headerLeft: () => null}} />
            <RootStack.Screen name="Hotels" component={Hotels} />
            <RootStack.Screen name="Profile" component={Profile} />
          </RootStack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
