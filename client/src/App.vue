<template>
  <div id="app">
    <!-- TITLE -->
    <section class="hero">
      <div class="hero-body" style="text-align: center">
          <h1 class="title">
            K-A-N-B-A-N
          </h1>
          <Form style="margin: 5%;  margin-top: -1%;"/>
      </div>
    </section>

    <!-- BOARD -->
    <div class="tile is-ancestor" style="margin: 5%; margin-top: -9%;">
      <board :title="'Back Log'" :task="taskBackLog" st/>
      <board :title="'To Do'" :task="taskToDo"/>
      <board :title="'Doing'" :task="taskDoing"/>
      <board :title="'Complete'" :task="taskComplete"/>
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
      taskBackLog: [],
      taskToDo: [],
      taskDoing: [],
      taskComplete: [],
    }
  },
  created() {
    db.collection("tasks")
    .onSnapshot(querySnapshot => {
        var tasks = [];
        this.taskBackLog = []
        this.taskToDo = []
        this.taskDoing = []
        this.taskComplete = []
        querySnapshot.forEach(function(doc) {
            tasks.push({
                id: doc.id,
                ...doc.data()
            })        
        })
        // 0 = BACKLOG, 1 = TODO, 2 = DOING, 3 = COMPLETE
        tasks.forEach(task => {
          if (task.status === 0) this.taskBackLog.push(task)
          if (task.status === 1) this.taskToDo.push(task)
          if (task.status === 2) this.taskDoing.push(task)
          if (task.status === 3) this.taskComplete.push(task)
        })
        
    })    
  }
}
</script>

<style>
html{
  background-image: url('https://wallpaperplay.com/walls/full/9/8/b/37245.jpg');
  background-size: 100%;
  background-repeat: inherit;
}
</style>
