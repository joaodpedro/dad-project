import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import Login from '@/components/Login'
import Statistics from '@/components/Statistics'
import Register from '@/components/Register'
import Multiplayer from '@/components/Multiplayer'
import Reset from '@/components/Reset'
import Top5 from '@/components/Top5'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Statistics
    },
    {
        path: '/statistics',
        name: 'statistics',
        component: Statistics
    },
    {
        path: '/top5',
        name: 'top5',
        component: Top5
    },
    {
        path: '/games',
        name: 'games',
        component: Multiplayer,
        beforeEnter: requireAuth
    },
    {
        path: '/profile',
        name: 'profile',
        component: Statistics,
        beforeEnter: requireAuth
    },
    {
        path: '/forgot',
        name: 'forgot',
        component: Reset
    },
    {
        path: '/reset/:token',
        name: 'reset',
        component: Reset
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
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
