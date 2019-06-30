<template>
  <section>
    <b-collapse
      class="card"
      aria-id="contentIdForA11y3"
      :open.sync="op"
      style="width: 260px;"
    >
      <div slot="trigger" class="card-header" role="button" aria-controls="contentIdForA11y3">
        <p class="card-header-title">{{datafs.name}}</p>
      </div>
      <div class="card-content">
        <div class="content">{{datafs.desc}}</div>
        <div>
          <small>Created by: {{datafs.createdBy}}</small>
        </div>
      </div>
      <footer class="card-footer">
        <div class="buttons">
          <b-button type="is-warning" v-if="onWhere != 'backlog'"
          @click="prevKanban">{{prev}}</b-button>
          <b-button type="is-danger" @click="deleteKanban">Delete</b-button>
          <b-button type="is-success" v-if="onWhere != 'done'"
          @click="nextKanban">{{nex}}</b-button>
        </div>
      </footer>
    </b-collapse>
  </section>
</template>

<script>
import db from '../config/firebase';

export default {
  props: ['datafs', 'onWhere'],
  data() {
    return {
      toWhere: '',
      prev: '',
      nex: '',
      op: false,
    };
  },
  methods: {
    deleteKanban() {
      db.collection(this.onWhere)
        .doc(this.datafs.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });

      this.op = false;
    },
    nextKanban() {
      const data = {
        name: this.datafs.name,
        desc: this.datafs.desc,
        createdBy: this.datafs.createdBy,
      };

      if (this.onWhere === 'backlog') {
        this.toWhere = 'todo';
      } else if (this.onWhere === 'todo') {
        this.toWhere = 'doing';
      } else if (this.onWhere === 'doing') {
        this.toWhere = 'done';
      } else {
        this.toWhere = '';
      }

      db.collection(this.onWhere)
        .doc(this.datafs.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });

      db.collection(this.toWhere)
        .doc()
        .set(data)
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

      this.op = false;
    },
    prevKanban() {
      const data = {
        name: this.datafs.name,
        desc: this.datafs.desc,
        createdBy: this.datafs.createdBy,
      };

      if (this.onWhere === 'done') {
        this.toWhere = 'doing';
      } else if (this.onWhere === 'doing') {
        this.toWhere = 'todo';
      } else if (this.onWhere === 'todo') {
        this.toWhere = 'backlog';
      } else {
        this.toWhere = '';
      }

      db.collection(this.onWhere)
        .doc(this.datafs.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });

      db.collection(this.toWhere)
        .doc()
        .set(data)
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });

      this.op = false;
    },
  },
  mounted() {
    if (this.onWhere === 'backlog') {
      this.nex = 'Todo';
    } else if (this.onWhere === 'todo') {
      this.prev = 'Back-Log';
      this.nex = 'Doing';
    } else if (this.onWhere === 'doing') {
      this.prev = 'Todo';
      this.nex = 'Done';
    } else {
      this.prev = 'Doing';
    }
  },
};
</script>

<style scoped>
footer {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
