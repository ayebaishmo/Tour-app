import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { Card, Button, Input, ListItem, Image } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import { primaryColor, isEmptyObject, isNullOrEmpty } from '../../../helpers';
import { errorToast, successToast } from '../../../helpers/Toasters';
import SearchPlace from '../../../components/SearchPlace';
import { openDialog } from '../../../store/actions/searchAction';
import firebase from '../../../firebase';

const NewEvent = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchReducer = useSelector((state) => state.searchReducer);
  const { searchPlace, open } = searchReducer;
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
    }
  };

  const openSearch = () => {
    dispatch(openDialog(true));
  };

  const closeSearch = () => {
    dispatch(openDialog(false));
  };

  const saveEvent = async () => {
    if (isEmptyObject(searchPlace)) {
      errorToast('Select a location');
    } else if (isNullOrEmpty(name)) {
      errorToast('Enter the event title');
    } else if (isNullOrEmpty(description)) {
      errorToast('Enter the event description');
    } else if (!imageSelected) {
      errorToast('Choose event image');
    } else {
      setLoading(true);
      const imageUrl = await uploadImageAsync(image);

      const payload = {
        name: name,
        description: description,
        location: searchPlace,
        imageUrl: imageUrl,
      };

      firebase
        .firestore()
        .collection('/events')
        .doc(uuid.v4())
        .set(payload)
        .then((res) => {
          setName('');
          setDescription('');
          setImage(null);
          setImageSelected(false);

          successToast('Event saved successfully');
          setLoading(false);

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Events',
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
          errorToast('Error saving event');
          setLoading(false);
        });
    }
  };

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase.storage().ref().child(uuid.v4());
    const snapshot = await ref.put(blob);
    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  return (
    <SafeAreaView style={open ? styles.overlayContainer : styles.container}>
      {!open && (
        <ScrollView>
          <View style={{ marginEnd: 20, marginStart: 20, marginTop: 30 }}>
            <Input
              label="Event title"
              value={name}
              onChangeText={(value) => setName(value)}
            />

            <Input
              label="Event description"
              containerStyle={{ marginTop: 20 }}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={(value) => setDescription(value)}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              <Text style={{ marginStart: 16 }}>
                {isEmptyObject(searchPlace) ? 'Add location' : searchPlace.name}
              </Text>
            </View>
          </View>

          <Card containerStyle={styles.imageCardStyle}>
            {!imageSelected && (
              <Button
                icon={
                  <Ionicons
                    name="add"
                    size={30}
                    color="black"
                    style={{ marginEnd: 10 }}
                  />
                }
                onPress={pickImage}
                buttonStyle={{ backgroundColor: 'white' }}
                title="Pick image"
                titleStyle={{ color: '#555' }}
              />
            )}

            {imageSelected && (
              <Card.Image
                source={{ uri: image }}
                containerStyle={{ width: 300 }}
                onPress={pickImage}
                PlaceholderContent={<ActivityIndicator />}
              />
            )}
          </Card>

          <Button
            title="Save"
            buttonStyle={{
              backgroundColor: primaryColor,
              marginTop: 30,
              marginStart: 30,
              marginEnd: 30,
            }}
            onPress={saveEvent}
            loading={loading}
          />
        </ScrollView>
      )}

      {open && (
        <TouchableOpacity onPress={closeSearch} style={styles.roundBtnLayout}>
          <View style={styles.roundButton}>
            <MaterialIcons name="close" size={30} color="#111" />
          </View>
        </TouchableOpacity>
      )}

      {open && <SearchPlace />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
  imageCardStyle: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
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
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default NewEvent;
