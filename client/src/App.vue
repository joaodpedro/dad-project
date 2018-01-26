<template>
  <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <router-link class="navbar-brand" to="/statistics">BlackJack Game </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsMenu" aria-controls="navbarsMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsMenu">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/statistics">Statistics <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/testme">Decks</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/multiplayer" v-if="loggedIn">Lobby</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav">
                   
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
