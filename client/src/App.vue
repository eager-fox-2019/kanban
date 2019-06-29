<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <img class="logoImage" alt="Kanban logo" src="./assets/logo.png">
      <router-link to="/add">Add Card</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>

img{
  height: 4.2em;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ff9900;
}
</style>
