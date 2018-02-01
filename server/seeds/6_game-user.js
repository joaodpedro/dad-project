
let createRecord = function(knex, line){
    return knex('game_user').insert(
        {
            game_id: line.game_id,
            user_id: line.user_id,
            winner: line.winner
        }
    );
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('game_user').del()
        .then(function () {
            // Inserts seed entries
            let records = [];
            let lines = [
                {game_id: 1, user_id: 1, winner: 1},
                {game_id: 1, user_id: 2, winner: 0},
                {game_id: 1, user_id: 4, winner: 0},
                {game_id: 2, user_id: 3, winner: 1},
                {game_id: 2, user_id: 5, winner: 0},
                {game_id: 2, user_id: 6, winner: 0},
                {game_id: 2, user_id: 2, winner: 1},
                {game_id: 3, user_id: 6, winner: 0},
                {game_id: 3, user_id: 2, winner: 1},
                {game_id: 4, user_id: 2, winner: 1},
                {game_id: 4, user_id: 3, winner: 0},
                {game_id: 4, user_id: 4, winner: 0},
                {game_id: 5, user_id: 4, winner: 1},
                {game_id: 5, user_id: 3, winner: 0},
                {game_id: 5, user_id: 5, winner: 0},
                {game_id: 5, user_id: 6, winner: 1},
                {game_id: 6, user_id: 5, winner: 0},
                {game_id: 6, user_id: 3, winner: 0},
                {game_id: 6, user_id: 4, winner: 1},
                {game_id: 6, user_id: 6, winner: 1},
                {game_id: 7, user_id: 2, winner: 0},
                {game_id: 7, user_id: 5, winner: 1},
                {game_id: 7, user_id: 6, winner: 1},
                {game_id: 7, user_id: 3, winner: 1},
                {game_id: 8, user_id: 6, winner: 1},
                {game_id: 8, user_id: 2, winner: 0},
                {game_id: 9, user_id: 2, winner: 0},
                {game_id: 9, user_id: 5, winner: 0},
                {game_id: 10, user_id: 2, winner: 0},
                {game_id: 10, user_id: 5, winner: 1},
                {game_id: 10, user_id: 3, winner: 1},
                {game_id: 11, user_id: 4, winner: 0},
                {game_id: 11, user_id: 5, winner: 0},
                {game_id: 12, user_id: 4, winner: 0},
                {game_id: 12, user_id: 5, winner: 0},
                {game_id: 12, user_id: 2, winner: 0},
                {game_id: 12, user_id: 6, winner: 0},
                {game_id: 13, user_id: 6, winner: 0},
                {game_id: 13, user_id: 5, winner: 0},
                {game_id: 14, user_id: 3, winner: 0},
                {game_id: 14, user_id: 5, winner: 0},
                {game_id: 14, user_id: 6, winner: 1},
                {game_id: 15, user_id: 3, winner: 0},
                {game_id: 15, user_id: 5, winner: 1},
                {game_id: 15, user_id: 6, winner: 1},
                {game_id: 16, user_id: 3, winner: 0},
                {game_id: 16, user_id: 5, winner: 0},
                {game_id: 16, user_id: 1, winner: 0},
                {game_id: 17, user_id: 6, winner: 0},
                {game_id: 17, user_id: 2, winner: 0},
                {game_id: 17, user_id: 5, winner: 0},
                {game_id: 17, user_id: 1, winner: 0},
                {game_id: 18, user_id: 2, winner: 0},
                {game_id: 18, user_id: 5, winner: 1},
                {game_id: 19, user_id: 4, winner: 0},
                {game_id: 19, user_id: 2, winner: 0},
                {game_id: 19, user_id: 5, winner: 1},
                {game_id: 20, user_id: 5, winner: 1},
                {game_id: 20, user_id: 3, winner: 0},
                {game_id: 21, user_id: 1, winner: 0},
                {game_id: 22, user_id: 2, winner: 0},
                {game_id: 23, user_id: 3, winner: 0},
                {game_id: 24, user_id: 4, winner: 0},
                {game_id: 25, user_id: 5, winner: 0}
            ];

            for(let line of lines){
                records.push(createRecord(knex, line));
            }
	  
            return Promise.all(records);
    });
};
