exports.up = function(knex, Promise) {
    return knex.schema.createTable('pwd_resets', function(table){
        table.string('email').notNullable()
        table.string('token').notNullable()
        table.dateTime('expires')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('pwd_resets')
};