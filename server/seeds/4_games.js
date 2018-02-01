
let createRecord = function(knex, game){
    return knex('games').insert({
        status: game.status, 
        total_players: game.total_players, 
        created_by: game.created_by,
        deck_used: game.deck_used, 
        created_at: game.created_at
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('games').del()
        .then(function () {
            // Inserts seed entries
            let records = [];
            let games = [
                {status: 'Finished', total_players: 3, created_by: 1, deck_used: 1, created_at: new Date('2018-01-23T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 3, deck_used: 1, created_at: new Date('2018-01-23T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 6, deck_used: 1, created_at: new Date('2018-01-23T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 2, deck_used: 3, created_at: new Date('2018-01-25T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 4, deck_used: 3, created_at: new Date('2018-01-25T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 5, deck_used: 1, created_at: new Date('2018-01-25T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 2, deck_used: 1, created_at: new Date('2018-01-25T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 6, deck_used: 3, created_at: new Date('2018-01-26T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 2, deck_used: 1, created_at: new Date('2018-01-26T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 2, deck_used: 3, created_at: new Date('2018-01-26T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 4, deck_used: 1, created_at: new Date('2018-01-26T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 4, deck_used: 3, created_at: new Date('2018-01-26T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 6, deck_used: 3, created_at: new Date('2018-01-28T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 3, deck_used: 1, created_at: new Date('2018-01-28T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 3, deck_used: 1, created_at: new Date('2018-01-30T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 3, deck_used: 1, created_at: new Date('2018-01-30T00:15:30Z')},
                {status: 'Finished', total_players: 4, created_by: 6, deck_used: 1, created_at: new Date('2018-01-30T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 2, deck_used: 3, created_at: new Date('2018-01-30T00:15:30Z')},
                {status: 'Finished', total_players: 3, created_by: 4, deck_used: 3, created_at: new Date('2018-01-30T00:15:30Z')},
                {status: 'Finished', total_players: 2, created_by: 5, deck_used: 3, created_at: new Date('2018-01-31T00:15:30Z')},
                {status: 'Pending', total_players: 1, created_by: 1, deck_used: 1, created_at: new Date('2018-01-31T00:15:30Z')},
                {status: 'Pending', total_players: 1, created_by: 2, deck_used: 1, created_at: new Date('2018-01-31T00:15:30Z')},
                {status: 'Pending', total_players: 1, created_by: 3, deck_used: 3, created_at: new Date('2018-01-31T00:15:30Z')},
                {status: 'Pending', total_players: 1, created_by: 4, deck_used: 1, created_at: new Date('2018-01-31T00:15:30Z')},
                {status: 'Pending', total_players: 1, created_by: 5, deck_used: 3, created_at: new Date('2018-01-31T00:15:30Z')}
            ];

            for(let game of games){
                records.push(createRecord(knex, game));
            }
	  
            return Promise.all(records);
    });
};
