import Vue from 'vue'
import Router from 'vue-router'
import Testme from '@/components/Testme'
import Login from '@/components/Login'
import auth from '@/utils/auth'
import Statistic from '@/components/Statistics'
import Register from '@/components/Register'
import Lobby from '@/components/Lobby'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Statistic',
      component: Statistic
    },
    {
      path: '/testme',
      name: 'Testme',
      component: Testme,
      beforeEnter: requireAuth
    },
    {
      path: '/logout',
      beforeEnter (to, from, next) {
          auth.logout()
          next('/')
      }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
  ,
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby
  }
  ]
})

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
      next({path:'/login', redirect:to.fullPath})
  } else {
      next()
  }
}
