<template>
 <header id="header">
    <div class="logo">
      <router-link to="/"> Daffodil </router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/signup">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/signin">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/calendar">Calender</router-link>
        </li>
        <li v-if="auth && isAdmin">
          <!-- <div class="dropdown"> -->
            <button @click="dropdown" class="dropbtn">Admin</button>
            <div id="myDropdown" class="dropdown-content">
              <router-link to="/user">User</router-link>
              <router-link to="/sensor">Sensor</router-link>
            </div>
          <!-- </div> -->
        </li> 
        <li v-if="auth">
          <button @click="onLogout" class="logout">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated  
    },
    isAdmin () {
      return !this.$store.getters.user ? false : this.$store.getters.userRole
    }
  },
  created () {
    this.$store.dispatch('fetchUser')
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    },
    dropdown () {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  }
}
</script>

<style scoped>
 #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

  .dropbtn {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:focus {
    color: #fa923f;
    border: none;
    cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 91px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
    color: white;
    background-color: #521751;
    padding: 10px 12px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #521751
  }

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
</style>
