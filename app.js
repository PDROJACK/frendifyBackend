var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var cors = require('cors');
var userRoutes = require('./src/routes/userRoutes');
var chatRoutes = require('./src/routes/chatRoutes');
var app = express();
var database = require('./startups/db');
const chat = require('./src/sockets/chat');
const Config = require('./config');


const io = require("socket.io")(8080, {
  cors: {
    origin: Config[process.env.NODE_ENV].FRONTEND_ORIGIN,
  },
  methods: ["GET", "POST"]
});

database();

// view engine setup
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);
app.use('/chat', chatRoutes);

// Chat socket handler
chat(io);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
