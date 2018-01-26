<template>
  <div class="gameTable">
        <div>
            <h2 class="text-center">Game {{ game.gameID }}</h2>
            <br>
        </div>
         <div class="game-zone-content">       
            <div class="table">
                <div>
                    <!--DeSENHAR MESA DE JOGO -->
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GameTable',
    data () {
        return {
            players: [],
            errorMessage: '',
            successMessage: ''
        }
    },
    methods: {
        
    },
    sockets: {
     
    }
}
</script>




<style>

</style>
