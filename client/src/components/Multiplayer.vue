<template>
    <div class="Multiplayer">
        <h3 class="text-center">{{ title }}</h3>
        <lobby :games = "lobbyGames" @create-click="createGame" @join-click="joinGame"></lobby>
        <template v-for="game in activeGames">
            <game  :game="game"> </game>
        </template>
              
    </div>
</template>

<script>
import axios from 'axios';

import GameTable from './GameTable.vue';
import Lobby from './Lobby.vue';

export default {
     data: function(){
			return {
                title: 'BalckJack',
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: ""
                //players: this.$root.players
            }
        },
    methods: { 
        createGame(){
            this.$socket.emit('createGame',this.$root.$data['loggedUser'].id);    
        },
         loadGames(){
            this.$socket.emit('LobbyLoad',this.$root.$data['loggedUser'].id);    
        },
        joinGame(game){
            game.total_players++;
            this.$socket.emit('join_game',{game: game, player_id:this.$root.$data['loggedUser'].id});   
        },

        loadActiveGames(){
                this.$socket.emit('get_my_activegames',this.$root.$data['loggedUser'].id);
        }
        

    },
    
    sockets: {
        this_game_players(data){
            //players.set(data.gameId, data.ps);
            //console.log(players)
        },
        my_active_games_changed(){
             this.loadActiveGames();
        },
         my_active_games(games){
                this.activeGames = games;
        },
        connect(){
             this.socketId = this.$socket.id;
        },
        lobbyChange(){
            this.loadGames();
        },
        my_lobby_games(games){
                this.lobbyGames = games;
        },
    },
    mounted(){
        this.loadGames();
        this.loadActiveGames();
    },
    components: {
            'game': GameTable,
            'lobby' :Lobby
        }
}
</script>

<style>
</style>
