<template>
    <b-card
      :header="title"
      :header-bg-variant="variant"
      class="text-center"
      style="font-size: 20px"
    >
      <draggable group="task" :list="tasks" class="list-task">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" :status="title"/>
      </draggable>
    </b-card>
</template>

<script>
import draggable from 'vuedraggable'
import db from '../config/firebase'
import TaskCard from './TaskCard'
export default {
  components: {
    TaskCard,
    draggable
  },
  props: {
    title: String,
    variant: String
  },
  data () {
    return {
      tasks: [],
      status: ''
    }
  },
  created () {
    this.status = this.title
  },
  watch: {
    tasks: function (val) {
      val.forEach(task => {
        db.collection('KanBan').doc(`${task.id}`).update({
          status: this.status
        })
          .then(function () {
            console.log('Document successfully updated!')
          })
          .catch(function (error) {
            console.error('Error updating document: ', error)
          })
      })
    }
  },
  mounted () {
    db.collection('KanBan').where('status', '==', `${this.title}`)
      .onSnapshot((querySnapshot) => {
        var tasks = []
        querySnapshot.forEach(function (doc) {
          let task = {
            id: doc.id,
            ...doc.data()
          }
          tasks.push(task)
        })
        this.tasks = tasks
      })
  }
}
</script>

<style>

</style>
