<template>
    <div class="user-profile">
        <h1>{{ msg }}</h1>

        <div v-if="alertMessage" class="alert" :class="alertType" role="alert">
            {{ alertMessage }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row justify-content-end" v-if="user">
            <div class="col-md-3 order-md-2 mb-4">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Admin actions</span>
                </h4>
                <button v-if="!user.blocked" class="btn btn-warning btn-block btn-md" data-toggle="modal" data-target="#modalBlock">
                    Block
                </button>
                <button v-if="user.blocked" class="btn btn-success btn-block btn-md" data-toggle="modal" data-target="#modalReactivate">
                    Reactivate
                </button>
                <button class="btn btn-danger btn-block btn-md" data-toggle="modal" data-target="#modalRemove">
                    Remove
                </button>
            </div>

            <form class="col-md-6  order-md-1">
                <div class="form-group row">
                    <label for="inputId" class="col-sm-3 col-form-label"><b>ID#:</b></label>
                    <div class="col-sm-8">
                        <input type="number" readonly class="form-control" id="inputId" v-model="user.id">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputName" class="col-sm-3 col-form-label"><b>Name:</b></label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control" id="inputName" v-model="user.name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail" class="col-sm-3 col-form-label"><b>Email:</b></label>
                    <div class="col-sm-8">
                        <input type="email" readonly class="form-control" id="inputEmail" v-model="user.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputUsername" class="col-sm-3 col-form-label"><b>Username:</b></label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control" id="inputUsername" v-model="user.nickname">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputBlocked" class="col-sm-3 col-form-label"><b>Blocked:</b></label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control" id="inputBlocked" value="Yes" v-if="user.blocked">
                        <input type="text" readonly class="form-control" id="inputBlocked" value="No" v-else>
                    </div>
                </div>
                <div class="form-group row" v-if="user.blocked">
                    <label for="inputReasonBlocked" class="col-sm-3 col-form-label"><b>Reason Blocked:</b></label>
                    <div class="col-sm-8">
                        <textarea readonly class="form-control" id="inputReasonBlocked" v-model="user.reason_blocked"></textarea>
                    </div>
                </div>
                <div class="form-group row" v-if="!user.blocked && user.reason_reactivated != ''">
                    <label for="inputReasonReactivated" class="col-sm-3 col-form-label"><b>Reason Reactivated:</b></label>
                    <div class="col-sm-8">
                        <textarea readonly class="form-control" id="inputReasonReactivated" v-model="user.reason_reactivated"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputTotalPts" class="col-sm-3 col-form-label"><b>Total Points:</b></label>
                    <div class="col-sm-8">
                        <input type="number" readonly class="form-control" id="inputTotalPts" v-model="user.total_points">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputTotalGames" class="col-sm-3 col-form-label"><b>Total Games (played):</b></label>
                    <div class="col-sm-8">
                        <input type="number" readonly class="form-control" id="inputTotalGames" v-model="user.total_games_played">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputRegisterDate" class="col-sm-3 col-form-label"><b>Registered at:</b></label>
                    <div class="col-sm-8">
                        <input type="text" readonly class="form-control" id="inputRegisterDate" v-model="user.created_at">
                    </div>
                </div>
            </form>
        </div>


        <!-- ****MODALS**** -->
        <div class="modal fade" id="modalBlock" tabindex="-1" role="dialog" aria-labelledby="modalBlockLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalBlockLabel" v-if="user != null">Block user {{ user.name }}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Reason to block user:</p>
                        <textarea class="form-control" rows="3" v-model="reasonBlocked"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" 
                            @click="clear()">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" 
                            :disabled="reasonBlocked == ''" @click="blockUser()">Block</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalReactivate" tabindex="-1" role="dialog" aria-labelledby="modalReactivateLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalReactivateLabel" v-if="user != null">Reactivate user {{ user.name }}?</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Reason to reactivate user:</p>
                        <textarea class="form-control" rows="3" v-model="reasonReactivated"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" 
                            @click="clear()">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" 
                            :disabled="reasonReactivated == ''" @click="reactivateUser()">Reactivate</button>
                    </div>
                </div>
            </div>
        </div>

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
    name: 'UserProfile',
    data () {
        return {
            user: null,
            alertMessage: '',
            alertType: '',
            reasonBlocked: '',
            reasonReactivated: '',
            msg: 'User profile page'
        }
    },
    mounted(){
        this.loadUser();
    },
    methods: {
        loadUser(){
            axios.get('http://188.166.89.174/api/users/' + this.$route.params.id).then((response) => {
                this.user = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        blockUser(){
            axios.put('http://188.166.89.174/api/users/' + this.user.id + '/block', {
                reason_blocked: this.reasonBlocked,
                email: this.user.email
            }).then(response => {
                this.user.blocked = 1;
                this.user.reason_blocked = this.reasonBlocked;
                this.alertMessage = 'User ' + this.user.name + ' successfully blocked';
                this.alertType = 'alert-success';
                this.clear();
            })
            .catch(err => {
                this.alertMessage = 'Could not block user ' + this.user.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
                this.clear();
            });
        },
        reactivateUser(){
            axios.put('http://188.166.89.174/api/users/' + this.user.id + '/reactivate', {
                reason_reactivated: this.reasonReactivated,
                email: this.user.email
            }).then(response => {
                this.user.blocked = 0;
                this.user.reason_reactivated = this.reasonReactivated;
                this.alertMessage = 'User ' + this.user.name + ' successfully reactivated';
                this.alertType = 'alert-success';
                this.clear();
            })
            .catch(err => {
                this.alertMessage = 'Could not reactivate user ' + this.user.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
                this.clear();
            });
        },
        removeUser(){
            axios.delete('http://188.166.89.174/api/users/' + this.user.id).then(response => {
                this.alertMessage = 'User ' + this.user.name + ' successfully removed';
                this.alertType = 'alert-success';
                this.loadUsers();
            })
            .catch(err => {
                this.alertMessage = 'Could not remove user ' + this.user.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
            });
        },
        clear(){
            this.reasonBlocked = '';
            this.reasonReactivated = '';
        }
    }
}
</script>

<style scoped>
.form-control:read-only{
    background-color: aliceblue;
}
</style>