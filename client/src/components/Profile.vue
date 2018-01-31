<template>
    <div class="user-profile">
        <h1>{{ msg }}</h1>

        <div v-if="alertMessage" class="alert" :class="alertType" role="alert">
            {{ alertMessage }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

            <form class="form" v-if="user">
                <div class="form-group row">
                    <label for="inputName" class="col-sm-3 col-form-label"><b>Name:</b></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" v-model="user.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-3 col-form-label"><b>Email:</b></label>
                    <div class="col-sm-8">
                        <input type="email" class="form-control" id="inputEmail" v-model="user.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputUsername" class="col-sm-3 col-form-label"><b>Username:</b></label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputUsername" v-model="user.nickname">
                    </div>
                </div>
                
                <div>
                    <button type="submit" class="btn btn-success btn-block btn-md col-sm-8" @click="updateUser()">Update</button>
                </div>
            </form>
        <br>
        
        <form v-if="user">
                <div class="form-group row">
                    <label for="inputpasswordOld" class="col-sm-3 col-form-label"><b>Old Password:</b></label>
                    <div class="col-sm-8">
                        <input type="secret" class="form-control" id="inputPasswordOld" placeholder="Old password" v-model="oldPassword">
                    </div>
                    <label for="inputpasswordNew" class="col-sm-3 col-form-label"><b> New Password:</b></label>
                    <div class="col-sm-8">
                        <input type="secret" class="form-control" id="inputPasswordNew" placeholder="New password" v-model="newPassword">
                    </div>
                </div>
                <button type="submit" class="btn btn-success btn-block btn-md col-sm-8" @click="updateUserPassword()">Update Password</button>
        </form>   
        <br>
        <button class="btn btn-danger btn-block btn-md col-sm-8" data-toggle="modal" data-target="#modalRemove">Remove</button>
        
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
                            Only by creating a new user in the BD or a new registration.<br/>
                            Are you absolutely sure you want to <strong>delete</strong> this user?
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
            alertMessage: '',
            alertType: '',
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
            axios.delete('http://188.166.89.174/api/users/' + this.user.id).then(response => {
                this.alertMessage = 'User ' + this.$root.$data['loggedUser'].name + ' successfully removed';
                this.alertType = 'alert-success';
            })
            .catch(err => {
                this.alertMessage = 'Could not remove user ' +this.$root.$data['loggedUser'].name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
            });
        },
        updateUser(){
            axios.put('http://188.166.89.174/api/users/' + this.user).then(response => {
                 this.alertMessage = 'User ' + this.$root.$data['loggedUser'].name + ' successfully UPDATED';
                 this.alertType = 'alert-success';
            })
            .catch(err => {
                this.alertMessage = 'Could not update user ' +this.$root.$data['loggedUser'].name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
            });

        },
        updateUserPassword(){
            axios.put('http://188.166.89.174/api/users/' + this.$root.$data['loggedUser'].id + '/password', {
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
        }
    }
}
</script>

<style scoped>
.form-control:read-only{
    background-color: aliceblue;
}
</style>

