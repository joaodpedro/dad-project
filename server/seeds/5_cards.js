let createRecord = function(knex, card_value, card_suite){
    return knex('cards').insert({
        value: card_value,
        suite: card_suite,
        deck_id: 1,
        path: 'img/decks/default/' + card_suite.toLowerCase() + card_value + '.png'
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('cards').del()
        .then(function () {
            // Inserts seed entries
            let records = [];
            
            for(let i=1; i < 14; i++){
                records.push(createRecord(knex, i, 'C'));
            }

            for(let i=1; i < 14; i++){
                records.push(createRecord(knex, i, 'O'));
            }

            for(let i=1; i < 14; i++){
                records.push(createRecord(knex, i, 'E'));
            }

            for(let i=1; i < 14; i++){
                records.push(createRecord(knex, i, 'P'));
            }
            
            return Promise.all(records); 
        });
};
