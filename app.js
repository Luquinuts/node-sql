var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clientRouter = require('./routes/client');
var queryRouter = require('./routes/query');
var app = express();

var expressHbs = require('express-handlebars');
var hbsHelpers = expressHbs.create({
  helpers: require ('./helpers/handlebars/handlebars.js'),
  defaultLayout: path.join(__dirname, '/views/layout.hbs'),
  extname: '.hbs'
});
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbsHelpers.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'flashblog',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use((req, res, next) =>{
  app.locals.success = req.flash('success');
  app.locals.error = req.flash('error');
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/client', clientRouter);
app.use('/query', queryRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
