<template>
    <div class="login">
        <img src="http://localhost:8080/static/img/logo.png"><br/>
        <h1>{{ msg }}</h1>
        
        <form class="form-signin" @submit.prevent="login()">
            <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
            
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
            </div>
            
            <label for="inputUsername" class="sr-only">Username or email</label>
            <input type="text" id="inputUsername" 
                class="form-control" placeholder="Username or Email address" required autofocus
                v-model="user.username">
            
            <label for="inputPassword" class="sr-only">Password</label>
            
            <input type="password" id="inputPassword" 
                class="form-control" placeholder="Password" required
                v-model="user.password">
            
            <div class="checkbox mb-3">
                <label><router-link to="/forgot">Forgot your password?</router-link></label>
            </div>
            
            <button type="submit" class="btn btn-lg btn-primary btn-block">Login in</button>
            
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
    </div>
</template>

<script>
import auth from '@/utils/auth'

export default {
    name: 'Login',
    data () {
        return {
            msg: 'Login page',
            errorMessage: '',
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(){
            auth.login(this.user.username, this.user.password, loggedIn => {
                if (!loggedIn) {
                    this.errorMessage = 'Wrong credentials!';
                } else {
                    this.$root.$data['loggedUser'] = auth.getLoggedUser();
                    this.$router.replace(this.$route.query.redirect || '/games')
                }
            });
        }
    }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>