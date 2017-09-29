'use strict';

var bodyparser = require('body-parser');
var express = require('express');
var app = express();
var morgan = require('morgan');
var router = require('./router.js');

var env = process.env.NODE_ENV || 'development';
var options = require('../options/' + env  + '.js');

var port = process.env.PORT || 8000;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: options.bodyparser.json.limit }));
app.use(morgan('common'));
app.use('/api', router);

app.listen(port, function (err) {
  if (err) {
    console.log('[ERROR] ', err);
    return process.exit(1);
  }

  console.log('[%s] Server listening on http://localhost:%d', app.settings.env, port);
});
