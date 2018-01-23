exports.up = function(knex, Promise) {
    return knex.schema.createTable('cards', function(table){
        table.increments('id').unsigned()
        table.enu('value', ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'])
        table.enu('suite', ['C', 'E', 'O', 'P'])
        table.integer('deck_id').unsigned().references('decks.id').onDelete('cascade')
        table.string('path')
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('cards');
};