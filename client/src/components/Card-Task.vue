<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{ item.title }}</h3>
      <v-layout xs2 md2 lg2>
        {{ item.description }}
      </v-layout>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange" @click="editModal(item)"><v-icon>edit</v-icon></v-btn>
      <v-btn flat color="orange" @click="deleteTask(item.id)"><v-icon>delete</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import db from '../../config/db'
export default {
  props: ['item'],
  methods: {
    editModal (item) {
      this.$emit('set-dialog', [true, item])
    },
    deleteTask (val) {
      this.$swal({
        title: 'Are you sure you want to delete?',
        text: 'You will not be able to recover this task!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
          db.collection('tasks').doc(val).delete().then(() => {
            console.log('Document successfully deleted!')
          }).catch((error) => {
            console.error('Error removing document: ', error)
          })
          this.$swal(
            'Deleted!',
            'Your task has been deleted.',
            'success'
          )
        } else if (result.dismiss === this.$swal.DismissReason.cancel) {
          this.$swal(
            'Cancelled',
            'Your task is safe :)',
            'error'
          )
        }
      })
    }
  }
}
</script>

<style>

</style>
