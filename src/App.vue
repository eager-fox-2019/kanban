<template>
  <div class="container">
    <MainHeader></MainHeader>
    <div class="row">
      <MainCard v-for="(taskCategory, index) in tasksCategory" :key="index" :data="taskCategory"></MainCard>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/Header.vue'
import MainCard from '@/components/MainCard.vue'

import db from '@/assets/config.js'

export default {
  name: 'home',
  components: {
    MainHeader,
    MainCard
  },
  data () {
    return {
      ref: db.firestore().collection('Kanban'),
      tasksCategory: [{
        status: 'Back Log',
        bgColor: 'bg-danger',
        taskData: []
      },
      {
        status: 'To Do',
        bgColor: 'bg-warning',
        taskData: []
      },
      {
        status: 'Doing',
        bgColor: 'bg-primary',
        taskData: []
      },
      {
        status: 'Done',
        bgColor: 'bg-success',
        taskData: []
      }]
    }
  },
  created () {
    this.ref.onSnapshot(querySnapshot => {
      this.tasksCategory[0].taskData = []
      this.tasksCategory[1].taskData = []
      this.tasksCategory[2].taskData = []
      this.tasksCategory[3].taskData = []

      querySnapshot.forEach(doc => {
        if (doc.data().Status === 'Back Log') this.tasksCategory[0].taskData.push({ id: doc.id, ...doc.data() })
        else if (doc.data().Status === 'To Do') this.tasksCategory[1].taskData.push({ id: doc.id, ...doc.data() })
        else if (doc.data().Status === 'Doing') this.tasksCategory[2].taskData.push({ id: doc.id, ...doc.data() })
        else if (doc.data().Status === 'Done') this.tasksCategory[3].taskData.push({ id: doc.id, ...doc.data() })
      })
    })
  }
}
</script>
