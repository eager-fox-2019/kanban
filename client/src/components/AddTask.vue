<template>
  <b-modal ref='form-modal' id="modal-center" centered title="Add a task">

       <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="title is required"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            required
          ></b-form-input>
      </b-form-group>

       <b-form-group
          label="Description"
          label-for="description-input"
        >
          <b-form-textarea
            rows="4"
            id="description-input"
            v-model="description"
          ></b-form-textarea>
      </b-form-group>

       <b-form-group
          label="Points"
          label-for="points-input"
        >
          <b-form-input
            type="number"
            id="points-input"
            v-model="points"
          ></b-form-input>
      </b-form-group>

       <b-form-group
          label="Assigned To"
          label-for="assigned-input"
          invalid-feedback="Asignee is required"
        >
          <b-form-input
            id="assigned-input"
            v-model="assignedTo"
            required
          ></b-form-input>
      </b-form-group>


      <div slot="modal-footer" class="d-flex justify-content-end w-100">
         <b-button
          variant="warning"
          size="sm"
          class="w-50"
          style="font-size: 18px;"
          @click="hide"
        >
          Cancel
        </b-button>
        <b-button
          variant="primary"
          size="sm"
          class="ml-4 w-50"
          style="font-size: 18px;"
          @click="addTask"
        >
          Add
        </b-button>
      </div>
  </b-modal>
</template>

<script>
import db from '../config/firebase'

export default {
  name: 'addTask',
  data() {
    return {
      title: '',
      description: '',
      points: 0,
      assignedTo: ''
    }
  },

  methods: {
    hide() {
       this.$refs['form-modal'].hide()
    },
    addTask() {
      this.hide()
      let task = {
        title : this.title,
        description: this.description,
        points: this.points,
        assignedTo: this.assignedTo,
        status: 'backlog'
      }

      db.collection("Tasks").add(task)
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
  }
}
</script>

<style>
  #modal-center {
    font-size: 18px;
  }
</style>
