import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Testme from '@/components/Testme'
import Par from '@/components/Par'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/testme',
      name: 'Testme',
      component: Testme
    },
    {
      path: '/par/:num',
      name: 'Par',
      component: Par
    }
  ]
})
