<template>
        <div  v-show="show" id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add New Task</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body row">
                    <form @submit.prevent="addTask" class="form-inline" >
                        <div class="form-group col-12">
                            <label class="col-3" for="name">Name </label>
                            <input type="text" class="form-control col-9"  v-model="newTask.name" maxlength="30">
                            <small  class="form-text text-muted col-9 offset-1" style="margin-bottom: 3%">Maximum 30 character.</small>
                            <label for="description" class="col-3">Description </label>
                            <input type="text" class="form-control col-9" v-model="newTask.description" maxlength="70">
                            <small  class="form-text text-muted col-9 offset-1">Maximum 70 character.</small>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <input @click="addTask" class="btn btn-success d-flex justify-content-end" type="submit" value="Save" />
                </div>
                </div>

            </div>
        </div>
</template>

<script>
import db from '@/config/firebase.js'

export default {
  props: {
    show: Boolean
  },
  data () {
    return {
      newTask: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    addTask () {
      console.log('masuk add task')
      if (this.newTask.name == '' || this.newTask.description == '') {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'All field must be filled!'
        })
      } else {
        db.collection('task').add({
          name: this.newTask.name,
          description: this.newTask.description,
          status: 'backlog'
        })
          .then((docRef) => {
            console.log('Document written with ID: ', docRef.id)
            Swal.fire(
              'Success!',
              'Your New Task Has Been Added!'
            )
            this.newTask.name = ''
            this.newTask.description = ''
            this.$emit('showAdd', false)
          })
          .catch(function (error) {
            console.error('Error adding document: ', error)
          })
      }
    }
  }
}
</script>

<style scoped>
    h4{
        text-align: center;
        margin-bottom: 10px;
        font-family: 'Varela Round', sans-serif;
        color: coral;
    }

</style>
