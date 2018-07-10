<template>
  <div>
    <app-header></app-header>
    <p></p>
    <div class="container">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Schedule Details</h2>
            </div>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Course</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(schoolSchedule, index) in schoolSchedules" :key="schoolSchedule.id">
            <td>{{schoolSchedule.id}}</td>
            <td>{{schoolSchedule.title}}</td>
            <td>{{schoolSchedule.start}}</td>
            <td>{{schoolSchedule.end}}</td>
            <td>
              <router-link class="btn btn-warning btn-xs" :to="{name: 'EditSchoolSchedule', params: {id: schoolSchedule.id}}">Edit</router-link>
              <!--<button class="btn btn-danger btn-xs" @click="deleteSchoolschedule(schoolSchedule.id)">Delete</button>-->
              <button class="btn btn-success btn-xs" @click="enrollToSchoolschedule(schoolSchedule)">Enroll</button>
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
        username: this.$store.getters.user.username,
        title: this.title,
        start: this.start,
        end: this.end,
        rooms: this.rooms,
        users: this.users,
        teachers: this.teachers,
      }
    },
    components: {
      appHeader: Header
    },
    methods: {
      deleteSchoolschedule(id) {
        const token = localStorage.getItem("TOKEN_KEY");
        axios.delete('',
          { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e)
          })
      },
      enrollToSchoolschedule(schoolSchedule) {
        const token = localStorage.getItem("TOKEN_KEY");

        axios.put('/schoolschedule/enroll/'+this.username,
          schoolSchedule,
          { headers: { Authorization: `Bearer ${token}` } })
          .then(res => {
            console.log(res);
            alert("enrolled to the class");
          })
          .catch(e => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(error.response.data);
              // console.log(error.response.headers);
              if(error.response === 409) {
                alert("Date is already taken!")
              }
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          })
      },
    },
    created() {
      const token = localStorage.getItem("TOKEN_KEY");
      axios.get('/schoolschedule',
        { headers: { Authorization: `Bearer ${token}` } }).then(res => {
        this.schoolSchedules = res.data
      }).catch(res => {
        console.log(res.data)
      })
    },
  }

</script>

<style scoped>
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
