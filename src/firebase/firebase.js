import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDMVVcSL18z5M2g6K56SG8RqNexi37HZsA",
  authDomain: "kanbanned-fdlzmi.firebaseapp.com",
  databaseURL: "https://kanbanned-fdlzmi.firebaseio.com",
  projectId: "kanbanned-fdlzmi",
  storageBucket: "kanbanned-fdlzmi.appspot.com",
  messagingSenderId: "849214646504",
  appId: "1:849214646504:web:df8456261ca46981"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

export default db
