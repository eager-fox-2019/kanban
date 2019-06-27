<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <TaskGroup :status='"New"' :color='"danger"'>
          <draggable v-model="newTask" group="task" @start="drag=true" @end="drag=false" @change="updateTask">
            <TaskCard v-for="taskDetail in newTask"
            :key="taskDetail.id"
            :id="taskDetail.id"
            :title="taskDetail.title"
            :description="taskDetail.description">
            <b-button variant="danger" @click="deleteTask(taskDetail.id)">Delete</b-button></TaskCard>
          </draggable>   
        </TaskGroup>
        <TaskGroup :status='"To-Do"' :color='"warning"'>
          <draggable v-model="todo" group="task" @start="drag=true" @end="drag=false" @change="updateTask">
            <TaskCard v-for="taskDetail in todo"
            :key='taskDetail.id'
            :id='taskDetail.id'
            :title='taskDetail.title'
            :description='taskDetail.description'>
            <b-button variant="danger" @click="deleteTask(taskDetail.id)">Delete</b-button></TaskCard>
          </draggable>
        </TaskGroup>
        <TaskGroup :status='"Done"' :color='"success"'>
          <draggable v-model="done" group="task" @start="drag=true" @end="drag=false" @change="updateTask">
            <TaskCard v-for="(taskDetail) in done"
            :key='taskDetail.id'
            :id='taskDetail.id'
            :title='taskDetail.title'
            :description='taskDetail.description'>
            <b-button variant="danger" @click="deleteTask(taskDetail.id)">Delete</b-button></TaskCard>
          </draggable>
        </TaskGroup>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TaskGroup from '../components/TaskGroup.vue'
import TaskCard from '../components/TaskCard.vue'
import draggable from 'vuedraggable'
import db from '../../config/firebase'
import { stat } from 'fs';

export default {
  name: 'home',
  components: {
    TaskGroup,
    TaskCard,
    draggable
  },
  data: function () {
    return {
      newTask: [],
      todo: [],
      done: []
    }
  },
  created() {
    db.collection('tasks')
      .onSnapshot(querySnapshot => {
        let state1 = []
        let state2 = []
        let state3 = []
        querySnapshot.forEach(doc => {
          if (doc.data().status === 'New') {
            state1.push({
              id:doc.id,
              ...doc.data()
            })
          } else if (doc.data().status === 'To-Do') {
            state2.push({
              id:doc.id,
              ...doc.data()
            })
          } else {
            state3.push({
              id:doc.id,
              ...doc.data()
            })
          }
          this.newTask = state1
          this.todo = state2
          this.done = state3
        })
      })
  },
  methods: {
    deleteTask(id){
      db.collection("tasks").doc(id).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    },
    updateTask: function(event){
      if (event.moved){
        let currentTask = event.moved.element
        // currentTask.status = this.type
        db.collection("tasks").doc(currentTask.id).update(currentTask)
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      }
    }
  // },
  // watch: {
  //   TaskCard: function() {
  //     return db.collection("tasks").doc(TaskCard.id).update(TaskCard)
  //       .then(function() {
  //           console.log("Document successfully updated!");
  //       })
  //       .catch(function(error) {
  //           // The document probably doesn't exist.
  //           console.error("Error updating document: ", error);
  //       });
  //   }
  }
}
</script>
