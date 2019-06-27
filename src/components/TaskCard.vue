<template>
    <b-card
      :header="task.title"
      header-bg-variant="light"
      class="mb-2 hover"
      style="font-size: 15px"
    >
      <b-card-text style="text-align: left">Description: {{task.desc}}</b-card-text>
      <b-card-text style="text-align: left">Assign For: {{task.assign}}</b-card-text>
      <b-button variant="danger" @click="remove(task.id)">Delete</b-button>
    </b-card>
</template>

<script>
import db from '../config/firebase'
export default {
  props: {
    task: Object,
    status: String
  },
  methods: {
    remove (id) {
      db.collection('KanBan').doc(`${id}`).delete()
        .then(function () {
          console.log('Document successfully deleted!')
        })
        .catch(function (error) {
          console.error('Error removing document: ', error)
        })
    }
  }
}
</script>

<style>
  .hover:hover {
    cursor: grab;
  }
</style>
