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
import { Button, Card, Image } from 'react-native-elements';
import { ProgressBar } from 'react-native-paper';

import HomeCard from '../../components/HomeCard';
import NoInternet from '../../components/NoInternet';
import { primaryColor, checkConnected } from '../../helpers';

const Home = ({ navigation }) => {
  const [connected, setConnected] = useState(false);
  const authReducer = useSelector((state) => state.authReducer);
  // const { error, loading } = categoryReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    checkConnectionStatus();
  }, [])

  const checkConnectionStatus = () => {
    checkConnected().then(res => {
      setConnected(res);
    });
  }

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
  const HotelCard = ({event}) => {
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

  return (
    connected ? (
      <View style={styles.container}>
          <ScrollView>
            <View>

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

              <Text style={{fontSize: 18, margin: 16}}>Nearby Events</Text>
              <ScrollView horizontal={true} >
                  {
                    myEvents.map(item => (
                      <TouchableOpacity 
                        key={item.id} 
                        onPress={() => {}}>
                        <HotelCard event={item} />
                      </TouchableOpacity>
                    ))
                  }
              </ScrollView>
                
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
  }
})
export default Home
