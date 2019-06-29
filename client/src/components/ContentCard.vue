<template>
  <div>
    <div v-for="(todo, index) in todos" :key="index">
      <div
        style="border: solid 0.5px;; border-color: #DFDFDF;"
        class="card-body"
        v-if="status === todo.status"
      >
        <h5 class="card-title">{{ todo.title }}</h5>
        <p class="card-text">{{ todo.description }}</p>
        <br>
        <div class="row d-flex justify-content-between">
          <button
            v-if="todo.status !== 'Pre-Log'"
            @click="back(todo)"
            class="btn btn-warning"
            type="submit"
          >Back</button>
          <button @click="remove(todo.id)" class="bt btn-danger" type="submit">Delete</button>
          <button
            v-if="todo.status !== 'Finished'"
            @click="next(todo)"
            class="btn btn-success"
            type="submit"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import db from '@/config.js';
export default {
  props: ['status'],
  data() {
    return {
      todos: [],
    };
  },
  created() {
    db.collection('task').onSnapshot((docs) => {
      this.todos = [];
      docs.forEach((element) => {
        this.todos.push({ ...element.data(), id: element.id });
      });
    });
  },
  methods: {
    back(todo) {
      if (todo.status === 'finished') todo.status = 'onGoing';
      else if (todo.status === 'onGoing') todo.status = 'toDo';
      else if (todo.status === 'toDo') todo.status = 'preLog';
      db.collection('task')
        .doc(todo.id)
        .set({
          title: todo.title,
          description: todo.description,
          status: todo.status
        });
    },
    next(todo) {
      if (todo.status === 'preLog') todo.status = 'toDo';
      else if (todo.status === 'toDo') todo.status = 'onGoing';
      else if (todo.status === 'onGoing') todo.status = 'finished';
      db.collection('task')
        .doc(todo.id)
        .set({
          title: todo.title,
          description: todo.description,
          status: todo.status
        });
    },
    remove(id) {
      db.collection('task')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
};
</script>