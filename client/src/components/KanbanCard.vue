<template>
  <b-card class="kanban-card" :class="card.id===curCard.id ? 'kanban-card-selected' : 'kanban-card'" :title="card.content" @click="select(card)">
   <b-card-text>Due: {{new Date(card.dueDate).toDateString()}}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'kanban-card',
  props: {
    card: Object
  },
  data: () => {
    return {
      curCard: {}
    }
  },
  methods :{
  	select: function(cardSelected) {
  		console.log(cardSelected)
  		this.curCard = cardSelected
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
 color: #42b983;
}

.kanban-card {
 padding: 0.5em;
 margin: 0.2em;
 border: solid black;
 color: white;
}

.kanban-card:hover {
  cursor: pointer;
}
.kanban-card-selected {
  border-color: palegreen
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
