<template>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" v-if="loggedIn">
            <router-link class="navbar-brand" to="/statistics">BlackJack Game Admin</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsMenu" aria-controls="navbarsMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsMenu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/statistics">Statistics <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/users">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/decks">Decks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/configs">Platform Configs.</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="btn btn-primary" to="/logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <main role="main" class="container">
            <router-view/>
        </main><!-- /.container -->
    </div>
</template>

<script>
import auth from '@/auth';

export default {
  name: 'App',
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
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
