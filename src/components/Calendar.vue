<template>
    <div>
        <app-header></app-header>
        <app-calendar></app-calendar>
    </div>
</template>

<script>
import $ from "jquery";
import Calendar from "./CalendarPage.vue";
import Header from "./Header.vue";

export default {
  components: {
    appHeader: Header,
    appCalendar: Calendar
  }
};
</script>
    
<style>
</style>

