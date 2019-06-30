<template>
  <v-app>
    <Navbar v-on:set-dialog="getDialogStatus"></Navbar>
    <v-content>
      <v-container class="scroll-horizontal">
        <v-layout row>
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-toolbar color="indigo" dark>
                <v-toolbar-title>Back-Log</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list>
                <draggable tag="div" v-model="listBackLog" v-bind="dragOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
                  <transition-group type="transition" :name="'flip-list'">
                    <CardTask v-for="item in listBackLog"
                    :key="item.id" :item="item"
                    v-on:set-dialog="getDialogStatus"></CardTask>
                  </transition-group>
                </draggable>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-toolbar color="orange" dark>
                <v-toolbar-title>To-Do</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list>
                <draggable tag="div" v-model="listToDo" v-bind="dragOptions" :move="onMove">
                  <transition-group type="transition" :name="'flip-list'">
                    <CardTask v-for="item in listToDo"
                    :key="item.id" :item="item"
                    v-on:set-dialog="getDialogStatus"></CardTask>
                  </transition-group>
                </draggable>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-toolbar color="yellow">
                <v-toolbar-title>On Progress</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list>
                <draggable v-model="listOnProgress" v-bind="dragOptions" :move="onMove">
                  <CardTask v-for="item in listOnProgress"
                    :key="item.id" :item="item"
                    v-on:set-dialog="getDialogStatus"></CardTask>
                </draggable>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-card>
              <v-toolbar color="green" dark>
                <v-toolbar-title>Done</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-list>
                <draggable tag="div" v-model="listDone" v-bind="dragOptions" :move="onMove">
                  <transition-group type="transition" :name="'flip-list'">
                    <CardTask v-for="item in listDone"
                    :key="item.id" :item="item"
                    v-on:set-dialog="getDialogStatus"></CardTask>
                  </transition-group>
                </draggable>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <AddEditDialog :titleDialog="titleDialog"
        :data="selectedTask" :dialog="dialog"
        v-on:set-dialog="getDialogStatus"></AddEditDialog>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AddEditDialog from '@/components/Add-Edit-Dialog.vue'
import CardTask from '@/components/Card-Task.vue'
import draggable from 'vuedraggable'
import db from '../config/db'

export default {
  name: 'App',
  components: {
    Navbar,
    AddEditDialog,
    draggable,
    CardTask
  },
  data () {
    return {
      dialog: false,
      selectedTask: {},
      categories: [
        { name: 'Back-Log' },
        { name: 'To-Do' },
        { name: 'Doing' },
        { name: 'Done' }
      ],
      isDragging: false,
      delayedDragging: false,
      titleDialog: '',
      tasks: [],
      listBackLog: [],
      listToDo: [],
      listOnProgress: [],
      listDone: []
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 1,
        group: 'description',
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    getComponentData () {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        attrs: {
          wrap: true
        },
        props: {
          value: this.activeNames
        }
      }
    },
    getDialogStatus (val) {
      if (typeof val === 'object') {
        this.titleDialog = 'Edit'
        this.dialog = val[0]
        this.selectedTask = val[1]
      } else if (val === false) {
        this.selectedTask = {}
        this.dialog = val
      } else {
        this.titleDialog = 'Add'
        this.dialog = val
      }
    },
    onMove ({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    },
    listBackLog () {
      if (this.listBackLog.length !== 0) {
        let newCatTask = this.listBackLog.filter((task) => task.category !== 'back-log')[0]
        if (newCatTask.category) {
          newCatTask.category = 'back-log'
          db.collection('tasks').doc(newCatTask.id).set(newCatTask)
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
        }
      }
    },
    listToDo () {
      if (this.listToDo.length !== 0) {
        let newCatTask = this.listToDo.filter((task) => task.category !== 'to-do')[0]
        if (newCatTask.category) {
          newCatTask.category = 'to-do'
          db.collection('tasks').doc(newCatTask.id).set(newCatTask)
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
        }
      }
    },
    listOnProgress () {
      if (this.listOnProgress.length !== 0) {
        let newCatTask = this.listOnProgress.filter((task) => task.category !== 'onprogress')[0]
        if (newCatTask.category) {
          newCatTask.category = 'onprogress'
          db.collection('tasks').doc(newCatTask.id).set(newCatTask)
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
        }
      }
    },
    listDone () {
      if (this.listDone.length !== 0) {
        let newCatTask = this.listDone.filter((task) => task.category !== 'done')[0]
        if (newCatTask.category) {
          newCatTask.category = 'done'
          db.collection('tasks').doc(newCatTask.id).set(newCatTask)
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
        }
      }
    }
  },
  created () {
    db.collection('tasks')
      .onSnapshot((querySnapshot) => {
        var taskBackLog = []
        var taskToDo = []
        var taskOnProgress = []
        var taskDone = []

        querySnapshot.forEach((doc) => {
          if (doc.data().category === 'back-log') {
            taskBackLog.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (doc.data().category === 'to-do') {
            taskToDo.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (doc.data().category === 'onprogress') {
            taskOnProgress.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (doc.data().category === 'done') {
            taskDone.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        this.listBackLog = taskBackLog
        this.listToDo = taskToDo
        this.listOnProgress = taskOnProgress
        this.listDone = taskDone
      })
  }
}
</script>

<style>
.scroll-horizontal {
  white-space:nowrap;
  display:-webkit-flex;
  flex-direction:row;
  -webkit-flex-direction:row;
  overflow-y: scroll;
}
::-webkit-scrollbar {
    display: none;
}
</style>
