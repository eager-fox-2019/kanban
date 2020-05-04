<template>
<div>
    <section style="margin-bottom : 10px">
        <b-field label="Task Title"
            type="is-danger"
            message="what's your plan..">
            <b-input type="email"
                maxlength="30" v-model="form.task[0].title">
            </b-input>
        </b-field>

        <b-field label="Task Deskription"
            type="is-success"
            message="write down you plan description">
            <b-input maxlength="30" v-model="form.task[0].description"></b-input>
        </b-field>
         <a @click="addNewKanban" class="button is-primary">Add New</a>
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
        status : 'Back-Log',
        task : []
    },
    {
        status : 'To-Do', 
        task : []
    },
    {
        status : 'Doing',
        task : []
    },
    {
        status : 'Done',
        task : []
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
        // console.log('masuk?')
      db.collection("kanban")
        .onSnapshot(querySnapshot => {
        let temp = [
                {
                    status : 'Back-Log',
                    task : []
                },
                {
                    status : 'To-Do', 
                    task : []
                },
                {
                    status : 'Doing',
                    task : []
                },
                {
                    status : 'Done',
                    task : []
                }
        ]
        let counter = 0
        querySnapshot.forEach((el) => {
            
            // el.data().task[0].id = el.id
            if(el.data().status == 'Back-Log'){
                temp[0].task.push(el.data().task)
            }else if(el.data().status == 'To-Do'){
                temp[1].task.push(el.data().task)
            }else if(el.data().status == 'Doing'){
                temp[2].task.push(el.data().task)
            }else if(el.data().status == 'Done'){
                temp[3].task.push(el.data().task)
            }
            // this.kanban.push(el.data())
            console.log(temp, '============')
            console.log('sampai sini')
            console.log(el.id, '@@@@@@@')
            counter++
        });
        this.kanban = temp
        });
    },
    addNewKanban(){
        db.collection('kanban').add(this.form)
        this.$router.push('/')
    }
    },
    components: {
        CardOuter,
        CardInner
    },
    data(){
        return{
            kanban : '',
            task : '',
            form : {
                status : 'Back-Log',
                task : [{
                    title : '', 
                    description : ''
                }]
                
            }
        }
    },
    created(){
        this.readdata()
    }
}
</script>

<style>

</style>
