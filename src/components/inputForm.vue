<template>
  <div class="border px-3">
    <form class="form-group p-3 mb-0" @submit.prevent="newTodo">
      <h3 class="text-center">Kanban Board</h3>
      <center>
        <small>Insert your todo list here...</small>
      </center>
      <input
        type="text"
        class="form-control"
        placeholder="Name"
        v-model="name"
      />
      <textarea
        class="form-control mt-3"
        rows="5"
        placeholder="Description"
        v-model="description"
      ></textarea>
      <input type="date" class="form-control mt-3" v-model="targetDate" />
      <div
        class="col-12 d-flex mt-3 justify-content-between border p-2 rounded align-items-center"
      >
        <span>Mark As Important</span>
        <input type="checkbox" v-model="important" />
      </div>
      <button type="submit" class="btn btn-block btn-info mt-3">
        Submit&emsp;
        <i class="fa fa-paper-plane"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { db } from "@/assets/dbconfig.js";
import swal from "sweetalert2";
export default {
  name: "inputForm",
  props: ["user"],
  data() {
    return {
      name: "",
      description: "",
      targetDate: this.getTomorrowDate(),
      important: false
    };
  },
  methods: {
    getTomorrowDate() {
      var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      if (String(month).length == 1) {
        month = "0" + month.toString();
      }
      if (String(day).length == 1) {
        day = "0" + day.toString();
      }
      let str = `${year}-${month}-${day}`;

      return str;
    },
    newTodo() {
      const { name, description, targetDate, important } = this;
      if (name === "" || targetDate == "" || description == "") {
        alert("You have to complete the form before submitting this");
      } else if (new Date() >= new Date(targetDate)) {
        alert("Date must be later than today");
      } else {
        db.collection("todos")
          .add({
            name: this.toTitleCase(name),
            description,
            targetDate: new Date(targetDate),
            status: "Wacana",
            writtenBy: this.user.email,
            createdAt: new Date(),
            important
          })
          .then(docRef => {
            console.log(
              "New document on collection Todos with id :",
              docRef.id
            );
            this.clear();
          })
          .catch(error => {
            swal.fire(
              "Sorry",
              "We had some problems right now, try again later",
              "error"
            );
            console.log(error);
            this.clear();
          });
      }
    },
    clear() {
      this.name = "";
      this.description = "";
      this.targetDate = this.getTomorrowDate();
      this.important = false;
    },
    toTitleCase(str) {
      let temp = str.split("");
      temp[0] = temp[0].toUpperCase();
      for (let i = 1; i < temp.length; i++) {
        temp[i] = temp[i].toLowerCase();
      }
      str = temp.join("");
      return str;
    }
  }
};
</script>

<style></style>
