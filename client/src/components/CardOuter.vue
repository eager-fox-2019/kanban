<template>
<div>
    <div class="card">
        <div class="card-content">
            <h3>{{kan.title}}</h3>
            <div>
                
            </div>
            <!-- <CardInner v-bind:eachTask="eachTask"></CardInner> -->
            <hr>
            <div>
                <!-- <div class="card" v-for="eachTask in kan.task" :key="eachTask"> -->
                <!-- <header class="card-header">
                    <p class="card-header-title" >{{eachTask.title}}</p>
                </header> -->
                <cardInner v-for="eachTask in kan.task" :key="eachTask" v-bind:eachTask="eachTask"></cardInner>
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
  }
}
</script>

<style>

</style>
