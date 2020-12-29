import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import store from './src/store';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import SignIn from './src/screens/SignIn';
import Splash from './src/screens/Splash';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
            iconName = 'user-alt';
          }

          return <MaterialIcons name={iconName} size={12} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
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
            <RootStack.Screen name="Tour App" component={TourApp} />
            <RootStack.Screen name="Splash Screen" component={Splash} />
            <RootStack.Screen name="SignIn" component={SignIn} />
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
