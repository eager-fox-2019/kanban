<template>
  <section>
    <b>Welcome To Vue Kanban</b>
    <h1>Input Your Name To Login</h1>
    <div class="hehe">
      <b-field id="hehe">
        <b-input v-model="name"></b-input>
      </b-field>
    </div>
    <div style="margin-top: 10px">
      <b-button type="is-success" @click="userLogin">Create</b-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    userLogin() {
      if (this.name !== '') {
        localStorage.name = this.name;
        this.name = '';
        this.$emit('islogin', true);
      } else {
        console.log('nama harus diisi');
      }
    },
  },
};
</script>

<style scoped>
b{
    font-size: 50px
}
#hehe {
  width: 200px;
}
.hehe {
  display: flex;
  justify-content: center;
}
section {
  margin-top: 100px;
}
</style>
