import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Button, Card, Image } from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';
import Constants from 'expo-constants';

// import  { mapsApiKey } from '../../../config';
import HomeCard from '../../components/HomeCard';
import NoInternet from '../../components/NoInternet';
import { primaryColor, checkConnected } from '../../helpers';

const Home = ({ navigation }) => {
  const [connected, setConnected] = useState(false);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationResult, setLocationResult] = useState(null);
  const [state, setstate] = useState({
    latitude: 0.31161,
    longitude: 32.58634,
    latitudeDelta: 0.9,
    longitudeDelta: 0.0
  });
  const baseUrl = Constants.manifest.extra.baseUrl;
  const apiKey = 'AIzaSyCYeFTZcQ0ptQrdS9v0BKkH3tQrV_pQ47w'
  // const apiKey = Constants.manifest.extra.googleMaps.apiKey;

  const authReducer = useSelector((state) => state.authReducer);
  // const { error, loading } = categoryReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    checkConnectionStatus();
    getLocationAsync();
  }, [])

  const checkConnectionStatus = () => {
    checkConnected().then(res => {
      setConnected(res);
    });
  }

  const fetchNearByHotels = async (lat, lon) => {
    setLoading(true);
    await axios
      .get(`${baseUrl}/nearbysearch/json?location=${lat},${lon}&radius=1000&type=hotel&keyword=lodging,spa&key=${apiKey}`)
      .then(res => {
        setPlaces(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log('Places error: ', err);
        setLoading(false);
      });
  }

  const getLocationAsync = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
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

  const myEvents = [
    {
      id: 0,
      name: 'Conference in Serena hotel',
      image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    },
    {
      id: 2,
      name: 'ALC meetup',
      image: 'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
    },
  ] 
  const EventCard = ({event}) => {
    return (
      <View style={{}}>
        <View style={{minHeight: 200, width: 300, marginStart: 16}}>
          {/* <Text>{event.name}</Text> */}
          <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: event.image}}
            />
        </View>
    </View>
    )
  }

  const HotelCard = ({hotel}) => {
    return (
      <View style={{}}>
        <View style={{minHeight: 150, width: 180, marginStart: 16}}>
         
          {
            hotel.photos 
            ? <Image 
              source={{uri: `${baseUrl}/photo?maxwidth=400&photoreference=${hotel.photos[0].photo_reference}&key=${apiKey}`}} 
              style={styles.image}
              onError={(err) => console.log('Image error: ',err)}
              />
            : <Image
              source={{uri: hotel.icon}} 
              style={styles.image}
              onError={(err) => console.log('Image error: ',err)}
              />
          }

          <View style={styles.overlay}>
            <Text style={{color: 'white'}}>{hotel.name}</Text>
          </View>
        </View>
    </View>
    )
  }

  return (
    connected ? (
      <View style={styles.container}>
          <ScrollView>
            <View style={{marginBottom: 20}}>

              <ScrollView horizontal={true}>
                <View style={{
                  margin: 16,
                  flexDirection: 'row',
                  width: '100%',
                }}>
                  <HomeCard name="Boda" icon="ios-bicycle" onPressed={() => navigation.navigate("ComingSoonScreen")} />
                  <HomeCard name="Taxi" icon="car-sport" onPressed={() => navigation.navigate("ComingSoonScreen")} />
                </View>
              </ScrollView>

              <Text style={{fontSize: 20, margin: 16}}>Nearby Events</Text>            
              <ScrollView horizontal={true} >
                  {
                    myEvents.map(item => (
                      <TouchableOpacity 
                        key={item.id} 
                        onPress={() => {}}>
                        <EventCard event={item} />
                      </TouchableOpacity>
                    ))
                  }
              </ScrollView>

              <Text style={{fontSize: 20, margin: 16}}>Nearby Hotels</Text>
              {
                 loading 
                 ? <Text style={{textAlign: 'center'}}>Loading...</Text>
                 : <ScrollView horizontal={true} >
                    {
                      places?.map((hotel, index) => (
                          <TouchableOpacity 
                            key={hotel.place_id} 
                            onPress={() => {}}>
                            <HotelCard hotel={hotel} />
                          </TouchableOpacity>
                        ))
                    }
                    </ScrollView>
              }
                
            </View>

          
          </ScrollView>
      </View>) : (<NoInternet />)

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', 
    height: 200,
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    paddingEnd: 16,
    paddingStart: 16,
    paddingTop: 8,
    paddingBottom: 8,
    left: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    width: '100%',
    maxHeight: 40,
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16
  } 
})
export default Home
