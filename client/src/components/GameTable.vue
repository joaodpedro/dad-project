<template>
  <div class="gameTable">
        <div>
            <h2 class="text-center">Game {{ game.id }}</h2>
            <br>
        </div>
         <div class="game-zone-content">       
            <div class="table">
                <div>
                    

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
            players: [],
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
    }
}
</script>




<style>

</style>
