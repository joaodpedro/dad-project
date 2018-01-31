<template>
    <div class="forgot-reset">
        <div v-if="!showQuery" class="row justify-content-center">
            <form @submit.prevent="sendResetEmail()">
                <h1 class="mb-3 font-weight-normal">Forgot password</h1>
                
                <div v-if="message" class="alert" :class="alertType" role="alert" v-html="message">
                </div>

                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-12">
                        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" 
                            required autofocus v-model="email">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-md btn-primary float-left">Reset password</button>
                    </div>
                </div>
                
                <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>
        </div>

        <div v-else class="row justify-content-center">
            <form @submit.prevent="resetPassword()">
                <h1 class="mb-3 font-weight-normal">Reset password</h1>
                
                <div v-if="message" class="alert" :class="alertType" role="alert" v-html="message">
                </div>

                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-sm-12">
                        <input type="password" id="inputPassword" class="form-control" placeholder="New password" 
                            required autofocus v-model="password">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword2" class="col-sm-5 col-form-label">Confirm password:</label>
                    <div class="col-sm-12">
                        <input type="password" id="inputPassword2" class="form-control" 
                            placeholder="Confirm password" required v-model="confirmPassword">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <button type="submit" class="btn btn-md btn-primary float-left">Change password</button>
                    </div>
                </div>

                <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Reset',
    data () {
        return {
            msg: 'Forgot/Reset page',
            message: '',
            email: '',
            password: '',
            confirmPassword: '',
            showQuery: '',
            alertType: ''
        }
    },
    mounted(){
        this.showQuery = this.$route.query.show;
    },
    methods: {
        sendResetEmail(){
            axios.post('http://188.166.89.174/api/users/forgot', {email: this.email}).then(response =>{
                this.message = 'An email with further instructions was sent to <strong>' + this.email + '</strong>';
                this.alertType = 'alert-success';
            })
            .catch(err =>{
                console.log(err);
                this.message = err.response.data.message;
                this.alertType = 'alert-danger';
            });
        },
        resetPassword(){
            if(this.password === this.confirmPassword){
                axios.post('http://188.166.89.174/api/users/reset', {
                    token: this.$route.params.token, 
                    password: this.password
                }).then(response =>{
                    this.message = 'Password reset successful! You will be <strong>redirected</strong> to the login page.';
                    this.alertType = 'alert-success';
                    setTimeout(() =>{ this.$router.replace('/'); }, 2000);
                })
                .catch(err =>{
                    console.log(err);
                    this.message = err.response.data.message;
                    this.alertType = 'alert-danger';
                });
            }else{
                this.message = 'Passwords don\'t match!';
                this.alertType = 'alert-danger';
            }
        }
    }
}
</script>

<style>
</style>