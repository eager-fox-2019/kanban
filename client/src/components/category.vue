<template>
  <div>
    <div>
      <b-card :header="status" class="card-kanban">
        <blockquote class="blockwxquote mb-0">
          <div v-if="status == 'back-log'">
            <taskTodo
              v-for="backlog in backlogs"
              :key="backlog.id"
              :datatask="backlog"
              :id="backlog.id"
              :kiri="true"
              :kanan="false"
            />
          </div>
          <div v-if="status == 'todo'">
            <taskTodo v-for="todo in todos" :key="todo.id" :datatask="todo" :id="todo.id" :kiri="false"
              :kanan="false"/>
          </div>
          <div v-if="status == 'doing'">
            <taskTodo v-for="doing in doings" :key="doing.id" :datatask="doing" :id="doing.id" :kiri="false"
              :kanan="false"/>
          </div>
          <div v-if="status == 'done'">
            <taskTodo v-for="done in dones" :key="done.id" :datatask="done" :id="done.id" :kiri="false"
              :kanan="true"/>
          </div>
        </blockquote>
      </b-card>
    </div>
  </div>
</template>

<script>
import taskTodo from "@/components/task.vue";
import db from "../../config/firebase";

export default {
  name: "category",
  props: ["status"],
  components: {
    taskTodo
  },
  data() {
    return {
      backlogs: [],
      todos: [],
      doings: [],
      dones: [],
      tasks: []
    };
  },
  created() {
    db.collection("Task")
      .where("status", "==", "back-log").orderBy("createdAt")
      .onSnapshot(querySnapshot => {
        this.backlogs = [];
        querySnapshot.forEach(doc => {
          this.backlogs.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task")
      .where("status", "==", "todo").orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
         this.todos = []
        querySnapshot.forEach(doc => {
          this.todos.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task")
      .where("status", "==", "doing").orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
         this.doings = []
        querySnapshot.forEach(doc => {
          this.doings.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });

    db.collection("Task")
      .where("status", "==", "done").orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
         this.dones = []
        querySnapshot.forEach(doc => {
          this.dones.push({
            id: doc.id,
            ...doc.data()
          });
        });
      });
  }
};
</script>

<style>
.card-kanban{
  width: 16rem;
  margin: 1rem;
}
</style>
