const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./data/database');
const util = require('util');

mongoose.connect(config.database, {
   useCreateIndex: true,
   useNewUrlParser: true
});
let db = mongoose.connection;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
   secret: 'keyboard',
   resave: true,
   saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res);
   next();
});

//Express validator Middleware
app.use(expressValidator({
   errorFormatter: function (param, msg, value) {
      let namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root;

      while (namespace.length) {
         formParam += '[' + namespace.shift() + ']';
      }
      return {
         param: formParam,
         msg: msg,
         value: value
      };
   }
}));
//Passport Config
require('./data/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Set global for user
app.use(function (req, res, next) {
   res.locals.login = req.isAuthenticated();
   next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);

const server = app.listen(3000, '0.0.0.0', function () {
   let host = server.address().address;
   let port = server.address().port;

   console.log('Server run on http://%s:%s/', host, port);
});


//Socket.io
let io = require('socket.io')(server, {});

//Listen on every connection
io.on('connection', function (socket) {
   //console.log(socket)
});

module.exports = app;
