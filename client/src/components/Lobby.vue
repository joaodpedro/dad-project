<template>
    <div class="loby">
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

        <div class="row">
            <button class="btn btn-primary btn-sm" @click="createGame()">Create Game</button>
        </div>

        <table class="table table-hover table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Players</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in lobbyGames" :key="game.id">
                    <th scope="row">{{ game.id }}</th>
                    <td>{{ game.nickname }}</td>
                    <td>{{ game.created_at }}</td>
                    <td>{{ game.total_players }}/4</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="joinGame(game)">Join</button> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Lobby',
    data () {
        return {
            lobbyGames: [],
            errorMessage: '',
            successMessage: ''
        }
    },
    mounted(){
        this.loadGames();
    },
    methods: {
        loadGames(){
            axios.get('http://localhost:8080/api/games').then((response) => {
                this.lobbyGames = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        createGame(){
            axios.post('http://localhost:8080/api/games', {createdBy: this.$root.$data['loggedUser'].id , deckUse: 1})
            .then((response) => {
                this.successMessage='Game Successfully Created'
                this.errorMessage='';
    
                //Enviar MEnsagem ao socket
                this.$socket.emit('LobbyRF');            
            })
            .catch((err) => {
                this.successMessage='';
                this.errorMessage=err.response.data.message; 
                console.log(err);
            });
        },
        joinGame(game){
            game.total_players++;
            axios.post('http://localhost:8080/api/games/joinGame', {game: game, user: this.$root.$data['loggedUser'].id})
            .then((response) => {
                this.successMessage='Join Successfully'
                this.errorMessage=''; 
            })
            .catch((err) => {
                this.successMessage='';
                this.errorMessage=err.response.data.message; 
                console.log(err);
            });
        }
    },
    sockets: {
        lobbyChange(){
            this.loadGames();
        }
    }
}
</script>

<style>
</style>
