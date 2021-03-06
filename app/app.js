const bodyParser = require('body-parser');
const express = require('express');
const Image = require('./models/image');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const upload = multer({ dest: 'uploads/' });
const User = require('./models/user');

// Connect to MongoDB.
const dbConfig = require('./db');
mongoose.connect(dbConfig.url, { useMongoClient: true });

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static resource files.
app.use('/bower_components', express.static(path.join(__dirname, 'public/bower_components')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Session handling.
app.use(session({
  secret: 'secretKey',
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
require('./passport')();

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

app.get('/images', (req, res) => {
  Image.find({}, (err, images) => {
    if (err) console.log(err);
    else res.render('image/all', { title: 'Image Gallery', user: req.user, images: images });
  });
});

app.post('/images', upload.single('image'), (req, res) => {
  let image = new Image();
  image.name = req.body.name;
  image.description = req.body.description;
  image.path = req.file.path;
  image.created_by = req.user._id;
  image.likes = [];
  image.comments = [];

  image.save((err) => {
    if (err) { console.log(err); }
    res.redirect('/');
  });
});

app.get('/images/new', (req, res) => {
  res.render('image/new', { title: 'Create Image', user: req.user, url: req.url });
});

app.get('/images/:id', (req, res) => {
  Image.findById(req.params.id, (err, image) => {
    if (err) console.log(err);
    else if (!image) res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
    else {
      User.findById(image.created_by, (err, user) => {
        if (err) console.log(err);
        res.render('image/show', {
          title: image.name, user: req.user, image: image, user_param: user
        });
      });
    }
  });
});

app.post('/images/:id', (req, res) => {
  Image.findById(req.params.id, (err, image) => {
    if (err) console.log(err);
    else if (!image) res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
    else {
      if (req.body._method == 'patch') {
        // Update the attributes.
        if (req.body.comment) {
          image.comments.push({ content: req.body.comment,
            created_by: req.user._id, username: req.user.username });
        }

        // Save the changes.
        image.save((err) => {
          if (err) { return done(err); }
          res.redirect('/images/' + req.params.id);
        });
      }
    }
  });
});

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) console.log(err);
    else res.render('user/all', { title: 'User Directory', user: req.user, users: users });
  });
});

app.get('/users/:username', (req, res) => {
  User.findOne({ 'username': req.params.username }, (err, user) => {
    if (err) console.log(err);
    else if (!user) res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
    else {
      Image.find({ created_by: user.id }, (err, images) => {
        res.render('user/show', {
          title: user.username, user: req.user, user_param: user, images: images
        });
      });
    }
  });
});

app.post('/users/:username', upload.single('avatar'), (req, res) => {
  User.findOne({ 'username': req.params.username }, (err, user) => {
    if (err) console.log(err);
    else if (!user) res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
    else {
      if (req.body._method == 'patch') {
        // Update the attributes.
        if (req.file) user.avatar = req.file.path;
        user.favoriteTrick = req.body.favoriteTrick;

        // Save the changes.
        user.save((err) => {
          if (err) { return done(err); }
          res.redirect('/users/' + req.params.username);
        });
      }
    }
  });
});

app.get('/users/:username/edit', (req, res) => {
  User.findOne({ 'username': req.params.username }, (err, user) => {
    if (err) console.log(err);
    else if (!user) res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
    // TODO: authentication.
    else res.render('user/edit', { title: 'Edit Profile', user: req.user, user_param: user });
  });
});

app.get('*', (req, res) => {
  res.status(404);
  res.render('404', { title: 'Boomer Central', user: req.user, url: req.url });
});

module.exports = app;