<template>
  <div class='inputForm'>
    <el-form @submit.native.prevent size="medium" label-position='top' :model='form' label-width='120px' style="width: 310px; margin-left: auto; margin-right:auto;">
      <el-form-item label='Input task '>
        <el-input v-model='form.task' placeholder="Input task here"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click='onSubmit'>Post !</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'inputForm',
  data () {
    return {
      form: {
        task: ''
      },
      todoList: []
    }
  },
  methods: {
    onSubmit () {
      // console.log(this.todoList,'hello')
      if (this.form.task !== '') {
        this.todoList.push(this.form.task)
        this.$emit('inputed', this.todoList)
        this.form.task = ''
      }
      console.log('submit!')
      // console.log(this.form.task,'ini task')
      console.log(this.todoList)
    }
  }
}
</script>

<style>
.el-input__inner{
    width: 180px;
}
</style>
