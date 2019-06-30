<template>
   <b-col class="task-section" id="backlog">
      <div class="header" :style="style">
        <h1>{{ columns.title }}</h1>  
      </div>
      <div class="content border" :style="shadow">
        <taskCard v-for="task in tasks" :key="task.id" :id="task.id" :title="task.title" :description="task.description" :points="task.points" :assignedTo="task.assignedTo" :status="task.status"></taskCard>
      </div>
  </b-col>
</template>

<script>
import taskCard from "./taskCard"

export default {
  props: ['tasks', 'columns'],
  name: 'TaskSection',
  computed: {
    style() {
      return `background-color: ${this.columns.background}; color: ${this.columns.color}; box-shadow: 0 0 15px ${this.columns.background};`
    },
    shadow() {
      return `box-shadow: 0 0 3px ${this.columns.background};`
    }
  },
  components: {
    taskCard
  }
}
</script>

<style>
 
</style>
