<template>
    <div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'fullcalendar';

export default {
    data() {
        return {
            cal: null
        }
    },
    mounted () {
        var self = this
        this.cal = $(self.$el)
        
        var args = {
        header: {
            left:   'prev,next today',
            center: 'title',
            right:  'month,agendaWeek,agendaDay'
        },
        height: "auto",
        allDaySlot: false,
        slotEventOverlap: false,
        locale: 'nl-be',
        timeFormat: 'HH:mm',
        dayClick (date, event, view) {
            console.log(date, event, view)
            console.log(date.format())
        }
    }  
    this.cal.fullCalendar(args)
  }
}
</script>

<style>
@import '../assets/css/fullcalendar.min.css';

</style>