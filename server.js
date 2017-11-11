const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const User = require('./app/models/user.js');

// Connect to MongoDB.
const dbConfig = require('./app/db');
mongoose.connect(dbConfig.url, {useMongoClient: true});

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// Static resource files.
app.use('/bower_components', express.static(path.join(__dirname, 'app/public/bower_components')));
app.use('/css', express.static(path.join(__dirname, 'app/public/css')));
app.use('/img', express.static(path.join(__dirname, 'app/public/img')));

// Session handling.
app.use(session({
  secret:'secretKey',
  resave: true,
  saveUninitialized: true
}));

// Body parser configuration.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Authentication.
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./app/passport')();

app.get('/', function (req, res) {
  res.render('index', { title: 'Boomer Central', user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login', user: req.user });
});

app.post('/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Create an Account', user: req.user });
});

app.post('/signup',
  passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  })
);

app.get('/users/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err); // TODO: render 500 error page.
    else res.render('user/all', { title: 'Users', user: req.user, users: users });
  });
});

app.get('/users/:username', (req, res) => {
  User.findOne({ 'username': req.params.username }, (err, user) => {
    if (err) console.log(err); // TODO: render 500 error page.
    else if (!user) console.log('No such user.'); // TODO: render 404 error page.
    else res.render('user/show', {
      title: user.username, user: req.user, user_param: user
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
});

app.listen(3000);