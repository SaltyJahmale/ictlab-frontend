<template>
  <div>
    <app-header></app-header>
    <p></p>
    <ul class="list-group">
      <li class="list-group-item text-muted">Inbox</li>
      <li v-if="myMessages.length > 0"  v-for="message in myMessages" class="list-group-item text-right">
        <p  class="fa-pull-leftl-left">
          {{message.state}}
        </p>
        <p class="pull-left">
          {{message.msg}}
        </p> {{ convertDate(message.localDateTime)}}
        <p></p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Header from '../Header.vue'
  import axios from 'axios'
  import moment from 'moment'

  export default {
      name: "Notification.vue",
      components: {
        appHeader: Header
      },
      data () {
        return {
          myMessages: [],
          message: "",
          error: []
        }
      },
      created () {
        const token = localStorage.getItem('TOKEN_KEY');
        const username = this.$store.getters.user.username;

        axios.get('messages/'+username,
          { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            this.myMessages = res.data
          }).catch(e => {
            this.myMessages.push(e)
        })
      },
      methods: {
        convertDate(date) {
          return moment(date).format("YYYY-MM-DD")
        }
      },

    }
</script>

<style scoped>
  .list-group {
    width: 400px;
    margin: 30px auto;
    /*border: 1px solid #eee;*/
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
</style>
