import firebase from 'firebase'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD9YIeMMH19R4AUDskXt4x3UwKR1vtJX4w",
    authDomain: "kanban007.firebaseapp.com",
    databaseURL: "https://kanban007.firebaseio.com",
    projectId: "kanban007",
    storageBucket: "kanban007.appspot.com",
    messagingSenderId: "734746234540",
    appId: "1:734746234540:web:f6f10314990d06f1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db

