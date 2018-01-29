
var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/', function(req, res){
        db.getLobbyGames(function(err, games){
            return helper.handleResponse(res, err, games);
        });
    });

    router.post('/', function(req, res){
        db.createGame(req.body,function(err, result){
            var data = {
                rows: result ? result.affectedRows : 0, 
                id: result ? result.insertId : -1 };
            return helper.handleResponse(res, err, data);
        });
    });

    router.get('/:game_id/players', /*helper.isLoggedIn,*/ function(req, res){
        db.getGamePlayers(req.params.game_id, function(err, players){
            return helper.handleResponse(res, err, players);
        });
    });


    return router;
}