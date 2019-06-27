<template>
  <div class="container">
    <MainHeader></MainHeader>
    <!-- <div class="container">
      <div class="container-card">
        <mainCard v-for="{task, index} in tasks" :key="index" :task="task"></mainCard>
      </div>
    </div> -->
  </div>
</template>

<script>
import MainHeader from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    MainHeader
  }
}
</script>
