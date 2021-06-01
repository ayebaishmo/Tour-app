
import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import {
  SafeAreaView, 
  StyleSheet, 
  Text, 
  Dimensions,
  View, 
  ScrollView, 
  Modal,
  Pressable,
  Alert,
  TouchableOpacity
} from 'react-native';
import { Card, Button, Input, ListItem, BottomSheet } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Searchbar } from "react-native-paper";
import axios from 'axios';
import Constants from 'expo-constants';
import {primaryColor} from '../../../helpers';

const NewEvent = () => {
  const [panelActive, setPanelActive] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const baseUrl = Constants.manifest.extra.baseUrl;
  const apiKey = 'AIzaSyCYeFTZcQ0ptQrdS9v0BKkH3tQrV_pQ47w';

  /**
   * Searches places
   * @param {*} item typed place
   */
  const searchPlace = async (item) => {
    console.log(item)
    setSearchItem(item);
    setLoading(true);

    if (item) {
      await axios
        .get(`${baseUrl}/textsearch/json?query=${item}&type=lodging,meal_delivery,meal_takeaway,bar,cafe,restaurant,spa&region=ug&key=${apiKey}`)
        .then(res => {
          setPlaces(res.data.results);
          console.log(res.data.results)
          setLoading(false);
        })
        .catch(err => {
          console.log('Places error: ', err);
          setLoading(false);
        });
    }
  }

  /**
   * Toggles bottom sheet
   */
  const openBottomSheet = () => {
    console.log("open sheet clicked")
    // setPanelActive(true);
  }

  const closeBottomSheet = () => {
    console.log("close sheet clicked")
    // setPanelActive(false);
  }

  const RenderPlaces = () => (
    <View style={{backgroundColor: 'black'}}>
       
    </View>
  )

    return (
      <SafeAreaView style={panelActive ? styles.overlayContainer : styles.container}>
       <ScrollView>
        
          <View style={{marginEnd: 20, marginStart: 20, marginTop: 30}}>
            <Input
              label="Event name"
            />

            <Input
              label="Event description"
              containerStyle={{marginTop: 20}}
              multiline={true}
              numberOfLines={4}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Button 
                icon={
                  <MaterialIcons
                    name="add-location-alt"
                    size={25}
                    color="white"
                  />
                }
                onPress={openBottomSheet}
                buttonStyle={{backgroundColor: primaryColor, padding: 3}}
              />
              <Text style={{marginStart: 16}}>Add location</Text>
            </View>
          </View>

          <Card containerStyle={styles.imageCardStyle}>
              <Button 
                icon={
                  <Ionicons
                    name="add"
                    size={30}
                    color="black"
                    style={{marginEnd: 10}}
                  />
                }
                buttonStyle={{backgroundColor: "white"}}
                title="Pick image"
                titleStyle={{color: "#555"}}
              />
            </Card>

          <Button 
              title="Save"
              buttonStyle={{backgroundColor: primaryColor, marginTop: 30, marginStart: 30, marginEnd: 30 }}
            />
         
        </ScrollView>

        {
          panelActive &&
          <TouchableOpacity onPress={closeBottomSheet} style={styles.roundBtnLayout} >
            <View style={styles.roundButton}>
              <MaterialIcons name="close" size={30} color="#111" />
            </View>
          </TouchableOpacity>
        }
          
        <BottomSheet
            isVisible={panelActive}
            containerStyle={{height: 500}}>

              <Button style={{marginBottom: 200}} onPress={closeBottomSheet}/>

              <Searchbar
              placeholder="Search place"
              style={styles.searchBasrStyle}
              value={searchItem}
              onChangeText={searchPlace}
              onIconPress={() => setSearchItem("")}
            />
          
            {
            loading ? <Text style={{textAlign: 'center', marginTop: 100}}>Loading...</Text>
              : places.map((hotel, index) => (
                <ListItem key={index} bottomDivider onPress={() => handleSnapPress(hotel)}>
                  <ListItem.Content>
                    <ListItem.Title>{hotel.name}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))
            }

            </BottomSheet>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    overlayContainer: {
      flex: 1,
      backgroundColor: "rgba(0.5, 0.25, 0, 0.2)"
    },
    appTitle: {
      color: '#fff',
      fontSize: 36,
      marginTop: 30,
      marginBottom: 30,
      fontWeight: '300',
      textAlign: 'center',
      backgroundColor: '#3143e8',
    },
    imageCardStyle: {
      height: 200, 
      justifyContent: 'center',
      alignItems: 'center',
      margin: 30
    },
    bottomSheetStyle: {
      height: Dimensions.get('window').height / 2,
    },
    searchBasrStyle: {
      position: 'absolute',
      top: 1,
      margin: 10,
      zIndex: 1,
    },
    roundButton: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: 'white',
    },
    roundBtnLayout: {
      position: 'absolute',
      top: Dimensions.get('window').height / 8,
      left: Dimensions.get('window').width / 2.4,
      zIndex: 999,
    },
  });
  
  export default NewEvent;