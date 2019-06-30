<template>
  <div>
    <div>
      <div :class="{backlog: name == 'backlog'}" id="nama" v-if="name == 'backlog' ">{{name}}</div>
      <div :class="{todo: name == 'todo'}" id="nama" v-if="name == 'todo' ">{{name}}</div>
      <div :class="{doing: name == 'doing'}" id="nama" v-if="name == 'doing' ">{{name}}</div>
      <div :class="{done: name == 'done'}" id="nama" v-if="name == 'done' ">{{name}}</div>
    </div>
    <div id="bgbacklog" v-if="name == 'backlog'">
      <div id="backlog">
        <Card class="hehe" v-for="(backlog, i) in backlogs" :key="i"
        :datafs="backlog" :onWhere="'backlog'"/>
      </div>
    </div>
    <div id="bgtodo" v-if="name == 'todo'">
      <div id="todo">
        <Card class="hehe" v-for="(todo, i) in todos" :key="i"
        :datafs="todo" :onWhere="'todo'"/>
      </div>
    </div>
    <div id="bgdoing" v-if="name == 'doing'">
      <div id="doing">
        <Card class="hehe" v-for="(doing, i) in doings" :key="i"
        :datafs="doing" :onWhere="'doing'"/>
      </div>
    </div>
    <div id="bgdone" v-if="name == 'done'">
      <div id="done">
        <Card class="hehe" v-for="(done, i) in dones" :key="i"
        :datafs="done" :onWhere="'done'"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card.vue';
import db from '../config/firebase';

export default {
  props: ['name'],
  data() {
    return {
      backlogs: [],
      todos: [],
      doings: [],
      dones: [],
    };
  },
  components: {
    Card,
  },
  mounted() {
    db.collection('backlog')
      .onSnapshot((querySnapshot) => {
        const backlog = [];
        querySnapshot.forEach((doc) => {
          backlog.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.backlogs = backlog;
      });

    db.collection('todo')
      .onSnapshot((querySnapshot) => {
        const todo = [];
        querySnapshot.forEach((doc) => {
          todo.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.todos = todo;
      });

    db.collection('doing')
      .onSnapshot((querySnapshot) => {
        const doing = [];
        querySnapshot.forEach((doc) => {
          doing.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.doings = doing;
      });

    db.collection('done')
      .onSnapshot((querySnapshot) => {
        const done = [];
        querySnapshot.forEach((doc) => {
          done.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.dones = done;
      });
  },
};
</script>

<style scoped>
#nama {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.backlog {
  background-color: red;
}
.todo {
  background-color: yellow;
}
.doing {
  background-color: blue;
}
.done {
  background-color: green;
}
.backlog,
.todo,
.doing,
.done {
  font-family: "Rubik Mono One", sans-serif;
  color: white;
}
#backlog,
#todo,
#doing,
#done {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
}
#bgbacklog{
  background-color: lightcoral
}
#bgtodo{
  background-color: lightyellow
}
#bgdoing{
  background-color: lightblue
}
#bgdone{
  background-color: lightgreen
}
.hehe{
  margin: 10px;
}
</style>
