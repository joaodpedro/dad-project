<template>
    <div class="gameTable">
        <h2 class="text-center">Game {{ game.id }}</h2>
            
        <div class="game-zone-content">       
            <div class="table">
                <div>
                    <ul v-if ="players.length > 0">
                        <li v-for="player in players">Player: {{ player.nickname }}</li>
                    </ul> 
                </div>
            </div>
        </div>          
        <button v-if="game.created_by == this.$root.$data['loggedUser'].id" v-on:click.prevent="start(game.id)">Start</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['game'],
    name: 'GameTable',
    data: function() {
        return {
            players: []
        }
    },
    methods:{
        start(game) {
            this.$emit('start-click', game);
        },
        getGamePlayers(){
            axios.get('http://localhost:8080/api/games/' + this.game.id + '/players').then(response =>{
                console.log(response.data);
                this.players = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        }
    },
    mounted(){
        this.getGamePlayers();
        console.log(this.players);
    }
}
</script>

<style>
</style>
