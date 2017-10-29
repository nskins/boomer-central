var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  username: String,
  password: String,
  admin: { type: Boolean, default: false }
}, 'User');