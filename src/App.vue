<template>
  <v-app>
    <v-container grid-list-md>
      <h3 class="display-2">Made Kanban</h3>
      <AddDialog></AddDialog>

      <v-layout row wrap>
        <StatusCard xs3 :title="titles[0]" :kanbans="backlogs"></StatusCard>
        <StatusCard xs3 :title="titles[1]" :kanbans="todos"></StatusCard>
        <StatusCard xs3 :title="titles[2]" :kanbans="doings"></StatusCard>
        <StatusCard xs3 :title="titles[3]" :kanbans="dones"></StatusCard>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import StatusCard from './components/StatusCard'
  import AddDialog from './components/AddDialog'
  import db from "./db"

  export default {
    name: 'App',
    components: {
      HelloWorld,
      StatusCard,
      AddDialog,
    },
    data() {
      return {
        titles: ['Back-Log', 'To-Do', 'Doing', 'Done'],
        kanbans: [],
        backlogs: [],
        todos: [],
        doings: [],
        dones: []
      }
    },
    created() {
      db.collection("Task")
        .onSnapshot((querySnapshot) => {
          let arr = []
          this.backlogs = []
          this.todos = []
          this.doings = []
          this.dones = []
          querySnapshot.forEach((doc) => {
            arr.push({
              id: doc.id,
              ...doc.data()
            });
          });
          this.kanbans = arr;
          for (const kanban of arr) {
          if (kanban.status == 'backlog') {
            this.backlogs.push(kanban);
          } else if(kanban.status == 'todo') {
            this.todos.push(kanban)
          } else if(kanban.status == 'doing') {
            this.doings.push(kanban);
          } else if(kanban.status == 'done') {
            this.dones.push(kanban)
          }
        }
        });
        
    }
  }
</script>

<style>
  #header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
