<template>
  <div class="home d-flex">
    <KanbanColumn v-for="(type, i) in types" :key="i" :type="type" class='col' />
  </div>
</template>

<script>
// @ is an alias to /src
import KanbanColumn from '@/components/KanbanColumn.vue'

export default {
  name: 'home',
  components: {
    KanbanColumn
  },
  data () {
    return {
      types: ['backlog', 'todo', 'inprogress', 'completed']
    }
  }
}

</script>
