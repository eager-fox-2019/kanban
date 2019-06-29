<template>
  <div class="col-md group1">
    <div style="text-align: center;" class="heading" :style="` color: #ffffff;background-color:${color}`">{{title}}</div>
    <div class="context1" style="display:flex;justify-content:center;flex-direction:column;margin:auto">
      <div class="card" v-for="task in tasks" v-bind:key="task.id">
        <div class="card-body">
          <div style="font-size: 1rem; margin-bottom: 0.4rem;">
            <b>{{task.data.title}}</b>
          </div>
          point: {{task.data.point}}
          <br />
          Assigned to: {{task.data.assignee}}
          <br />
          <br />
          <div style="display:flex;justify-content:center">
            <p>
              <button
                class="btn btn-primary"
                style
                type="button"
                data-toggle="collapse"
                v-bind:data-target="`#${task.id}`"
                aria-expanded="false"
                aria-controls="collapseExample"
              >Show Detail</button>
            </p>
          </div>
          <div class="collapse" v-bind:id="`${task.id}`">
            <div class="card card-body">
              Description: {{task.data.description}}
              <br>
              <br>
              <br>
              <div style="display: flex; justify-content: space-between">
                <a
                  class="control"
                  v-on:click="left(task.id, task.data.group)"
                  v-if="title !== 'Back-Log'"
                > < </a>
                <a style="border: none; cursor: default;" class="control" v-else>&nbsp;&nbsp;&nbsp;</a>
                <button type="button" class="btn btn-danger" v-on:click="deleteTask(task.id)">Delete</button>
                <a
                  class="control"
                  v-on:click="right(task.id, task.data.group)"
                  v-if="title !== 'Done'"
                >></a>
                <a style="border: none; cursor: default;" class="control" v-else>&nbsp;&nbsp;&nbsp;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firestore/db.js";
export default {
  props: ["title", "tasks"],
  computed: {
    color() {
      if (this.title === "Back-Log") return "red";
      else if (this.title === "To-Do") return "orange";
      else if (this.title === "Doing") return "#2b98f1";
      else if (this.title === "Done") return "green";
    },
    formatted() {
      JSON.stringify(tasks);
    }
  },
  created(){
    console.log(this.tasks)
  },
  methods: {
    left(id, grup) {
      if (grup !== 1) {
        db.collection("tasks")
          .doc(id)
          .update({
            group: grup - 1
          });
      }
    },
    right(id, grup) {
      if (grup !== 4) {
        db.collection("tasks")
          .doc(id)
          .update({
            group: grup + 1
          });
      }
    },
    deleteTask(id) {
      db.collection("tasks")
        .doc(id)
        .delete();
    }
  }
};
</script>

<style scoped>
.group1 {
  border-radius: 0.4rem;
  padding: 0;
  margin: 0.6rem;
  height: auto;
  overflow: hidden;
  background-color: #00000000;
}

.heading {
  width: 100%;
  margin: 0;
  padding: 0.6rem 1rem;
  border-radius:20px
}

.context1 {
  width: 250px;
}

.card {
  margin: 0.6rem 0;
  padding: 0;
  font-size: 0.9rem;
  border-color: #ddd;
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
  background: #ffffff;
  cursor: pointer;
}
</style>
