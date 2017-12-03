const process = require('process');

const DB_HOST = process.env.NODE_ENV == 'docker' ? 'db' : 'localhost';

module.exports = {
  'url': 'mongodb://' + DB_HOST + '/boomer-central'
};