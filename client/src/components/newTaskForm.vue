<template>
  <v-layout row justify-center class="marigin-top: -100px" >
    <v-dialog v-model="dialog" persistent max-width="600px" >
      <template v-slot:activator="{ on }">
        <v-btn color="blue" dark v-on="on" >Create New Task</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="titleTask" label="Task Name" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="descriptionTask" label="Task Description" type="text" required></v-text-field>
              </v-flex>
             
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="createKanbaan()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from '../db'
  export default {
    data: () => ({
      dialog: false,
      titleTask : "",
      descriptionTask : ""
    }),
    methods : {
      createKanbaan(){
          // alert("Asdasdasd")
         // Add a new document in collection "cities"
            db.collection("tasks")
            .add({
                title: this.titleTask,
                description: this.descriptionTask,
                status: "backlog"
            })
            .then(() => {
                console.log("Document successfully written!");
                this.dialog = false
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            })
                    
                }
            },
    
  }
</script>