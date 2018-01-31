<template>
    <div class="statistics">
        <h1>{{ msg }}</h1>

        <div class="row mt-4 mb-4">
            <div class="col-lg-4">
                <h1 class="text-muted"></h1>
                <p class="h3"></p>
                <p></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <h1 class="text-muted">#{{ totalPlayers }}</h1>
                <p class="h3">TOTAL PLAYERS</p>
                <p></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <h1 class="text-muted">#{{ totalGames }}</h1>
                <p class="h3">TOTAL GAMES</p>
                <p></p>
            </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->

        <div class="jumbotron" v-if="this.$root.$data['loggedUser'] != null">
            <h2>My Statistics</h2>

            <div class="row mt-4 mb-4">
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myTotalGames }}</h1>
                    <p class="h3">My Games</p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myTotalPoints }}</h1>
                    <p class="h3">My Points</p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myAvgPoints }}</h1>
                    <p class="h3">My Avgerage</p>
                </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->

            <div class="row mt-4 mb-4">
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myTotalWins }}</h1>
                    <p class="h3">My Wins</p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myTotalDraws }}</h1>
                    <p class="h3">My Draws</p>
                </div><!-- /.col-lg-4 -->
                <div class="col-lg-4">
                    <h1 class="text-muted">#{{ myTotalLosses }}</h1>
                    <p class="h3">My Losses</p>
                </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->
        </div>

        <div class="jumbotron" v-else>
            <div class="alert alert-info">
                <h2>
                    <router-link to="/login"><strong>Login</strong></router-link> to see your statistics...
                </h2>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Statistics',
    data () {
        return {
            msg: 'Statistics Page',
            totalPlayers: 0,
            totalGames: 0,
            myTotalGames: 0,
            myTotalWins: 0,
            myTotalLosses: 0,
            myTotalDraws: 0,
            myTotalPoints: 0,
            myAvgPoints: 0
        }
    },
    methods: {
        getPlatformPlayers(){
            axios.get('http://188.166.89.174/api/stats/players').then(response =>{
                this.totalPlayers = response.data.count;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        getPlatformGames(){
            axios.get('http://188.166.89.174/api/stats/games').then(response =>{
                this.totalGames = response.data.count;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        getMyStats(){
            axios.get('http://188.166.89.174/api/stats/players-games/' + this.$root.$data['loggedUser'].id).then(response =>{
                this.myTotalPoints = response.data.total_points;
                this.myTotalGames = response.data.total_games_played;
                this.myAvgPoints = response.data.avrg_points;
                this.myTotalWins = response.data.total_wins;
                this.myTotalDraws = response.data.total_draws || 'NaN';
                this.myTotalLosses = response.data.total_losses;
            })
            .catch(err =>{
                console.log(err);
            });
        }
    },
    mounted(){
        this.getPlatformPlayers();
        this.getPlatformGames();
        if(this.$root.$data['loggedUser'] != null)
            this.getMyStats();
    }
}
</script>

<style>
</style>
