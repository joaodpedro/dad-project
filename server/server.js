//setup ======================================================================
require('dotenv').config()

var express  = require('express');
var app      = express();
var server   = require('http').createServer(app);
var dbhelper = require('./app/dbhelper');
var db       = new dbhelper();
var io       = require('./app/sockets')(server, db);
var port     = process.env.PORT || 8080;
var path     = require('path');
var passport = require('passport');

var morgan       = require('morgan');
var cors         = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var helmet       = require('helmet');

//configuration ================================================================
require('./app/passport')(passport, db);
app.use(morgan('dev')); // log every request to the console
app.use(cors());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // get information from html forms

// required for passport
//https://github.com/expressjs/session#options
app.use(session({ secret: process.env.SESSION_SECRET || 'mysecret', // session secret
                  resave: false, //Forces the session to be saved back to the session store
                  saveUninitialized: false })); //Forces a session that is "uninitialized" to be saved to the store
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(helmet());

app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'dist')));

// routes ======================================================================
var test = require('./app/routes/test')(express.Router(), passport, db)
var auth = require('./app/routes/auth')(express.Router(), passport, db)
var users = require('./app/routes/users')(express.Router(), passport, db)
app.use(process.env.API_SUFFIX + '/test', test);
app.use(process.env.API_SUFFIX + '/', auth);
app.use(process.env.API_SUFFIX + '/users', users);

// launch ======================================================================
server.listen(port, function(){
    console.log('Server starting...\nExpress server running on port ' + port);
});