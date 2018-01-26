module.exports = {
    handleResponse: function (res, err, data){
        if(err){
            console.log('**ERR_CODE:%s [%s]:: %s', err.errno, err.code, err.message);
            switch(err.errno){
                case 1062: return res.status(409).json({message: 'Conflict detected! Entity already exists.'});
                case -11: return res.status(403).json({message: 'Credentials don\'t match'});
                case -12: return res.status(404).json({message: 'Reset token has expired'});
                case -13: return res.status(404).json({message: 'That email doesn\'t seem to be registered'});
                default: return res.status(500).json({message: 'Oops! An unexpected error occurred'});
            }
        }
        return res.json(data);
    },
    
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated() && !req.user.blocked)
            return next();
        
        res.status(401).json({message: 'Unauthorized'});
    },
    
    isAdmin: function (req, res, next){
        if(req.isAuthenticated() && req.user.admin && !req.user.blocked)
            return next();
        
        res.status(401).json({message: 'Unauthorized'});
    }
}