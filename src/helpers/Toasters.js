import Toast from 'react-native-toast-message';

const errorToast = (message) => {
  return Toast.show({
    text1: 'Error',
    text2: message,
    position: 'bottom',
    type: 'error',
    autoHide: true,
  });
};

const successToast = (message) => {
  return Toast.show({
    text1: 'Success',
    text2: message,
    position: 'bottom',
    type: 'success',
    autoHide: true,
  });
};

export { errorToast, successToast };
