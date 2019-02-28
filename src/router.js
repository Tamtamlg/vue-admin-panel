import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/bill',
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'auth'
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('./views/Bill.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/History.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/history/:id',
      name: 'historyItem',
      component: () => import('./views/HistoryItem.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/planning',
      name: 'planning',
      component: () => import('./views/Planning.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('./views/Records.vue'),
      beforeEnter: AuthGuard
    }
  ]
})
