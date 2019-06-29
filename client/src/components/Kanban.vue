<template>
  <div class="main-container">
    <h1 :class="{
      'done' : kanbanName === 'Done', 
      'plan' : kanbanName === 'Plan', 
      'routine' : kanbanName === 'Routine', 
      'in-progress' : kanbanName === 'In-Progress'
      }"
    >{{ kanbanName }}</h1>
    <div class="kanban-container">
      <div class="item" v-for="task in tasks" :key="task.id">
        <div class="id-div">
          <p>{{task.title}} </p>
        </div>
        <p>{{task.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firestore'
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
            ...doc.data()
          })
        });
        this.tasks = arrTemp
    });
  }
}
</script>

<style scoped>
  .in-progress {
    background-color: #6D4C41;
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
    font-size: 18px;
  }
  h1 {
    border-radius: 15px;
    padding: 10px 0;
    text-align: center;
    font-size: 20px;
    background-color: #2C3E50;
    color: white;
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
</style>
