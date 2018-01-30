var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/games-day', function(req, res){
        db.getGamesByDay(function(err, results){
            return helper.handleResponse(res, err, results);
        });
    });

    router.get('/days', function(req, res){
        db.getDistinctGameDays(function(err, days){
            return helper.handleResponse(res, err, days);
        });
    });

    router.get('/games', function(req, res){
        db.getTotalGames(function(err, results){
            return helper.handleResponse(res, err, results);
        });
    });

    router.get('/players', function(req, res){
        db.getTotalPlayers(function(err, results){
            return helper.handleResponse(res, err, results);
        });
    });

    router.get('/top5-games', function(req, res){
        db.getTop5MostGames(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/top5-points', function(req, res){
        db.getTop5MostPoints(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/top5-avg', function(req, res){
        db.getTop5BestPointAverage(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/players-games', function(req, res){
        db.getAllPlayersGameStats(function(err, results){
            return helper.handleResponse(res, err, results);
        });
    });

    router.get('/players-games/:id', function(req, res){
        db.getPlayerGameStats(req.params.id, function(err, results){
            return helper.handleResponse(res, err, results);
        });
    });

    return router;
}