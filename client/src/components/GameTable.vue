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
    mounted(){
        console.log(this.players[this.game.id]);
    }
}
</script>

<style>
</style>
