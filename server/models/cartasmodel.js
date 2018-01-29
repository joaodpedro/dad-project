class carta{
    constructor(id,face,naipe,deck_id,path) {
        this.cartaID = id;
        this.face = face;
        this.naipe= naipe;
        this.deck_id = deck_id;
        this.path = path;
        this.value = getCardValue(this.face);
    }
   
}


module.exports = carta;

function getCardValue(face){
    return face=='K' || face=='J' || face=='Q' ? 10 : (face=='A' ? 11 : face);
}