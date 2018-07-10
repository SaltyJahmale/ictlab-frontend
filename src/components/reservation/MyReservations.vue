<template>
  <div>
    <app-header></app-header>
    <p></p>
    <ul class="list-group">
      <li class="list-group-item text-muted">My Reservation</li>
      <li v-if="myReservations.length > 0"  v-for="reservation in myReservations" class="list-group-item text-right">
        <p  class="fa-pull-leftl-left">
          Reservation
        </p>
        <p class="pull-left">
          Van
          {{convertDate(reservation.start)}}
          t/m
          {{convertDate(reservation.end)}}
        </p>
        <p></p>
        <button class="btn btn-danger btn-xs" @click="deleteReservation(reservation.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
    import Header from '../Header.vue'
    import axios from 'axios'
    import moment from 'moment'
    import routes from '../../router'

    export default {
        name: "MyReservations",
        components: {
          appHeader: Header
        },
        data() {
          return {
            myReservations: []
          }
        },
        methods: {
          deleteReservation(id) {
            const username = this.$store.getters.user.username;
            const token = localStorage.getItem("TOKEN_KEY");

            axios.delete(`/reservation/${id}/${username}`,
              { headers: { Authorization: `Bearer ${token}` } })
              .then(res => {
                console.log(res)
              })
              .catch(error => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  // console.log(error.response.data);
                  // console.log(error.response.headers);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log('Error', error.message);
                }
              })
          },
          convertDate(date) {
            return moment(date).format("YYYY-MM-DD HH:mm")
          }
        },
        created() {
          const username = this.$store.getters.user.username;
          const token = localStorage.getItem("TOKEN_KEY");

          axios.get('/reservation/user/'+username,
            { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
              this.myReservations = res.data
            }).catch(e => {
            console.log(e)
          })
        },
    }
</script>

<style scoped>
  .list-group {
    width: 400px;
    margin: 30px auto;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }
</style>
