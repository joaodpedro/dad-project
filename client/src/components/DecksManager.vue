<template>
    <div class="decks">
        <h1>{{ msg }}</h1>

        <div class="alert" :class="deckAlertType" v-html="deckAlertMessage" v-if="deckAlertMessage" role="alert"></div>
        
        <div class="card">
            <div class="card-header">
                <button class="btn btn-success btn-lg float-right">Create new deck</button>
            </div>
            <div class="card-body">
                <table class="table table-hover table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Back Face</th>
                            <th scope="col">Active?</th>
                            <th scope="col">Complete?</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deck in decks" :key="deck.id">
                            <th scope="row">{{ deck.id }}</th>
                            <td>{{ deck.name }}</td>
                            <td><img :src="'http://localhost:8080/static/'+deck.hidden_face_img_path" 
                                    alt="Back face" width="26px" height="40px"></td>
                            <td>{{ deck.active ? 'Active': 'Inactive' }}</td>
                            <td>{{ deck.complete ? 'Yes' : 'No' }}</td>
                            <td>
                                <button class="btn btn-success btn-sm" v-if="!deck.active" @click="activate(deck)">Set Active</button>
                                <button class="btn btn-warning btn-sm" v-else @click="deactivate(deck)">Set Inactive</button>
                                <button class="btn btn-danger btn-sm" @click="deleteDeck(deck)">Remove</button>
                                <button class="btn btn-info btn-sm" @click="showDeck(deck)">See deck &#8811;</button>
                            </td>
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
    name: 'Decks',
    data () {
        return {
            msg: 'Decks page',
            decks: [],
            deck: null,
            deckAlertMessage: '',
            deckAlertType: ''
        }
    },
    methods: {
        getDecks(){
            axios.get('http://localhost:8080/api/decks').then(response =>{
                this.decks = response.data;
            })
            .catch(err =>{
                console.log(err);
            });
        },
        createDeck(){
            axios.post('http://localhost:8080/api/decks', this.deck).then(response =>{
                console.log(response.data);
                this.getDecks();
            })
            .catch(err =>{
                console.log(err);
            });
        },
        deleteDeck(deck){
            if(deck.id === 1){
                this.sendNotification('Can\'t remove the <strong>default</strong> deck', 'alert-warning');
                return;
            }
            axios.delete('http://localhost:8080/api/decks/' + deck.id).then(response =>{
                this.sendNotification('Deck \'#'+ deck.id +' ' + deck.name +'\' successfully removed!', 'alert-success');
                this.getDecks();
            })
            .catch(err =>{
                console.log(err);
            });
        },
        activate(deck){
            deck.active = 1;
            axios.put('http://localhost:8080/api/decks/' + deck.id, deck).then(response =>{
                this.sendNotification('Deck \'#'+ deck.id +' ' + deck.name +'\' successfully activated!', 'alert-success');
                this.getDecks();
            })
            .catch(err =>{
                console.log(err);
            });
        },
        deactivate(deck){
            deck.active = 0;
            axios.put('http://localhost:8080/api/decks/' + deck.id, deck).then(response =>{
                this.sendNotification('Deck \'#'+ deck.id +' ' + deck.name +'\' successfully deactivated!', 'alert-success');
                this.getDecks();
            })
            .catch(err =>{
                console.log(err);
            });
        },
        showDeck(deck){
            this.$router.push('/decks/' + deck.id);
        },
        sendNotification(message, alertType){
            this.deckAlertMessage = message;
            this.deckAlertType = alertType;
            setTimeout(() =>{ this.deckAlertMessage = ''; this.deckAlertType = ''; }, 3000);
        }
    },
    mounted(){
        this.getDecks();
    }
}
</script>

<style>
</style>