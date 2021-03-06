import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import routes from './router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: null,
    userProps: null,
    userRoles: null
  },
  mutations: {
    authUser (state, userData) {
      state.token = userData.token
    },
    userInfo (state, userProps) {
      state.userProps = userProps
      state.userRoles = userProps.authorities
    },
    clearAuthData (state) {
      state.token = null
    }
  },
  actions: {
    signup ({
      commit
    }, authData) {
      axios.post('/signup', {
        username: authData.username,
        firstname: authData.firstname,
        lastname: authData.lastname,
        email: authData.email,
        password: authData.password,
        enabled: authData.enabled,
        lastPasswordResetDate: authData.lastPasswordResetDate,
        authorities: authData.authorities
      })
        .then((res) => {
          routes.push('/signin');
          console.log(res)
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            if(error.response.status === 409) {
              alert("Username is already taken!")
            }
            // console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        })
    },
    login ({
      commit
    }, authData) {
      axios.post('/auth', {
        username: authData.username,
        password: authData.password
      })
        .then((res) => {
          console.log(res)
          localStorage.setItem('TOKEN_KEY', res.data.token)
          commit('authUser', {
            token: res.data.token
          })
          routes.replace('/')
        })
        .catch(error => {
          // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
              if(error.response.status === 401) {
                alert("Oops credentials didn't match!")
              }
            // console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        })
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('TOKEN_KEY')
      const username = localStorage.getItem('USERNAME')
      const authorities = localStorage.getItem('USERROLES')
      if (!token) {
        return
      }
      commit('authUser', {
        token: token,
        username: username,
        userRoles: authorities
      })
      routes.replace('/')
    },
    fetchUser ({commit, state}) {
      if (!state.token) {
        return
      }
      axios.get('/user', {headers: { Authorization: `Bearer ${state.token}` }})
        .then(res => {
          console.log(res.data)
          localStorage.setItem('USERNAME', res.data.username)
          localStorage.setItem('USERROLES', res.data.authorities)
          commit('userInfo', {
            userProps: res.data,
            username: res.data.username,
            userRoles: res.data.authorities
          })
        })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('TOKEN_KEY')
      localStorage.removeItem('USERNAME')
      localStorage.removeItem('USERROLES')
      routes.replace('/signin')
    }
  },
  getters: {
    user (state) {
      return state.userProps
    },
    isAuthenticated (state) {
      return state.token !== null
    },
    userRole (state) {
      return state.userProps.userProps.authorities.some(role => role.authority === 'ROLE_ADMIN');
    },
    userReceptionist (state) {
      return state.userProps.userProps.authorities.some(role => role.authority === 'ROLE_RECEPTIONIST');
    }
  }
})
