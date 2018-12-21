import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/bill'
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
      path: '/signup',
      name: 'signup',
      meta: {
        layout: 'auth'
      },
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('./views/Bill.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('./views/History.vue')
    },
    {
      path: '/history/:id',
      name: 'historyItem',
      component: () => import('./views/HistoryItem.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      component: () => import('./views/Planning.vue')
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('./views/Records.vue')
    }
  ]
})
