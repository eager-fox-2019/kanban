<template>
  <v-layout row>
    <v-flex xs12 sm6 lg10 offset-lg1>
      <v-card>
        <v-toolbar :color="thinga.color" dark>
          <v-toolbar-title>{{thinga.text}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(item, index) in thinga.task">
            <v-expansion-panel :key="index">
              <v-expansion-panel-content>
                <template v-slot:actions>
                  <v-icon color="teal">settings</v-icon>
                </template>
                <template v-slot:header>
                  <div>{{item.title}}</div>
                </template>
                <v-card>
                  <v-card-text
                    class="grey lighten-3"
                  >i{{item.description}}.</v-card-text>
                  <v-card-actions>
                    <v-layout row  justify-space-around wrap >
                      <v-flex md12 lg4 xs4>
                       <v-btn  v-if="item.prev !== null" @click="goBack({id : item.id, move : item.prev})" small color="orange darken-2" dark>
                        <v-icon dark left>arrow_back</v-icon>Back
                         </v-btn>
                         <v-btn  v-if="item.prev === null" @click="deleteTask(item.id)" small color="red darken-3" dark>
                        <v-icon dark left>delete_forever</v-icon>Delete
                         </v-btn>
                      </v-flex>
                      <v-flex v-flex md12 lg4 xs4>
                       <v-btn v-if="item.next !== null" @click="goForward({id : item.id, move : item.next})" small color="orange darken-2" dark>Next
                      <v-icon dark right>arrow_forward</v-icon>
                    </v-btn>
                     <v-btn v-if="item.next === null" @click="deleteTask(item.id)" small color="red darken-1" dark >Delete
                      <v-icon dark right>delete_forever</v-icon>
                    </v-btn>
                      </v-flex>
                    </v-layout>
                </v-card-actions>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import db from "../db";
export default {
  props: ["thinga"],
  data() {
    return {
    };
  },
  methods: {
    deleteTask(id) {
      db.collection("tasks")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },
     goForward(data){
       console.log(data);
       
       db.collection("tasks")
        .doc(data.id)
        .update({
          status: `${data.move}`
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
         console.error("Error updating document: ", error);
        });
    },
    goBack(data){
        db.collection("tasks")
        .doc(data.id)
        .update({
          status: `${data.move}`
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
         console.error("Error updating document: ", error);
        });
    }
  }
   
};
</script>