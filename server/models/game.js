class game{
    
    shuffleDeck(deck) {
        for(var i = 0; i < deck.length; i++) {
            var rndNo = getRandomInt(1, deck.length);
            var card = deck[i];
            deck[i] = deck[rndNo];
            deck[rndNo] = card;
        }
    }
    
    giveFirstCards(players, cards, deck){
        for(var i = players.length - 1; i >= 0; i--){
            cards[players[i].id] = deck.splice(0, 2);
        }
    }

    giveCard(player_id, cards, deck){
        cards[player_id].push(deck.splice(0, 1)[0]);
    }

}
module.exports = new game([], {});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}