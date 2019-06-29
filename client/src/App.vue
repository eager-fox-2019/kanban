<template>
  <div id="app">
    <div class="container">
      <h2 style="color: maroon">Kanban Board</h2> <h4>かんばんボード</h4> <small style="color: pink">by Vuety Tiadita</small>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <button
            class="btn btn-danger btn-block my-4"
            id="new"
            type="submit"
            v-b-modal.modal-prevent-closing
          >create new task</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="d-flex">
            <category :status="'back-log'" v-bind:style="{backgroundColor: 'red', color: 'red'}" />
            <category :status="'todo'" v-bind:style="{backgroundColor: 'blue', color: 'blue'}" />
            <category :status="'doing'" v-bind:style="{backgroundColor: 'coral', color: 'coral'}" />
            <category :status="'done'" v-bind:style="{backgroundColor: 'green', color: 'green'}" />
          </div>
        </div>
      </div>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Task"
      @show="resetModal"
      @hidden="resetModal"
      @ok="addNewData"
    >
      <form>
        <b-form-input id="name-input" v-model="title" placeholder="enter title"></b-form-input>
        <b-form-textarea id="name-input" v-model="desc" placeholder="enter description"></b-form-textarea>
        <b-form-input
          id="name-input"
          type="number"
          v-model="point"
          placeholder="enter point 10-100"
        ></b-form-input>
        <b-form-input id="name-input" v-model="assignedTo" placeholder="enter assigned to who "></b-form-input>
      </form>
    </b-modal>
  </div>
</template>

<script>
import category from "@/components/category.vue";
import db from "../config/firebase";

export default {
  name: "app",
  components: {
    category
  },
  data() {
    return {
      title: "",
      desc: "",
      point: "",
      assignedTo: "",
      status: "back-log"
    };
  },
  methods: {
    addNewData() {
      db.collection("Task")
        .add({
          title: this.title,
          description: this.desc,
          point: this.point,
          assignedTo: this.assignedTo,
          status: "back-log",
          createdAt: new Date()
        })
        .then(function(doc) {
          console.log("Document successfully written!", doc);
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    resetModal() {
      this.title = "";
      (this.desc = ""), (this.point = ""), (this.assignedTo = "");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#new {
  width: 10rem;
}

.container {
  justify-content: center;
}
</style>
