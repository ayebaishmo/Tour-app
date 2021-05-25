import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Hotels from '../screens/Hotels';
import Events from '../screens/Events';
import EventDetails from '../screens/Events/EventDetails';
import NewEvent from '../screens/Events/NewEvent';
import ComingSoon from '../screens/ComingSoon';

const BottomTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const EventStack = createStackNavigator();
const HotelStack = createStackNavigator();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>

      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Hotel"
        component={HotelNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-bed" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Event"
        component={EventNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-calendar" color={color} />,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />

    </BottomTab.Navigator>
  );
}

const TabBarIcon = ( { name, color }) => {
  return <Ionicons size={24} style={{ marginBottom: -3 }} color={color} name={name} />;
}

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />

      <HomeStack.Screen
        name="ComingSoonScreen"
        component={ComingSoon}
        options={{ headerTitle: 'Coming Soon' }}
      />

    </HomeStack.Navigator>
  );
}

const HotelNavigator = () => {
  return (
    <HotelStack.Navigator>
      <HotelStack.Screen
        name="HotelsScreen"
        component={Hotels}
        options={{ headerTitle: 'Hotels' }}
      />
    </HotelStack.Navigator>
  )
}

const EventNavigator = () => {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name="EventsScreen"
        component={Events}
        options={{ headerTitle: 'Events' }}
      />
      <EventStack.Screen
        name="EventDetailsScreen"
        component={EventDetails}
        options={{ headerTitle: 'Event Details' }}
      />
      <EventStack.Screen
        name="NewEventScreen"
        component={NewEvent}
        options={{ headerTitle: 'New Event' }}
      />
    </EventStack.Navigator>
  )
}

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{ headerTitle: 'Profile' }}
      />
    </ProfileStack.Navigator>
  );
}

export default BottomTabNavigator;
