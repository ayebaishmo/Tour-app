import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './src/store';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import TourApp from './src/screens/TourApp';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store} >
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
            <RootStack.Screen name="TourApp" component={TourApp}  options={{headerLeft: () => null}} />
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="Profile" component={Profile} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
