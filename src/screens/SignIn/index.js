import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  ScrollView,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Constant from 'expo-constants';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Toast from 'react-native-toast-message';
LogBox.ignoreLogs(['Setting a timer']);

import firebase from '../../firebase';
import { primaryColor } from '../../helpers';
import Logo from '../../../assets/icon.png';
import { loggedInUser } from '../../store/actions/authActions';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: Constant.statusBarHeight,
  },
  top: {
    height: 300,
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
  },
  profileInputs: {
    borderColor: `${primaryColor}`,
    marginTop: 18, 
    borderRadius: 5,
  }
});

const SignIn = ({navigation, route}) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);

  const recaptchaVerifier = useRef(null);
  const authReducer = useSelector(state => state.authReducer);
  const { user,  isLoggedIn } = authReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'TourApp',
          },
        ],
      })
    }
  }, []);

  const sendVerification = () => {
    setLoading(true);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    
    if (phone) {
      phoneProvider
        .verifyPhoneNumber(`+256${phone}`, recaptchaVerifier.current)
        .then((res) => {
          console.log(res)
          setVerificationId(res)
          setIsVerificationSent(true);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      Toast.show({
        text2: 'Please enter a valid phone number',
        position: 'bottom',
        type: 'error',
        autoHide: true
      })
    }
  };

  const confirmCode = () => { 
    setLoading(true);
    if (code && isVerificationSent) {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((res) => {
          console.log(res);
          checkUserProfile();
        });
    } else {
      setLoading(false);
      Toast.show({
        text2: 'Please enter a valid verification code',
        position: 'bottom',
        type: 'error',
        autoHide: true
      });
    }

  };

  const checkUserProfile = () => {
    const user = firebase.auth().currentUser;
    firebase.firestore().collection('/users').doc(user.uid)
      .get()
      .then(snapshot => {

        if (snapshot.exists) {
          console.log('User exists', snapshot);
          dispatch(loggedInUser(snapshot.data()));
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'TourApp',
              },
            ],
          })
        } else{
          console.log('User does not exist');
          setEditProfile(true);
        }

        setLoading(false);
      })
      .catch(err => console.log('Error checking user profile', err))
  }

  const saveUserProfile = () => {
    setLoading(true);
    const user = firebase.auth().currentUser;

    if (!name) {
      Toast.show({
        text2: 'Enter a valid name',
        position: 'bottom',
        type: 'error',
        autoHide: true
      });
      setLoading(false);
    } else if (!email) {
      Toast.show({
        text2: 'Enter a valid email',
        position: 'bottom',
        type: 'error',
        autoHide: true
      });
      setLoading(false);
    } else if (!address) {
      Toast.show({
        text2: 'Enter a valid address',
        position: 'bottom',
        type: 'error',
        autoHide: true
      });
      setLoading(false);
    } else {
      user.updateProfile({
        displayName: name,
      })
      .then(res => {
        console.log('Profile updated', res);
        user.updateEmail(email)
          .then(result => {
            console.log('Email updated', result);
            user.sendEmailVerification().then(emailSuccess => console.log('Email verification sent', emailSuccess));
    
            const profile = {
              name: user.displayName,
              email: user.email,
              phone: user.phoneNumber,
              address: address,
              photoURL: user.photoURL,
              refreshToken: user.refreshToken,
              userUid: user.uid
            }
            console.log(profile);

            firebase.firestore().collection('/users').doc(user.uid)
              .set(profile)
              .then(profileRes => {
                setLoading(false);
                console.log(profileRes);
                dispatch(loggedInUser(profile));
                navigation.navigate("TourApp");
              })
              .catch(error => {
                Toast.show({
                  text2: 'Profile not saved, Please try again!',
                  position: 'bottom',
                  type: 'error',
                  autoHide: true
                });
                console.log('Error saving profile', error);
              })
        })
        .catch(emailError => {
          setLoading(false);
          Toast.show({
            text2: emailError,
            position: 'bottom',
            type: 'error',
            autoHide: true
          });
          console.log(emailError)
        })
      })
      .catch(err => {
        setLoading(false);
        console.log('Error updating profile', err);
      });
    }

  }

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

          { editProfile &&
            
            <View>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>Save your profile </Text>

              <Card containerStyle={styles.profileInputs}>
                <TextInput
                  editable
                  keyboardType="default"
                  placeholder="Name"
                  onChangeText = {text => setName(text)}
                  value={name}
                />
              </Card>

              <Card containerStyle={styles.profileInputs}>
                <TextInput
                  editable
                  keyboardType="email-address"
                  placeholder="Email"
                  onChangeText = {text => setEmail(text)}
                  value={email}
                />
              </Card>

              <Card containerStyle={styles.profileInputs}>
                <TextInput
                  editable
                  keyboardType="default"
                  placeholder="Address"
                  onChangeText = {text => setAddress(text)}
                  value={address}
                />
              </Card>

              <Button
                  buttonStyle={{width: '100%', backgroundColor: `${primaryColor}`, alignSelf: 'center',  padding: 12}}
                  titleStyle={{fontSize: 20}}
                  containerStyle={{ margin: 16 }}
                  title="Save"
                  loading={loading}
                  onPress={saveUserProfile}
                />

            </View>
          }
         
          { isVerificationSent && verificationId && !editProfile &&
            <View>
               <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>OTP Authentication</Text>
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

              <Button
                  buttonStyle={{width: '100%', backgroundColor: `${primaryColor}`, alignSelf: 'center',  padding: 12}}
                  titleStyle={{fontSize: 20}}
                  containerStyle={{ margin: 16 }}
                  title="Verify Code"
                  loading={loading}
                  onPress={confirmCode}
                />
            </View> 
            }
            
            { !isVerificationSent && 
              <View>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>OTP Authentication</Text>
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

                <Button
                  buttonStyle={{width: '100%', backgroundColor: `${primaryColor}`, alignSelf: 'center',  padding: 12}}
                  titleStyle={{fontSize: 20}}
                  containerStyle={{ margin: 16 }}
                  title="Continue"
                  loading={loading}
                  onPress={sendVerification}
                />                
              </View> 
            } 

        </View>
  
      </ScrollView>
    </View>
  );
};

export default SignIn;