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
        events: []
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
        events: function(start, end, timezone, callback) {
          $.ajax({
            url: 'http://localhost:8000/reservations/',
            dataType: 'json',
            headers: { Authorization: `Bearer ${token}` },
            success: function(doc) {
              alert('Another')
              var events = [];
              $(doc).find('event').each(function() {
                events.push({
                  title: $(this).attr('title'),
                  start: $(this).attr('start') // will be parsed
                });
              });
              console.log(events)
              callback(events);
            },
            error: function () {
              alert('there was an error while fetching !');
            },
          });
        },
        eventSources: [
          {
            url: 'http://localhost:8000/reservations/',
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            success: function(d){
              alert('success' );
              console.log(d)
            },
            error: function () {
              alert('there was an error while fetching !');
            },
            color: 'yellow',   // a non-ajax option
            textColor: 'black' // a non-ajax option
          }
        ],
        refetchResourcesOnNavigate: true,
        addEventSource: function(callback, start, end, timezone) {

          somethingAsynchonous(start, end, timezone, function(resourceObjects) {
            axios.get('reservations/',
              { headers: { Authorization: `Bearer ${token}` } } ).then(res => {
                resourceObjects = res.data
              callback(resourceObjects);
            })
              .catch(e => {
                console.log(e);
              });
          });
        },
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
    }
  };
</script>

<style>
  @import "../assets/css/fullcalendar.min.css";
</style>
