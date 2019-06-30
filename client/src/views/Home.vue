<template>
  <div id="home">
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Category
          v-for="(category,categoryname,index) in categories"
          :category="categoryname"
          :bg="category.bg"
          :tasks="category.tasks"
          :key="index"
          @changeSort="changeSort"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase/db.js';
import Category from '@/components/Category.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Category,
    Navbar,
  },
  data() {
    return {

      categories: {
        'Back-Log': {
          sortBy:'title',
          bg: 'bg-danger',
          tasks: [],
        },
        'To-Do': {
          sortBy:'title',
          bg: 'bg-warning',
          tasks: [],
        },
        Doing: {
          sortBy:'title',
          bg: 'bg-primary',
          tasks: [],
        },
        Done: {
          sortBy:'title',
          bg: 'bg-success',
          tasks: [],
        },
      },
    };
  },
  methods: {
    changeSort(category, sortBy){
      this.categories[category].sortBy = sortBy
      db.collection(category).orderBy(sortBy).get()
    .then((snapshot)=> {
          const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
          });
        }
        this.categories[category].tasks = temp;
    })
    .catch((error)=> {
        console.log("Error getting documents: ", error);
    });

    }
  },
  mounted() {
    db.collection('Back-Log').orderBy(this.categories['Back-Log'].sortBy).onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
          });
        }
        this.categories['Back-Log'].tasks = temp;
        console.log(this.categories['Back-Log']);
      },
      (error) => {
        // ...
      },
    );
    db.collection('To-Do').orderBy(this.categories['To-Do'].sortBy).onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
          });
        }
        this.categories['To-Do'].tasks = temp;
      },
      (error) => {
        // ...
      },
    );
    db.collection('Doing').orderBy(this.categories['Doing'].sortBy).onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
          });
        }
        this.categories.Doing.tasks = temp;
      },
      (error) => {
        // ...
      },
    );
    db.collection('Done').orderBy(this.categories['Done'].sortBy).onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
          });
        }
        this.categories.Done.tasks = temp;
      },
      (error) => {
        // ...
      },
    );
  },
};
</script>
