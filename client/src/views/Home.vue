<template>
  <div class="home">
    <div v-if="!isLogin">
      <Landing @islogin="login"></Landing>
    </div>
    <div v-if="isLogin">
      <img alt="Vue logo" src="../assets/logo.png" style="width: 100px">
      <h2 style="margin-bottom: 10px;color: white">
        <b>
          <i>Kanban with Vue CLI</i>
        </b>
      </h2>
      <NewKanban style="margin-bottom: 10px;"></NewKanban>
      <div id="con">
        <Container :name="'backlog'"/>
        <Container :name="'todo'"/>
        <Container :name="'doing'"/>
        <Container :name="'done'"/>
      </div>
    </div>
    <div style="margin-top:20px" v-if="isLogin">
      <b-button @click="logout">Logout</b-button>
    </div>
  </div>
</template>

<script>
import Container from '../components/Container.vue';
import NewKanban from '../components/New.vue';
import Landing from '../components/Landing.vue';

export default {
  name: 'home',
  data() {
    return {
      isLogin: false,
    };
  },
  components: {
    Container,
    NewKanban,
    Landing,
  },
  methods: {
    login(data) {
      this.isLogin = data;
    },
    logout() {
      localStorage.clear();
      this.isLogin = false;
    },
  },
  mounted() {
    if (localStorage.name) {
      this.isLogin = true;
    } else {
      this.osLogin = false;
    }
  },
};
</script>

<style scoped>
#con {
  display: flex;
  justify-content: space-around;
}
</style>
