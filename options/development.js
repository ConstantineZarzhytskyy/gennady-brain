'use strict';

var _ = require('lodash');
var base = require('./base.js');

module.exports = _.merge(base, {
  'mongo-store': {
    uri: 'mongodb://127.0.0.1:27017/gennady',
    name: "gennady"
  },
  redis: {
    host: 'redis',
    port: 6379
  }
});
