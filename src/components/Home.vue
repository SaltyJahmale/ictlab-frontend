<template>
    <div>
        <app-header></app-header>
        <h1>That's the dashboard!</h1>
        <p>You should only get here if you're authenticated!</p>
        <p v-if="email">Your email address: {{ email }}</p>
    </div>
</template>

<script>
import Header from './Header.vue'

export default {
  components: {
    appHeader: Header
  },
  computed: {
    email () {
      return !this.$store.getters.user ? false : this.$store.getters.user.userProps.email   
      }
  },
  created () {
    this.$store.dispatch('fetchUser')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, p {
    text-align: center;
  }

  p {
    color: red;
  }
</style>
