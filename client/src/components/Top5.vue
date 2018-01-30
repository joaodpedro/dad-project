<template>
    <div class="top5">
        <h1>{{ msg }}</h1>

        <div class="row justify-content-center mb-5">
            <div class="col-8">
                <h4 class="text-left">Top 5 PLayer w/ Most Points</h4><hr/>

                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="player in mostPoints" :key="player.id">
                            <th scope="row">{{ player.id }}</th>
                            <td>{{ player.name }}</td>
                            <td>{{ player.nickname }}</td>
                            <td>{{ player.total_points }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row justify-content-center mt-5 mb-5">
            <div class="col-8">
                <h4 class="text-left">Top 5 PLayer w/ Most Games</h4><hr/>

                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Total Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="player in mostGames" :key="player.id">
                            <th scope="row">{{ player.id }}</th>
                            <td>{{ player.name }}</td>
                            <td>{{ player.nickname }}</td>
                            <td>{{ player.total_games_played }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row justify-content-center mt-5">
            <div class="col-8">
                <h4 class="text-left">Top 5 PLayer w/ Best Average</h4><hr/>

                <table class="table table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Avg. Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="player in bestAvg" :key="player.id">
                            <th scope="row">{{ player.id }}</th>
                            <td>{{ player.name }}</td>
                            <td>{{ player.nickname }}</td>
                            <td>{{ player.avrg }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Top5',
    data () {
        return {
            msg: 'Top 5\'s Page',
            mostPoints: [],
            mostGames: [],
            bestAvg: []
        }
    },
    methods: {
        getTop5Points(){
            axios.get('http://localhost:8080/api/stats/top5-points').then(response =>{
                this.mostPoints = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        getTop5Games(){
            axios.get('http://localhost:8080/api/stats/top5-games').then(response =>{
                this.mostGames = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        getTop5Avg(){
            axios.get('http://localhost:8080/api/stats/top5-avg').then(response =>{
                this.bestAvg = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        }
    },
    mounted(){
        this.getTop5Points();
        this.getTop5Games();
        this.getTop5Avg();
    }
}
</script>

<style>
</style>