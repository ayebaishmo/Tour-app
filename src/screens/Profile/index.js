import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  LogBox,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Card, Divider} from 'react-native-elements';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import firebase from '../../firebase';

import {primaryColor} from '../../helpers';
import Logo from '../../../assets/icon.png';
import { setLogOut } from '../../store/actions/authActions';

const Profile = ({navigation}) => {
  const authReducer = useSelector((state) => state.authReducer);
  const { user, isLoggedIn } = authReducer;
  const dispatch = useDispatch();
  const iconSize = 24;

  const logout = () => {
    if (user && isLoggedIn) {
      dispatch(setLogOut());
      firebase.auth().signOut();
      navigation.navigate('SignIn');
    }
  };

  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={{}}>
          <View style={styles.top}>
            <Image source={Logo} style={{width: 100, height: 100, borderRadius: 50, marginTop: 20}} />
          </View>

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{user.name}</Text>
            <Text>{user.phone}</Text>
            <Button
              icon={
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={`${primaryColor}`}
                  style={{marginEnd: 8}}
                />
              }
              buttonStyle={{width: 100, alignSelf: 'center', marginTop: 16}}
              title="Edit"
              titleStyle={{ color: `${primaryColor}`}}
              type="outline"
            />
            <Divider style={{backgroundColor: '#ddd', width: '100%', marginBottom: 16, marginTop: 16}} />
          </View>

          <Card containerStyle={{borderRadius: 10}}>
            <View style={{flexDirection: 'row', margin: 16}}>
              <Ionicons name="mail" size={iconSize} color={primaryColor} />
              <Text style={styles.textStyle}>{user.email}</Text>
            </View>

            <View style={{flexDirection: 'row', margin: 16}}>
              <Ionicons name="ios-location" size={iconSize} color={primaryColor} />
              <Text style={styles.textStyle}>{user.address}</Text>
            </View>
          </Card>

          <Button
            icon={
              <Ionicons
                name="log-out"
                size={20}
                color="white"
                style={{marginEnd: 8}}
              />
            }
            buttonStyle={{width: 150, backgroundColor: `${primaryColor}`, alignSelf: 'center', marginTop: 30}}
            title="Logout"
            onPress={logout}
          />

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  top: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginStart: 16, 
    alignSelf: 'center'
  }
})
export default Profile
