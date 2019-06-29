<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Task</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Ttile">
          <b-input>
          </b-input>
        </b-field>
        <b-field label="Content">
          <b-input>
            </b-input>
          </b-field>
          <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary">Login</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name : 'add-form',
  props: [],
  data() {
    return {

    }
  },
  methods : {
    
  }
}
</script>
