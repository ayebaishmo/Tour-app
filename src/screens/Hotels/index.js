import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, Dimensions, 
  Animated, ScrollView,
  PermissionsAndroid, StatusBar, 
  TouchableOpacity, View 
} from 'react-native';
import { Image, Button, Card } from 'react-native-elements';
import { Permissions } from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import { FAB, Searchbar } from "react-native-paper";
import * as TaskManager from 'expo-task-manager';
import  { mapsApiKey } from '../../../config';
import BottomSheet from "react-native-bottomsheet-reanimated";
import {MaterialIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';

import datas from '../../helpers/tasks.json';
import axios from 'axios';

const Hotels = () => {
  const [locationResult, setLocationResult] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setstate] = useState({
    latitude: 0.31161,
    longitude: 32.58634,
    latitudeDelta: 0.9,
    longitudeDelta: 0.0
  });

  const baseUrl = Constants.manifest.extra.baseUrl;
  const apiKey = mapsApiKey;

  const fetchNearByHotels = async (lat, lon) => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/nearbysearch/json?location=${lat},${lon}&radius=2000&type=hotel&keyword=lodging,spa&key=${apiKey}`)
      .then(res => {
        setPlaces(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log('Places error: ', err);
        setLoading(false);
      });
  }

  const searchHotel = async (item) => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/textsearch/json?query=${item}&type=lodging,meal_delivery,meal_takeaway,bar,cafe,restaurant,spa&region=ug&key=${apiKey}`)
      .then(res => {
        setPlaces(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log('Places error: ', err);
        setLoading(false);
      });
  }

  let nameFilter = null;
    if (places) {
    nameFilter = places.filter((list) => {
      return list?.name?.toLowerCase().includes(searchItem?.item?.toLowerCase());
    });
  }

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setLocationResult('Permission to access location was denied');
      return;
    }

    await Location.getCurrentPositionAsync({ "accuracy": Location.Accuracy.High })
      .then(res => {
        setLocationResult(JSON.stringify(res));
        setstate({
          ...state,
          latitude: res.coords.latitude,
          longitude: res.coords.longitude
        });
        fetchNearByHotels(res.coords.latitude, res.coords.longitude);
      })
      .then(err => {
        console.log(err);
      });
  };

  const onSelectedPlace = (hotel) => {
    console.log(`${hotel.name} selected`);
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        region={state}
        showsIndoors={true}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        zoomTapEnabled={true}
        showsScale={true}
        // showsTraffic={true}
        showsBuildings={true}
        showsUserLocation={true}
        showsCompass={true}
        onMapReady={getLocationAsync}
      >

        {
          places?.map((place, index) => {
            return (
              <Marker
                key={index}
                coordinate={{ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }}
                animation={true}
              >
                <Callout
                  style={{ "width": 100, "height": 50 }}>
                  <View>
                    <Text>{place.name}</Text>
                  </View>
                </Callout>
              </Marker>);
          })
        }

      </MapView>

      <Searchbar
        placeholder="Search"
        style={{
          position: 'absolute',
          top: 1,
          margin: 10
        }}
          value={searchItem}
        onChangeText= {(item) => searchHotel(item)}
        onIconPress={() => console.log('Icon pressed')}
      />

      <BottomSheet
        bottomSheerColor="#FFFFFF"
        initialPosition={`40%`}  // 200, 300
        snapPoints={[`20%`, `60%`]}
        isBackDropDismisByPress={true}
        isRoundBorderWithTipHeader={true}
        containerStyle={{ backgroundColor: '#fff'}}
        style={{marginBottom: 100 }}
        header={
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 8}}>Hotels near you</Text>
          </View>
        }
        body={
            <View>
              {
                loading 
                ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                : <ScrollView 
                    horizontal={true} 
                    style={{ paddingTop: 10, paddingBottom: 10}}>
                  {places.map((hotel, index) => (
                    <TouchableOpacity 
                      key={hotel.place_id} 
                      onPress={() => onSelectedPlace(hotel)}>
                      <Card 
                        style={styles.bottomCard}
                        containerStyle={{borderRadius: 10, width: 200}}
                        >
                        <View >
                          {
                            hotel.photos 
                            ? <Image 
                              source={{uri: `${baseUrl}/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${apiKey}`}} 
                              style={{width: '100%', height: 100}}
                              onError={(err) => console.log('Image error: ',err)}
                              />
                            : <Image
                              source={{uri: hotel.icon}} 
                              style={{width: '100%', height: 100}}
                              onError={(err) => console.log('Image error: ',err)}
                              />
                          }
                          
                          <Text key={index} style={{marginTop: 8}}>{hotel.name}</Text>
                        </View>                
                      </Card>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              }
              
            </View>
          
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 56,
  },
  map: {
    marginTop: 165,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bottomCard: {

  }
});

Hotels.propTypes = {

}

export default Hotels

