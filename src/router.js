import Home from './components/Home.vue'
import Calendar from './components/Calendar.vue'
import SignIn from './components/auth/Signin.vue'
import SignUp from './components/auth/Signup.vue'
import Sensor from './components/sensor/Sensor.vue'
import User from './components/crud/User.vue'

import Vue from 'vue'
import {store} from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home,
  beforeEnter (to, from, next) {
    if (store.state.token) {
      next()
    } else {
      next('/signin')
    }
  }
},
{
  path: '/calendar',
  component: Calendar,
  beforeEnter (to, from, next) {
    if (store.state.token) {
      next()
    } else {
      next('/signin')
    }
  }
},
{
  path: '/signin',
  component: SignIn
},
{
  path: '/signup',
  component: SignUp
},
{
  path: '/sensor',
  component: Sensor
},
{
  path: '/user',
  component: User
}
]

export default new VueRouter(
  {mode: 'history',
    routes
  })
