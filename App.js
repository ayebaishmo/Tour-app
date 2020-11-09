import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './src/Home';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store} >
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
