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
        <button class="btn btn-danger btn-xs" @click="deleteMessage(message.id)">Delete</button>
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
        },
        deleteMessage(id) {
          const token = localStorage.getItem("TOKEN_KEY");
          const username = this.$store.getters.user.username;

          axios.delete(`messages/${id}/${username}`,
            { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
              console.log(res);
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                if(error.response.status === 404) {
                  alert("No reservation with that id found!")
                }
                // console.log(error.response.headers);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
            })
        }
      },

    }
</script>

<style scoped>
  .list-group {
    width: 500px;
    margin: 30px auto;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
</style>
