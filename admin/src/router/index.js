import Vue from 'vue'
import Router from 'vue-router'
import auth from '@/auth'
import Users from '@/components/Users'
import DecksManager from '@/components/DecksManager'
import Login from '@/components/Login'
import Reset from '@/components/Reset'
import Statistics from '@/components/Statistics'
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
            component: Login
        },
        {
            path: '/statistics',
            name: 'statistics',
            component: Statistics,
            beforeEnter: requireAuth
        },
        {
            path: '/users',
            name: 'users',
            component: Users,
            beforeEnter: requireAuth
        },
        {
            path: '/users/:id',
            component: UserProfile,
            beforeEnter: requireAuth
        },
        {
            path: '/decks',
            name: 'decks',
            component: DecksManager,
            beforeEnter: requireAuth
        },
        {
            path: '/decks/:id',
            component: Deck,
            beforeEnter: requireAuth
        },
        {
            path: '/configs',
            name: 'configs',
            component: PlatformConfigs,
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
        next('/')
    } else {
        next()
    }
}