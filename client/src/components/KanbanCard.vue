<template>
  <div>
    <div class="card text-black mb-3" style="max-width: 18rem;">
      <div v-if="status === 'preLog'" class="card-header bg-danger">{{ status }}</div>
      <div v-if="status === 'toDo'" class="card-header bg-warning">{{ status }}</div>
      <div v-if="status === 'onGoing'" class="card-header bg-info">{{ status }}</div>
      <div v-if="status === 'finished'" class="card-header bg-success">{{ status }}</div>

      <div v-for="(content, index) in 1" :key="index">
        <ContentCard v-bind:status="status"/>
      </div>
    </div>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue';
export default {
  name: 'KanbanCard',
  props: ['status'],
  components: {
    ContentCard,
  },
  data() {
    return {};
  },
  created() {},
};
</script>