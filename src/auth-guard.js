import store from './store'

export default function(to, from, next) {
  if (store.state.token) {
    next()
  } else {
    next('/login?loginError=true')
  }
}