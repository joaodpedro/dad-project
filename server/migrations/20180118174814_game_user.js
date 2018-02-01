exports.up = function(knex, Promise) {
    return knex.schema.createTable('game_user', function(table){
        table.integer('game_id').unsigned().references('games.id').onDelete('cascade')
        table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
        table.boolean('winner').defaultTo(false)
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('game_user');
};
