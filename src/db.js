import firebase from "firebase"
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDT17vu9QlqcVG26gwAR53Aj7pSL7WnJis",
  authDomain: "made-kanban.firebaseapp.com",
  databaseURL: "https://made-kanban.firebaseio.com",
  projectId: "made-kanban",
  storageBucket: "made-kanban.appspot.com",
  messagingSenderId: "418403836303",
  appId: "1:418403836303:web:601edfc8b5f239e4"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db