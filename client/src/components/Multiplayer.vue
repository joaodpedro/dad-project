<template>
    <div class="Multiplayer">
        <h3 class="text-center">{{ title }}</h3>
        
        <lobby :games = "lobbyGames" @create-click="createGame" @join-click="joinGame"></lobby>
        
        <template v-for="game in activeGames">
            <game  :game="game" :key="game.id"></game>
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
            title: 'BlackJack',
            lobbyGames: [],
            activeGames: [],
            socketId: "",
            message: '',
            alertType: ''
        }
    },
    methods: {
        loadLobbyGames(){
            this.$socket.emit('get_lobby_games', this.$root.$data['loggedUser'].id);
        },
        createGame(){
            this.$socket.emit('create_game', this.$root.$data['loggedUser'].id);
            this.sendNotification('New game created', 'alert-success');
        },
        joinGame(game){
            game.total_players++;
            this.$socket.emit('join_game', {game: game, player_id: this.$root.$data['loggedUser'].id});
            this.sendNotification('Joined <strong>Game #' + game.id + '</strong>', 'alert-success');
        },
        loadActiveGames(){
            this.$socket.emit('get_my_active_games', this.$root.$data['loggedUser'].id);
        },
        sendNotification(message, alertType){
            this.message = message;
            this.alertType = alertType;
            setTimeout(() =>{ this.message = ''; this.alertType = ''; }, 3000);
        }
    },
    sockets: {
        connect(){
            this.socketId = this.$socket.id;
        },
        my_lobby_games(games){
            this.lobbyGames = games;
        },
        my_active_games_changed(){
            this.loadActiveGames();
        },
        my_active_games(games){
            this.activeGames = games;
        },
        lobby_change(){
            this.loadLobbyGames();
        },
        game_player_join(game_id){
            //notificar
        }
    },
    mounted(){
        this.loadLobbyGames();
        this.loadActiveGames();
    },
    components: {
        'game': GameTable,
        'lobby': Lobby
    }
}
</script>

<style>
</style>
