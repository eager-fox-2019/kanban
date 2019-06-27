<template>
  <v-layout>
    <v-flex class="my-3" sm10 offset-sm1>
      <v-card>
        <div class="headerTask">
          <h3>{{kanban.title}}</h3>
        </div>
        <v-card-title primary-title>
          <div>
            <p><strong>Description</strong>: {{kanban.description}}</p>
            <p><strong>Point</strong>: {{kanban.point}}</p>
            <p><strong>Assigned To</strong>: {{kanban.assignedTo}}</p>
          </div>
        </v-card-title>

        <v-card-actions>
          <KanbanDialog :title="title" :kanban="kanban" :kanbanId="kanban.id"></KanbanDialog>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import KanbanDialog from './KanbanDialog'
export default {
  components: {
    KanbanDialog
  },
  props: ['title', 'kanban'],
  data(){
    return {
    }
  }
}
</script>

<style>
  .headerTask {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #777;
    height: 50px;
    background-color: #34495E;
    color: white;
  }
</style>
