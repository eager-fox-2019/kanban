<template>
  <div id="home-container">
    <div class="row">
      <div class="col-sm-12">
          <headerPage></headerPage>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <cardStatus :title="backlog.title" :status="backlog.status" :tasks="backlog.tasks"></cardStatus>
      </div>
      <div class="col-sm-3">
        <cardStatus :title="todo.title" :status="todo.status" :tasks="todo.tasks"></cardStatus>
      </div>
      <div class="col-sm-3">
        <cardStatus :title="inprogress.title" :status="inprogress.status" :tasks="inprogress.tasks"></cardStatus>
      </div>
      <div class="col-sm-3">
        <cardStatus :title="done.title" :status="done.status" :tasks="done.tasks"></cardStatus>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/config/firebase.js'
import headerPage from '@/components/header.vue'
import cardStatus from '@/components/cardStatus.vue'

export default {
  name: 'home',
  components: {
    headerPage,
    cardStatus
  },
  methods: {
    getData () {
      db.collection('task')
        .onSnapshot((querySnapshot) => {
          this.backlog.tasks = []
          this.todo.tasks = []
          this.inprogress.tasks = []
          this.done.tasks = []
          querySnapshot.forEach((doc) => {
            let task = { id: doc.id, ...doc.data() }
            switch (task.status) {
              case 'backlog':
                this.backlog.tasks.push(task); break
              case 'todo':
                this.todo.tasks.push(task); break
              case 'inprogress':
                this.inprogress.tasks.push(task); break
              case 'done':
                this.done.tasks.push(task); break
            }
          })
        })
    }
  },
  mounted () {
    this.getData()
  },
  data () {
    return {
      backlog: {
        title: 'Back-Log',
        status: 'backlog',
        tasks: []
      },
      todo: {
        title: 'To-Do',
        status: 'todo',
        tasks: []
      },
      inprogress: {
        title: 'In-Progress',
        status: 'inprogress',
        tasks: []
      },
      done: {
        title: 'Done',
        status: 'done',
        tasks: []
      }

    }
  }
}
</script>

<style>
  html, #home-container{
    background-image: url('https://www.xmple.com/wallpaper/gradient-white-pink-linear-1920x1080-c2-ffffff-db7093-a-90-f-14.svg');
    background-size: 100%;
    background-repeat: inherit;
  }

</style>
