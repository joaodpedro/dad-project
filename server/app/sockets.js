var dbhelper = require('./dbhelper');
var db = new dbhelper();

function logSocket(from, event, msg){
    console.log('[%s]::(%s)::%s', from, event.toUpperCase(), msg);
}

module.exports = function(server, db){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        logSocket(socket.id, 'connection', 'Socket connected');
        
        //fazer load dos jogos pendentes(lobby)
        socket.on('get_lobby_games', function(user_id){
            logSocket(socket.id, 'get_lobby_games', 'Retrieve lobby games of user#:' + user_id);
            db.getLobbyGames(user_id, function(err, games){
                socket.emit('my_lobby_games', games);
            })
        });

        socket.on('create_game', function(user_id){
            logSocket(socket.id, 'create_games', 'Create new game of user#:' + user_id);
            db.createGame(user_id, function(err, result){
                db.joinGame(result.insertId, user_id, function(erro, results){
                    socket.join('game' + result.insertId);
                    socket.emit('my_active_games_changed');
                    io.emit('lobby_change');        
                });
            });
        });

        socket.on('get_my_active_games',function(user_id){
            logSocket(socket.id, 'get_my_active_games', 'Active games of user#:' + user_id);
            db.getActiveGames(user_id,function(err,games){
                socket.emit('my_active_games', games);
            })
        });

        socket.on('join_game', function (data){
            logSocket(socket.id, 'join_game', 'User#:' + data.player_id + 'joined game #' + data.game.id);
            db.joinGame(data.game.id, data.player_id, function(err, results){
                db.updateTotalPlayer(data.game, function(err, results){
                    socket.join('game' + data.game.id);
                    io.to('game' + data.game.id).emit('my_active_games_changed');
                    io.emit('lobby_change');
                });  
            });
        });

        socket.on('get_this_game_players', function(game_id){
            logSocket(socket.id, 'get_this_game_players', 'Get players of game#:' + game_id);
            db.getGamePlayers(game_id, function(err, players){
                socket.emit('this_game_players', {gameId:game_id, ps:players});
            });
        });


    });

    return io;
}