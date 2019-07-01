<template>
    <div id="header">
        <h2>Kanban Board</h2>
        <a href="" @click="showAdd=true" data-toggle="modal" data-target="#myModal">
            <i class="fas fa-plus-circle"></i><span> Add Task</span>
        </a>
        <formAddTask :show="showAdd" />
    </div>
</template>

<script>
import formAddTask from '@/components/formAddTask.vue'

export default {
  data () {
    return {
      showAdd: false
    }
  },
  components: {
    formAddTask
  },
  methods: {
    change () {
      this.showAdd = true
    }
  }
}
</script>

<style scoped>
    a{
        text-align: center;
        font-size: 20px;
        font-family: 'Varela Round', sans-serif;
    }

    a:hover{
        color: #d62d34;
        font-weight: bold;
    }

    h2 {
        font-size: 50px;
        text-align: center;
        margin-top: 20px;
        font-family: 'Lobster', cursive;
    }

</style>
