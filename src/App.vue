<template>
  <div class="container">
    <app-header></app-header>
    <div class="row">
      <div class="col-xs-12">
        <router-view></router-view>    
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'


export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style>
@import url(https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css);
  body {
    padding: 30px
  }
  .footer {
    grid-row-start: 2;
    grid-row-end: 3;
  }
</style>
