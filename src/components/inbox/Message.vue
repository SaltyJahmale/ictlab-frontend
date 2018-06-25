<template>
  <div id="signup">
    <app-header></app-header>
    <div class="signup-form">
      <form @submit.prevent="onSubmit">

        <div class="input">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username">
        </div>

        <div class="input">
          <label for="title">State</label>
          <select id="title" v-model="state">
            <option disabled value=''>Please select one</option>
            <option v-bind:value="dropdownNews">News</option>
            <option v-bind:value="dropdownCancel">Cancelled</option>
            <option v-bind:value="dropdownRemoved">Removed</option>
            <option v-bind:value="dropdownChanged">Changed</option>
          </select>
        </div>

        <div class="input">
          <label for="message">Message</label>
          <textarea
            type="datetime-local"
            id="message"
            v-model="msg"></textarea>
        </div>

       <div class="submit">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Header from '../Header.vue'
  import axios from 'axios'
  import moment from 'moment'

  export default {
    name: "Message.vue",
    components: {
      appHeader: Header
    },
    data() {
      return {
        state: "",
        username: "",
        msg: "",
        localDateTime: moment(),
        users: [],
        dropdownNews: "NEWS",
        dropdownCancel: "CANCELLED",
        dropdownRemoved: "REMOVED",
        dropdownChanged: "CHANGED",
      }
    },
    methods: {
      onSubmit() {
        const token = localStorage.getItem('TOKEN_KEY');

        axios.post('/messages/'+this.username,
          {
            "state": this.state,
            "msg": this.msg,
            "localDateTime": this.localDateTime,
            "users": this.users
          },
          { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
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
  .input textarea {
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
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline select {
    width: auto;
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
