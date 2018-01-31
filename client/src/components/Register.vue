<template>
    <div class="Register">
        <img src="http://188.166.89.174/static/img/logo.png"><br/>

        <form @submit.prevent="register()" class="row justify-content-center">
            <div class="col-5">
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

                <div class="form-group">
                    <label for="inputUsername">Username:</label>
                    <input type="text" id="inputUsername" class="form-control" placeholder="Username" 
                        required autofocus v-model="user.nickname">
                </div>
                <div class="form-group">
                    <label for="inputEmail">Email:</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email" 
                        required v-model="user.email">
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password:</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" 
                        required v-model="user.password">
                </div>
                <div class="form-group">
                    <label for="inputName">Name:</label>
                    <input type="text" id="inputName" class="form-control" placeholder="Name" 
                        required v-model="user.name">    
                </div>
                
                <button type="submit" class="btn btn-lg btn-primary">Register</button>
                
                <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </div>
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
            axios.post('http://188.166.89.174/api/register', this.user).then(respose=> {
                this.successMessage='User successfully registered'
                this.errorMessage='';
            }).catch(err=>{
                 this.successMessage='';
                this.errorMessage=err.response.data.message; 
            });

        }
    }
}
</script>

<style>
</style>

