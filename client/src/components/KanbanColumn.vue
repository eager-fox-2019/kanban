<template>
  <div class="kanban-column" v-bind:class="type">
    <h1>{{title}}</h1>
    <draggable v-model="taskList" group="type" @start="drag=true" @end="drag=false" @change="updateList">
      <KanbanCard v-for="card in taskList" :key="card.id" :card="card" :class="type"/>
    </draggable>
  </div>
</template>
<script>
import KanbanCard from '@/components/KanbanCard.vue'
import db from '@/config/firebase.js'
import draggable from 'vuedraggable'

export default {
  name: 'kanban-column',
  props: {
    type: String
  },
  components: {
    KanbanCard,
    draggable
  },
  data: () => {
    return {
      taskList: [],
      curCard: ""
    }
  },
  methods: {
  	updateList: function (item) {
  		if (item.added){
  			//update element to the correct status
  			let currentCard = item.added.element
  			currentCard.status = this.type
  			db.collection('kanbanList').doc(currentCard.id).set(currentCard)
  			.then( () => {
  				console.log("moved a card")
  			})
  		}
  	}
  },
  computed: {
  	title: function() {
  		let header = {
  			backlog: "Backlog",
  			todo: "To-Do",
  			inprogress: "In-Progress",
  			completed: "Completed"
  		}
  		return header[this.type]
  	}
  },
  created () {
    db.collection('kanbanList').onSnapshot(querySnapshot => {
      let kanbanArray = []
      querySnapshot.forEach(doc => {
        if (doc.data().status === this.type) {
          kanbanArray.push({
            id: doc.id,
            ...doc.data()
          })
        }
      })
      this.taskList = kanbanArray
    })
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #2c3e50;
}

h1 {
  font-size: 1.3em;
  color: black;
  padding: 0.5em;
  margin: 0.1em;
  border: solid white 0.1em;
  border-radius: 1em;
}

.backlog h1 {
  background-color: #FF0000;
}

.todo h1 {
  background-color: #FF6600;
}

.inprogress h1 {
  background-color: #FFCC00;
}

.completed h1 {
  background-color: #336699;
}

</style>
