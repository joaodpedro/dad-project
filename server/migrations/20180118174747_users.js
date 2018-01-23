exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table){
        table.increments('id').unsigned()
        table.string('name').notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.string('nickname').unique().notNullable()
        table.boolean('admin').defaultTo(false)
        table.boolean('blocked').defaultTo(true)
        table.string('reason_blocked')
        table.string('reason_reactivated')
        table.integer('total_points').unsigned().defaultTo(0)
        table.integer('total_games_played').unsigned().defaultTo(0)
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
