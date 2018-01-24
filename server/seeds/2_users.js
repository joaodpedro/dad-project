//var faker = require('faker'); //faker with all locales
var faker = require('../node_modules/faker/locale/en') //faker using only en
var bcrypt = require('bcrypt-nodejs');

let createRecord = function(knex, index){
    var firstName = faker.name.firstName();
    var lastName = faker.name.lastName();
    var pass = index===1 ? 'secret' : 'password_dad';
    return knex('users').insert({
        name:  index===1 ? 'Administrator' : firstName +" "+ lastName,
        email: index===1 ? 'admin@mail.dad' : 'user'+index+'@gmail.com',
        password: bcrypt.hashSync(pass, bcrypt.genSaltSync(8)),
        nickname: index===1 ? 'admin' : 'user'+index,
        admin: index===1 ? true : false,
        blocked: false
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            let records = [];

            for(let i=1; i < 7; i++){
                records.push(createRecord(knex, i));
            }
	  
            return Promise.all(records);
    });
};
