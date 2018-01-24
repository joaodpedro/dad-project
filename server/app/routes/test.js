var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/', function(req, res){
        db.getUsers(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/about', helper.isAdmin, function(req, res){
        res.send('CENAS CENAS about');
    });

    router.get('/:id', function(req, res){
        res.send('CENAS CENAS ' + req.params.id);
    });

    return router;
}