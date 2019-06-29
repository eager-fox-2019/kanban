<template>
  <modal
      name="modal-add"
      :adaptive="true"
      :scrollable="true"
      :reset="true"
      width="60%"
      height="auto">
    <div class="margin-m">
      <h3>Add New Task</h3>
      <form @click.prevent="">
        <div class="field">
          <label for="form-add-new-task-title">Title</label>
          <input type="text" v-model="title" id="form-add-new-task-title" placeholder="Title">
          <label for="form-add-new-task-description">Description</label>
          <input type="text" v-model="description" id="form-add-new-task-description" placeholder="Description">
        </div>
        <div class="field flex flex-row justify-content-flex-end">
          <button @click="$emit('submit', title, description)" class="button margin-right-xs">Submit</button>
          <button @click="$emit('close')" class="button button-error">Cancel</button>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {}
}
</script>
