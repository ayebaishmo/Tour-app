import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
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
  TouchableOpacity,
} from "react-native";
import { Card, Button, Input, ListItem } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { primaryColor } from "../../../helpers";
import SearchPlace from "../../../components/SearchPlace";

const NewEvent = () => {
  const [searchItem, setSearchItem] = useState("");
  const [places, setPlaces] = useState([]);
  const [panelActive, setPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const openSearch = () => {
    setPanelActive(true);
  };

  const closeSearch = () => {
    setPanelActive(false);
  };

  return (
    <SafeAreaView
      style={panelActive ? styles.overlayContainer : styles.container}>
      {!panelActive && (
        <ScrollView>
          <View style={{ marginEnd: 20, marginStart: 20, marginTop: 30 }}>
            <Input label="Event name" />

            <Input
              label="Event description"
              containerStyle={{ marginTop: 20 }}
              multiline={true}
              numberOfLines={4}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                icon={
                  <MaterialIcons
                    name="add-location-alt"
                    size={25}
                    color="white"
                  />
                }
                onPress={openSearch}
                buttonStyle={{ backgroundColor: primaryColor, padding: 3 }}
              />
              <Text style={{ marginStart: 16 }}>Add location</Text>
            </View>
          </View>

          <Card containerStyle={styles.imageCardStyle}>
            <Button
              icon={
                <Ionicons
                  name="add"
                  size={30}
                  color="black"
                  style={{ marginEnd: 10 }}
                />
              }
              buttonStyle={{ backgroundColor: "white" }}
              title="Pick image"
              titleStyle={{ color: "#555" }}
            />
          </Card>

          <Button
            title="Save"
            buttonStyle={{
              backgroundColor: primaryColor,
              marginTop: 30,
              marginStart: 30,
              marginEnd: 30,
            }}
          />
        </ScrollView>
      )}

      {panelActive && (
        <TouchableOpacity onPress={closeSearch} style={styles.roundBtnLayout}>
          <View style={styles.roundButton}>
            <MaterialIcons name="close" size={30} color="#111" />
          </View>
        </TouchableOpacity>
      )}

      {panelActive && <SearchPlace />}
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
    backgroundColor: "rgba(0.5, 0.25, 0, 0.2)",
  },
  imageCardStyle: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  roundButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "white",
  },
  roundBtnLayout: {
    position: "absolute",
    top: Dimensions.get("window").height / 8,
    left: Dimensions.get("window").width / 2.4,
    zIndex: 999,
  },
});

export default NewEvent;
