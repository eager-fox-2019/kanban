<template>
    <div>
        <div class="tile is-ancestor">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <b-field label="Title :">
                        <b-input placeholder="Input Title" v-model="title" maxlength="6"></b-input>
                    </b-field>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <b-field label="Description :">
                        <b-input placeholder="Input Description" v-model="description" maxlength="10"></b-input>
                    </b-field>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <b-field label="Assigned To :">
                        <b-input placeholder="Input Assigned To" v-model="assign" maxlength="6"></b-input>
                    </b-field>
                </article>
            </div>
        </div>
        <div class="tile is-parent">
            <b-button @click="addTask" type="is-info" style="width: 100%; margin-top: -2%; margin-bottom: 2%;">Add Task</b-button>
        </div>
    </div>
</template>
<script>
    import db from '../config/firebase'
    export default {
        data() {
            return {
                title: '',
                description: '',
                assign: ''
            }
        },
        methods: {
            addTask() {
                db.collection("tasks").add({
                    title: this.title,
                    description: this.description,
                    status: 0,
                    assign: this.assign
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
                this.title = ''
                this.description = ''
                this. assign = ''
            }
        }
    }
</script>