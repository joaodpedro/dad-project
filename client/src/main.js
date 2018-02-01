// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import Datatable from 'vue2-datatable-component'

Vue.config.productionTip = false

Vue.use(Datatable)
Vue.use(VueSocketio, 'http://188.166.89.174');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    loggedUser:null
  },
  components: { App },
  template: '<App/>'
})