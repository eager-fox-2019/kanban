<template>
  <section>
    <b-collapse
      class="card"
      aria-id="contentIdForA11y3"
      :open.sync="opn"
      style="width: 250px; background-color: grey; text-align: center"
    >
      <div
        slot="trigger"
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3"
        @click="clearForm"
      >
        <p class="card-header-title" style="text-align: center">New Kanban</p>
      </div>
      <div class="card-content">
        <div class="content">
          <b-field label="Name">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field label="Desc">
            <b-input v-model="desc"></b-input>
          </b-field>
          <b-button type="is-success" @click="createKanban">Create</b-button>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import db from '../config/firebase';

export default {
  data() {
    return {
      name: '',
      desc: '',
      opn: false,
    };
  },
  methods: {
    clearForm() {
      this.name = '';
      this.desc = '';
      this.opn = false;
    },
    createKanban() {
      const data = {
        name: this.name,
        desc: this.desc,
        createdBy: localStorage.name,
      };
      if (this.name !== '' && this.desc !== '') {
        db.collection('backlog')
          .doc()
          .set(data)
          .then(() => {
            console.log('Document successfully written!');
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
        this.clearForm();
      } else {
        console.error('Error writing document');
      }
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
}
footer {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
