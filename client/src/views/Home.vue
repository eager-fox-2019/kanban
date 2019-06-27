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
          v-if="kanban.new.length > 0"
          v-model="kanban.new" group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.new"
            :key="`kanban-new-${i}`"
            :kanbanText='cardDetail'></kanban-card>
        </draggable>
        <div v-else class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
      <kanban-group :color='"#FFFBBD"' :kanbanName='"In Progress"'>
        <draggable
          v-if="kanban.inProgress.length > 0"
          v-model="kanban.inProgress" group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.inProgress"
            :key="`kanban-inprogress-${i}`"
            :kanbanText='cardDetail'></kanban-card>
        </draggable>
        <div v-else class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
      <kanban-group :color='"#83B692"' :kanbanName='"Completed"'>
        <draggable
          v-if="kanban.completed.length > 0"
          v-model="kanban.completed" group="kanban">
          <kanban-card
            v-for="(cardDetail , i) in kanban.completed"
            :key="`kanban-completed-${i}`"
            :kanbanText='cardDetail'></kanban-card>
        </draggable>
        <div v-else class="padding-m background-white margin-m">There's no task -- No Element</div>
      </kanban-group>
    </div>
  </div>
</template>

<script>
import KanbanGroup from '@/components/KanbanGroup.vue'
import KanbanCard from '@/components/KanbanCard.vue'
import ModalAdd from '@/components/ModalAdd.vue'
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
      }
    }
  },
  methods: {
    openNew () {
      this.$modal.show('modal-add')
    },
    createNewTask (val) {
      let kanbanGroup = this.kanban.new
      let kanban = {}
      kanban.description = val
      kanban.createdAt = new Date()
      kanban.sort = kanbanGroup.length
      kanbanGroup.push(kanban)
    },
    syncToFireStore () {
      return 'yow'
    }
  },
  watch: {
    'kanban.new': function (data) {
      data.forEach((e, i) => {
        this.kanban.new[i].sort = i
      })
      this.syncToFireStore()
    },
    'kanban.inProgress': function (data) {
      data.forEach((e, i) => {
        this.kanban.inProgress[i].sort = i
      })
      this.syncToFireStore()
    },
    'kanban.completed': function (data) {
      data.forEach((e, i) => {
        this.kanban.completed[i].sort = i
      })
      this.syncToFireStore()
    }
  }
}
</script>

<style>
.kanban-main {
  width: 100%;
}
</style>
