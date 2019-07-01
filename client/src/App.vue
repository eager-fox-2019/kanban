<template>
  <div id="app">
    <section class="hero">
      <div class="hero-body" style="text-align: center">
          <h1 class="title">
            Kanban Board
          </h1>
          <Form style="margin: 5%;  margin-top: -1%;"/>
      </div>
    </section>

    <div class="tile is-ancestor" style="margin: 5%; margin-top: -9%;">
      <board :title="'BackLog List'" :task="backlogTask" st/>
      <board :title="'ToDo List'" :task="todoTask"/>
      <board :title="'Active Task'" :task="activeTask"/>
      <board :title="'Completed Task'" :task="completedTask"/>
    </div>
  </div>
</template>

<script>
import Board from './components/board.vue'
import Form from './components/addTask.vue'
import db from './config/firebase'

export default {
  name: 'app',
  components: {
    Form,
    Board
  }, 
  data() {
    return {
      backlogTask: [],
      todoTask: [],
      activeTask: [],
      completedTask: [],
    }
  },
  created() {
    db.collection("task")
      task.forEach(task => {
        if (task.status == 0){
          this.backlogTask.push(task)
        } else if (task.status == 1){
          this.todoTask.push(task)
        } else if (task.status == 2){ 
          this.activeTask.push(task)
        } else if (task.status == 3){
          this.completedTask.push(task)
        })
    })    
  }
}
</script>

<style>
html{
  background-image: url('https://static7.depositphotos.com/1010652/679/v/950/depositphotos_6794239-stock-illustration-seamless-education-background.jpg');
  background-size: 100%;
  background-repeat: inherit;
}
</style>
