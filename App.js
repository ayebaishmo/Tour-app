import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

import {primaryColor} from './src/helpers';
import { store, persistor } from './src/store';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

// import Home from './src/screens/Home';
// import Profile from './src/screens/Profile';
// import SignIn from './src/screens/SignIn';
// import Hotels from './src/screens/Hotels';

// const RootStack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const TourApp = () => {

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = 'ios-home';
//             // ios-home, ios-home-outline, user-alt, user
//           } else if (route.name === 'Profile') {
//             iconName = 'ios-person';
//           }

//           return <Ionicons name={iconName} size={24} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: `${primaryColor}`,
//         inactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   )
// }


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <Navigation colorScheme={colorScheme} />
        
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
