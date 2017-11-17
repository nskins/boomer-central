var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
  avatar: { type: String, default: 'img/default_avatar.png' },
  favoriteTrick: String
});