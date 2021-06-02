import {
  setLogIn,
  setLogOut,
  authLoading,
  loggedInUser,
  createUser,
  authError,
} from './authActions';

import { setSearchItem, openDialog } from './searchAction';

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

const setSearchPlace = (dispatch) => {
  dispatch(setSearchItem);
};

const setOpenDialog = (dispatch) => {
  dispatch(openDialog);
};

export { logInUser, logOutUser, signUpUser, setSearchPlace, setOpenDialog };
