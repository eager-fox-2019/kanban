<template>
  <div>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>RCP</span>
        <span class="font-weight-light">-Kanban</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click="setDialog">
        <span class="mr-2">Add Task</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },
  methods: {
    setDialog () {
      this.$emit('set-dialog', true)
    }
  }
}
</script>

<style>

</style>
