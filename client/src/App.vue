<template>
  <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <span class="navbar-brand">Sueca Game </span>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsMenu" aria-controls="navbarsMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsMenu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/statistics-admin" v-if="loggedIn && this.$root.$data['loggedUser'].admin">Statistics</router-link>
						<router-link class="nav-link" to="/statistics" v-else>Statistics</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/top5">Top 5</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/games" v-if="loggedIn">Games</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/profile" v-if="loggedIn && !this.$root.$data['loggedUser'].admin">Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/users" v-if="loggedIn && this.$root.$data['loggedUser'].admin">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/decks" v-if="loggedIn && this.$root.$data['loggedUser'].admin">Decks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/configs" v-if="loggedIn && this.$root.$data['loggedUser'].admin">Platform Configuration</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
					<li class="navbar-brand"  v-if="loggedIn">
						{{this.$root.$data['loggedUser'].name}}
                    </li>
                    <li class="nav-item mr-2" >
                        <router-link class="btn btn-primary" v-if="!loggedIn" to="/login">Login</router-link>
                    </li> 

                    <li class="nav-item">
                        <router-link class="btn btn-primary" v-if="!loggedIn" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="btn btn-primary" v-if="loggedIn" to="/logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <main role="main" >
          <div class="container"> <router-view/></div>
        </main><!-- /.container -->
    </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
  name: 'App',
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
      this.$root.$data['loggedUser'] = auth.getLoggedUser();
    }
    document.addEventListener('beforeunload', this.unloadHandler());
  },
  methods: {
      unloadHandler(){
          auth.logout();
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>