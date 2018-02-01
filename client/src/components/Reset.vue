<template>
    <div class="forgot-reset">
        <div v-if="!showQuery" class="row justify-content-center">
            <form @submit.prevent="sendResetEmail()">
                <h1 class="mb-3 font-weight-normal">Forgot password</h1>
                
                <div class="alert" :class="forgotAlertType" v-html="forgotAlertMessage" v-if="forgotAlertMessage" role="alert"></div>

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
                
                <div class="alert" :class="forgotAlertType" v-html="forgotAlertMessage" v-if="forgotAlertMessage" role="alert"></div>

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
            email: '',
            password: '',
            confirmPassword: '',
            showQuery: '',
            forgotAlertMessage: '',
            forgotAlertType: ''
        }
    },
    mounted(){
        this.showQuery = this.$route.query.show;
    },
    methods: {
        sendResetEmail(){
            axios.post('http://localhost:8080/api/users/forgot', {email: this.email}).then(response =>{
                console.log(response);
                this.sendNotification('An email with further instructions was sent to <strong>' + this.email + '</strong>', 'alert-success');
            })
            .catch(err =>{
                console.log(err);
                this.sendNotification(err.response.data.message, 'alert-danger');
            });
        },
        resetPassword(){
            if(!this.password === this.confirmPassword){
                this.sendNotification('Passwords don\'t match!', 'alert-danger');
                return; 
            }

            axios.post('http://localhost:8080/api/users/reset', {
                token: this.$route.params.token, 
                password: this.password
            }).then(response =>{
                this.sendNotification('Password reset successful! You will be <strong>redirected</strong> to the login page.', 'alert-success');
                setTimeout(() =>{ this.$router.replace('/login'); }, 2000);
            })
            .catch(err =>{
                console.log(err);
                this.sendNotification(err.response.data.message, 'alert-danger');
            });
        },
        sendNotification(message, alertType){
            this.forgotAlertMessage = message;
            this.forgotAlertType = alertType;
            setTimeout(() =>{ this.forgotAlertMessage = ''; this.forgotAlertType = ''; }, 3000);
        }
    }
}
</script>

<style>
</style>