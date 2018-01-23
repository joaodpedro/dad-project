exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('config').del()
    .then(function () {
        // Inserts seed entries
        return knex('config').insert({
            platform_email: 'blackjack-game@dad.mail',
            img_base_path: 'img/decks/'
        });
    });
};
