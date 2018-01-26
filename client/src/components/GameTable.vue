<template>
  <div class="gameTable">
        <div>
            <h2 class="text-center">Game {{ game.id }}</h2>
            <br>
        </div>
         <div class="game-zone-content">       
            <div class="table">
                <div>
                    <!--<ul v-if = "players.length > 0"><li v-for="player in players" :key="player.id" >Player:{{player.nickname}}</li></ul>
-->
                        
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
    data () {
        return {
            errorMessage: '',
            successMessage: ''
        }
    },
    methods: {
        getPlayers(){
            this.$socket.emit('get_game_players',this.game.id);
        }
        
    },
    mounted(){
        this.getPlayers();
        //console.log(this.$root.players);
    }
}
</script>




<style>

</style>
