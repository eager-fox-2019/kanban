<template>
  <header class="clearfix">
    <h2>Kamban Board</h2>
    <button type="button" class="btn btn-info float-right mt-2" data-toggle="modal" data-target="#newTaskModal">New Task</button>
    <!-- The Modal -->
    <div class="modal fade" id="newTaskModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">New Task</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div class="form-group">
                <label for="task-name">Title:</label>
                <input v-model="title" type="text" id="task-name" class="form-control input-sm"><br>

                <label for="task-dec">Description:</label>
                <textarea v-model="description" class="form-control" rows="3" id="task-desc"></textarea><br>

                <label for="task-point">Point:</label>
                <input v-model="point" type="text" id="task-point" class="form-control input-sm"><br>

                <label for="task-assign">Assign To:</label>
                <input v-model="assignTo" type="text" id="task-assign" class="form-control input-sm"><br>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click="addTask()" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import db from '@/assets/config.js'

export default {
  name: 'Header',
  data () {
    return {
      title: '',
      description: '',
      point: '',
      assignTo: '',
      ref: db.firestore().collection('Kanban')
    }
  },
  methods: {
    addTask () {
      this.ref.add({
        Title: this.title,
        Description: this.description,
        Point: this.point,
        AssignTo: this.assignTo,
        Status: 'Back-Log'
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style scoped>
h2 {
  display: inline
}
</style>
