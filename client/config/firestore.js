// Your web app's Firebase configuration
import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyAGrC7dOBk0ly6ynCqa4MwWB0V8C3bObsM",
  authDomain: "kanban-jays.firebaseapp.com",
  databaseURL: "https://kanban-jays.firebaseio.com",
  projectId: "kanban-jays",
  storageBucket: "",
  messagingSenderId: "534476446638",
  appId: "1:534476446638:web:0c77edf896978b18"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export default db
