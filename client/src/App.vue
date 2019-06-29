<template>
  <div id="app">
    <div id="navbar">
      <p id="judul">Kanban Board</p>
    </div>
    <p id="add" @click="isComponentModalActive = true" class="button">Add new task</p>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <AddForm></AddForm>
    </b-modal>
    <div id="kanban-bar">
      <kanban kanban-name="Plan"/>
      <kanban kanban-name="In-Progress"/>
      <kanban kanban-name="Done"/>
      <kanban kanban-name="Routine"/>
    </div>
  </div>
</template>

<script>
import Kanban from '@/components/Kanban.vue'
import AddForm from '@/components/AddForm.vue'
export default {
  name: 'app',
  data() {
    return {
      isComponentModalActive: false,

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

    }
  }
}
</script>

<style>
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
  margin-top: 12px;
}
#judul {
  color: white;
  font-size: 24px;
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
}
#navbar {
  width: 100%;
  height: 50px;
  padding: 10px;
  background-color: #2c3e50;
}
</style>
