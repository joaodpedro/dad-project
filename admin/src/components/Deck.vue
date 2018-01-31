<template>
    <div class="deck">
        <h1>{{ msg }}</h1>

        <main role="main">
            <div class="container">
                <div class="row">
                    <div class="col-2 mb-2" v-for="card in cards" :key="card.id">
                        <div class="card">
                            <h3 class="card-header card-title">{{card.value}} {{suiteIcon(card.suite)}}</h3>
                            <div class="card-body">
                                <img class="img-fluid img-thumbnail" :src="'http://localhost:8080/static/'+card.path" alt="Card image cap">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data () {
        return {
            msg: 'Deck #'+this.$route.params.id,
            cards: []
        }
    },
    methods:{
        getCards(){
            axios.get('http://188.166.89.174/api/decks/' + this.$route.params.id + '/cards').then(response =>{
                this.cards = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        suiteIcon: function(suite){
            if(suite === 'C')
                return '♥';
            if(suite === 'P')
                return '♣';
            if(suite === 'O')
                return '♦';
            if(suite === 'E')
                return '♠';
        }
    },
    mounted(){
        this.getCards();
    }
}
</script>

<style>
</style>