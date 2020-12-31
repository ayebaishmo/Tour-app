import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAYvp-FezJa1pwfRBLQ62s3GV3AJs1W0gQ',
  authDomain: 'tour-app-3279e.firebaseapp.com',
  projectId: 'tour-app-3279e',
  storageBucket: 'tour-app-3279e.appspot.com',
  messagingSenderId: '864375603210',
  appId: '1:864375603210:web:d65d637534dd463d60dff3',
  measurementId: 'G-QJ1BTS7S6W'
};

firebase.initializeApp(firebaseConfig);

export default firebase;