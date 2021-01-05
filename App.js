import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import * as Sentry from 'sentry-expo';

import {primaryColor} from './src/helpers';
import { store, persistor } from './src/store';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  Sentry.init({
    dsn: 'https://577cc4af40584cd4b6148e2a1a528f45@o499263.ingest.sentry.io/5577579',
    enableInExpoDevelopment: true,
    debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
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
