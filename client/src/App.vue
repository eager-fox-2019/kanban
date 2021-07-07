<template>
  <v-app>
    

    <v-content>
      <v-container>
        <h1>Kanban</h1>
        <v-btn :to="{path: '/add'}" color="green">Add New Task</v-btn>
        <router-view></router-view>
        <listDisplay class="mt-4"></listDisplay>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
// import db from "./db"
import listDisplay from "./components/list-display"



export default {
  name: 'App',
  components: {
    listDisplay
  },
  data () {
    return {
      tasks: [],
      
    }
  },
  created () {
  }
}
</script>
