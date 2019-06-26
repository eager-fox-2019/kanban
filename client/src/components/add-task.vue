<template>
    <v-layout row wrap>
        <v-flex xs12>
           <v-text-field xs12 label="Insert Name" v-model="name"></v-text-field>

        </v-flex>

        <v-flex xs5>
           <v-text-field xs6 label="Insert Score" v-model="score" type="number"></v-text-field>

        </v-flex>

        <v-flex xs6 offset-xs1>
            <v-select xs6
            :items="types"
            label="Select Type"
            v-model="type"
            >
            </v-select>

        </v-flex>
      <v-btn @click="add" style="margin-left: 43%;">Add</v-btn>
    </v-layout>
</template>

<script>
import db from "../db"

export default {
    name: "addTask",
    data () {
        return {
            name: "",
            score: 0,
            type: "",
            types: ["Back-Log", "To-Do", "Ongoing", "Done"]
        }
    },
    methods: {
        add: function () {
            db.collection("tasks").add({
                name: this.name,
                score: this.score,
                type: this.type
            })
            .then(docRef =>{
                this.name = ""
                this.score = 0,
                this.type = ""
                // console.log("Document written with ID: ", docRef.id);
            })
            .catch(err =>{
                // console.log("Error adding document", err)
            })
        }
    }
}
</script>

<style>

</style>
