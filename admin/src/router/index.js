import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/Users'
import Decks from '@/components/Decks'
import Statistics from '@/components/Statistics'
import PlatformConfigs from '@/components/PlatformConfigs'

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
            path: '/users',
            name: 'users',
            component: Users
        },
        {
            path: '/decks',
            name: 'decks',
            component: Decks
        },
        {
            path: '/configs',
            name: 'configs',
            component: PlatformConfigs
        }
    ]
})
