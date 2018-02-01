<template>
    <div class="users">
        <h1>{{ msg }}</h1>

        <div v-if="alertMessage" class="alert" :class="alertType" role="alert">
            {{ alertMessage }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <table class="table table-hover table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nickname</th>
                    <th scope="col">Blocked?</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <th scope="row">{{ user.id }}</th>
                    <td><router-link class="user-link" :to="'/users/'+user.id">{{ user.name }}</router-link></td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.nickname }}</td>
                    <td>{{ user.blocked ? 'Yes' : 'No' }}</td>
                    <td>
                        <button v-if="!user.blocked" class="btn btn-warning btn-sm" @click="selectCurrentUser(user)"
                            data-toggle="modal" data-target="#modalBlock">
                            Block
                        </button>
                        <button v-if="user.blocked" class="btn btn-success btn-sm" @click="selectCurrentUser(user)"
                            data-toggle="modal" data-target="#modalReactivate">
                            Reactivate
                        </button>
                        <button class="btn btn-danger btn-sm" @click="selectCurrentUser(user)"
                            data-toggle="modal" data-target="#modalRemove">
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- ****MODALS**** -->
        <div class="modal fade" id="modalBlock" tabindex="-1" role="dialog" aria-labelledby="modalBlockLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalBlockLabel" v-if="currentUser != null">Block user {{ currentUser.name }}?</h5>
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
                            @click="clearCurrentUser()">Cancel</button>
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
                        <h5 class="modal-title" id="modalReactivateLabel" v-if="currentUser != null">Reactivate user {{ currentUser.name }}?</h5>
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
                            @click="clearCurrentUser()">Cancel</button>
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
                        <h5 class="modal-title" id="modalRemoveLabel" v-if="currentUser != null">Delete user {{ currentUser.name }}?</h5>
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
                            @click="clearCurrentUser()">Cancel</button>
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
    name: 'Users',
    data () {
        return {
            users: [],
            currentUser: null,
            alertMessage: '',
            alertType: '',
            reasonBlocked: '',
            reasonReactivated: '',
            msg: 'Users page'
        }
    },
    mounted(){
        this.loadUsers();
    },
    methods: {
        loadUsers(){
            axios.get('http://188.166.89.174/api/users').then((response) => {
                this.users = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        blockUser(){
            axios.put('http://188.166.89.174/api/users/' + this.currentUser.id + '/block', {
                reason_blocked: this.reasonBlocked,
                email: this.currentUser.email
            }).then(response => {
                this.currentUser.blocked = 1;
                this.alertMessage = 'User ' + this.currentUser.name + ' successfully blocked';
                this.alertType = 'alert-success';
                this.clearCurrentUser();
            })
            .catch(err => {
                this.alertMessage = 'Could not block user ' + this.currentUser.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
                this.clearCurrentUser();
            });
        },
        reactivateUser(){
            axios.put('http://188.166.89.174/api/users/' + this.currentUser.id + '/reactivate', {
                reason_reactivated: this.reasonReactivated,
                email: this.currentUser.email
            }).then(response => {
                this.currentUser.blocked = 0;
                this.alertMessage = 'User ' + this.currentUser.name + ' successfully reactivated';
                this.alertType = 'alert-success';
                this.clearCurrentUser();
            })
            .catch(err => {
                this.alertMessage = 'Could not reactivate user ' + this.currentUser.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
                this.clearCurrentUser();
            });
        },
        removeUser(){
            axios.delete('http://188.166.89.174/api/users/' + this.currentUser.id).then(response => {
                this.alertMessage = 'User ' + this.currentUser.name + ' successfully removed';
                this.alertType = 'alert-success';
                this.currentUser = null;
                this.loadUsers();
            })
            .catch(err => {
                this.alertMessage = 'Could not remove user ' + this.currentUser.name + '\'s account';
                this.alertType = 'alert-danger';
                console.log(err);
                this.currentUser = null;
            });
        },
        selectCurrentUser(user){
            this.currentUser = user;
        },
        clearCurrentUser(){
            this.currentUser = null;
            this.reasonBlocked = '';
            this.reasonReactivated = '';
        }
    }
}
</script>

<style scoped>
.user-link{
    color: #2c3e50;
}

.user-link:hover{
    text-decoration: underline;
}
</style>