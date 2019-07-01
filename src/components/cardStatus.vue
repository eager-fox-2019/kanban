<template>
    <div>
        <h3 :id="status">{{title}}</h3>
        <div id="board">
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
        font-size: 23px;
        font-family: 'Lobster', cursive;
        text-align: center;

    }

    #backlog{
        border-radius: 15px 50px;
        background: #f06c72;
        padding: 8px;
        width: 270px;
        height: 50px;
        margin-left: 8%
    }

     #todo{
        border-radius: 50px 15px;
        background: orange;
         padding: 8px;
        width: 270px;
        height: 50px;
        margin-left: 8%
    }

     #inprogress{
        border-radius: 15px 50px;
        background:  lightseagreen;
         padding: 8px;
        width: 270px;
        height: 50px;
        margin-left: 8%
    }

     #done{
        border-radius: 50px 15px;
        background: lightgreen;
        padding: 8px;
        width: 270px;
        height: 50px;
        margin-left: 8%
    }

    #board{
        max-height: 480px;
        overflow-y: scroll;
    }

</style>
