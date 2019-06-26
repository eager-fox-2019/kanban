<template>
  <div class="kanban-column" v-bind:class="type">
    <h1>{{type}}</h1>
    <KanbanCard v-for="card in taskList" :key="card.id" :card="card" />
  </div>
</template>
<script>
import KanbanCard from '@/components/KanbanCard.vue'
import db from '@/config/firebase.js'

export default {
  name: 'kanban-column',
  components: {
    KanbanCard
  },
  data: () => {
    return {
      taskList: []
    }
  },
  created () {
    db.collection('kanbanList').onSnapshot(querySnapshot => {
      let kanbanArray = []
      querySnapshot.forEach(doc => {
        if (doc.data().status === this.type) {
          kanbanArray.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
      this.taskList = kanbanArray
    })
  },
  props: {
    type: String
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #2c3e50;
}

h1 {
  font-size: 1.2em;
  color: black;
  padding: 0.3em;
  margin: 0.1em;
}

.backlog h1 {
  background-color: #FF0000;
}

.todo h1 {
  background-color: #FF6600;
}

.inprogress h1 {
  background-color: #FFCC00;
}

.complete h1 {
  background-color: #336699;
}

</style>
