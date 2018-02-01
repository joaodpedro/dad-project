import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/utils/auth'
import Login from '@/components/Login'
import Statistics from '@/components/Statistics'
import Register from '@/components/Register'
import Multiplayer from '@/components/Multiplayer'
import Reset from '@/components/Reset'
import Top5 from '@/components/Top5'
import Profile from '@/components/Profile'
//----
import Users from '@/components/Users'
import DecksManager from '@/components/DecksManager'
import StatisticsAdmin from '@/components/StatisticsAdmin'
import PlatformConfigs from '@/components/PlatformConfigs'
import UserProfile from '@/components/UserProfile'
import Deck from '@/components/Deck'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
		path: '/',
		name: 'home',
		component: Top5
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
        component: Profile,
        beforeEnter: requireAuth
    },
	{
        path: '/statistics-admin',
        name: 'statistics-admin',
        component: StatisticsAdmin,
		beforeEnter: requireAdmin
    },
	{
		path: '/users',
		name: 'users',
		component: Users,
		beforeEnter: requireAdmin
	},
	{
		path: '/users/:id',
		component: UserProfile,
		beforeEnter: requireAdmin
	},
	{
		path: '/decks',
		name: 'decks',
		component: DecksManager,
		beforeEnter: requireAdmin
	},
	{
		path: '/decks/:id',
		component: Deck,
		beforeEnter: requireAdmin
	},
	{
		path: '/configs',
		name: 'configs',
		component: PlatformConfigs,
		beforeEnter: requireAdmin
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

function requireAdmin (to, from, next) {
  if (!auth.loggedIn() && !auth.getLoggedUser().admin) {
      next({path:'/login', redirect:to.fullPath})
  } else {
      next()
  }
}