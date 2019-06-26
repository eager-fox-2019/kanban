<template>
  <div>
    <b-modal
      id="task-form"
      ref="modal"
      title="New Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.prevent="handleSubmit">
        <b-form-group
          :state="titleState"
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="title-input"
            :state="titleState"
            v-model="title"
            placeholder="Task Title"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="descState"
          label="Description"
          label-for="desc-input"
          invalid-feedback="Description is required"
        >
          <b-form-textarea
            :state="descState"
            id="desc-input"
            v-model="desc"
            placeholder="Task Short Description"
            rows="3"
            max-rows="6"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          :state="assignState"
          label="Assigned To"
          label-for="assign-input"
          invalid-feedback="Assignee is required"
        >
          <b-form-input
            :state="assignState"
            id="assign-input"
            v-model="assign"
            placeholder="Assigned To"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import db from '../config/firebase'
export default {
  name: 'taskForm',
  data () {
    return {
      title: '',
      desc: '',
      assign: '',
      status: 'Created',
      titleState: null,
      descState: null,
      assignState: null
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.titleState = valid ? 'valid' : 'invalid'
      this.descState = valid ? 'valid' : 'invalid'
      this.assignState = valid ? 'valid' : 'invalid'
      return valid
    },
    resetModal () {
      this.title = ''
      this.desc = ''
      this.assign = ''
      this.titleState = null
      this.descState = null
      this.assignState = null
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      db.collection('KanBan').add({
        title: this.title,
        desc: this.desc,
        assign: this.assign,
        status: this.status
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>
