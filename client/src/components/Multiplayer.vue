<template>
    <div class="Multiplayer">
        <h3 class="text-center">{{ title }}</h3>      
        <lobby v-if="lobbyGames.legnth > 0" :games="lobbyGames" @join-click="joinGame">Join</lobby>  
    </div>
</template>

<script>
import axios from 'axios';

import Lobby from './Lobby.vue';
import GameTable from './gameTable.vue';

export default {
     data: function(){
			return {
                title: 'BalckJack',
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: "",
            }
        },
    methods: {
        loadGames(){
            axios.get('http://localhost:8080/api/games').then((response) => {
                this.lobbyGames = response.data;
                
                console.log(lobbyGames);
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
        },
    },
    components: {
            'lobby': Lobby,
            'game': GameTable,
        },
    mounted(){
        this.loadGames();
    }
}
</script>

<style>
</style>
