<template>
  <div class="col">
    <div class="card">
      <div :class="['card-header', bg,'text-white', 'text-center']" style="font-family: 'Sniglet', cursive;font-size: 40px;">{{ category }}</div>
        <select v-model="sortBy" class="custom-select mt-3" style="width: 200px;margin:auto;">
  <option value="" disabled>Sort By</option>
  <option value="title">Title</option>
  <option value="assignee">Assignee</option>
  <option value="due">Due Date</option>
</select>
<hr>
      <div class="card-body category scrollbar scrollbar-young-passion">
        <draggable
        v-model="taskss"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        @change="changeCategory"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <Task v-for="(task,index) in taskss" :cat="category" :task="task" :key="index"/>
    </transition-group>
</draggable>
      </div>
      <!-- <div class="card-body category scrollbar scrollbar-young-passion">
        <Task v-for="task in tasks" :cat="category" :task="task" :key="task.title"/>
      </div> -->
      
    </div>
  </div>
</template>

<script>
import db from '@/firebase/db.js';
import Task from '@/components/Task.vue';
import draggable from 'vuedraggable'

export default {
  props: ['bg', 'category', 'tasks'],
    data() {
      return {
        taskss: [],
        drag: false,
        sortBy: ''
      };
    },
  components: {
    Task,
    draggable
  },
  watch:{
    tasks(){
      this.taskss = this.tasks
    },
    sortBy(){
      this.$emit('changeSort',this.category,this.sortBy)
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  mounted(){
    // getTasks() {
    //   db.collection("Back-Log").onSnapshot(function(doc) {
    //     this.backlog = doc.data();
    //   });
    //   db.collection("To-Do").onSnapshot(function(doc) {
    //     this.todo = doc.data();
    //   });
    //   db.collection("Doing").onSnapshot(function(doc) {
    //     this.doing = doc.data();
    //   });
    //   db.collection("Done").onSnapshot(function(doc) {
    //     this.done = doc.data();
    //   });
    // }
  },
  methods:{
    changeCategory(event) {
      console.log(event);
      if(event.moved){
        
        }
      else if(event.added){
        db.collection(this.category)
        .doc(event.added.element.id)
        .set({
          title: event.added.element.title,
          assignee: event.added.element.assignee,
          description: event.added.element.description,
          due: event.added.element.due,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

      }
      else if(event.removed){
        db.collection(this.category)
        .doc(event.removed.element.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
      }
    },
  }
};
</script>

<style>
.category {
position: relative;
overflow-y: scroll;
height: 70vh; }
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
