import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      SignIn: 'signin',
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Hotel: {
            screens: {
              HotelsScreen: 'hotels',
            },
          },
          Event: {
            screens: {
              EventsScreen: 'events',
              EventDetailsScreen: 'event_details',
              NewEventScreen: 'new_event'
            },
          },
          Profile: {
            screens: {
              ProfileScreen: 'profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
