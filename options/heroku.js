'use strict';

var _ = require('lodash');
var base = require('./base.js');
var mongoDbUser = process.env.mongoDbUser;
var mongoDbPassword = process.env.mongoDbPassword;

module.exports = _.merge(base, {
  'mongo-store': {
    uri: 'mongodb://'+mongoDbUser+':'+mongoDbPassword+'@ds157964.mlab.com:57964/gennady-brain',
    name: "gennady"
  },
  redis: {
    host: 'redis',
    port: 6379
  }
});
