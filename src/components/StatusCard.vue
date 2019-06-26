<template>
  <v-flex>
    <v-card>
      <div class="header">
      <h4 class="display-1">{{title}}</h4>
      </div>
      <KanbanCard v-for="kanban in kanbans" :key="kanban.id" :kanban="kanban" :title="title"></KanbanCard>
    </v-card>
  </v-flex>
</template>

<script>
  import KanbanCard from './KanbanCard'
  export default {
    components: {
      KanbanCard
    },
    props: ['title', 'kanbans'],
    data() {
      return {
        
      }
    }
  }
</script>

<style>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #777;
    height: 50px;
  }
</style>
