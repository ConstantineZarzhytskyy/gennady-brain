var express = require('express');
var router = express.Router();
var seneca = require('./seneca-init.js');

router.get('/', function (req, res) {
  seneca.act({ role: 'gennady', cmd: 'test' }, function (err, result) {
    if (err) { return res.send(err); }

    res.send(result);
  });
});

router.post('/generate', function (req, res) {
  var input = req.body.input;

  seneca.act({ role: 'gennady', cmd: 'generate', input: input }, function (err, result) {
    if (err) { return res.send(err); }

    res.send(result);
  });
});

router.post('/teach', function (req, res) {
  var input = req.body.input;
  var output = req.body.output;

  seneca.act({ role: 'gennady', cmd: 'teach', input: input, output: output }, function (err, result) {
    if (err) { return res.send(err); }

    res.send(result);
  });
});

module.exports = router;
