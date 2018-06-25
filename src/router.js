import Home from './components/Home.vue'
import Calendar from './components/Calendar.vue'
import SignIn from './components/auth/Signin.vue'
import SignUp from './components/auth/Signup.vue'
import Sensor from './components/sensor/Sensor.vue'
import User from './components/crud/User.vue'
import EditUser from './components/crud/EditUser'
import Test from './components/calendar/Test.vue'
import Message from './components/inbox/Message.vue'
import Notification from './components/inbox/Notification.vue'
import Reservation from './components/reservation/Reservation.vue'
import SchoolSchedule from './components/reservation/SchoolSchedule.vue'

import Vue from 'vue'
import {store} from './store'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

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
},
{
  path: '/user/edit',
  name: 'EditUser',
  component: EditUser
},
{
  path: '/test',
  component: Test
},
{
  path: '/notification',
  component: Notification
},
{
  path: '/reservation',
  component: Reservation
},
{
  path: '/message',
  component: Message
},
{
  path: '/schedule',
  component: SchoolSchedule
}
]

export default new VueRouter(
  {mode: 'history',
    routes
  })
