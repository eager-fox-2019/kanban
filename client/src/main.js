import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VModal from 'vue-js-modal'
import './assets/bundle.css'

Vue.config.productionTip = true
Vue.use(VModal, { dialog: true })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
