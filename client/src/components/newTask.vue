<template>

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
            }
        }
    }
</script>