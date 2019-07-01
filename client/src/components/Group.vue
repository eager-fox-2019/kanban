<template>
  <div class="col-md group1">
    <div style="text-align: left;" class="heading" :class="color">
      {{title}}
    </div>
    <div class="bottom">
        <div class="card" v-for="task in tasks" v-bind:key="task.id">
          <div class="card-body">
            <div style="font-size: 1rem; margin-bottom: 0.4rem;">
              <b>{{task.data.title}}</b>
            </div>
            Description: {{task.data.description}}<br>
            Assigned to: {{task.data.assignee}}<br>
            <div style="display: flex; justify-content: space-between">
              <a class="control" @click="left(task.id, task.data.group)" v-if="title !== 'Previous Log'">🠄</a>
              <a style="border: none; cursor: default;" class="control" v-else>&nbsp;&nbsp;&nbsp;</a>
              <a class="control" @click="deleteTask(task.id)">Delete</a>
              <a class="control" @click="right(task.id, task.data.group)" v-if="title !== 'Done'">🠆</a>
              <a style="border: none; cursor: default;" class="control" v-else>&nbsp;&nbsp;&nbsp;</a>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import db from '../../firebase.js'

export default {
  props: ['title', 'tasks'],
  computed: {
    color() {
      if (this.title === "Previous Log") return 'red';
      else if (this.title === "To-Do") return 'orange';
      else if (this.title === "Doing") return 'blue'
      else return 'green';
    },
    formatted() {
      JSON.stringify(tasks)
    }
  },
  methods: {
    left(id, gr) {
      if(gr !== 1) {
        db.collection("tasks").doc(id)
          .update({
            group: (gr - 1)
          })
      }
    },
    right(id, gr) {
      if(gr !== 4) {
        db.collection("tasks").doc(id)
          .update({
            group: (gr + 1)
          })
      }
    },
    deleteTask(id) {
      db.collection("tasks").doc(id)
        .delete()
    },
  },
};
</script>

<style scoped>
.group1 {
  border-radius: 0.4rem;
  padding: 0;
  margin: 0.6rem;
  height: auto;
  overflow: hidden;
  background-color: black;
}

.heading {
  width: 100%;
  margin: 0;
  padding: 0.6rem 1rem;
}

.red {
  color: white;
  background-color: red;
}

.orange {
  color: white;
  background-color: yellow;
}

.blue {
  color: white;
  background-color: blue;
}

.green {
  color: white;
  background-color: green;
}

.bottom {
  width: 100%;
}

.card {
  margin: 0.6rem 0;
  padding: 0;
  font-size: 0.9rem;
  border-color: grey;
}

.card-body {
  margin: 0;
  padding: 0.5rem;
  text-align: left;
}

.control {
  text-align: center;
  margin-top: 0.6rem;
  padding: 0.1rem 0.4rem;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  background: white;
  cursor: pointer;
}

</style>
