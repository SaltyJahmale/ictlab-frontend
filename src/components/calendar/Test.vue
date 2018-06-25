<template>
  <div>
    <app-header></app-header>
    <p></p>
    <full-calendar :config="config" :event-render="events" :events="events" :eventSources="eventSources"></full-calendar>
    <p></p>
  </div>
</template>

<script>
  import { FullCalendar } from 'vue-full-calendar'
  import axios from 'axios'
  import Header from '../Header.vue'

  export default {
    components: {
      FullCalendar,
      appHeader: Header
    },
    data() {
      return {
        token: '',
        eventSources: [
          {
            events(start, end, timezone, callback) {
              const token = localStorage.getItem("TOKEN_KEY");
              axios.get(`/reservations/?start=${start}&end=${end}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                  callback(res.data._embedded.reservations)
              }).catch(e => {
                console.log(e)
              });
            },
          },
          {
            events(start, end, timezone, callback) {
              const token = localStorage.getItem("TOKEN_KEY");
              axios.get(`/schoolschedule/?start=${start}&end=${end}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => {
                  callback(res.data)
                }).catch(e => {
                console.log(e)
              });
            },
          },
        ],
        config: {
          defaultView: 'month',
          selectable: false,
          weekends: false,
          editable: false,
          height: "auto",
          minTime: "08:30",
          maxTime: "18:30",
          timeFormat: "H(:mm)",
          // axisFormat: "HH:mm",
          allDaySlot: false,
          locale: "nl",
          header: {
            left: "prev,next today",
            center: 'title',
            right: "month,agendaWeek"
          },
        }
      }
    },
    methods: {
      refreshEvents() {
        this.$refs.calendar.$emit('refetch-events')
      }
    },
    created() {
      // this.$refs.calendar.$emit('event-render')
    },
  }
</script>

<style>
  @import "../../assets/css/fullcalendar.min.css";
</style>
