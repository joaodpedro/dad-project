<template>
    <div class="gameTable">
        <h2 class="text-center">Game {{ game.id }}</h2>
        
        <div class="alert" :class="alertType2" v-if="message2" 
            v-html="message2" role="alert" ></div>
        
        <button v-if="game.created_by == this.$root.$data['loggedUser'].id" @click.prevent="start()">Start</button>
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
            message2: '',
            alertType2: ''
        }
    },
    methods:{
        start() {
            if (this.players.length >= 2){
                this.$socket.emit('start_this_game', {game_id: this.game.id, players: this.players});
            }else{
                this.sendNotification2('Not enough players! <strong>Minimum 2 players</strong>', 'alert-warning');
            }
        },
        getGamePlayers(){
            axios.get('http://localhost:8080/api/games/' + this.game.id + '/players').then(response =>{
                this.players = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        sendNotification2(message, alertType){
            this.message2 = message;
            this.alertType2 = alertType;
            setTimeout(() =>{ this.message2 = ''; this.alertType2 = ''; }, 3000);
        }
    },
    mounted(){
        this.getGamePlayers();
    }
}
</script>

<style>
</style>
