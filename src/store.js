import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase/firebase'
import { resolve } from 'url';
import { reject } from 'q';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allData : '',
    dataBL : [],
    dataDG : [],
    dataDN : [],
    dataTD : []
  },
  mutations: {
    allData(state, payload){
      
      state.allData = payload
      state.dataBL = []
      state.dataDG = []
      state.dataDN = []
      state.dataTD = []
      
      payload.forEach(el => {
        if(el.status === 'back-log') state.dataBL.push(el)
        else if(el.status === 'to-do') state.dataTD.push(el)
        else if(el.status === 'doing') state.dataDG.push(el)
        else if(el.status === 'done') state.dataDN.push(el)
      })
      // console.log(state.dataBL)

    }

  },
  actions: {
    // getAllData(context, payload){
    //   return new Promise ((resolve, reject) => {
    //     let datas = []
    //     db.collection('kanbans').get()
    //     .then(doc => {
    //       doc.forEach(el => {
    //         let doc = el.data()
    //         datas.push(doc)
    //       })
    //       context.commit('allData', datas)
    //       resolve(true)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //       reject(err)
    //     })
    //   })
    // },
    getAllData(context, payload){
      return new Promise ((resolve, reject) => {
        let datas = []
        db.collection('kanbans').onSnapshot(doc => {
          if(doc){
            // let num = doc.data().length
            // doc.splice(0, num)
            // console.log(num, typeof doc)
            let count = 0
            doc.forEach((el) => {
              datas.push(el.data())
              datas[count].id = el.id
              // console.log(datas[count])
              count++
            })
            context.commit('allData', datas)
            resolve(true)
          } else {
            reject(false)
          }
        })
        
      })
    }
  }
})
