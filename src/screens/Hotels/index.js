import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, Dimensions, 
  Animated, ScrollView,
  PermissionsAndroid, StatusBar, 
  TouchableOpacity, View 
} from 'react-native';
import { Image, Button, Rating, Card, Divider } from 'react-native-elements';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Permissions } from 'expo-permissions';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import { FAB, Searchbar } from "react-native-paper";
import * as TaskManager from 'expo-task-manager';
import  { mapsApiKey } from '../../../config';
import {MaterialIcons, Ionicons} from '@expo/vector-icons';
import Constants from 'expo-constants';
import axios from 'axios';

import {primaryColor} from '../../helpers';
import { Directions } from 'react-native-gesture-handler';

const iconSize = 24;

const Hotels = () => {
  
  const [locationResult, setLocationResult] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({});

  const [panelActive, setPanelActive] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '100%'], []);

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
    console.log(item)
    setSearchItem(item);
    setLoading(true);

    if (item) {
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
  }

  const fetchPlaceDetails = async (placeId) => {
    setLoading(true);
    await axios
    .get(`${baseUrl}/details/json?place_id=${placeId}&fields=address_component,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=${apiKey}`)
    .then(res => {
      setPlaceDetails(res.data.result);
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
    setPanelActive(!panelActive);
    setSelectedHotel(hotel);
    fetchPlaceDetails(hotel.place_id);
    console.log(`${hotel.rating} selected`);
  }

  const toggleBottomSheet = () => {
    setPanelActive(!panelActive);
  }

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

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

        {
          !panelActive &&
          <Searchbar
            placeholder="Search hotel"
            style={{
              position: 'absolute',
              top: 1,
              margin: 10,
              zIndex: 1,
            }}
            value={searchItem}
            onChangeText={searchHotel}
            onIconPress={() => console.log('Icon pressed')}
          />
      }


      <View style={styles.bottomCard}>
          <View>
            {
                loading 
                ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                : <ScrollView horizontal={true} >
                  {places.map((hotel, index) => (
                    <TouchableOpacity 
                      key={hotel.place_id} 
                      onPress={() => onSelectedPlace(hotel)}>
                      <Card containerStyle={{borderRadius: 10, width: 200, height: 170}}
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
      </View>

      {
        panelActive &&
        <TouchableOpacity onPress={toggleBottomSheet} style={styles.roundBtnLayout} >
          <View style={styles.roundButton}>
            <MaterialIcons name="close" size={30} color="#111" />
          </View>
        </TouchableOpacity>
      }

      {
        panelActive &&  
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetScrollView style={{paddingBottom: 20}}>
            <View style={{marginBottom: 18}}>
            {
              selectedHotel.photos 
              ? <Image 
                source={{uri: `${baseUrl}/photo?maxwidth=400&photoreference=${selectedHotel.photos[0].photo_reference}&key=${apiKey}`}} 
                style={{width: '100%', height: 250}}
                onError={(err) => console.log('Image error: ',err)}
                />
              : <Image
                source={{uri: selectedHotel.icon}} 
                style={{width: '100%', height: 100}}
                onError={(err) => console.log('Image error: ',err)}
                />
            }
            </View>
          
            <View>
              <Card containerStyle={{borderRadius: 10, minHeight: 200}}>
             
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>{selectedHotel.name}</Text>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                    <Rating
                      ratingCount={5}
                      startingValue={parseInt(selectedHotel.rating, 10)}
                      imageSize={14}
                      style={{left: 0}}
                    />
                    </View>
                    <Text style={{marginStart: 4}}>({selectedHotel.rating})</Text>
                  </View>
                </View>

                <Divider style={{backgroundColor: '#ddd', width: '100%', marginBottom: 16, marginTop: 16}} />

                {
                  loading ? <Text>Loading...</Text>
                  : <View>
                      <View style={{flexDirection: 'row', margin: 16}}>
                        <Ionicons name="ios-call" size={iconSize} color={primaryColor} />
                        <Text style={styles.textStyle}>{placeDetails.formatted_phone_number}</Text>
                      </View>

                      <View style={{flexDirection: 'row', margin: 16}}>
                        <Ionicons name="ios-location" size={iconSize} color={primaryColor} />
                        <Text style={styles.textStyle}>{placeDetails.formatted_address}</Text>
                      </View>

                      {
                        placeDetails.website &&
                        <View style={{flexDirection: 'row', margin: 16}}>
                          <Ionicons name="globe" size={iconSize} color={primaryColor} />
                          <Text style={styles.textStyle}>{placeDetails.website}</Text>
                        </View>
                      }
                      
                  </View>
                }
                
              </Card>

              <Button
              icon={
                <MaterialIcons
                  name="directions"
                  size={iconSize}
                  color="white"
                  style={{marginEnd: 10}}
                />
              }
              buttonStyle={styles.buttonStyle}
              title="Directions"
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      }
     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 5,
    left: 0,
  },
  roundBtnLayout: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
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
  textStyle: {
    marginStart: 16, 
    alignSelf: 'center'
  },
  buttonStyle: {
    width: 160, 
    backgroundColor: `${primaryColor}`, 
    alignSelf: 'center',  
    padding: 12, 
    marginTop: 16, 
    marginBottom: 20
  }
});

Hotels.propTypes = {

}

export default Hotels

