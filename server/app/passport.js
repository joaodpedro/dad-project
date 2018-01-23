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
                return done(null, user);
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