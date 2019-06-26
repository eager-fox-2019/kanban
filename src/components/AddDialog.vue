<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add Kanban</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="title" label="Title" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="description" label="Description" required></v-textarea>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="number" v-model="point" label="Point" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="assignedTo" label="Assigned To" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="addKanban">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
  import db from "../db"

  export default {
    data() {
      return {
        dialog: false,
        title: '',
        description: '',
        point: '',
        assignedTo: ''
      }
    },
    methods: {
      addKanban() {
        db.collection("Task").add({
            title: this.title,
            description: this.description,
            point: this.point,
            assignedTo: this.assignedTo,
            status: 'backlog'
          })
          .then((docRef) => {
            console.log('Document written', docRef);
            this.dialog = false;
          })
          .catch((err) => {
            console.log('error adding document', error);
          })
      }
    }
  }
</script>

<style>

</style>
