var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/', /*helper.isAdmin,*/ function(req, res){
        db.getUsers(function(err, users){
            return helper.handleResponse(res, err, users);
        });
    });

    router.get('/:id', /*helper.isLoggedIn,*/ function(req, res){
        db.getUserById(req.params.id, function(err, user){
            return helper.handleResponse(res, err, user);
        });
    });

    return router;
}