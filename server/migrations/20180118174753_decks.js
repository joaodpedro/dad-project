exports.up = function(knex, Promise) {
    return knex.schema.createTable('decks', function(table){
        table.increments('id').unsigned()
        table.string('name').notNullable()
        table.string('hidden_face_img_path')
        table.boolean('active')
        table.boolean('complete')
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('decks');
};
