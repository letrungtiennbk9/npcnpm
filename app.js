var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
var MongoStore =require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category');
var seederRouter= require('./routes/seeder');
var productRouter = require('./routes/product');

const authMiddleware=require('./middlewares/auth');

let mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect("mongodb+srv://tien:tien@cluster0-hjpbg.mongodb.net/nmcnpm?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({mongooseConnection:mongoose.connection}),
		cookie:{maxAge: 180*60*100000}
	})
	);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
	if (req.isAuthenticated()) {
		res.locals.user=req.user;
	}
	else{
		res.locals.user=null;
	}
	res.locals.getDateCreated = function(date_time){
		var dd = String(date_time.getDate()).padStart(2, '0');
		var mm = String(date_time.getMonth() + 1).padStart(2, '0');
		var yyyy = date_time.getFullYear();
		return dd + '/' + mm + '/' + yyyy;
	}
	next();
})


app.use('/', indexRouter);
app.use('/users',authMiddleware, usersRouter);
app.use('/category',categoryRouter);
app.use('/seeder',seederRouter);
app.use('/product',productRouter);
// app.use('/seeder',seederRouter);

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
