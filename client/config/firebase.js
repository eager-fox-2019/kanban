import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCnCZoCOaiAa0y2QR_godkrGIZvuVNkywc",
    authDomain: "kanban-dbe8f.firebaseapp.com",
    databaseURL: "https://kanban-dbe8f.firebaseio.com",
    projectId: "kanban-dbe8f",
    storageBucket: "kanban-dbe8f.appspot.com",
    messagingSenderId: "963089228154",
    appId: "1:963089228154:web:a284795f940ce09f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default db