import Vue from 'vue'
import App from './App.vue'
import db from './firestore'
import buefy from 'buefy'

Vue.config.productionTip = false
Vue.use(buefy)
Vue.use(db)
new Vue({
  render: h => h(App)
}).$mount('#app')
