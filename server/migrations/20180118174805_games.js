exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function(table){
        table.increments('id').unsigned()
        table.enu('status', ['Pending', 'Active', 'Finished']).defaultTo('Pending')
        table.integer('total_players').unsigned().defaultTo(1)
        table.integer('created_by').unsigned().references('users.id').onDelete('cascade')
        table.integer('deck_used').unsigned().references('decks.id').onDelete('set null')
        table.timestamps(true, true)
    });  
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('games');
};

