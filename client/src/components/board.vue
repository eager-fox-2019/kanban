<template>
    <div class="is-parent" style="max-height: 400px; overflow: scroll; margin-left: 2%; margin-right: 2%; max-width: 100%; width: 25%">
        <article class="tile is-child box" style="max-height: 400px; overflow: scroll;">
            <p class="title" style="text-align: center;">{{title}}</p>
            <hr>
            <card v-for="todo in task" :key="todo.id" :data="todo" />
        </article>
    </div>
</template>

<script>
    import Card from './card'
    export default {
        name: 'app',
        components: {
            Card
        }, 
        props: ['title','task'],
        data() {
            return {
                
            }
        }
    }
</script>

<style>
</style>

