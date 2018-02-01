<template>
    <div class="user-profile">
        <h1>{{ msg }}</h1>

        <div class="alert" :class="profileAlertType" v-html="profileAlertMessage" role="alert" v-if="profileAlertMessage"></div>

        <div class="row justify-content-center">
            <div class="alert alert-info col-md-6" role="alert">
                You will be <span class="alert-link">logged out</span> 
                after successfully changing <span class="alert-link">account password</span>!
            </div>
        </div>
        <div class="row justify-content-end">
            <form class="col-md-6">
                <div class="form-group row">
                    <label for="inputName" class="col-sm-4 col-form-label"><b>Name:</b></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" v-model="user.name" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-4 col-form-label"><b>Email:</b></label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="inputEmail" v-model="user.email" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputUsername" class="col-sm-4 col-form-label"><b>Username:</b></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputUsername" v-model="user.nickname" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-success btn-md" @click.prevent="updateUser()">Save details</button>
            </form>
            <div class="col-md-3">
                <h4 class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">Account actions</span>
                </h4>
                <button class="btn btn-danger btn-block btn-md" data-toggle="modal" data-target="#modalRemove">Remove</button>
            </div>

            <form class="col-md-6 mt-5">
                <div class="form-group row">
                    <label for="inputpasswordOld" class="col-sm-4 col-form-label"><b>Old Password:</b></label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPasswordOld" placeholder="Old password" v-model="oldPassword" required>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputpasswordNew" class="col-sm-4 col-form-label"><b>New Password:</b></label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPasswordNew" placeholder="New password" v-model="newPassword" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-md" @click.prevent="updateUserPassword()">Change Password</button>
            </form>
            <div class="col-md-3"></div>
        </div>
        
        <!-- ****MODALS**** -->  
        <div class="modal fade" id="modalRemove" tabindex="-1" role="dialog" aria-labelledby="modalRemoveLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalRemoveLabel" v-if="user != null">Delete user {{ user.name }}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            This action is <strong>permanent</strong> and can't be reversed!<br/>
                            Only by creating a new account/do a new registration.<br/>
                            Are you absolutely sure you want to <strong>delete</strong> this account?
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" 
                            @click="clear()">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" 
                            @click="removeUser()">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            user: {},
            profileAlertMessage: '',
            profileAlertType: '',
            oldPassword: '',
            newPassword: '',
            msg: 'Profile'
        }
    },
    mounted(){
        this.loadUser();
    },
    methods: {
        loadUser(){
            this.user = Object.assign({}, this.$root.$data['loggedUser']);   
        },
        removeUser(){
            axios.delete('http://localhost:8080/api/users/' + this.user.id).then(response => {
                this.sendNotification('User ' + this.$root.$data['loggedUser'].name + ' successfully removed', 'alert-success');
            })
            .catch(err => {
                this.sendNotification('Could not remove user ' +this.$root.$data['loggedUser'].name + '\'s account', 'alert-danger');
                console.log(err);
            });
        },
        updateUser(){
            axios.put('http://localhost:8080/api/users/' + this.user.id, this.user).then(response => {
                this.sendNotification('User ' + this.$root.$data['loggedUser'].name + ' successfully updated', 'alert-success');
            })
            .catch(err => {
                this.sendNotification('Could not update user ' +this.$root.$data['loggedUser'].name + '\'s account', 'alert-danger');
                console.log(err);
            });

        },
        updateUserPassword(){
            axios.put('http://localhost:8080/api/users/' + this.user.id + '/password', {
                old_pass: this.oldPassword,
                new_pass: this.newPassword
            }).then(response => {
                this.sendNotification('Password changed successfully!\nYou will be logged out shortly.', 'alert-success');
                this.prepareLogout();
            }).catch(err => {
                this.sendNotification(err.response.data.message, 'alert-danger');
                console.log(err);
            });
        },
        prepareLogout(){
            setTimeout(()=>{ this.$router.replace('/logout') }, 2000);
        },
        sendNotification(message, alertType){
            this.profileAlertMessage = message;
            this.profileAlertType = alertType;
            setTimeout(() =>{ this.profileAlertMessage = ''; this.profileAlertType = ''; }, 3000);
        }
    }
}
</script>

<style scoped>
.form-control:read-only{
    background-color: aliceblue;
}
</style>

