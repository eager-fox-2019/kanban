import firebase from 'firebase'
import 'firebase/firestore'

  var firebaseConfig = {
    apiKey: "AIzaSyDjFdI2H6s2G8zyR-BtkqKloj5cWpCRZuY",
    authDomain: "kanban-144a8.firebaseapp.com",
    databaseURL: "https://kanban-144a8.firebaseio.com",
    projectId: "kanban-144a8",
    storageBucket: "kanban-144a8.appspot.com",
    messagingSenderId: "394557576610",
    appId: "1:394557576610:web:8973ddbbd8d6c1ec"
  };

  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore()

  export default db
