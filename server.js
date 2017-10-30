const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

// Connect to MongoDB.
const dbConfig = require('./app/db');
mongoose.connect(dbConfig.url, {useMongoClient: true});

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

// Static resource files.
app.use(express.static(path.join(__dirname, 'app/public')));

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
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(3000);