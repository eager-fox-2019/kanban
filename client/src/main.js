import Vue from 'vue'
import App from './App.vue'
import db from '../config/firestore'
import 'vue-material/dist/vue-material.min.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import animateCss from 'animate.css'
import vuedraggable from 'vuedraggable'

Vue.use(Vuetify)
Vue.use(animateCss)
Vue.use(db)
Vue.use(vuedraggable)
new Vue({
  render: h => h(App)
}).$mount('#app')
