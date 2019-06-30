import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCR7PCQRP9GJO7TJdfy80Sc2Qzft0s66P4',
  authDomain: 'kanban-200f7.firebaseapp.com',
  databaseURL: 'https://kanban-200f7.firebaseio.com',
  projectId: 'kanban-200f7',
  storageBucket: 'kanban-200f7.appspot.com',
  messagingSenderId: '256387128938',
  appId: '1:256387128938:web:e57f8449da831546',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
