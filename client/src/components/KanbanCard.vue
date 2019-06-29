<template>
  <b-card class="kanban-card" :title="card.content">
    <b-card-text>Due: {{new Date(card.dueDate).toDateString()}}</b-card-text>
    <b-button href="#" @click="delCard" variant="danger">Delete</b-button>
  </b-card>
</template>
<script>
import db from '@/config/firebase.js'

export default {
  name: 'kanban-card',
  props: {
    card: Object
  },
  methods: {
    delCard: function () {
      db.collection('kanbanList').doc(this.card.id).delete().then(function () {
        console.log('Card successfully deleted!')
      }).catch(error => {
        console.error('Error removing Card:', error)
      })
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: white;
}

.kanban-card {
  padding: 0.5em;
  margin: 0.2em;
  border: solid black;
  color: white;
}

.backlog {
  background-color: #FF0000;
}

.todo {
  background-color: #FF6600;
}

.inprogress {
  background-color: #FFCC00;
}

.completed {
  background-color: #336699;
}

</style>
