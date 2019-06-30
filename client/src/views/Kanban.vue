<template>
  <v-layout row wrap>
    <v-container fluid grid-list-xl>
      <v-layout row justify-center>
        <h1 id="bigTitle">HACKANBAN</h1>
      </v-layout>
      <v-layout row justify-center>
         <newTaskForm/>
      </v-layout>
    </v-container>

    <v-flex v-for="(thing, index) in things" :key="index" xs3>
      <list :thinga="thing"></list>
    </v-flex>
  </v-layout>
</template>

<script>
import list from "../components/list";
import db from '../db'
import newTaskForm from '../components/newTaskForm'
export default {
  data() {
    return {
      things: [
        {
          text: "Back-Log",
          color: "red",
          task : []
        },
        {
          text: "Todo",
          color: "orange",
          task : []
        },
        {
          text: "Doing",
          color: "purple lighten-2",
          task :  []
        },
        {
          text: "Done",
          color: "teal accent-4",
          task :  []
        }
      ],
      dialog: false,
      alltask : []
    };
  },
  components: {
    list,
    newTaskForm
  },
  methods : {
      fetchTask(){
        this.things[0].task = []
        this.things[1].task = []
        this.things[2].task = []
        this.things[3].task = []
          for (let i = 0; i < this.alltask.length; i++) {
              if(this.alltask[i].status === "backlog"){
                  this.things[0].task.push(this.alltask[i])
              } else if(this.alltask[i].status === "todo"){
                  this.things[1].task.push(this.alltask[i])
              } else if(this.alltask[i].status === "doing"){
                  this.things[2].task.push(this.alltask[i])
              } else if(this.alltask[i].status === "done"){
                  this.things[3].task.push(this.alltask[i])
              }
              
          }
      }
  },
  created() {
     db.collection("tasks")
    .onSnapshot((querySnapshot) => {
        var tasks = [];
        querySnapshot.forEach((doc) => {  
          
           
            if(doc.data().status === "backlog"){
              tasks.push({
                id : doc.id,
                prev : null,
                next : "todo",
              ...doc.data()
               })
            } else if(doc.data().status === "todo"){
                tasks.push({
                id : doc.id,
                prev : "backlog",
                next : "doing",
              ...doc.data()
               })
            } else if(doc.data().status === "doing"){
                tasks.push({
                id : doc.id,
                prev : "todo",
                next : "done",
              ...doc.data()
               })
            } else if(doc.data().status === "done"){
                tasks.push({
                id : doc.id,
                prev : "doing",
                next : null,
              ...doc.data()
               })
            }
            
        })
        console.log(tasks);
        
        this.alltask = tasks
        this.fetchTask()
    })
    
  },
};
</script>

<style scoped>
#bigTitle {
  font-family: "Rubik Mono One", sans-serif;
  margin-top: -100px;
  
}
</style>
