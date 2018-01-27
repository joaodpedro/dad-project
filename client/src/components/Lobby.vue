<template>
    <div class="lobby">
        
        <div class="row mt-4 mb-2">
            <div class="col-12">
                <button class="btn btn-success btn-lg float-right"  v-on:click.prevent="create()">Create New Game</button>
            </div>
            <div class="col-12 mt-2">
                <div class="alert" :class="this.$parent.alertType" v-if="this.$parent.message" 
                    v-html="this.$parent.message" role="alert" ></div>
            </div>
        </div>

        <table class="table table-hover table-striped">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Players</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="game in games" :key="game.id">
                    <th scope="row">{{ game.id }}</th>
                    <td>{{ game.nickname }}</td>
                    <td>{{ game.created_at }}</td>
                    <td>{{ game.total_players }}/4</td>
                    <td>
                        <button class="btn btn-primary btn-sm" v-on:click.prevent="join(game)">Join</button> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['games'],
    data: function(){
        return {
            title: 'Lobby'
        }
    },		
    methods: {
        join(game) {
            if(!this.$parent.activeGames.some(g => g.id === game.id)){
                this.$emit('join-click', game);
            }else{
                this.$parent.sendNotification('You have already joined this game!<br/>Wait for the creator to start it', 'alert-warning')
            }
        },	
        create() {
           	this.$emit('create-click');
        },	
    }
}
</script>

<style>
</style>
