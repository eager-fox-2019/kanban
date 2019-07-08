<template>
  <div class="card mb-1">
    <div class="card-header text-center"><strong>{{ dataItem.Title }}</strong></div>
    <div class="card-body">
      <p>
        Point: {{ dataItem.Point }}<br>
        AssignTo: {{ dataItem.AssignTo }}<br>
        Description: {{ dataItem.Description }}
      </p>
    </div>
    <div class="btn-group mb-2">
      <a href="#" class="btn btn-sm ml-2" :class="bgColor1" @click="actionBtn('1')">{{ buttonCaption1 }}</a>
      <a href="#" class="btn btn-sm ml-1" :class="bgColor2" @click="actionBtn('2')">{{ buttonCaption2 }}</a>
      <a href="#" class="btn btn-sm bg-danger ml-1 mr-2" @click="actionDelete()">Delete</a>
    </div>
  </div>
</template>

<script>
import db from '@/assets/config.js'

export default {
  name: 'DataCard',
  props: ['dataItem'],
  data () {
    return {
      buttonCaption1: null,
      buttonCaption2: null,
      bgColor1: 'bg-primary',
      bgColor2: 'bg-primary',
      ref: db.firestore().collection('Kanban')
    }
  },
  methods: {
    actionDelete () {
      this.ref.doc(this.dataItem.id).delete()
    },
    actionBtn (btn) {
      let caption = this.buttonCaption1
      if (btn === '2') caption = this.buttonCaption2
      this.dataItem.Status = caption
      this.ref.doc(this.dataItem.id).set(this.dataItem)
    }
  },
  created () {
    if (this.dataItem.Status === 'Back Log') {
      this.buttonCaption1 = null
      this.buttonCaption2 = 'To Do'
      this.bgColor1 = 'bg-default'
      this.bgColor2 = 'bg-warning'
    } else if (this.dataItem.Status === 'To Do') {
      this.buttonCaption1 = 'Back Log'
      this.buttonCaption2 = 'Doing'
      this.bgColor1 = 'bg-secondary'
      this.bgColor2 = 'bg-primary'
    } else if (this.dataItem.Status === 'Doing') {
      this.buttonCaption1 = 'To Do'
      this.buttonCaption2 = 'Done'
      this.bgColor1 = 'bg-warning'
      this.bgColor2 = 'bg-success'
    } else if (this.dataItem.Status === 'Done') {
      this.buttonCaption1 = null
      this.buttonCaption2 = 'Doing'
      this.bgColor1 = 'bg-default'
      this.bgColor2 = 'bg-primary'
    }
  }
}
</script>
