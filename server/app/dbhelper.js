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
            callback(err, results[0]);
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

    updateUserPassword(id, passwords, callback){
        connection.execute('SELECT password FROM `users` WHERE id = ?;', [id], function(err, results, fields){
            if(bcrypt.compareSync(passwords.old_pass, results[0].password)){
                connection.execute('UPDATE `users` SET password = ?, updated_at = NOW() WHERE id = ?;', 
                [bcrypt.hashSync(passwords.new_pass, bcrypt.genSaltSync(8)), id], 
                function(err1, results1, fields1){
                    callback(err1, results1);
                });   
            }else{
                if(!err)
                    err = {errno:-11, code:'BAD_CREDEN', message:'Credentials don\'t match'};
                callback(err, results);
            }
        });
    }

    updateUserEmail(id, email, callback){
        connection.execute('UPDATE `users` SET email = ?, updated_at = NOW() WHERE id = ?;', 
        [email, id], 
        function(err, results, fields){
            callback(err, results);
        });
    }

    blockUser(id, reason_blocked, callback){
        connection.execute('UPDATE `users` SET blocked = 1, reason_blocked = ?, reason_reactivated = NULL, updated_at = NOW() WHERE id = ?;', 
        [reason_blocked, id], 
        function(err, results, fields){
            callback(err, results);
        });
    }

    reactivateUser(id, reason_reactivated, callback){
        connection.execute('UPDATE `users` SET blocked = 0, reason_blocked = NULL, reason_reactivated = ?, updated_at = NOW() WHERE id = ?;', 
        [reason_reactivated, id], 
        function(err, results, fields){
            callback(err, results);
        });
    }

    deleteUser(id, callback){
        connection.execute('DELETE FROM `users` WHERE id = ?;', 
        [id], 
        function(err, results, fields){
            callback(err, results);
        });
    }


    /*================================================================================
      ======================================GAMES=====================================
      ================================================================================*/
    getLobbyGames(callback){
        connection.execute('SELECT games.id, dad_project.users.nickname, date_format(games.created_at,"%d/%m/%Y %H:%i:%s") as created_at , games.total_players FROM dad_project.games LEFT JOIN dad_project.users ON dad_project.games.created_by = dad_project.users.id WHERE games.status = "Pending";', 
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


    /*================================================================================
      =====================================CONFIGS====================================
      ================================================================================*/
    getPlatformEmail(callback){
        connection.execute('SELECT platform_email FROM `config`;', function(err, results, fields){
            callback(err, results[0]);
        });
    }

    updatePlatformEmail(email, callback){
        connection.execute('UPDATE `config` SET platform_email = ?, updated_at = NOW();', 
        [email], 
        function(err, results, fields){
            callback(err, results);
        });
    }
}

module.exports = DbHelper;