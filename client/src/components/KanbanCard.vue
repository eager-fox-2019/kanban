<template>
  <b-card class="kanban-card"
:title="card.content">
   <b-card-text>Due: {{card.dueDate.toDate().toDateString()}}</b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'kanban-card',
  props: {
    card: Object
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
 background-color: darkgrey;
}
</style>
