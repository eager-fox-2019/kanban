<template>
  <div class="home d-flex">
    <KanbanColumn class='col' 
    :type="'backlog'"/>
    <KanbanColumn class='col' 
    :type="'todo'"/>
    <KanbanColumn class='col' 
    :type="'inprogress'"/>
    <KanbanColumn class='col' 
    :type="'complete'"/>
  </div>
</template>

<script>
// @ is an alias to /src
import KanbanColumn from '@/components/KanbanColumn.vue'

export default {
  name: 'home',
  components: {
    KanbanColumn
  }
}
</script>

<style scoped>
</style>