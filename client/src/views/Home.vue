<template>
  <div>
    <modal-add @close="$modal.hide('modal-add')" @submit="createNewTask"/>
    <div class="color-white background-primary padding-l margin-m flex flex-row justify-content-space-between">
      <div class="margin-left-l">
        <h1>Kanban</h1>
      </div>
      <div class="margin-right-l">
        <button @click="openNew"><i class="fa fa-plus-square" aria-hidden="true"></i> Add</button>
      </div>
    </div>
    <div class="flex flex-row padding-m">
      <kanban-group :color='"#5386E4"' :kanbanName='"New"'>
        <draggable
          v-model="kanban.new"
          @change="syncToFireStore"
          group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.new"
            :key="`kanban-new-${i}`"
            :index="i"
            :group="'new'"
            @deleted="deleteHandler"
            :kanbanDetail='cardDetail'></kanban-card>
        </draggable>
        <div v-if="kanban.new.length === 0" class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
      <kanban-group :color='"#FFFBBD"' :kanbanName='"In Progress"'>
        <draggable
          v-model="kanban.inProgress"
          @change="syncToFireStore"
          group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.inProgress"
            :key="`kanban-inprogress-${i}`"
            :index="i"
            :group="'inProgress'"
            @deleted="deleteHandler"
            :kanbanDetail='cardDetail'></kanban-card>
        </draggable>
        <div v-if="kanban.inProgress.length === 0" class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
      <kanban-group :color='"#83B692"' :kanbanName='"Completed"'>
        <draggable
          v-model="kanban.completed"
          @change="syncToFireStore"
          group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.completed"
            :key="`kanban-completed-${i}`"
            :index="i"
            :group="'completed'"
            @deleted="deleteHandler"
            :kanbanDetail='cardDetail'></kanban-card>
        </draggable>
        <div v-if="kanban.completed.length === 0" class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
      <v-dialog />
    </div>
  </div>
</template>

<script>
import KanbanGroup from '@/components/KanbanGroup.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import ModalAdd from '@/components/ModalAdd.vue'
import kanbanFireStore from '@/firebase.db.js'
import { checkEmptyObject } from '@/helpers/utils.js'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
    KanbanGroup,
    KanbanCard,
    ModalAdd
  },
  data () {
    return {
      kanban: {
        new: [],
        inProgress: [],
        completed: []
      },
      firebaseListener: null
    }
  },
  mounted () {
    let kanbanDoc = kanbanFireStore.doc
    this.firebaseListener = kanbanDoc.onSnapshot(snapshot => {
      let data = snapshot.data()
      if (checkEmptyObject(data) || data === undefined) {
        kanbanFireStore.initStorage()
          .catch(err => console.log('error waktu init data', { err }))
      } else {
        this.kanban = data
      }
    })
  },
  beforeDestroy () {
    // destroy firebase listener
    this.firebaseListener()
  },
  methods: {
    deleteHandler (i, groupName) {
      this.kanban[groupName].splice(i, 1)
      this.syncToFireStore()
    },
    openNew () {
      this.$modal.show('modal-add')
    },
    createNewTask (title, description) {
      let kanbanGroup = this.kanban.new
      let kanban = {
        title,
        description,
        createdAt: new Date()
      }
      kanbanGroup.push(kanban)
      this.syncToFireStore()
      this.$modal.hide('modal-add')
    },
    syncToFireStore (e) {
      kanbanFireStore
        .doc
        .set(this.kanban)
        .catch((err) => {
          if (err) {
            console.log('error sync ke firestore kanban', { kanban: this.kanban })
          }
        })
    }
  }
}
</script>

<style>
.kanban-main {
  width: 100%;
}
</style>
