<template>
    <div class="gameTable">
        <h2 class="text-center">Game {{ game.id }}</h2>
            
        <div class="game-zone-content">       
            <div class="table">
                <div>
                    <ul v-if = "players[game.id]">
                        <li v-for="player in players[game.id]">Player: {{ player.nickname }}</li>
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
    props: ['game', 'players'],
    name: 'GameTable',
    data () {
        return {
            errorMessage: '',
            successMessage: ''
        }
    },
    methods:{
        start(game) {
                this.$emit('start-click', game);
        },
    },
    mounted(){
        console.log(this.players[this.game.id]);
    }
}
</script>

<style>
</style>
