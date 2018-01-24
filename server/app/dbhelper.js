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
        connection.execute('SELECT id, name, email, nickname, admin, blocked, reason_blocked, reason_reactivated, total_points, total_games_played, created_at, updated_at FROM `users` WHERE admin = 0', 
          function(err, results, fields) {
            callback(err, results);
        });
    }

    getUserById(id, callback){
        connection.execute('SELECT id, name, email, nickname, admin, blocked, reason_blocked, reason_reactivated, total_points, total_games_played, created_at, updated_at FROM `users` WHERE id = ?', 
          [id], 
          function(err, results, fields) {
            callback(err, results);
        });
    }

    getUserByUsername(username, callback){
        connection.execute('SELECT * FROM `users` WHERE nickname = ? OR email = ?', 
          [username, username], 
          function(err, results, fields) {
            callback(err, results[0]);
        });
    }

    createUser(user, callback){
        connection.execute('INSERT INTO `users`(name, email, password, nickname) VALUES(?, ?, ?, ?)', 
          [user.name, user.email, bcrypt.hashSync(user.password, bcrypt.genSaltSync(8)), user.nickname], 
          function(err, results, fields){
            callback(err, results);
        });
    }


    /*================================================================================
      ======================================GAMES=====================================
      ================================================================================*/
}

module.exports = DbHelper;