<template>
  
    <div class="card" style="margin: 20px;">
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-body">
        <h5 class="card-title">Assigned to: {{ assignedTo }}</h5>
        <p class="card-text">{{ description }}</p>
        <a href="#" class="btn btn-primary" v-if="status === 'backlog'" @click="changeTask(id, 'todo')">To Do >></a>
        
        <div class="buttons d-flex justify-content-between">
          <a href="#" class="btn btn-primary" v-if="status === 'todo'" @click="changeTask(id, 'backlog')"> << Backlog </a>
          <a href="#" class="btn btn-primary" v-if="status === 'todo'" @click="changeTask(id, 'doing')">Doing >></a>

          <a href="#" class="btn btn-primary" v-if="status === 'doing'" @click="changeTask(id, 'todo')"> <<  To Do </a>
          <a href="#" class="btn btn-primary" v-if="status === 'doing'" @click="changeTask(id, 'done')"> Done >> </a>

        </div>
         <a href="#" class="btn btn-primary" v-if="status === 'done'" @click="changeTask(id, 'doing')"> <<  Doing </a>
      </div>
    </div>

</template>

<script>
import db from "../config/firebase"
export default {
  props: ['title', 'description', 'points', 'assignedTo', 'status', 'id'],
  name: 'taskCard',
  methods: {
    changeTask(id, status) {
      let task = db.collection("Tasks").doc(id)

      task.update({
        status: status
      })
    }
  }
}
</script>

<style>
  .card {
    box-shadow: 0 0 1px black;
  }
</style>
