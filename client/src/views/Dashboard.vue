<template>
  <div style="max-width:108rem; margin-left: auto; margin-right: auto;">
    <CreateTask @close-form="showForm = false" v-if="showForm"/>
    <div style="margin-left: 3rem; margin-right: 3rem;">
      <div class="container-fluid">
        <div style="padding-top: 0.7rem;" class="row">
          <h3 style="margin: 0.5rem 0.7rem 0.3rem 0.7rem;">Kanban, work it right!</h3>
          <button
            style="margin-left: auto; margin-right: 0.7rem; background: grey"
            class="btn btn-primary"
            @click="showForm = !showForm"
          >New Task</button>
        </div><br>
        <div class="row justify-content-center">
          <Group title="Previous Log" :tasks="tasks1"/>
          <Group title="To-Do" :tasks="tasks2"/>
          <Group title="Doing" :tasks="tasks3"/>
          <Group title="Done" :tasks="tasks4"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Group from "../components/Group.vue";
import CreateTask from "../components/CreateTask.vue";
import db from "../../firebase.js"
export default {
  components: {
    Group,
    CreateTask
  },
  data: function() {
    return {
      showForm: false,
      tasks: []
    };
  },
  created: function() {
    db.collection("tasks")
      .orderBy("createdAt")
      .onSnapshot((docs) => {
        let temp = []
        docs.forEach(doc => {
          temp.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.tasks = temp;
      });
  },
  computed: {
    tasks1() {
      return this.tasks.filter(task => task.data.group === 1);
    },
    tasks2() {
      return this.tasks.filter(task => task.data.group === 2);
    },
    tasks3() {
      return this.tasks.filter(task => task.data.group === 3);
    },
    tasks4() {
      return this.tasks.filter(task => task.data.group === 4);
    },
  }
};
</script>

<style scoped>
buttons {
  font-size: 0.9rem;
}
</style>
