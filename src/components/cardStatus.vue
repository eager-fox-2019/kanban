<template>
    <div>
        <h3 :id="status">{{title}}</h3>
        <div class="overflow-auto" id="board">
        <cardTask v-for="task in tasks" :key="task.id" :task="task"></cardTask>
        </div>
    </div>
</template>

<script>

import cardTask from '@/components/cardTask'

export default {
  name: 'cardStatus',
  props: ['title', 'tasks', 'status'],
  components: {
    cardTask
  }
}
</script>

<style scoped>
    h3{
        margin-top: 30px;
        color: black;
        font-weight: bold;
        font-size: 25px;
        font-family: 'Lobster', cursive;
        text-align: center;

    }

    #backlog{
        border-radius: 15px 50px;
        background: #f06c72;
        padding: 10px;
        width: 270px;
        height: 55px;
        margin-left: 10%
    }

     #todo{
        border-radius: 50px 15px;
        background: orange;
        padding: 10px;
        width: 270px;
        height: 55px;
        margin-left: 10%
    }

     #inprogress{
        border-radius: 15px 50px;
        background:  lightseagreen;
        padding: 10px;
        width: 270px;
        height: 55px;
        margin-left: 10%
    }

     #done{
        border-radius: 50px 15px;
        background: lightgreen;
        padding: 10px;
        width: 270px;
        height: 55px;
        margin-left: 10%
    }

    #board{
        max-height: 480px;
        overflow: scroll;
    }

</style>
