module.exports = function(router, passport, db){
    router.get('/', function(req, res){
        db.getUsers(function(err, results){
            return res.json(results);
        });
    });

    router.get('/about', isAdmin, function(req, res){
        res.send('CENAS CENAS about');
    });

    router.get('/:id', function(req, res){
        res.send('CENAS CENAS ' + req.params.id);
    });

    return router;
}

function isLoggedIn (req, res, next){
    if(req.isAuthenticated() && !req.user.blocked)
        return next();
    
    res.status(401).json({message: 'Unauthorized'});
}

function isAdmin (req, res, next){
    if(req.isAuthenticated() && req.user.admin && !req.user.blocked)
        return next();
    
    res.status(401).json({message: 'Unauthorized'});
}