
import {
  setLogIn, setLogOut, authLoading, loggedInUser, createUser, authError,
} from './authActions';

const logInUser = (payload) => (dispatch) => {
  dispatch(authLoading());
  const { email, password } = payload;
  // firebaseApp.auth().signInWithEmailAndPassword(email, password)
  //   .then((result) => {
  //     dispatch(dispatch(setLogIn()));
  //     console.log(result);
  //     dispatch(loggedInUser(result.user));
  //   })
  //   .catch((err) => {
  //     dispatch(authError(err.message));
  //     console.log(err);
  //   });
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
