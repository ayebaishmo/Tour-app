import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Text>Coming soon</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})

export default ComingSoon
