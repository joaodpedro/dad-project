let createRecord = function(knex){
    return knex('games').insert({
        deck_used: 1,
        created_by: Math.floor(Math.random(1) * Math.floor(5)) + 2
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('games').del()
        .then(function () {
            // Inserts seed entries
            let records = [];

            for(let i=1; i < 12; i++){
                records.push(createRecord(knex));
            }
	  
            return Promise.all(records);
    });
};
