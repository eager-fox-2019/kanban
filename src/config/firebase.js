import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyDkGNVh3_XmjQgbHgY5v0wu30ui760Rb1Q',
  authDomain: 'lyxkanban.firebaseapp.com',
  databaseURL: 'https://lyxkanban.firebaseio.com',
  projectId: 'lyxkanban',
  storageBucket: '',
  messagingSenderId: '245553629538',
  appId: '1:245553629538:web:ea8e095991409385'
}

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

export default db
