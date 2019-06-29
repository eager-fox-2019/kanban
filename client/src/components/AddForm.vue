<template>
  <form id="addForm">
    <div id="input">
      <v-text-field
        label="Title"
        outline
        v-model="newTask.title"
      ></v-text-field>
      <v-text-field
        label="Content"
        outline
        v-model="newTask.content"
      ></v-text-field>
    </div>
      <p>Add to: </p>
    <div id="buttons">
      <v-btn color="info" @click="add('plan')">Plan</v-btn>
      <v-btn color="error" @click="add('in-progress')">In-Progress</v-btn>
      <v-btn color="success" @click="add('done')">Done</v-btn>
      <v-btn color="warning" @click="add('routine')">Routine</v-btn>
    </div>
  </form>
</template>

<script>
import db from '../../config/firestore'
export default {
  name : 'add-form',
  props: [],
  data() {
    return {
      newTask: {
        title: '',
        content: ''
      }
    }
  },
  methods : {
    add(type) {
      this.newTask.type = type
      db.collection('kanban').add(this.newTask)
      this.$emit('closeForm')
    }
  }
}
</script>
<style scoped>
  #addForm {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* border: 2px solid black; */
    padding: 10px;
    width: 40%;
    margin: 0 auto;
    transition-delay: 0.5s;
  }

  #buttons {
    display: flex;
    justify-content: space-around;
  }
  .field {
    margin-left: 30px;
  }
</style>

