<template>
    <div class="par">
        <h2>{{ msg }}</h2>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user.name }}</li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Par',
    data(){
        return {
            msg: '',
            users: []
        }
    },
    created() {
      this.fetchUsers()
    },
    watch: {
      '$route': 'fetchUsers'
    },
    methods: {
        makeMsg(){
            this.msg = 'This is the number #' + this.$route.params.num;
        },
        fetchUsers(){
            this.makeMsg();

            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                this.users = response.data;
                console.log(response.data);
            })
            .catch(function(err){
                console.log(err);
            })
        }
    }
}
</script>
<style>

</style>
