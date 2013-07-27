var fs = require('fs')
  , config = fs.readFileSync('config.json');

module.exports = config;
