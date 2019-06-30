<template>
  <div id="app">
    <div id="nav">
      
      <strike @click="noNewTask" style="cursor:pointer"><b>KAN-BANNED</b></strike>
      <br>
      <small v-if="!isNew"><a @click="newTask">+ Task</a></small>
    </div>
    <router-view/>
  </div>
</template>

<script>



export default {
  
  data(){
    return {
      isNew : false
    }
  },
  methods : {
    newTask(){
      this.isNew = true,
      this.$router.push('/new')
    },
    noNewTask(){
      this.isNew = false,
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/1d/BlankMap-World-WWII.PNG');
  background-size: cover;
}
#nav {
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;
  background-color: rgba(1, 250, 237, 0.3)
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  padding: 4px;
  padding-bottom: 2px;
  border: 1px black solid;
  border-radius: 20pc;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(1, 250, 237, 1);

}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
