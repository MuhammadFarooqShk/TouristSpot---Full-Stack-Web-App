var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let connectMongo=require('./mongoose');
const mongoose = require('mongoose');

connectMongo();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')
const session=require('express-session')

var app = express();

const productsRoutes = require('./routes/products');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(session({
  key:"travel",
  secret:"secret",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:400000
  }
}))


let ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productsRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


const PORT =  5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
