import firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyCrLUrBxfT_OPvxIGufXaM9yGJBJ6hQrjM",
    authDomain: "kanban-cef94.firebaseapp.com",
    databaseURL: "https://kanban-cef94.firebaseio.com",
    projectId: "kanban-cef94",
    storageBucket: "kanban-cef94.appspot.com",
    messagingSenderId: "628187940129",
    appId: "1:628187940129:web:9e0fa95db27de3c4"
  }
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export default db