<template>
  <div class="maintheme">
    <toInput v-on:inputed="fillTask" />
    <!-- {{hello}} -->
    {{tasks.prelog}}
    <el-row :gutter="20" style="margin : 10px 10px;">
      <el-col v-for="task in tasks" :key="task" class="rowMain" :span="6">
        <cardTag v-bind:atas="task" />
        <!-- <h1>Hai. </h1> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import toInput from './inputForm'
import cardTag from './card'

export default {
  name: 'maintheme',
  data () {
    return {
      // titles: ['Pre-Log', 'To-Do', 'On-Going', 'Done'],
      tasks: [
        {
          name: 'Pre-Log',
          data: []
        },
        {
          name: 'To-Do',
          data: []
        },
        {
          name: 'On-Going',
          data: []
        },
        {
          name: 'Done',
          data: []
        }
      ],
      hello: null
    }
  },
  methods: {
    inputed (value) {
      this.hello = value
      this.tasks.prelog = value
      console.log(value, 'ini value dari main')
    },
    fillTask (value) {
      console.log(value, 'ini value')
      this.hello = value
      this.tasks[0].data = value
    }
  },
  // mounted: {
  //   changeTitle (titleValue) {
  //     this.$refs.cardTag.makeAtitle(titleValue)
  //   }
  // },
  components: {
    toInput,
    cardTag
  }
}
</script>

<style>
.rowMain{
  /* margin: 5px; */
  padding: 10px 15px;
}

.maintheme {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-color: #f2eee0;
  min-height: 615px;
  height: auto;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 25px;
}
</style>
