<template>
  <v-app>
    <v-container grid-list-md>
      <h3 class="display-2">Made Kanban</h3>
      <AddDialog></AddDialog>

      <v-layout row wrap>
        <StatusCard xs3 :title="titles[0]" :status="status[0]"></StatusCard>
        <StatusCard xs3 :title="titles[1]" :status="status[1]"></StatusCard>
        <StatusCard xs3 :title="titles[2]" :status="status[2]"></StatusCard>
        <StatusCard xs3 :title="titles[3]" :status="status[3]"></StatusCard>
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
        status: ['backlog', 'todo', 'doing', 'done']
      }
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
