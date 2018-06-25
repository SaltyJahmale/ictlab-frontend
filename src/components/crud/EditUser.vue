<template>
  <div class="row">
    <div class="column">
      <h2>Edit User</h2>
      <form @submit.prevent="updateUser">
        <div class="input">
          <label for="edit_firstname">Firstname</label>
          <input
            type="text"
            id="edit_firstname"
            value="user.firstname"
            v-model="firstname">
        </div>

        <div class="input">
          <label for="edit_username">Username</label>
          <input
            type="text"
            id="edit_username"
            value="user.username"
            v-model="username">

        </div>

        <div class="input">
          <label for="edit_lastname">Lastname</label>
          <input
            type="text"
            id="edit_lastname"
            v-model="lastname">
        </div>

        <div class="input">
          <label for="edit_email">Email</label>
          <input
            type="email"
            id="edit_email"
            v-model="email">
        </div>

        <div class="block">
        <label for='edit_enabled'>Enabled:</label>
        <input
          type='checkbox'
          class="form-check-input"
          id='edit_enabled'
          v-model='enabled'>
        </div><br>

        <div class="block">
          <label for="edit_role_user">User Role</label>
          <input
            type="checkbox"
            id="edit_role_user"
            v-bind:value="roleUser"
            v-model="authorities">
        </div>

        <div class="block">
          <label for="edit_role_admin">Admin Role</label>
          <input
            type="checkbox"
            id="edit_role_admin"
            v-bind:value="roleAdmin"
            v-model="authorities">
        </div>

        <div class="block">
          <label for="edit_role_receptionist">Receptionist Role</label>
          <input
            type="checkbox"
            id="edit_role_receptionist"
            v-bind:value="roleReceptionist"
            v-model="authorities">
        </div>

        <div class="block">
          <label for="edit_role_student">Student Role</label>
          <input
            type="checkbox"
            id="edit_role_student"
            v-bind:value="roleStudent"
            v-model="authorities">
        </div>
        <button type="submit" @click="updateUser" class="btn btn-primary">Save</button>
        <router-link class="btn btn-default" :to="'/user'">Cancel</router-link>
      </form>
    </div>

    <div class="column">
      <h2>Old Data</h2>
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            value="user.firstname"
            v-model="user.firstname"  disabled>

        </div>

        <div class="input">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            value="user.username"
            v-model="user.username"  disabled>

        </div>
        <div class="input">
          <label for="lastname">Lastname</label>
          <input
            type="text"
            id="lastname"
            v-model="user.lastname"  disabled>
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="user.email"  disabled>
        </div>
        <label for='enabled'>Enabled:</label>
        <input
          type='checkbox'
          class="form-check-input"
          id='enabled'
          v-model='user.enabled'  disabled><br>

        <div v-for="role in user.authorities" class="input">
          <label for="role">Role</label>
          <input
            type="text"
            id="role"
            v-model="role.name"  disabled>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: function () {
      return {
        id: "",
        user: {},
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        enabled: "",
        authorities: [],
        roleUser: {"id": 1, "name": "ROLE_USER"},
        roleAdmin: {"id": 2, "name": "ROLE_ADMIN"},
        roleReceptionist: {"id": 3, "name": "ROLE_RECEPTIONIST"},
        roleStudent: {"id": 4, "name": "ROLE_STUDENT"},
      };
    },
    methods: {
      updateUser() {
        this.id = this.$route.params.username;
        const token = localStorage.getItem("TOKEN_KEY");

        const formData = {
          id: this.user.id,
          username: this.username,
          firstname: this.firstname,
          password: "",
          lastname: this.lastname,
          email: this.email,
          enabled: this.enabled,
          lastPasswordResetDate: "",
          authorities: this.authorities,
          messages: [],
          reservations: [],
        };
        console.log(formData)
        axios.put('/users/' + this.id, {
          id: this.user.id,
          username: this.username,
          firstname: this.firstname,
          password: "",
          lastname: this.lastname,
          email: this.email,
          enabled: this.enabled,
          lastPasswordResetDate: "",
          authorities: this.authorities,
          messages: [],
          reservations: [],
        },{headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
            console.log(res);
            this.$router.push('/user')
          })
          .catch(e => {
            console.log(e);
            this.$router.push('/user')
          })
      }
    },
    created() {
      this.id = this.$route.params.username;
      const token = localStorage.getItem("TOKEN_KEY");

      axios.get('/users/' + this.id, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          console.log(res.data);
          this.user = res.data
        })
        .catch(e => {
          console.log(e.data);
        })
    }
  }
</script>

<style>
  .block label {
    display: inline-block;
    width: 130px;
    text-align: left;
  }

  * {
    box-sizing: border-box;
  }

  .row {
    display: flex;
  }

  /* Create two equal columns that sits next to each other */
  .column {
    flex: 50%;
    padding: 10px;
    height: 300px; /* Should be removed. Only for demonstration */
  }

  .ad-left {
    float: left;
  }

  .ad-right {
    float: right;
    margin-left: 10px;
  }

  .entire-thing {
    width: 650px;
  }

  .signup-form {
    width: 400px;
    margin: 30px auto;
    /* border: 1px solid #eee; */
    /* padding: 20px; */
    /* box-shadow: 0 2px 3px #ccc; */
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>
