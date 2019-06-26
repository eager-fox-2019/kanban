<template>
    <v-layout justify-center>
        <v-flex xs3>
            <v-card>
                <v-toolbar color="pink" dark>
                    <v-toolbar-title>Back-Log</v-toolbar-title>
                </v-toolbar>

                <v-list two line>
                    <draggable v-model="backlogs" group="tasks">
                        <template v-for="(backlog) in backlogs">
                        <v-list-tile
                        :key="backlog.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>Name: {{backlog.name}}</v-list-tile-title>
                                <v-list-tile-sub-title>Score: {{backlog.score}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            
                        <v-icon @click="del(backlog.id)">delete</v-icon>
                        </v-list-tile>

                       
                        </template>

                    </draggable>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs3>
            <v-card>
                <v-toolbar color="yellow" dark>
                    <v-toolbar-title>To-Do</v-toolbar-title>
                </v-toolbar>

                <v-list two line>
                   <draggable v-model="todos" group='tasks'>
                        <template v-for="(todo) in todos">
                        <v-list-tile
                        :key="todo.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>Name: {{todo.name}}</v-list-tile-title>
                                <v-list-tile-sub-title>Score: {{todo.score}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        
                        <v-icon @click="del(todo.id)">delete</v-icon>
                        </v-list-tile>

                        </template>

                    </draggable>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs3>
            <v-card>
                <v-toolbar color="Blue" dark>
                    <v-toolbar-title>Ongoinggg</v-toolbar-title>
                </v-toolbar>

                <v-list two line>
                    <draggable v-model="ongoings" group="tasks">
                        <template v-for="(ongoing) in ongoings">
                        <v-list-tile
                        :key="ongoing.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>Name: {{ongoing.name}}</v-list-tile-title>
                                <v-list-tile-sub-title>Score: {{ongoing.score}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        
                        <v-icon @click="del(ongoing.id)">delete</v-icon>
                        </v-list-tile>

                        </template>

                    </draggable>
                </v-list>
            </v-card>
        </v-flex>

        <v-flex xs3>
            <v-card>
                <v-toolbar color="green" dark>
                    <v-toolbar-title>Done</v-toolbar-title>
                </v-toolbar>

                <v-list two line>
                    <draggable v-model="dones" group="tasks">
                        <template v-for="(done) in dones">
                        <v-list-tile
                        :key="done.id"
                        >
                            <v-list-tile-content>
                                <v-list-tile-title>Name: {{done.name}}</v-list-tile-title>
                                <v-list-tile-sub-title>Score: {{done.score}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                        

                        <v-icon @click="del(done.id)">delete</v-icon>
                        </v-list-tile>

                        
                        </template>

                    </draggable>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import draggable from "vuedraggable"
import db from "../db"

export default {
    name: "listDisplay",
    components: {
        draggable
    },
    created (){
        db.collection("tasks")
            .onSnapshot((querySnapshot) =>{
                var tempbacklog = []
                var temptodo = []
                var tempongoing = []
                var tempdone = []
                querySnapshot.forEach((doc) =>{
                     var task = doc.data()
                    if(task.type === "Back-Log"){
                        tempbacklog.push({id: doc.id, ...task})
                    }else if(task.type === "To-Do"){
                        temptodo.push({id: doc.id, ...task})
                    }else if(task.type === "Ongoing"){
                        tempongoing.push({id: doc.id, ...task})
                    }else if(task.type === "Done"){
                        tempdone.push({id: doc.id, ...task})
                    }
                })
               this.backlogs = tempbacklog
               this.todos = temptodo
               this.ongoings = tempongoing
               this.dones = tempdone
            })
    },
    data () {
        return {
            backlogs: [],
            todos: [],
            ongoings: [],
            dones: []
        }
    },
    methods: {
        del: function (id) {
            db.collection("tasks").doc(id).delete()
                .then(() =>{
                    console.log("Successfully deleted")
                })
                .catch(err =>{
                    console.log(err)
                })
        }
    },
    watch:{
        backlogs: function () {
            var newData = this.backlogs.filter(task => task.type !== "Back-Log")
            newData.forEach((task) =>{
                db.collection("tasks").doc(task.id).update({
                    type: "Back-Log"
                })
                .then(() =>{
                    task.type = "Back-Log"
                    console.log("document updated")
                })
                .catch(err =>{
                    console.log(err)
                })
            })
        },
        todos: function () {
            var newData = this.todos.filter(task => task.type !== "To-Do")
            newData.forEach((task) =>{
                db.collection("tasks").doc(task.id).update({
                    type: "To-Do"
                })
                .then(() =>{
                    task.type = "To-Do"
                    console.log("document updated")
                })
                .catch(err =>{
                    console.log(err)
                })
            })
        },
        ongoings: function () {
            var newData = this.ongoings.filter(task => task.type !== "Ongoing")
            newData.forEach((task) =>{
                db.collection("tasks").doc(task.id).update({
                    type: "Ongoing"
                })
                .then(() =>{
                    task.type = "Ongoing"
                    console.log("document updated")
                })
                .catch(err =>{
                    console.log(err)
                })
            })
        },
        dones: function () {
            var newData = this.dones.filter(task => task.type !== "Done")
            newData.forEach((task) =>{
                db.collection("tasks").doc(task.id).update({
                    type: "Done"
                })
                .then(() =>{
                    task.type = "Done"
                    console.log("document updated")
                })
                .catch(err =>{
                    console.log(err)
                })
            })
        },
    }
}
</script>

<style>

</style>
