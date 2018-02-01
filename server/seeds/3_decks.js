
let createRecord = function(knex, deck){
    return knex('decks').insert({
        name: deck.name, 
        hidden_face_img_path: 'img/decks/default/semFace.png',
        active: deck.active, 
        complete: deck.complete
    });
}

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
        // Inserts seed entries
        let records = [];
        let decks = [
            { name: 'Default deck', active: true, complete: true},
            { name: 'Baralho incomplete', active: true, complete: true},
            { name: 'Baralho shiny', active: false, complete: false}
        ];

        for(let deck of decks){
            records.push(createRecord(knex, deck));
        }

        return Promise.all(records);
    });
};
