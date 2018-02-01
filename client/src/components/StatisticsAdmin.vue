<template>
    <div class="statistics">
        <h1>{{ msg }}</h1>

        <div class="row mt-4 mb-4">
            <div class="col-lg-4">
                <h1 class="text-muted">#{{ totalGames }}</h1>
                <p class="h3">Total Games</p>
                <p></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <h1 class="text-muted">#{{ avgGamesDay }}</h1>
                <p class="h3">Avg. Games p/ Day</p>
                <p></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <h1 class="text-muted">#{{ gamesDay }}</h1>
                <p class="h3">Games p/ Day</p>
                <p></p>
            </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->

        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h1">Dashboard</h1>
        </div>

        <line-chart :chart-data="gameDaysData" :chart-labels="days"></line-chart>

        <h2>Players' statistics</h2>
        <datatable :data="playersStats" :columns="columns" 
            :query="query" :total="playersStats.length"
            :HeaderSettings="false" :Pagination="false" 
            :tbl-class="'table table-striped'"/>
    </div>
</template>

<script>
import axios from 'axios';
import LineChart from './LineChart.vue';

export default {
    name: 'Statistics',
    data (){
        return {
            msg: 'Statistics Page',
            days: [],
            gameDaysData: [],
            totalGames: 0,
            gamesDay: 0,
            avgGamesDay: 0,
            playersStats: [],
            columns: [
                { title: 'ID', field: 'id', sortable: true },
                { title: 'Name', field: 'name' },
                { title: 'Username', field: 'nickname' },
                { title: 'Total Games', field: 'total_games_played', sortable: true },
                { title: 'Total Points', field: 'total_points', sortable: true },
                { title: 'Wins', field: 'total_wins', sortable: true },
                { title: 'Losses', field: 'total_losses', sortable: true }
            ],
            query: {}
        }
    },
    methods: {
        getTotalGamesDay(){
            axios.get('http://188.166.89.174/api/stats/total-games-day').then(response =>{
                this.gamesDay = response.data.count;
                this.avgGamesDay = response.data.avg;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        getGamesDay(){
            axios.get('http://188.166.89.174/api/stats/games-day').then(response =>{
                this.days = response.data.games.map(game => game.day);
                this.gameDaysData = response.data.games.map(game => game.countday);
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
        getPlayersStats(){
            axios.get('http://188.166.89.174/api/stats/players-games').then(response =>{
                this.playersStats = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        }
    },
    watch: {
        query: {
            handler(query){
                if(query.sort && query.order == 'desc')
                    this.playersStats = this.playersStats.sort(function(a, b){
                        return a[query.sort] - b[query.sort];
                    });
                if(query.sort && query.order == 'asc')
                    this.playersStats = this.playersStats.sort(function(a, b){
                        return b[query.sort] - a[query.sort];
                    });
            },
            deep: true
        }
    },
    components: {
        LineChart
    },
    mounted(){
        this.getGamesDay();
        this.getTotalGamesDay();
        this.getPlatformGames();
        this.getPlayersStats();
    }
}
</script>

<style>
</style>
