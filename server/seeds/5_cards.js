
let createRecord = function(knex, deck, card_value, card_suite){
    return knex('cards').insert(
        {
            value: card_value,
            suite: card_suite,
            deck_id: deck,
            path: 'img/decks/default/' + card_suite.toLowerCase() + card_value + '.png'
        }
    );
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('cards').del()
        .then(function () {
            // Inserts seed entries
            let records = [];
            
            for(let d=1; d < 3; d++){
                for(let i=1; i < 14; i++){
                    records.push(createRecord(knex, d, i, 'C'));
                }
            }

            for(let d=1; d < 3; d++){
                for(let i=1; i < 14; i++){
                    records.push(createRecord(knex, d, i, 'E'));
                }
            }

            for(let d=1; d < 3; d++){
                for(let i=1; i < 14; i++){
                    records.push(createRecord(knex, d, i, 'O'));
                }
            }

            for(let d=1; d < 3; d++){
                for(let i=1; i < 14; i++){
                    records.push(createRecord(knex, d, i, 'P'));
                }
            }
            
            return Promise.all(records); 
        });
};
