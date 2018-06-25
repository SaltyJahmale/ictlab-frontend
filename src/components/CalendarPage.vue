<template>
  <div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import 'fullcalendar';
  import moment from 'moment';
  import axios from 'axios';

  export default {
    data() {
      return {
        cal: null,
        token: localStorage.getItem('TOKEN_KEY'),
        apicall: `localhost:8080/simple, `,
        event: []
      }
    },
    methods: {},
    created: function () {

    },
    mounted() {
      const self = this;
      this.cal = $(self.$el);
      const token = localStorage.getItem('TOKEN_KEY');



      const args = {
        header: {
          left: "prev,next today",
          center: 'addEventButton',
          right: "month,agendaWeek"
        },
        height: "auto",
        weekends: false,
        minTime: "08:30",
        timeFormat: "H(:mm)",
        axisFormat: "HH:mm",
        maxTime: "18:00",
        allDaySlot: false,
        slotEventOverlap: false,
        locale: "nl",
        lang: "nl",
        events: this.events,
        eventSources: [
        ],
        refetchResourcesOnNavigate: true,
        dayClick(date, event, element) {
          console.log(date, event, element);
          // console.log(date.format());
          // alert('Clicked on: ' + date.format());
          const dateString = prompt('Enter a date in YYYY-MM-DD format');
          const newDate = moment(dateString);

          if (newDate.isValid()) {
            $('#calendar').fullCalendar('renderEvent', {
              title: 'dynamic event',
              start: newDate
            });

            alert('Great. Now, update your database...');
          } else {
            alert('Invalid date.');
          }
        },
      };

      this.cal.fullCalendar(args);

      $.ajax({
        url: 'http://localhost:8000/reservations/',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
        success: function(data){
          $.each(data, function(index, event) {
            this.cal.fullCalendar('renderEvent', event);
          })
        },
        error: function () {
          alert('there was an error while fetching !');
        },
        color: 'yellow',   // a non-ajax option
        textColor: 'black' // a non-ajax option
      }).done(function (data) {
        console.log("hgellloasdoasodas")
        for (let i = 0; i < data.length; i++) {
          console.log(data[i])
        }
      })
    }
  };
</script>

<style>
  @import "../assets/css/fullcalendar.min.css";
</style>
