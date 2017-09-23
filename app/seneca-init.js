'use strict';

var env = process.env.NODE_ENV || 'development';
var options = require('../options/' + env  + '.js');
var seneca = require('seneca')(options.main);

seneca
    .use('entity')
    .use('mongo-store', options['mongo-store'])
    .use('../lib/gennady')
    .use('../lib/db');

seneca.ready(function() {
  console.log('Seneca connect to database [' + options['mongo-store'].name + ']');
});

module.exports = seneca;
