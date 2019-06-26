<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent width="530">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Show Details</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>
            <p><strong>Description</strong>: {{kanban.description}}</p>
            <p><strong>Point</strong>: {{kanban.point}}</p>
            <p><strong>Assigned To</strong>: {{kanban.assignedTo}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancel</v-btn>
          <v-btn @click="deleteKanban" color="error">Delete</v-btn>
          <v-btn @click="updateKanban('backlog')" v-if="title == 'To-Do'" color="warning">Back-Log</v-btn>
          <v-btn @click="updateKanban('todo')" v-if="title == 'Back-Log'" color="warning">To Do</v-btn>
          <v-btn @click="updateKanban('doing')" v-if="title == 'To-Do' || title == 'Done'" color="info">Doing</v-btn>
          <v-btn @click="updateKanban('done')" v-if="title == 'Doing'" color="success">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import db from '../db'
  export default {
    props: ['title', 'kanbanId', 'kanban'],
    data() {
      return {
        dialog: false
      }
    },
    methods: {
      deleteKanban() {
        db.collection("Task").doc(this.kanban.id).delete().then( () => {
          this.dialog = false
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          this.dialog = false
          console.error("Error removing document: ", error);
        });
      },
      updateKanban(value) {
        db.collection("Task").doc(this.kanbanId).update({
          status: value
        }).then( () => {
          this.dialog = false
          console.log("Document successfully updated!");
        }).catch(function (error) {
          this.dialog = false
          console.error("Error removing document: ", error);
        });
      }
    }
  }
</script>

<style>

</style>
