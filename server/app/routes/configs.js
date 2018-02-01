var helper = require('../route-security-helper');

module.exports = function(router, passport, db){
    router.get('/email', /*helper.isAdmin,*/ function(req, res){
        db.getPlatformEmail(function(err, email){
            return helper.handleResponse(res, err, email);
        });
    });

    router.put('/email', /*helper.isAdmin,*/ function(req, res){
        db.updatePlatformEmail(req.body.email, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Platform email changed'});
        });
    });

    return router;
}