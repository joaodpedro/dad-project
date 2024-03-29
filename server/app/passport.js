var LocalStrategy   = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, db){

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, 
        function(req, username, password, done){
            db.getUserByUsername(username, function(err, user){
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
                var userWithoutPass = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    nickname: user.nickname,
                    admin: user.admin,
                    blocked: user.blocked,
                    reason_blocked: user.reason_blocked,
                    reason_reactivated: user.reason_reactivated,
                    total_points: user.total_points,
                    total_games_played: user.total_games_played,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                };
                return done(null, userWithoutPass);
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        if(!user){ return done(null, false); }
        done(null, user);
    });    
}