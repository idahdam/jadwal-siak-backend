var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dotenv = require('dotenv')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

const env = process.env

dotenv.config();

var app = express();
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
})
.catch(err => {
  console.error('Error connecting to mongo', err)
});
app.use(bodyParser.urlencoded())

// app.use(fileUpload({
//   createParentPath: true
// }))
app.use(cors())
app.use(morgan('dev'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
