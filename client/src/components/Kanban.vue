<template>
  <div class="main-container">
    <h1 :class="{
      'done' : kanbanName === 'Done', 
      'plan' : kanbanName === 'Plan', 
      'routine' : kanbanName === 'Routine', 
      'in-progress' : kanbanName === 'In-Progress'
      }"
    >{{ kanbanName }}</h1>
    <draggable class="kanban-container" v-model="tasks" group="people" @start="drag=true" @end="drag=false" @change="updateList">
      <div class="item" v-for="task in tasks" :key="task.id">
        <div class="id-div">
          <p>{{task.title}} </p>
        </div>
        <p>{{task.content}}</p>
        <p class="delete-item" @click="deleteTask(task.id)">Delete</p>
      </div>
    </draggable>
  </div>
</template>

<script>
import db from '../../config/firestore'
import draggable from 'vuedraggable'
export default {
  name: 'kanban-template',
  props: ['kanbanName'],
  data() {
    return {
      type: '',
      tasks: []
    }
  },
  mounted() {
    this.type = this.kanbanName.toLowerCase()

    db.collection(this.type)
      .onSnapshot((querySnapshot) => {
        let arrTemp = []
        querySnapshot.forEach(doc => {
          arrTemp.push({
            id: doc.id,
            type: this.type,
            ...doc.data()
          })
        });
        this.tasks = arrTemp
    });

  },
  methods: {
    updateList: function (event) {
      if (event.added) {
        let currentCard = event.added.element
        db.collection(this.type).doc(currentCard.id).set(currentCard)
          .then(() => {
            currentCard.type = this.type
            console.log('sukses update')
          })
          .catch(error => {
            console.error('Error removing Card:', error)
          })

        db.collection(currentCard.type).doc(currentCard.id).delete()
        .then(() => {
          console.log('sukses delete')
        })
        .catch(err => {
          console.error('error removing card', err)
        })
      }
    },
    deleteTask (id) {
      db.collection(this.type).doc(id).delete()
      .then(() => {
        console.log('sukses delete');
      })
    }
  },
  components: {
    draggable
  }
}
</script>

<style scoped>

  .in-progress {
    background-color: #FF1744;
  }
  .routine {
    background-color: #F9A825;
  }
  .done {
    background-color: #66BB6A;
  }
  .plan {
    background-color: rgb(6, 6, 165);
  } 
  p {
    margin: 0;
    margin-left: 20px;
    font-size: 16px;
  }
  h1 {
    border-radius: 15px;
    padding: 10px 0;
    text-align: center;
    font-size: 20px;
    background-color: #2C3E50;
    color: white;
    margin-top: 0;
  }
  .main-container {
    margin-top: 30px;
    padding: 30px;
    height: 100%;
    /* border-right: 2px solid rgba(0, 0, 0, 0.507);
    border-left: 2px solid rgba(0, 0, 0, 0.507); */
    border: 2px solid rgba(0, 0, 0, 0.507);
  }
  .kanban-container {
    display: flex;
    flex-direction: column;
    /* border: 2px solid black; */
    width: 230px;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 2px solid black;
    margin-top: 30px;
    padding: 14px;
    border-radius: 15px;
  }

  li {
    list-style-type: none;  
  }

  .id-div {
    background-color: #2C3E50;
    width: 100%;
    color: white;
    margin-bottom: 6px;
    padding: 10px 0;
    /* height: 25px; */
    border-radius: 10px;
  }

  .item:hover{
    cursor: pointer;		
  }

  .delete-item {
    color: white;
    font-weight: bold;
    margin: 0 auto;
    margin-top: 30px;
    background-color: rgba(255, 0, 0, 0.603);
    padding: 5px 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }


</style>
