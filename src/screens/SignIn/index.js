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
  },
  textInput: {
    height: 50, 
    borderColor: `${primaryColor}`,
    marginTop: 50, 
    marginBottom: 30,
    borderRadius: 5,
    padding: 8,
    borderWidth: 1
  }
});
 
const SignIn = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);


  // const PhoneNumberView = () => {
  //   return (
      
  //   )
  // }

  // const CodeReceived = () => {
  //     return (
       
  //     )
  // }

  const sendOTP = () => {
    if (phone) {

      if (verified && code) {
        navigation.navigate("TourApp")
      } else {
        setVerified(true);
      }
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
          { verified 
          ? <View>
              <Text style={{textAlign: 'center', marginTop: 8}}>Enter the OTP code sent to your phone number</Text>

              <TextInput
                style={styles.textInput}
                editable
                keyboardType="numeric"
                maxLength={6}
                placeholder="Enter code"
                onChangeText = {text => setCode(text)}
                value={code}
              />
            </View> 
            : <View>
              <Text style={{textAlign: 'center', marginTop: 8}}>You will receive a One Time Password via your mobile number</Text>
      
              <TextInput
                style={styles.textInput}
                editable
                keyboardType="numeric"
                maxLength={14}
                placeholder="Phone number"
                onChangeText = {txt => setPhone(txt)}
                value={phone}
              />
            </View> 
            } 

          <TouchableOpacity onPress={sendOTP}>
            <View
              style={{
                backgroundColor: `${primaryColor}`,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                padding: 14,
              }}>
              <Text style={{color: 'white', fontSize: 16, textTransform: 'uppercase'}}>
                { verified ? 'Verify' : 'Continue' }
              </Text>
            </View>
          </TouchableOpacity>


        </View>
  
      </ScrollView>
    </View>
  );
};

export default SignIn;