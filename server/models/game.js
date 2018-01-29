let deck = [];
let players = {};

class game{
    
    shuffleDeck(deck) {
        for(var i = 0; i < deck.length; i++) {
            var rndNo = getRandomInt(1, deck.length);
            var card = deck[i];
            deck[i] = deck[rndNo];
            deck[rndNo] = card;
        }
        this.deck = deck;
    }
    
    giveFirstCards(players){
        for(var i = players.length; i >= 0; i--){
            this.giveCard(players[i].id);
        }

        for(var i = players.length; i >= 0; i--){
            this.giveCard(players[i].id);
        }

        return this.players;
    }

    giveCard(player_id){
        if(this.players[player_id] === undefined)
            this.players[player_id]= this.deck.splice(0, 1);
        
        this.players[player_id].push(this.deck.splice(0, 1)[0]);
    }

}
module.exports = game;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}