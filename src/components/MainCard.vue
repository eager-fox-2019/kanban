<template>
  <div class="card">
    <h2>{{ data.name }}</h2>
  </div>
</template>

<script>
export default {
  name: 'MainCard',
  props: ['data']
  // create
}
</script>

<style scoped>
.card {
  font-size: 10px;
  color: royalblue;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.card h2 {
  padding: 20px;
}
</style>
