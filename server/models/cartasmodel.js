class carta{
    constructor(id,face,naipe,deck_id,path,value) {
        this.cartaID = id;
        this.face = face;
        this.naipe= naipe;
        this.deck_id = deck_id;
        this.path = path;
        this.value = getCardValue(face);
    }
    getCardValue(value){
        face=='K' || face=='J' || face=='K' ? value=10 : (face=='A' ? value=11 : value=face);
    }
}


module.exports = carta;