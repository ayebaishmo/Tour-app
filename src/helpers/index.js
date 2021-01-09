import NetInfo from '@react-native-community/netinfo';

const primaryColor = '#003399';
const secondaryColor = '#ff8533';
const checkConnected = async () => {
  return await NetInfo.fetch().then(state => {
    return state.isConnected;
  });
}

export {
  primaryColor,
  secondaryColor,
  checkConnected,
}