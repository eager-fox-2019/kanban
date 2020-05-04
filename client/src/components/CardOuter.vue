<template>
<div>
    <div class="card">
        <div class="card-content">
            <h3>{{kan.status}}</h3>
            <div>
                
            </div>
            <!-- <CardInner v-bind:eachTask="eachTask"></CardInner> -->
            <hr>
            <div v-for="firstEach in kan.task" :key="firstEach">
                <!-- <div class="card" v-for="eachTask in kan.task" :key="eachTask"> -->
                <!-- <header class="card-header">
                    <p class="card-header-title" >{{eachTask.title}}</p>
                </header> -->
                <cardInner v-for="eachTask in firstEach" :key="eachTask" v-bind:eachTask="eachTask" :kan="kan" @goNext="fUpdate"></cardInner>
                <!-- <cardInner/> -->
            <!-- </div> -->
        </div>
    </div>
    </div>
</div>
</template>

<script>
import cardInner from '@/components/CardInner.vue'

export default {
  name: 'CardOuter',
  props: ['kan'],
  data() {
      return {

      }
  },
  components : {
      cardInner
  },
  methods : {
      fUpdate(val){

      }
  }
}
</script>

<style>

</style>
