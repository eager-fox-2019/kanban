<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <TaskGroup v-for="(entree, i) in statuses" :status="entree.stat" :color="entree.color" :key="i">
        </TaskGroup>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TaskGroup from '../components/TaskGroup.vue'
import db from '../../config/firebase'
import { stat } from 'fs';
import { constants } from 'crypto';

export default {
  name: 'home',
  components: {
    TaskGroup,
  },
  data: function () {
    return {
      statuses: [{
        stat: "New",
        color: "danger"
       },{
        stat: "To-Do",
        color: "warning"
       },{
        stat: "Done",
        color: "success"
       }]
    }
  },
  methods: {
    deleteTask(id){
      db.collection("tasks").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    },
  }
}
</script>
