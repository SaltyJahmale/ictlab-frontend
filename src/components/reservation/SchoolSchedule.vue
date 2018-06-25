<template>
  <div id="signup">
    <app-header></app-header>
    <div class="signup-form">
      <form @submit.prevent="onSubmit">

        <div class="input">
          <label for="Title">Cursus</label>
          <input
            type="text"
            id="Title"
            v-model="title">
        </div>

        <div class="input">
          <label for="startDate">Start Datetime</label>
          <input
            type="datetime-local"
            placeholder="YYYY-MM-DD HH:mm"
            id="startDate"
            v-model="start">
        </div>

        <div class="input">
          <label for="endDate">End Datetime</label>
          <input
            type="datetime-local"
            placeholder="YYYY-MM-DD HH:mm"
            id="endDate"
            v-model="end">
        </div>

        <div class="input">
          <label for="room">Room</label>
          <select  id="room" v-model="rooms" >
            <option  disabled value=''>Please select one</option>
            <option v-for="(room, index) in roomsInDb" v-bind:value="room">{{room.floorNumber }} {{room.roomNumber}}</option>
          </select>
        </div>

        <div class="input">
          <label for="group">Group</label>
          <select  id="group" v-model="groups" >
            <option  disabled value=''>Please select one</option>
            <option v-for="(group, index) in groupsInDb" v-bind:value="group">{{group.groupName}}</option>
          </select>
        </div>
        {{groups.groupName}}
        <div class="input">
          <label for="teacher">Teachers</label>
          <input
            type="text"
            id="teacher"
            v-model="teacher">
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
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
    name: "SchoolSchedule",
    components: {
      appHeader: Header
    },
    data () {
      return {
        title: "",
        teacher: [],
        start: moment().format("YYYY-MM-DD HH:mm"),
        end: moment().format("YYYY-MM-DD HH:mm"),
        room: "",
        rooms: [],
        roomsInDb: [],
        group: "",
        groups: [{"id": "1", "groupName": "INF1A"}],
        groupa: [{"id": "1", "groupName": "INF1A"}],
        groupsInDb: []
      }
    },
    methods: {
      onSubmit() {
        const token = localStorage.getItem("TOKEN_KEY");
        console.log(this.rooms);
        console.log(this.teacher);
        axios.post('/schoolschedule',
          {
            "title": this.title+' '+this.groups.groupName+' '+this.rooms.floorNumber+this.rooms.roomNumber+' '+this.teacher,
            "start": this.replaceSpace(this.start),
            "end": this.replaceSpace(this.end),
            "rooms": [this.rooms],
            "groups": this.groupa,
            "teacher":  [this.teacher],
          },
          { headers: { Authorization: `Bearer ${token}` } })
      },
      replaceSpace(date) {
        return date.replace(' ', 'T')
      }
    },
    created() {
      const token = localStorage.getItem("TOKEN_KEY");
      axios.get('/rooms',
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          this.roomsInDb = res.data
        }).catch(e => {
        console.log(e)
      });

      axios.get('/groups',
        { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
          console.log(res.data)
          this.groupsInDb = res.data._embedded.groups
        })
        .catch(e => {
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
