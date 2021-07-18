var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ==========================================

const wa = require('waweb-phi')

const client = new wa({
    puppeteer: { headless: false }, //change it to true if u want hidding the chrome/
    authTimeout: 30000,
   
});


client.initialize();


client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);

});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);

});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);


})

client.on('ready', () => {
    console.log('READY');
        client.sendMessage("6282324729095@c.us", `cie cie berhasil bales`).then((r) => {
            console.log("sendMessage",r)
        })

});


client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

});

client.on('disconnected', () => {

    console.log('Client was logged out');
})


// ===========================================

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
 