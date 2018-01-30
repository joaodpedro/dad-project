var dbhelper = require('./dbhelper');
var db = new dbhelper();
var carta = require('../models/cartasmodel.js');
var gameModel = require('../models/game.js');
var baralho = [];
var cards = {};

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
                    socket.join(result.insertId);
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
                    socket.join(data.game.id);
                    socket.emit('my_active_games_changed');
                    io.to(data.game.id).emit('game_player_join', data.game.id);
                    io.emit('lobby_change');
                });  
            });
        });

        socket.on('start_this_game', function(data){
            db.startGame(data.game_id, function(err, results){
                //Dar inicio ao jogo
                db.getCards(1, function(err, results){
                    //CRIAR GAMEMODEL(data.)
                    for(var i=0 ; i < results.length ; i++){
                        baralho[i]=new carta(results[i].id, results[i].value, results[i].suite, results[i].deck_id, results[i].path);
                    }
                    
                    gameModel.shuffleDeck(baralho);
                    gameModel.giveFirstCards(data.players, cards, baralho)

                    socket.emit('cards_changed', cards);
                    io.to(data.game_id).emit('cards_changed', cards);
                    io.emit('lobby_change');
                });
            });
        });


    });
    
    return io;
}

