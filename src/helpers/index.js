import NetInfo from '@react-native-community/netinfo';

const primaryColor = '#003399';
const secondaryColor = '#ff8533';
const checkConnected = async () => {
  return await NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
};

const isEmptyObject = (value) => {
  return (
    value && Object.keys(value).length === 0 && value.constructor === Object
  );
};

const isNullOrEmpty = (value) => {
  return value === null || value === undefined || value === '' ? true : false;
};

export {
  primaryColor,
  secondaryColor,
  checkConnected,
  isEmptyObject,
  isNullOrEmpty,
};
