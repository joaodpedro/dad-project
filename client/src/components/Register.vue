<template>
    <div class="Register">
        <img src="http://localhost:8080/static/img/logo.png"><br/>
        

        <form @submit.prevent="register()" >
            <h1 class="h3 mb-3 font-weight-normal">Register</h1>
            <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
            <label for="inputUsername" class="sr-only">Username or NickName</label>
            <input type="text" id="inputUsername" 
                class="form-control" placeholder="Username or NickName" required autofocus
                v-model="user.nickname">
            
            <label for="inputEmail" class="sr-only">Email</label>
            <input type="email" id="inputEmail" 
                class="form-control" placeholder="Email" required autofocus
                v-model="user.email">
            
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" 
                class="form-control" placeholder="Password" required
                v-model="user.password">

            <label for="inputName" class="sr-only">Name</label>
            <input type="text" id="inputName" 
                class="form-control" placeholder="Name" required autofocus
                v-model="user.name">

            <button type="submit" class="btn btn-lg btn-primary btn-block">Register</button>
            
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data () {
        return {
            msg: 'Register page',
            errorMessage: '',
            successMessage: '',
            user: {
                nickname: '',
                email: '',
                password: '',
                name:''
            }
        }
    },
    methods: {
        register(){
            axios.post('http://localhost:8080/api/register', this.user).then(respose=> {
                this.successMessage='User Successfully Registered'
                this.errorMessage='';
            }).catch(err=>{
                 this.successMessage='';
                this.errorMessage=err.response.data.message; 
            });

        }
    }
}
</script>

