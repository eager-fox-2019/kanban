<template>
  <div>
    <create @close="createTask = false" v-if="createTask"/>
    <div style="display:flex;padding:30px">
      <div class="container-fluid">
        <div style="padding-top: 0.7rem;" class="row">
          <h3 style="margin: 10px">KamVan Board</h3>
        </div>
                  <button
            style="margin-top:10px;margin-bottom:15px"
            class="btn btn-primary"
            v-on:click="createTask = !createTask"
          >New Task</button>
        <div class="" style="display:flex;justify-content:center">
          <group title="Back-Log" :tasks="backlog"/>
          <group title="To-Do" :tasks="todo"/>
          <group title="Doing" :tasks="doing"/>
          <group title="Done" :tasks="done"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firestore/db.js";
import group from "../components/group.vue";
import create from "../components/create.vue";

export default {
  components: {
    group,
    create
  },
  data: function() {
    return {
      createTask: false,
      tasks: []
    };
  },
  created: function() {
    db.collection("tasks")
      .onSnapshot((docs) => {
        let temp = []
        docs.forEach((doc) => {
          temp.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.tasks = temp;
      });
  },
  computed: {
    backlog() {
      console.log('asd')
      return this.tasks.filter(task => task.data.group === 1);
    },
    todo() {
      return this.tasks.filter(task => task.data.group === 2);
    },
    doing() {
      return this.tasks.filter(task => task.data.group === 3);
    },
    done() {
      return this.tasks.filter(task => task.data.group === 4);
    },
  }
};
</script>