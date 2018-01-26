import Vue from 'vue'
import Router from 'vue-router'
import Testme from '@/components/Testme'
import Login from '@/components/Login'
import auth from '@/utils/auth'
import Statistic from '@/components/Statistics'
import Register from '@/components/Register'
import Multiplayer from '@/components/Multiplayer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'statistic',
      component: Statistic
    },
    {
        path: '/multiplayer',
        name: 'multiplayer',
        component: Multiplayer
    },
    {
      path: '/testme',
      name: 'testme',
      component: Testme,
      beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/logout',
        name: 'logout',
        beforeEnter (to, from, next) {
            auth.logout()
            next('/')
        }
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
