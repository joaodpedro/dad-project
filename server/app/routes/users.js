var helper = require('../route-security-helper');
var mailer = require('../mailer');

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

    router.put('/:id/password', /*helper.isLoggedIn,*/ function(req, res){
        db.updateUserPassword(req.params.id, req.body, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Password changed'});
        });
    });

    router.put('/:id/email', /*helper.isLoggedIn,*/ function(req, res){
        db.updateUserEmail(req.params.id, req.body.email, function(err, result){
            return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Email changed'});
        });
    });

    router.put('/:id/block', /*helper.isAdmin,*/ function(req, res){
        db.getPlatformEmail(function(err, email){
            db.blockUser(req.params.id, req.body.reason_blocked, function(err, result){
                mailer.sendTextMail(email, req.body.email, 'Blocked account', 'Your account as been blocked by an administrator.\nReason: ' + req.body.reason_blocked);
                return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Blocked'});
            });
        });
    });

    router.put('/:id/reactivate', /*helper.isAdmin,*/ function(req, res){
        db.getPlatformEmail(function(err, email){
            db.reactivateUser(req.params.id, req.body.reason_reactivated, function(err, result){
                mailer.sendTextMail(email, req.body.email, 'Account reactivated', 'Your account as been reactivated by an administrator.\nReason: ' + req.body.reason_reactivated);
                return helper.handleResponse(res, err, {rows: result.affectedRows, message:'Reactivated'});
            });
        });
    });

    router.delete('/:id', /*helper.isAdmin,*/ function(req, res){
        db.deleteUser(req.params.id, function(err, result){
            return helper.handleResponse(res, err, 'Deleted');
        });
    });

    return router;
}