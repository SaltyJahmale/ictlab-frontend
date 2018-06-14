<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <router-view></router-view>    
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  created () {
    this.$store.dispatch('tryAutoLogin')
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
