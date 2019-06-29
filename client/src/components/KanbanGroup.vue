<template>
  <div class="margin-xl kanban-group box-shadow-xxl" :style="style">
    <div class="background-white margin-xs">
      <h3 class="padding-m box-shadow-xxl">{{kanbanName}}</h3>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['color', 'kanbanName'],
  computed: {
    style () {
      return `background-color: ${this.color}`
    }
  }
}
</script>

<style>
.kanban-group {
  width: 100%;
}
</style>
