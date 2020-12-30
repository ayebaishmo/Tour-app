import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constant from 'expo-constants'

import { primaryColor } from '../../helpers';
import Logo from '../../../assets/icon.png';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Constant.statusBarHeight,
  },
  top: {
    height: 350,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    padding: 16,
  }
});
 
const SignIn = ({navigation}) => {
  const [phone, setPhone] = useState('');

  const goToHome = () => {
    if (phone) {
      navigation.navigate("TourApp")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Image source={Logo} style={{width: 150, height: 150}} />
        </View>

        <View style={styles.bottom}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>OTP Authentication</Text>
          <Text style={{textAlign: 'center', marginTop: 8}}>You will receive a One Time Password via your mobile number</Text>

          <TextInput
            style={{ 
              height: 50, 
              borderColor: `${primaryColor}`,
              marginTop: 50, 
              marginBottom: 30,
              borderRadius: 5,
              padding: 8,
              borderWidth: 1 }}
            editable
            keyboardType="numeric"
            maxLength={14}
            onChangeText = {text => setPhone(text)}
            value={phone}
          />

          <TouchableOpacity onPress={goToHome}>
            <View
              style={{
                backgroundColor: `${primaryColor}`,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                padding: 14,
              }}>
              <Text style={{color: 'white', fontSize: 16, textTransform: 'uppercase'}}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>


        </View>
  
      </ScrollView>
    </View>
  );
};

export default SignIn;