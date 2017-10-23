const express = require('express');
const path = require('path');

// Initialize application.
const app = express();

// Initialize view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000);