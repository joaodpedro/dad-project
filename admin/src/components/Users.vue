<template>
    <div class="users">
        <h1>{{ msg }}</h1>

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
                    <td><router-link>{{ user.name }}</router-link></td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.nickname }}</td>
                    <td>{{ user.blocked ? 'Yes' : 'No' }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" v-if="!user.blocked">Block</button>
                        <button class="btn btn-success btn-sm" v-if="user.blocked">Reactivate</button>
                        <button class="btn btn-danger btn-sm">Remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Users',
    data () {
        return {
            users: [],
            msg: 'Users page'
        }
    },
    mounted(){
        this.loadUsers();
    },
    methods: {
        loadUsers(){
            axios.get('http://localhost:8080/api/test').then((response) => {
                this.users = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>