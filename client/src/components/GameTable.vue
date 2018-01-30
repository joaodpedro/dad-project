<template>
    <div class="gameTable">
        <h2 class="text-center">Game {{ game.id }}</h2>
        
        <div class="alert" :class="gameAlertType" v-if="gameMessage" 
            v-html="gameMessage" role="alert" ></div>
        
        <button class="btn btn-success" v-if="game.created_by == this.$root.$data['loggedUser'].id" @click.prevent="start()">Start Game</button>
        <div class="game-zone-content">
            <div class="table">
                <div>
                    <ul v-if ="players.length > 0">
                        <li v-for="player in players">Player: {{ player.nickname }}</li>
                    </ul> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['game'],
    name: 'GameTable',
    data: function() {
        return {
            players: [],
            gameMessage: '',
            gameAlertType: ''
        }
    },
    methods:{
        start() {
            if (this.players.length < 2){
                this.sendGameNotification('Not enough players! <strong>Minimum 2 players</strong>', 'alert-warning');
                return;   
            }
            this.sendGameNotification('Not implemented yet', 'alert-info');
            this.$socket.emit('start_this_game', {game_id: this.game.id, players: this.players});
        },
        getGamePlayers(){
            axios.get('http://localhost:8080/api/games/' + this.game.id + '/players').then(response =>{
                this.players = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        sendGameNotification(message, alertType){
            this.gameMessage = message;
            this.gameAlertType = alertType;
            setTimeout(() =>{ this.gameMessage = ''; this.gameAlertType = ''; }, 3000);
        }
    },
    mounted(){
        this.getGamePlayers();
    }
}
</script>

<style>
</style>
