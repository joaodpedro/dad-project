exports.up = function(knex, Promise) {
    return knex.schema.createTable('config', function(table){
        table.increments('id').unsigned()
        table.string('platform_email').unique().notNullable()
        //table.string('platform_email_properties').notNullable()
        table.string('img_base_path').notNullable()
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('config');
};