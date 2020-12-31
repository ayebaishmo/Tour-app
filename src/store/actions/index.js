
import {
  setLogIn, setLogOut, authLoading, loggedInUser, createUser, authError,
} from './authActions';

const logInUser = (profile) => (dispatch) => {
  dispatch(loggedInUser(profile));
};

const logOutUser = () => (dispatch) => {
  dispatch(authLoading());
  dispatch(setLogOut());
};

const signUpUser = () => (dispatch) => {
  dispatch(authLoading());
  dispatch(createUser({ name: 'Denis Oluka', email: 'olukadeno@gmail.com' }));
  dispatch(dispatch(setLogIn()));
};

export {
  logInUser,
  logOutUser,
  signUpUser,
};
