import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {primaryColor} from '../../helpers';

const Events = ({ navigation }) => {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.floatingMenuButtonStyle}>
            <Button style={styles.buttonStyle} 
              icon={
                <Ionicons
                  name="add"
                  size={25}
                  color="white"
                  style={{marginEnd: 10}}
                />
              }
              buttonStyle={styles.buttonStyle}
              titleStyle={{fontSize: 20}}
              containerStyle={{margin: 3}}
              onPress={() => navigation.navigate("NewEventScreen")}
              title="New"
            />
          </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonStyle: {
      width: 150,
      backgroundColor: `${primaryColor}`,
      borderRadius: 50, 
      alignSelf: 'flex-end',  
      padding: 8,
    },
    floatingMenuButtonStyle: {
      zIndex: 10,
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 32,
      right: 20
    }
  });
  
  export default Events;