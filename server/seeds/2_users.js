//var faker = require('faker'); //faker with all locales
var faker = require('../node_modules/faker/locale/en') //faker using only en
var bcrypt = require('bcrypt-nodejs');

let createRecord = function(knex){
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    return knex('users').insert({
        name:  firstName +" "+ lastName,
        email: faker.internet.email(firstName, lastName, 'gmail.com'),
        password: bcrypt.hashSync('password_dad', bcrypt.genSaltSync(8)),
        nickname: faker.internet.userName(firstName, lastName),
        blocked: false
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            let records = [];

            records.push(knex('users').insert({
                name: 'Administrator',
                email: 'admin@mail.dad',
                password: bcrypt.hashSync('secret', bcrypt.genSaltSync(8)),
                nickname: 'admin',
                admin: true,
                blocked: false
            }));
            for(let i=1; i < 6; i++){
                records.push(createRecord(knex));
            }
	  
            return Promise.all(records);
    });
};
