import { combineReducers } from 'redux';
import authReducer from './authReducer';
import searchReducer from './searchReducer';

const reducer = combineReducers({
  authReducer,
  searchReducer
});

export default reducer;
