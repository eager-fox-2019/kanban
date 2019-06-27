<template>
  <div id="nav">
      <b-navbar>
        <b-navbar-brand md="auto" class="col-2 brand">
          <img src="../assets/logo.jpg" class="d-inline-block align-top" alt="Logo" width="60" height="60" style="border-radius: 50%">
        </b-navbar-brand>
        <b-nav align="center" class="col" md="auto">
          <b-nav-text><span class="title">KanBan Board</span></b-nav-text>
        </b-nav>
        <b-nav align="end" class="col-2" md="auto">
          <b-button variant="success" v-b-modal.task-form>Add Task</b-button>
        </b-nav>
      </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
  #nav {
    background-color: #593527 ;
    border-bottom: 5px solid #D9B391;
  }
  .brand {
    margin: 0;
    text-align: start;
  }
  .title {
    font-family: 'Indie Flower', cursive;
    font-size: 50px;
    color: #84BF04;
    font-weight: 600;
  }
</style>
