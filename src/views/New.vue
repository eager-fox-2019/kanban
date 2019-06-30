<template>
  <div class="new">
    <div class="container">
      <div class="columns">
        <div class="column-9">
          <section>
            <b-field label="Title" type="is-primary">
                <b-input v-model="form.title" type="text" placeholder="Input Title"></b-input>
            </b-field>

            <b-field label="Point"
                type="is-danger">
                <b-input v-model="form.point" type="Number" min=0 value="0">
                </b-input>
            </b-field>

            <b-field label="Assigned To"
                type="is-success">
                <b-input v-model="form.assign" type="text" placeholder="Input Assignment"></b-input>
            </b-field>

            <b-field label="Description">
                <textarea v-model="form.description" placeholder="Input Description" cols="30"></textarea>
            </b-field>

            <b-button type="is-info" @click="newTask">SUBMIT</b-button>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import db from '../firebase/firebase'

export default {
  data(){
    return {
      form : {
        title : '',
        point : 0,
        assign : '',
        description : '',
        status : 'back-log'
      }
    }
  },
  methods: {
    newTask(){
      db.collection('kanbans').add(this.form)
      this.$router.push('/')
    }
  }
}
</script>


<style scoped>
.columns{
  justify-content: center;
  margin-top: 20px;
}
</style>

