<template>
    <v-layout justify-center>
        <v-flex xs3>
            <Card :data="task" :title="'Back-Log'" :color="'pink'" :type="'backlogs'"></Card>
        </v-flex>

        <v-flex xs3>
            <Card :data="task" :title="'To-Do'" :color="'yellow'" :type="'todos'"></Card>
        </v-flex>

        <v-flex xs3>
            <Card :data="task" :title="'Ongoing'" :color="'blue'" :type="'ongoings'"></Card>
        </v-flex>

        <v-flex xs3>
            <Card :data="task" :title="'Done'" :color="'green'" :type="'dones'"></Card>
        </v-flex>
    </v-layout>
</template>

<script>
import draggable from "vuedraggable"
import db from "../db"
import Card from "./Card"

export default {
    name: "listDisplay",
    components: {
        draggable,
        Card
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
               this.task.backlogs = tempbacklog
               this.task.todos = temptodo
               this.task.ongoings = tempongoing
               this.task.dones = tempdone
            })
    },
    data () {
        return {
            task: {
                backlogs: [],
                todos: [],
                ongoings: [],
                dones: []
            }
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
        "task.backlogs": function () {
            var newData = this.task.backlogs.filter(task => task.type !== "Back-Log")
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
        "task.todos": function () {
            var newData = this.task.todos.filter(task => task.type !== "To-Do")
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
        "task.ongoings": function () {
            var newData = this.task.ongoings.filter(task => task.type !== "Ongoing")
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
        "task.dones": function () {
            var newData = this.task.dones.filter(task => task.type !== "Done")
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
