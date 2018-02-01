
//var faker = require('faker'); //faker with all locales
var faker = require('../node_modules/faker/locale/en') //faker using only en
var bcrypt = require('bcrypt-nodejs');

let hash = function(pass){
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(8));
}

let createRecord = function(knex, user){
    return knex('users').insert({
        name: user.name, 
        email: user.email, 
        password: user.password, 
        nickname: user.nickname, 
        admin: user.admin, 
        blocked: user.blocked, 
        total_points: user.total_points, 
        total_games_played: user.total_games_played
    });
}

exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            let records = [];
            let users = [
                {name: 'Administrator', email: 'admin@mail.dad', password: hash('secret'), nickname: 'admin', admin: true, blocked: false, total_points: 999, total_games_played: 3},
                {name: faker.name.firstName()+' '+faker.name.lastName(), email: 'user2@gmail.com', password: hash('password_dad'), nickname: 'user2', admin: false, blocked: false, total_points: 350, total_games_played: 12},
                {name: faker.name.firstName()+' '+faker.name.lastName(), email: 'user3@gmail.com', password: hash('password_dad'), nickname: 'user3', admin: false, blocked: false, total_points: 250, total_games_played: 10},
                {name: faker.name.firstName()+' '+faker.name.lastName(), email: 'user4@gmail.com', password: hash('password_dad'), nickname: 'user4', admin: false, blocked: false, total_points: 100, total_games_played: 7},
                {name: faker.name.firstName()+' '+faker.name.lastName(), email: 'user5@gmail.com', password: hash('password_dad'), nickname: 'user5', admin: false, blocked: false, total_points: 450, total_games_played: 16},
                {name: faker.name.firstName()+' '+faker.name.lastName(), email: 'user6@gmail.com', password: hash('password_dad'), nickname: 'user6', admin: false, blocked: false, total_points: 300, total_games_played: 11}
            ];

            for(let user of users){
                records.push(createRecord(knex, user));
            }

            return Promise.all(records);
    });
};