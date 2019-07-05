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
    dataTD : [],
    isLoadFetchData: false
  },
  mutations: {
    allData(state, payload){
      console.log(payload, payload.length, 'hasil fetch dataaaa')
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
      state.isLoadFetchData = true
      // console.log(state.dataBL)

    }

  },
  actions: {
    getAllData(context, payload){
      db.collection('kanbans').onSnapshot(doc => {
        let datas = []
        // console.log(doc)
        let count = 0
        doc.forEach((el) => {
          datas.push(el.data())
          console.log(datas)
          datas[count].id = el.id
          count++
        })
        context.commit('allData', datas)
      })
    }
  }
})
