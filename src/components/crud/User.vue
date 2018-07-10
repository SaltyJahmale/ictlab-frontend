<template>
  <div>
    <app-header></app-header>
    <p></p>
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>User Details</h2>
            </div>
            <div class="col-sm-12">
              <div class="search-box">
                <div class="input-group">
                  <input type="text"
                         id="search"
                         v-model="search"
                         class="form-control"
                         placeholder="Search by Username">
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Enabled</th>
            <th>Roles</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in filterUser" :key="user.username">
            <td>{{user.id}}</td>
            <td>{{user.username}}</td>
            <td>{{user.firstname}}</td>
            <td>{{user.lastname}}</td>
            <td>{{user.email}}</td>
            <td>{{user.enabled}}</td>
            <div v-for="role in user.authorities">
              <td>{{role.name }}</td>
            </div>
            <td>
              <router-link class="btn btn-warning btn-xs" :to="{name: 'EditUser', params: {username: user.username}}">Edit</router-link>
              <button class="btn btn-danger btn-xs" @click="deleteUser(user.username)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header.vue'
import axios from 'axios'

export default {
  template: {

  },
  data() {
    return {
        search: '',
        schoolSchedules: [],
        errors: [],
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        enabled: this.enabled,
        lastPasswordResetDate: this.lastPasswordResetDate,
    }
  },
  components: {
    appHeader: Header
  },
  methods: {
    deleteUser(username) {
      const token = localStorage.getItem("TOKEN_KEY");
      axios.delete('/users/'+username,
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          user.pop(username);
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
  created() {
    const token = localStorage.getItem("TOKEN_KEY");
    axios.get('/users',
      { headers: { Authorization: `Bearer ${token}` } }).then(res => {
      console.log(res.data);
      this.users = res.data
    }).catch(res => {
      console.log(res.data)
    })
  },
  computed: {
    filterUser() {
      let self=this;
      return this.schoolSchedules.filter(function (user) {
        return user.username.toLowerCase().indexOf(self.search.toLowerCase())>=0})
    },
  },
}


</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
