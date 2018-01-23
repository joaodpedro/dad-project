exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('decks').del()
    .then(function () {
        // Inserts seed entries
        knex('config').where({id: 1}).first().then(function(row){
            return knex('decks').insert({
                name: 'Default deck',
                hidden_face_img_path: row.img_base_path + 'default/semFace.png',
                active: true,
                complete: true
            });
        });
    });
};
