import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2, options)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
