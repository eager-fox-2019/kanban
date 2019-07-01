<template>
  <div>
    <b-col>
      <div>
        <b-card
          :header="status"
          :header-bg-variant="color"
          header-text-variant="white"
          align="center"
        >
          <draggable v-model="cardList" group="task" @start="drag=true" @end="drag=false" @change="updateTask">
            <TaskCard v-for="taskDetail in cardList"
            :key="taskDetail.id"
            :id="taskDetail.id"
            :title="taskDetail.title"
            :description="taskDetail.description">
            <b-button variant="danger" @click="deleteTask(taskDetail.id)">Delete</b-button></TaskCard>
          </draggable>  
          <slot></slot>
        </b-card>
      </div>
    </b-col>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TaskCard from '@/components/TaskCard.vue'
import db from '../../config/firebase'
export default {
  props: ['status', 'color', 'model'],
  components: {
    TaskCard,
    draggable    
  },
  created() {
    db.collection('tasks')
      .onSnapshot(querySnapshot => {
        let newArr = []
        querySnapshot.forEach(doc => {
          if (doc.data().status === this.status) {
            newArr.push({
              id:doc.id,
              ...doc.data()
            })
          }
          this.cardList = newArr
        })
      })
  },
  data: function(){
    return {
      cardList: []
    }
  },
  methods: {    
    updateTask(event){
      if (event.added){
        let currentTask = event.added.element
        currentTask.status = this.status
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
  }
}
</script>
