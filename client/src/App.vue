<template>
  <div id="app">
    <NavBar/>

    <addTask/>
  
    <div id="main">
         <font-awesome-icon icon="arrow-right" />
       
      <b-container fluid class="mt-5">
        <b-row no-gutters class="mx-auto" style="width:80%;">
          <TaskSection :tasks="backlog" :columns="columns[0]"/>
          <TaskSection :tasks="todo" :columns="columns[1]"/>
          <TaskSection :tasks="doing" :columns="columns[2]"/>
          <TaskSection :tasks="done" :columns="columns[3]"/>
        </b-row>
      </b-container>
    </div> 
  </div>
</template>

<script>
import addTask from "./components/AddTask.vue"
import taskCard from "./components/taskCard"
import db from "./config/firebase"
import NavBar from "./components/NavBar"
import TaskSection from "./components/TaskSection"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export default {
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      columns: [{ title: 'BACKLOG', background: '#AEF3E7', color: 'black'}, { title: 'TODO', background: '#8EE3EF', color: 'black'}, { title: 'DOING', background: '#37718E', color: 'white'}, { title: 'DONE', background: '#254E70', color: 'white'}]
    }
  },
  components: {
    addTask,
    taskCard,
    NavBar,
    TaskSection,
    'font-awesome-icon' : FontAwesomeIcon
  },
  created() {
    db.collection("Tasks")
    .onSnapshot((querySnapshot) => {
        let backlog = []
        let todo = []
        let doing = []
        let done = []
        querySnapshot.forEach(function(doc) {
            let status = doc.data().status
            let task = {
              id: doc.id, 
              ...doc.data()
            }
            if(status === 'backlog') {
              backlog.push(task);      
            }
            else if(status === 'todo') {
              todo.push(task);
            }
            else if(status === 'doing') {
              doing.push(task);
            }
            else if(status === 'done') {
              done.push(task);
            }
        });
        this.backlog = backlog
        this.todo = todo
        this.doing = doing
        this.done = done
    });

  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Numans&display=swap');

#app {
  font-family: 'Numans', sans-serif;
}



.header{
  /* border: 2px solid grey; */
  padding-top: 15px;
  padding-bottom: 2px;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
}

.header h1 {
  font-weight: bold;
  font-size: 30px;
}

.task-section {
  margin: 10px;
  text-align: center;
}

nav {
  background-color: #011936;
  box-shadow: 0px 0px 3px #011936;
}

#navbar-menu h1 {
  color: whitesmoke;
  font-weight: bold;
}


</style>
