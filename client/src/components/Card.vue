<template>
    <v-card>
        <v-toolbar :color="color" dark>
            <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>

        <v-list two line>
            <draggable v-model="data[type]" group="tasks" @change="update">
                <template v-for="(task) in data[type]">
                <v-list-tile
                :key="task.id"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>Name: {{task.name}}</v-list-tile-title>
                        <v-list-tile-sub-title>Score: {{task.score}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    
                <v-icon @click="del(task.id)">delete</v-icon>
                </v-list-tile>

                
                </template>

            </draggable>
        </v-list>
    </v-card>
</template>

<script>
import draggable from "vuedraggable"
import db from "../db"

export default {
    name: "Card",
    components: {
        draggable
    },
    props: {
        data: Object,
        color: String,
        title: String,
        type: String
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
        },
        update: function() {
            this.$emit("dragged", this.data)
        }
    }
}
</script>

<style>

</style>
