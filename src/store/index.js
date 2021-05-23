import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './reducers/index';

const persistConfig = {
  key: 'tourApp',
  storage: AsyncStorage,
  whitelist: ['authReducer']
};
const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(rootReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export {
  store,
  persistor,
};
