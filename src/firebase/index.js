import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import { firebaseConfig } from '../../config';

if (!firebase.apps.length) {
  console.log('Connected with Firebase');
  firebase.initializeApp(firebaseConfig);
} else {
  console.log('Firebase not connected');
}

export default firebase;
