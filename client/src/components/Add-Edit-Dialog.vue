<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ titleDialog }} Task</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="data.title" label="Title Task*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="data.description" label="Description"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select v-model="data.category"
                :items="categoryList"
                label="Category Task"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="setDialog()">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="saveDialog()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import db from '../../config/db'

export default {
  props: ['dialog', 'data', 'titleDialog'],
  data () {
    return {
      categoryList: ['back-log', 'to-do', 'onprogress', 'done']
    }
  },
  methods: {
    setDialog () {
      this.$emit('set-dialog', false)
    },
    saveDialog () {
      let sendData = {
        title: this.data.title,
        description: this.data.description,
        category: this.data.category
      }
      if (this.data.id) {
        db.collection('tasks').doc(this.data.id).set(sendData)
          .then(function () {
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
      } else {
        db.collection('tasks').add(sendData)
          .then(function () {
            console.log('Document successfully written!')
          })
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
      }
      this.setDialog()
    }
  }
}
</script>

<style>

</style>
