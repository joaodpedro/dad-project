<template>
    <div class="configs">
        <h1>{{ msg }}</h1>
        
        <div class="row justify-content-center">
            <div class="col-7">
                <div class="alert alert-info" role="alert">
                    You will be <span class="alert-link">logged out</span> 
                    after successfully changing <span class="alert-link">administrator password</span>
                    or after changing the <span class="alert-link">administrator email</span>!
                </div>
                
                <h4 class="text-left">Change administrator password</h4><hr/>

                <div class="alert" :class="alertType" role="alert" v-if="alertMessagePass">
                    {{ alertMessagePass }}
                </div>
                
                <form @submit.prevent="changePassword()">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputOldPass">Old Password</label>
                            <input type="password" class="form-control" id="inputOldPass" 
                                placeholder="Old password" required v-model="oldPassword">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputNewPass">New Password</label>
                            <input type="password" class="form-control" id="inputNewPass" 
                                placeholder="New password" required v-model="newPassword">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary float-left">Change password</button>
                </form>
            </div>
        </div>
        
        <div class="row justify-content-center mt-5 mb-5">
            <div class="col-7">
                <h4 class="text-left">Change emails</h4><hr/>
                
                <div class="alert" :class="alertType" role="alert" v-if="alertMessageEmail">
                    {{ alertMessageEmail }}
                </div>
                
                <form class="text-left mb-4" @submit.prevent="changeAdminEmail()">
                    <div class="form-group">
                        <label for="adminInputEmail">Administrator email:</label>
                        <input type="email" class="form-control" id="adminInputEmail" aria-describedby="adminEmailHelp" 
                            placeholder="New administrator email" required v-model="admEmail">
                        <small id="adminEmailHelp" class="form-text text-muted">This email address will be used to contact the administrator.</small>
                        <button type="submit" class="btn btn-primary">Change admin email</button>
                    </div>
                </form>

                <form class="text-left mt-4" @submit.prevent="changePlatformEmail()">
                    <div class="form-group">
                        <label for="platformInputEmail">Platform email:</label>
                        <input type="email" class="form-control" id="platformInputEmail" aria-describedby="platformEmailHelp" 
                            placeholder="New platform email" required v-model="platformEmail">
                        <small id="platformEmailHelp" class="form-text text-muted">This email address will be used in the app's automatic emails.</small>
                        <button type="submit" class="btn btn-primary">Change platform email</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row justify-content-center mb-2">
            <div class="col-7">
                <h4 class="text-left text-muted">Other actions</h4><hr/>
                <router-link class="btn btn-secondary btn-lg" to="/users">Manage users</router-link>
                <router-link class="btn btn-secondary btn-lg" to="/decks">Manage decks</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PlatformConfigs',
    data () {
        return {
            msg: 'Platform Configs page',
            admEmail: this.$root.$data['loggedUser'].email,
            platformEmail: '',
            oldPassword: '',
            newPassword: '',
            alertMessagePass: '',
            alertMessageEmail: '',
            alertType: ''
        }
    },
    mounted(){
        axios.get('http://localhost:8080/api/configs/email').then(response => {
            this.platformEmail = response.data.platform_email;
        }).catch(err => {
            console.log(err);
        });
    },
    methods: {
        changePassword(){
            axios.put('http://localhost:8080/api/users/' + this.$root.$data['loggedUser'].id + '/password', {
                old_pass: this.oldPassword,
                new_pass: this.newPassword
            }).then(response => {
                this.alertMessagePass = 'Password changed successfully!\nYou will be logged out shortly.';
                this.alertType = 'alert-success';
                this.prepareLogout();
            }).catch(err => {
                this.alertMessagePass = err.response.data.message;
                this.alertType = 'alert-danger';
                console.log(err);
            });
        },
        changeAdminEmail(){
            axios.put('http://localhost:8080/api/users/' + this.$root.$data['loggedUser'].id + '/email', {email: this.admEmail})
            .then(response => {
                this.alertMessageEmail = 'Administrator email changed successfully!\nYou will be logged out shortly.';
                this.alertType = 'alert-success';
                this.prepareLogout();
            }).catch(err => {
                this.alertMessageEmail = err.response.data.message;
                this.alertType = 'alert-danger';
                console.log(err);
            });
        },
        changePlatformEmail(){
            axios.put('http://localhost:8080/api/configs/email', {email: this.platformEmail})
            .then(response => {
                this.alertMessageEmail = 'Platform email changed successfully!';
                this.alertType = 'alert-success';
            }).catch(err => {
                this.alertMessageEmail = err.response.data.message;
                this.alertType = 'alert-danger';
                console.log(err);
            });
        },
        prepareLogout(){
            setTimeout(()=>{ this.$router.replace('/logout') }, 2000);
        }
    }
}
</script>

<style>

</style>
