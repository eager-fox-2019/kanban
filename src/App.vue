<template>
  <div>
    <b-row align-h="around">
      <h1>Fire Kanban</h1>
      <div>
        <b-button v-b-modal.modal-1 variant="primary">Add Task</b-button>
        <b-modal id="modal-1" title="Add New Task" hide-footer>
          <Form></Form>
        </b-modal>
      </div>
    </b-row>
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: {
    Home,
    Form
  },
  data () {
    return {
      //
    }
  }
}
</script>
