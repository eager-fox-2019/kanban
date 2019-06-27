<template>
  <div>
    <b-form v-on:submit.prevent="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          required
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          placeholder="Enter description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.status"
          :options="statuses"
          required
        ></b-form-select>
      </b-form-group>
      
      <b-row class="justify-content-md-center">
        <b-col col lg="2">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
        <b-col cols="12" md="auto"></b-col>
        <b-col col lg="2">
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { log } from 'util'
import db from '../../config/firebase'
export default {
  data() {
    return {
      form: {
        title: '',
        description: '',
        status: 'New'
      },
      statuses: [{ text: 'New', value: 'New' }, 'To-Do', 'Done'],
      show: true
    }
  },
  methods: {
    onSubmit() {
      db.collection("tasks").add(this.form)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.$nextTick(() => {
        this.show = false
      })
    },
    onReset() {
      this.form.title = ''
      this.form.description = ''
      this.form.status = 'New'
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>