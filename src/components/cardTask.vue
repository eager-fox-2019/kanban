<template>
    <div class="card" id="card-task">
        <div class="card-body">
            <h5 class="card-title" style="text-decoration: underline">{{task.name}}</h5>
            <h5>Description: </h5>
            <p class="card-text">{{task.description}}</p>
            <div v-if="task.status == 'backlog'" class="d-flex justify-content-between">
                <button @click="updateNext(task.id)" class="btn transparent" id="btn-next" title="Move to To-Do List">
                    <i class="fas fa-arrow-circle-right"></i>
                </button>
                <button @click="removeTask(task.id)" class="btn transparent" id="btn-remove" title="Delete Task">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div v-if="task.status == 'todo' || task.status=='inprogress'" class="d-flex justify-content-between">
                <button @click="updatePrev(task.id)" class="btn transparent" id="btn-prev" title="Back to Previous Status">
                    <i class="fas fa-arrow-circle-left"></i>
                </button>
                <button @click="updateNext(task.id)" class="btn transparent" id="btn-next" title="Update to Next Status">
                    <i class="fas fa-arrow-circle-right"></i>
                </button>
                <button @click="removeTask(task.id)" class="btn transparent" id="btn-remove" title="Delete Task">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div v-if="task.status == 'done'" class="d-flex justify-content-between">
                <button @click="updatePrev(task.id)" class="btn transparent" id="btn-prev" title="Back to In-Progress List">
                    <i class="fas fa-arrow-circle-left"></i>
                </button>
                <button @click="removeTask(task.id)" class="btn transparent" id="btn-remove" title="Delete Task">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/config/firebase.js'

export default {
  name: 'cardTask',
  props: ['task'],
  data () {
    return {
      updatedStatus: ''

    }
  },
  methods: {
    updateNext (id) {
      switch (this.task.status) {
        case 'backlog': this.updatedStatus = 'todo'; break
        case 'todo': this.updatedStatus = 'inprogress'; break
        case 'inprogress' : this.updatedStatus = 'done'; break
      }

      db.collection('task').doc(id).update({
        status: this.updatedStatus
      })
        .then(() => {
          console.log('Document successfully updated!')
          this.updatedStatus = ''
          Swal.fire(
            'Success!',
            'Your Task Has Been Updated!'
          )
        })
        .catch(function (error) {
          console.error('Error updating document: ', error)
        })
    },
    updatePrev (id) {
      switch (this.task.status) {
        case 'todo': this.updatedStatus = 'backlog'; break
        case 'inprogress': this.updatedStatus = 'todo'; break
        case 'done' : this.updatedStatus = 'inprogress'; break
      }

      db.collection('task').doc(id).update({
        status: this.updatedStatus
      })
        .then(() => {
          console.log('Document successfully updated!')
          this.updatedStatus = ''
          Swal.fire(
            'Success!',
            'Your Task Has Been Updated!'
          )
        })
        .catch(function (error) {
          console.error('Error updating document: ', error)
        })
    },
    removeTask (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection('task').doc(id).delete().then(function () {
            console.log('Document successfully deleted!')
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }).catch(function (error) {
            console.error('Error removing document: ', error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.card{
    margin-top: 10px;
    border-radius: 25px;
    border: 3px solid darkblue;
    padding: 4px;
    width: 270px;
    height: 190px;
    text-align: left;
    margin-left: 10%;
}

h5{
    font-size: 15px;
    font-weight: bold;
    color: brown;
}

p{
    font-size: 14px;
    color: black;
}

#btn-next{
    margin-top: -15px;
    color: green;
    font-size: 25px;

}

#btn-prev{
    margin-top: -15px;
    color: red;
    font-size: 25px;
}

#btn-remove{
    position:absolute;
    font-size: 18px;
    color: coral;
    top: 1px;
    right:3px;
    height:10px
}

</style>
