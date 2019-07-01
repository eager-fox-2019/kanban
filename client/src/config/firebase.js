import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD9gl6Sxr2CXuKo9eSlCqOckseb5XyHHn8",
    authDomain: "kanbanboardmg.firebaseapp.com",
    databaseURL: "https://kanbanboardmg.firebaseio.com",
    projectId: "kanbanboardmg",
    storageBucket: "",
    messagingSenderId: "314284159445",
    appId: "1:314284159445:web:414854f3f163ab83"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db