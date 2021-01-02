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
              HotelsScreen: 'hotels'
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
