<template>
  <div class="col-md group1">
    <div style="text-align: center;" class="header" :style="` color: #ffffff;background-color:${color}`">{{title}}</div>
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
                  style="cursor:pointer"
                  v-on:click="left(task.id, task.data.group)"
                  v-if="title !== 'Back-Log'"
                > < </a>
                <a style="border: none; cursor: default;" class="control" v-else>&nbsp;&nbsp;&nbsp;</a>
                <button type="button" class="btn btn-danger" v-on:click="delete1(task.id)">Delete</button>
                <a
                         style="cursor:pointer"
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
    data: function() {
    return {
      color: ""
    };
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
    delete1(id) {
      db.collection("tasks")
        .doc(id)
        .delete();
    }
  },
  created(){
      if (this.title === "Back-Log") this.color = "red";
      else if (this.title === "To-Do") this.color =  "orange";
      else if (this.title === "Doing") this.color =  "#2b98f1";
      else if (this.title === "Done") this.color =  "green";
  }
};
</script>

<style scopped>


.header {
  padding: 10px 10px;
  border-radius:10px
}

.context1 {
  width: 250px;
}

</style>
