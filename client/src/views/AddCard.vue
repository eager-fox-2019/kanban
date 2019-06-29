<template>
  <div class="add-card">
    <div class="formAddCard">
      <div class="form-group">
        <span>
          <label for="usr">Note:</label>
          <input v-model="content" type="text" class="form-control" id="usr">
        </span>
        <span>
          <label for="date">Due Date:</label>
          <input v-model="date" type="date" class="form-control" id="date">
        </span>
        <span>
          <label for="stat">Status:</label>
          <label class="radio-inline backlog">
            <input v-model="status" value="backlog" type="radio" name="optradio">
            Backlog</label>
          <label class="radio-inline todo">
            <input v-model="status" value="todo" type="radio" name="optradio" checked> To-Do</label>
          <label class="radio-inline inprogress">
            <input v-model="status" value="inprogress" type="radio" name="optradio"> In-Progress</label>
          <label class="radio-inline completed">
            <input v-model="status" value="completed" type="radio" name="optradio"> Completed</label>
        </span>
        <input type="submit" class="form-control btn btn-primary" id="submit" @click="addCard">
      </div>
    </div>
  </div>
</template>
<script>
import router from '@/router'
import db from '@/config/firebase.js'

export default {
  name: 'add',
  data () {
    return {
      content: '',
      date: '',
      status: 'todo'
    }
  },
  methods: {
    addCard: function () {
      //  add card to firebase
      let card = {
        content: this.content,
        dueDate: this.date,
        status: this.status
      }
      db.collection('kanbanList').add(card)
      this.clearValues()
      // return to home
      router.push({ name: 'home' })
    },
    clearValues () {
      this.content = ''
      this.date = ''
      this.status = 'todo'
    }
  }
}

</script>
<style scoped>
a {
  color: #2c3e50;
}

h1 {
  font-size: 1.2em;
  color: black;
  padding: 0.3em;
  margin: 0.1em;
}

.formAddCard {
  padding: 1em;
  margin: 0.5em;
}

.radio-inline {
  color: white;
  padding: 0.5em;
  margin: 0.5em;
  border: solid white 0.1em;
  border-radius: 1em;
}

.backlog {
  background-color: #FF0000;
}

.todo {
  background-color: #FF6600;
}

.inprogress {
  background-color: #FFCC00;
}

.completed {
  background-color: #336699;
}

</style>
