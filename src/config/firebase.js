import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAdoviJMEtJDkekI9hvj8VDECGCsAGMEAE',
  authDomain: 'kanban-56cb6.firebaseapp.com',
  databaseURL: 'https://kanban-56cb6.firebaseio.com',
  projectId: 'kanban-56cb6',
  storageBucket: 'kanban-56cb6.appspot.com',
  messagingSenderId: '351561106706',
  appId: '1:351561106706:web:b6f6c0f4e6507d81'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

export default db
