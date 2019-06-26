<template>
  <div id="app">
    <Navbar/>
    <p class="text-center mt-2"><strong>Note: Drag and drop to update your progress!</strong></p>
    <b-card-group deck class="mt-3 mr-3 ml-3">
      <Category v-for="(category, index) in categories" :key="index" :title="category" :variant="variants[index]"/>
    </b-card-group>
    <TaskForm/>
  </div>
</template>

<script>
import Navbar from './components/NavBar'
import Category from './components/CategoryCard'
import TaskForm from './components/TaskForm'

export default {
  name: 'app',
  components: {
    Navbar,
    Category,
    TaskForm
  },
  data () {
    return {
      categories: ['Created', 'Started', 'Almost Complete', 'Completed'],
      variants: ['danger', 'warning', 'success', 'primary']
    }
  }
}
</script>

<style>

</style>
