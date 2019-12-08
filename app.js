var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userLogin =require('./routes/login');
var categoryRouter=require('./routes/category');
var seederRouter= require('./routes/seeder');
let mongoose = require('mongoose');
mongoose.connect("mongodb+srv://letrungtiennbk9:Trungtienle9@cluster0-hjpbg.mongodb.net/ChoLon?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error.....'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',userLogin);
app.use('/category',categoryRouter);
app.use('/seeder',seederRouter);

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
  res.render('error');
});

module.exports = app;
