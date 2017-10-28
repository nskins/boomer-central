const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const User = require('./models/user.js');

// Connect to MongoDB.
const dbConfig = require('./db.js');
mongoose.connect(dbConfig.url, {useMongoClient: true});

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static resource files.
app.use(express.static(path.join(__dirname, 'public')));

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
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ 'username': username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (user.password != password) { return done(null, false); }
    return done(null, user);
  });
}));

app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.listen(3000);