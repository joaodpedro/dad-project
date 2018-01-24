require('dotenv').config();
var bcrypt = require('bcrypt-nodejs');

var mysql      = require('mysql2');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

class DbHelper{
    
    /*================================================================================
      ======================================USERS=====================================
      ================================================================================*/
      getUsers(callback){
        connection.execute('SELECT id, name, email, nickname, admin, blocked, reason_blocked, reason_reactivated, total_points, total_games_played, created_at, updated_at FROM `users` WHERE admin = 0;', 
          function(err, results, fields) {
            callback(err, results);
        });
    }

    getUserById(id, callback){
        connection.execute('SELECT id, name, email, nickname, admin, blocked, reason_blocked, reason_reactivated, total_points, total_games_played, created_at, updated_at FROM `users` WHERE id = ?;', 
          [id], 
          function(err, results, fields) {
            callback(err, results);
        });
    }

    getUserByUsername(username, callback){
        connection.execute('SELECT * FROM `users` WHERE (nickname = ? OR email = ?) AND blocked = 0;', 
          [username, username], 
          function(err, results, fields) {
            callback(err, results[0]);
        });
    }

    createUser(user, callback){
        connection.execute('INSERT INTO `users`(name, email, password, nickname) VALUES(?, ?, ?, ?);', 
          [user.name, user.email, bcrypt.hashSync(user.password, bcrypt.genSaltSync(8)), user.nickname], 
          function(err, results, fields){
            callback(err, results);
        });
    }


    /*================================================================================
      ======================================GAMES=====================================
      ================================================================================*/
      getLobbyGames(callback){
        connection.execute('SELECT games.id, dad_project.users.nickname, date_format(games.created_at,"%d/%m/%Y %H:%i:%s") as created_at , games.total_players FROM dad_project.games LEFT JOIN dad_project.users ON dad_project.games.created_by = dad_project.users.id WHERE games.status = "Pending"', 
          function(err, results, fields) {
            callback(err, results);
        });
    }

    createGame(game, callback){
        connection.execute('INSERT INTO dad_project.games(created_by, deck_used) VALUES(?, ?);', 
          [game.createdBy, game.deckUse], 
          function(err, results, fields){
            callback(err, results);
        });
    }


    joinGame(game, callback){
        connection.execute('INSERT INTO dad_project.game_user(game_id, user_id) VALUES(?, ?);', 
          [game.game.id, game.user , game.game.total_players, game.game.id], 
          function(err, results, fields){
            callback(err, results);
        });
    }
    
    updateTotalPlayer(game, callback){
        connection.execute('UPDATE dad_project.games SET total_players = ? WHERE id = ?;', 
          [game.total_players, game.id], 
          function(err, results, fields){
            callback(err, results);
        });
    }
}

module.exports = DbHelper;