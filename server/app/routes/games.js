
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

    router.post('/joinGame',function(req, res){
        db.joinGame(req.body,function(err, result){
            db.updateTotalPlayer(req.body.game,function(err, result){
                var data = {
                    rows: result ? result.affectedRows : 0, 
                    id: result ? result.insertId : -1 };
                return helper.handleResponse(res, err, data);   
            })
        });
    });


    return router;
}