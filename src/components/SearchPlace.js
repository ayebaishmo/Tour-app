import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";

const SearchPlace = () => {
  const [searchItem, setSearchItem] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchReducer = useSelector((state) => state.searchReducer);
  const { searchPlace } = searchReducer;
  const dispatch = useDispatch();
  console.log("Search: ", searchPlace);

  const baseUrl = Constants.manifest.extra.baseUrl;
  const apiKey = "AIzaSyCYeFTZcQ0ptQrdS9v0BKkH3tQrV_pQ47w";

  const search = async (item) => {
    console.log(item);
    setSearchItem(item);
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
          console.log("Places error: ", err);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Search hotel"
        style={{
          position: "absolute",
          top: 1,
          margin: 10,
          zIndex: 1,
        }}
        value={searchItem}
        onChangeText={search}
        onIconPress={() => console.log("Icon pressed")}
      />

      {loading ? (
        <Text style={{ textAlign: "center", marginTop: 100 }}>Loading...</Text>
      ) : (
        places.map((hotel, index) => (
          <ListItem
            key={index}
            bottomDivider
            onPress={() => handleSnapPress(hotel)}>
            <ListItem.Content>
              <ListItem.Title>{hotel.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBasrStyle: {
    position: "absolute",
    top: 1,
    margin: 10,
    zIndex: 1,
  },
});

export default SearchPlace;
