var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.post('/login', passport.authenticate('local'), function(req, res){
        return helper.handleResponse(res, null, req.user);
    });

    router.post('/register', function(req, res){
        db.createUser(req.body, function(err, result){
            var data = {
                rows: result ? result.affectedRows : 0, 
                id: result ? result.insertId : -1 };
            return helper.handleResponse(res, err, data);
        });
    });

    router.get('/logout', function(req, res){
        req.logout();
        return res.sendStatus(204);
    });

    return router;
}