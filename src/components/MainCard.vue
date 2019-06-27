<template>
  <div class="col-3">
    <div class="card">
      <div class="card-header text-center" :class="data.bgColor">{{ data.status }}</div>
      <div class="card-body">
        <DataCard v-for="content in data.taskData" :key="content.id" :dataItem="content"></DataCard>
      </div>
    </div>
  </div>
</template>

<script>
import DataCard from '@/components/DataCard.vue'

export default {
  name: 'MainCard',
  components: {
    DataCard
  },
  props: ['data']
  // create
}
</script>

<style scoped>

</style>
