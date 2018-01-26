<template>
    <div class="lobby">
        <div class="row">
            <button class="btn btn-primary btn-sm" @click="createGame()">Create Game</button>
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
export default {
		props: ['games'],
        methods: {
            join(game) {
            	this.$emit('join-click', game);
            },		
        },		
	}
</script>

<style>
</style>
