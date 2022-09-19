import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import Multiselect from 'vue-multiselect'
import VueMask from 'v-mask'
import VueNoty from 'vuejs-noty'

Vue.use(VueMask);
Vue.use(VueNoty);
Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.component('multiselect', Multiselect)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
