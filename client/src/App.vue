<template>
  <v-app id="app">
    <p id="judul">Kanban Board</p>
    <p id="add" @click="formActive = true" class="button" v-if="!formActive">Add new task</p>
    <p id="add" @click="formActive = false" class="button" v-if="formActive">close</p>
    <AddForm v-if="formActive == true" class="animated fadeIn" :class="{'animated fadeOut' : !formActive}"></AddForm>
    <div id="kanban-bar">
      <kanban kanban-name="Plan"/>
      <kanban kanban-name="In-Progress"/>
      <kanban kanban-name="Done"/>
      <kanban kanban-name="Routine"/>
    </div>
  </v-app>
</template>

<script>
import Kanban from '@/components/Kanban.vue'
import AddForm from '@/components/AddForm.vue'
export default {
  name: 'app',
  data() {
    return {
      formActive: false
    }
  },
  components: {
    kanban: Kanban,
    AddForm
  },
  created() {

  },
  methods : {
    newTask() {

    },
    closeForm() {
      console.log('masuk tes woiii')
      this.formActive = false
    }
  }
}
</script>

<style>
p {
  margin: 0;
  
}
#add {
  font-size: 20px;
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  background-color: #2C3E50;
  margin: 10px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#add:hover{
  cursor: pointer;		
  /* margin-top: 12px; */
}
#judul {
  color: #2C3E50;
  font-size: 24px;
  margin-left: 20px;
  margin-bottom: 0px;;
}
body, html {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

#kanban-bar {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 150px;
}
#navbar {
  width: 100%;
  height: 70px;
  padding: 10px;
  background-color: #2c3e50;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
