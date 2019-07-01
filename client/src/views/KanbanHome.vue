<template>
<div>
    <section style="margin-bottom : 10px">
        <b-field label="Task Title"
            type="is-danger"
            message="what's your plan..">
            <b-input type="email"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Task Deskription"
            type="is-success"
            message="write down you plan description">
            <b-input maxlength="30"></b-input>
        </b-field>
         <a class="button is-primary">Add New</a>
    </section>

    <div class="columns" >
        <div class="column" v-for="kan in kanban" :key="kan">
            <CardOuter v-bind:kan="kan"></CardOuter>
            <!-- <CardInner v-bind:kan="kan"> -->
            <!-- </CardInner> -->
        </div>
    </div>
</div>

</template>

<script>
import CardOuter from '@/components/CardOuter.vue'
import CardInner from '@/components/CardInner.vue'

import db from '@/config/firebase.js'

let dataKanban = [
    {
        title : 'Back-Log',
        task : [
            {
                title : 'test beli nasi padang',
                description : 'ini buat beli nasi padang buat makan hariini',
                when : 'today'
            }
        ]
    },
    {
        title : 'To-Do', 
        task : []
    },
    {
        title : 'Doing',
        task : []
    },
    {
        title : 'Done',
        task : [{
             title : 'test beli nasi padang',
            description : 'ini buat beli nasi padang buat makan hariini',
            when : 'today'
        }]
    }
]

// var connectFb = db.collection('kanban')
// connectFb.on('value', function (snapshot) {
//   dataKanban[0].task = []
//   dataKanban[1].task = []
//   dataKanban[2].task = []
//   dataKanban[3].task = []
//   snapshot.forEach(function (childSnapshot) {
//     if (childSnapshot.val().status === 'Pre-Log') {
//       const obj = childSnapshot.val()
//       obj.id = childSnapshot.key
//       dataKanban[0].task.push(obj)
//     } else if (childSnapshot.val().status === 'To-Do') {
//       const obj = childSnapshot.val()
//       obj.id = childSnapshot.key
//       dataKanban[1].task.push(obj)
//     } else if (childSnapshot.val().status === 'On-Going') {
//       const obj = childSnapshot.val()
//       obj.id = childSnapshot.key
//       dataKanban[2].task.push(obj)
//     } else {
//       const obj = childSnapshot.val()
//       obj.id = childSnapshot.key
//       dataKanban[3].task.push(obj)
//     }
//   })
// })

export default {
    methods : {
    readdata() {
        let temp = []
      db.collection("kanban")
        .orderBy("title", "asc")
        .onSnapshot(querySnapshot => {
        querySnapshot.forEach(el => {
            console.log(el.data(), '============')
            temp.push(el.data())
            // this.kanban.push(el.data())
        });
        this.kanban = temp
        });
    }
    },
    components: {
        CardOuter,
        CardInner
    },
    data(){
        return{
            kanban : '',
            task : ''
        }
    },
    created(){
        this.readdata()
    }
}
</script>

<style>

</style>
