<template>
  <div id="signup">
    <app-header></app-header>
    <div class="signup-form">
      <form @submit.prevent="updateSchoolSchedule">

        <div class="input">
          <label for="title">Course</label>
          <input
            type="text"
            id="title"
            v-model="schoolschedule.title" disabled>
        </div>

        <div class="input">
          <label for="startDate">Start Datetime</label>
          <input
            type="datetime-local"
            placeholder="YYYY-MM-DD HH:mm"
            id="startDate"
            v-model="schoolschedule.start">
        </div>

        <div class="input">
          <label for="endDate">End Datetime</label>
          <input
            type="datetime-local"
            placeholder="YYYY-MM-DD HH:mm"
            id="endDate"
            v-model="schoolschedule.end">
        </div>

        <div class="input">
          <label for="room">Room</label>
          <select  id="room" v-model="pickedRoom" >
            <option  disabled value=''>Please select one</option>
            <option v-for="(room, index) in roomsInDb" v-bind:value="room">{{room.floorNumber }} {{room.roomNumber}}</option>
          </select>
        </div>

        <div class="submit">
          <button type="submit" @click="updateSchoolSchedule" class="btn btn-primary">Submit</button>
          <router-link class="btn btn-default" :to="'/schedules'">Cancel</router-link>
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
    name: "EditSchoolSchedule",
    data() {
      return {
        schoolschedule: {
          id: '',
          title: '',
          start: moment().format("YYYY-MM-DD HH:mm"),
          end: moment().format("YYYY-MM-DD HH:mm"),
          rooms:[],
          users: [],
          teachers: []
        },
        pickedRoom: [],
        roomsInDb: []
      }
    },
    filters: {
      changeDateFormat(date) {
        return moment(date).format("YYYY-MM-DD HH:mm")
      }
    },
    components: {
      appHeader: Header
    },
    methods: {
      updateSchoolSchedule() {
        const token = localStorage.getItem("TOKEN_KEY");

        axios.put('/schoolschedule/edit',
          {
            id: this.schoolschedule.id,
            title: this.schoolschedule.title,
            start: this.schoolschedule.start,
            end: this.schoolschedule.end,
            rooms:[this.pickedRoom],
            users: this.schoolschedule.users,
            teachers: this.schoolschedule.teachers
          },
          {headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
            console.log(res);
            alert("Successfully edited schedule!\nUsers are notified")
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              // console.log(error.response.data);
              if(error.response.status === 409) {
                alert("Date is already taken!")
              }
              // if(error.response.status === 400) {
                // alert("Bad date format")
              // }
              // console.log(error.response.headers);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          })
      }
    },
    created() {
      this.id = this.$route.params.id;
      const token = localStorage.getItem("TOKEN_KEY");

      axios.get('/schoolschedule/'+this.id,
        {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          this.schoolschedule = res.data;

          console.log(res.data);
        })
        .catch(e => {
          console.log(e.data);
        });

      axios.get('/rooms',
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          this.roomsInDb = res.data
        }).catch(e => {
        console.log(e)
      });
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

  .input.inline input {
    width: auto;
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
