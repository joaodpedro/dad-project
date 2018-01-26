var dbhelper = require('./dbhelper');
var db = new dbhelper();

function logSocket(from, event, msg){
    console.log('[%s]::(%s)::%s', from, event.toUpperCase(), msg);
}

module.exports = function(server, db){
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        logSocket(socket.id, 'connection', 'Socket connected');
        
        socket.on('msg', function(data){
            logSocket(socket.id, 'msg', data);
            io.emit('response', data);
        });


        //fazer Connect a um lobby
       
        
        //Fazer Refresh aos lobby's
        socket.on('LobbyRF', function(){
            logSocket(socket.id, 'rfs', "Lobby Changed");
            io.emit('lobbyChange');
        });
        //FAzer load dos jogos
        socket.on('LobbyLoad', function(user_id){
            db.getLobbyGames(user_id,function(erro,games){
                socket.emit('my_lobby_games', games);
            })
        });

        socket.on('join_game', function (data){
            db.joinGame(data.game.id,data.player_id,function(erro,results){
                db.updateTotalPlayer(data.game,function(err,results){
                    socket.join("game"+data.game.id);
                    io.to("game"+data.game.id).emit('my_active_games_changed');
                    io.emit('lobbyChange');
                });  
            });
            
        });

        socket.on('get_my_activegames',function(user_id){
            db.getActiveGames(user_id,function(err,games){
                socket.emit('my_active_games', games);
                
            })
        });

        socket.on('createGame',function(user_id){
            db.createGame(user_id,function(err,result){
                db.joinGame(result.insertId,user_id,function(erro,results){
                    socket.join("game"+result.insertId);
                    socket.emit('my_active_games_changed');
                    io.emit('lobbyChange');        
                });
            });
        });


        socket.on('get_game_players',function(game_id){
            db.getGamePlayers(game_id,function(err,players){
                socket.emit('this_game_players', {gameId:game_id,ps:players});
            });
        });


        



        




    });

    return io;
}