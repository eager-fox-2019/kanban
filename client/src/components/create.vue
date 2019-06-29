<template>
  <div id="window1">
    <form id="window" v-on:submit.prevent="save">
      <div style="margin-bottom:10px">
        <h2 style="font-size:20px">New Task</h2>
      </div>
      <div style="margin-bottom:10px">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Task Title"
          v-model="title"
        />
      </div>
      <div style="margin-bottom:10px">
        <label for="desc">Description</label>
        <textarea
          class="form-control"
          id="desc"
          style="height: 5rem;"
          placeholder="Task Short Description"
          v-model="description"
        ></textarea>
      </div>
      <div style="margin-bottom:10px">
        <label for="point">Point</label>
        <input
        type="text"
          class="form-control"
          id="point"
          v-model="point"
        >
      </div>
      <div style="margin-bottom:10px">
        <label for="assign">Assigned To</label>
        <input
          type="text"
          class="form-control"
          id="assign"
          placeholder="Assigned To"
          v-model="assignee"
        />
      </div>
      <div style="margin:10px;margin-left:0px">
        <button type="submit" class="btn btn-primary" style="margin-right: 10px;">Save</button>
        <button type="button"
          class="btn btn-outline-secondary"
          v-on:click.prevent="close"
        >Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../firestore/db.js";
export default {
  data: function() {
    return {
      title: "",
      description: "",
      point: 0,
      assignee: "",
      alert: ""
    };
  },
  methods: {
    close(){
      this.$emit('close')
    },
    save() {
      db.collection("tasks")
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignee: this.assignee,
          group: 1
        })
        .then((doc) => {
          this.title = "";
          this.description = "";
          this.point = 0;
          this.assignee = "";
          this.$emit("close");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scopped>
#window1 {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #26292ba6;
}

#window {
  background-color: white;
  width: 90%;
  max-width: 38rem;
  margin: 5rem auto;
  padding: 0.9rem 1.2rem;
  border-radius: 0.4rem;
}
</style>
