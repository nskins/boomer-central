const express = require('express');
const path = require('path');

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static resource files.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  console.log("Received login request");
});

app.listen(3000);