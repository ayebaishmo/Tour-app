import React, { useState, useRef, useEffect } from 'react';
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
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Constant from 'expo-constants';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Toast from 'react-native-toast-message';

import firebase from '../../firebase';
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
    borderColor: `${primaryColor}`,
    marginTop: 50, 
    marginBottom: 20,
    borderRadius: 5,
  }
});

const SignIn = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isCodeApproved, setIsCodeApproved] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    
    if (phone) {
      phoneProvider
        .verifyPhoneNumber(`+256${phone}`, recaptchaVerifier.current)
        .then((res) => {
          console.log(res)
          setVerificationId(res)
          setIsVerificationSent(true)
        });
    } else {
      Toast.show({
        text2: 'Please enter a valid phone number',
        position: 'bottom',
        type: 'error',
        autoHide: true
      })
    }
  };

  const confirmCode = () => { 

    if (code && isVerificationSent) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          console.log(res);
          const { providerData } = res;
          console.log('User: ', providerData)
          if (user.phoneNumber) {
            navigation.navigate("TourApp");
          }
        });
    } else {
      Toast.show({
        text2: 'Please enter a valid verification code',
        position: 'bottom',
        type: 'error',
        autoHide: true
      });
    }

  };

  return (
    <View style={styles.container}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />

      <ScrollView>
        <View style={styles.top}>
          <Image source={Logo} style={{width: 150, height: 150}} />
        </View>

        <View style={styles.bottom}>

          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>OTP Authentication</Text>
          { isVerificationSent && verificationId &&
            <View>
              <Text style={{textAlign: 'center', marginTop: 8}}>Enter the OTP code sent to your phone number</Text>

              <Card containerStyle={styles.textInput}>
                <TextInput
                  editable
                  keyboardType="numeric"
                  maxLength={6}
                  placeholder="Enter code"
                  onChangeText = {text => setCode(text)}
                  value={code}
                />
              </Card>

              <TouchableOpacity onPress={confirmCode}>
                <View
                  style={{
                    backgroundColor: `${primaryColor}`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 16,
                    borderRadius: 5,
                    padding: 14,
                  }}>
                  <Text style={{color: 'white', fontSize: 16, textTransform: 'uppercase'}}>
                    Verify Code
                  </Text>
                </View>
              </TouchableOpacity>
            </View> 
            }
            
            { !isVerificationSent && 
              <View>
                <Text style={{textAlign: 'center', marginTop: 8}}>You will receive a One Time Password via your mobile number</Text>
                <Card containerStyle={styles.textInput}>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput 
                    value="+256"
                    style={{marginEnd: 8}}
                    />
                    <TextInput
                      editable
                      keyboardType="numeric"
                      maxLength={9}
                      placeholder="Phone number"
                      onChangeText = {txt => setPhone(txt)}
                      value={phone}
                    />
                  </View>
                
                </Card>

                <TouchableOpacity onPress={sendVerification}>
                  <View
                    style={{
                      backgroundColor: `${primaryColor}`,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 16,
                      borderRadius: 5,
                      padding: 14,
                    }}>
                    <Text style={{color: 'white', fontSize: 16, textTransform: 'uppercase'}}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
                
              </View> 
            } 

        </View>
  
      </ScrollView>
    </View>
  );
};

export default SignIn;