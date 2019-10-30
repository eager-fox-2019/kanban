<template>
  <div id="app" class="px-3 pt-1 h-100">
    <!-- ROOT APP ALREADY LOGGED IN -->
    <div v-if="isLogin" class="container-fluid h-100">
      <div class="col h-100">
        <div class="row d-flex justify-content-between">
          <div class="col-lg-3 col-sm-12 col-md-12 h-100 px-0">
            <!-- LOG OUT AND USER DETAILS BUTTON -->
            <div class="col-sm-12 col-md-12 col-lg-12 mt-3">
              <div class="border p-3">
                <div class="row d-flex px-3 justify-content-around">
                  <div class="col-3 p-0 m-0">
                    <img
                      :src="user.photoURL"
                      class="img rounded mr-3"
                      width="50px"
                      height="50px"
                    />
                  </div>
                  <div class="col-8 p-0 m-0">
                    <span
                      >{{ user.displayName }}<br /><small>{{
                        user.email
                      }}</small></span
                    >
                  </div>
                </div>
                <button
                  class="btn btn-block btn-primary btn-sm mt-3"
                  @click="logout"
                >
                  Log Out
                </button>
              </div>
            </div>
            <!-- INPUT FORM -->
            <div class="col-sm-12 col-md-12 col-lg-12 mt-3">
              <inputForm :user="user"></inputForm>
            </div>
            <!-- BOARD SUMMARY -->
            <div class="col-sm-12 col-md-12 col-lg-12 mt-3">
              <div class="border px-3 mb-2">
                <div class="p-3">
                  <h3 class="text-center">Board Summary</h3>
                  <ul class="m-0">
                    <li v-for="list in taskLists" :key="list.name" :list="list">
                      {{ list.name }} ({{ list.data.length }})
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-sm-12 col-md-12 mt-3 px-3">
            <div class="row d-flex px-3 h-100">
              <kanbanBoard
                v-for="list in taskLists"
                :key="list.name"
                :list="list"
                :user="user"
                class="col-sm-12 col-md-12 col-lg-3 py-3 border mb-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ROOT APP NOT LOGGED IN -->
    <div v-if="isLogin == false" class="container-fluid h-100">
      <div class="col h-100 d-flex justify-content-center align-items-center">
        <div class="row d-flex justfy-content-center text-center">
          <div class="col-12 my-1">
            <img
              src="@/assets/google.png"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('google')"
            />
            <img
              src="@/assets/facebook.png"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('facebook')"
            />
            <img
              src="@/assets/github.jpeg"
              class="img rounded-circle img-thumbnail m-2"
              width="120px"
              height="120px"
              @click="login('github')"
            />
          </div>

          <div class="col-12 m-1">
            <H1>WELCOME TO MY KANBAN BOARD</H1>
            <p>
              To get started, click the image above to Log in using Google /
              Facebook / GitHub
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputForm from "@/components/inputForm.vue";
import kanbanBoard from "@/components/kanbanBoard.vue";
import { db, firebaseConfig } from "@/assets/dbconfig.js";
import firebase from "firebase";
import swal from "sweetalert2";

export default {
  name: "app",
  components: {
    inputForm,
    kanbanBoard
  },
  data() {
    return {
      taskLists: [],
      isLogin: false,
      user: {}
    };
  },
  created() {
    this.checkLogin();
    this.firebaseListen();
  },
  mounted() {},
  methods: {
    checkLogin() {
      if (localStorage.token) {
        this.isLogin = true;
        this.user = JSON.parse(localStorage.user);
        swal.fire(
          `Welcome back ${this.user.displayName} `,
          `Logged in as ${this.user.email}`,
          "success"
        );
      }
    },
    login(provider) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      let option = "";
      if (provider == "google") {
        option = new firebase.auth.GoogleAuthProvider();
        option.addScope("profile");
        option.addScope("email");
      }
      if (provider == "facebook") {
        option = new firebase.auth.FacebookAuthProvider();
      }
      if (provider == "github") {
        option = new firebase.auth.GithubAuthProvider();
        option.addScope("profile");
        option.addScope("email");
      }

      firebase
        .auth()
        .signInWithPopup(option)
        .then(result => {
          let token = result.credential.accessToken;
          let user = result.user.providerData[0];
          
          let { email, displayName, photoURL } = user;
          localStorage.token = token;
          localStorage.user = JSON.stringify({ email, displayName, photoURL });
          this.checkLogin();
        })
        .catch(error => {
          console.log(error);
        });
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
      this.user = {};
      firebase.auth().signOut();
    },
    firebaseListen() {
      db.collection("todos")
        .orderBy("targetDate")
        .onSnapshot(querySnapshot => {
          let list = [];
          querySnapshot.forEach(doc => {
            list.push({
              id: doc.id,
              ...doc.data()
            });
          });
          const wacana = { name: "Wacana", data: [] };
          const rencana = { name: "Rencana", data: [] };
          const ongoing = { name: "On-going", data: [] };
          const selesai = { name: "Selesai", data: [] };

          const taskData = [wacana, rencana, ongoing, selesai];

          list.forEach(task => {
            taskData.forEach(item => {
              if (item.name === task.status) {
                item.data.push(task);
              }
            });
          });
          this.taskLists = taskData;
        });
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  padding: 0px !important;
  margin: 0px !important;
}
</style>
