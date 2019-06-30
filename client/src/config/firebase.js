import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAiHt38mOEVSP9aGdEh3vH1aME5UJ09-zE",
  authDomain: "kanban-a3e5c.firebaseapp.com",
  databaseURL: "https://kanban-a3e5c.firebaseio.com",
  projectId: "kanban-a3e5c",
  storageBucket: "",
  messagingSenderId: "258284561156",
  appId: "1:258284561156:web:f5a2c19950fc3758"
};

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

export default db