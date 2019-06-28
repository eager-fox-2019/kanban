import firebase from 'firebase/app';
import "firebase/firestore";
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAFwUXyaqGiZSa2TXAhpdq51J1UyrO_3Jc",
    authDomain: "kanban-sukmarangga.firebaseapp.com",
    databaseURL: "https://kanban-sukmarangga.firebaseio.com",
    projectId: "kanban-sukmarangga",
    storageBucket: "kanban-sukmarangga.appspot.com",
    messagingSenderId: "680041659279",
    appId: "1:680041659279:web:238ed25702d00182"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  export default db;