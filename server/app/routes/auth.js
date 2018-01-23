module.exports = function(router, passport, db){
    router.post('/login', passport.authenticate('local'), function(req, res){
        return res.json(req.user);
    });

    router.post('/register', function(req, res){
        db.createUser(req.body, function(err, results){
            if(err){ return res.status(500).json({message: 'Oops! An unexpected error occurred'}); }
            
            console.log(results);
            return res.json({rows: results.affectedRows, id: results.insertId});
        });
    });

    router.get('/logout', function(req, res){
        req.logout();
        return res.sendStatus(204);
    });

    return router;
}