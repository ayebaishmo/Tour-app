import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button, Input, ListItem } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import { openDialog, setSearchItem } from '../store/actions/searchAction';

const SearchPlace = () => {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const baseUrl = Constants.manifest.extra.baseUrl;
  const apiKey = 'AIzaSyCYeFTZcQ0ptQrdS9v0BKkH3tQrV_pQ47w';

  const fetchPlaces = async (item) => {
    setSearch(item);
    setLoading(true);

    if (item) {
      await axios
        .get(
          `${baseUrl}/textsearch/json?query=${item}&type=lodging,meal_delivery,meal_takeaway,bar,cafe,restaurant,spa&region=ug&key=${apiKey}`
        )
        .then((res) => {
          setPlaces(res.data.results);
          console.log(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Places error: ', err);
          setLoading(false);
        });
    }
  };

  const selectPlace = (place) => {
    console.log(place);
    dispatch(setSearchItem(place));
    dispatch(openDialog(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search hotel"
        style={styles.searchBasrStyle}
        value={search}
        onChangeText={fetchPlaces}
        onIconPress={() => console.log('Icon pressed')}
      />

      <ScrollView>
        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 100 }}>
            Loading...
          </Text>
        ) : (
          places.map((place, index) => (
            <ListItem
              key={index}
              bottomDivider
              onPress={() => selectPlace(place)}>
              <ListItem.Content>
                <ListItem.Title>{place.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 16,
  },
});

export default SearchPlace;
