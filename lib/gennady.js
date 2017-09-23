'use strict';

var _ = require('lodash');
var async = require('async');
var brain = require('brain.js');
var net = new brain.NeuralNetwork();

module.exports = function (options) {
  var seneca = this;
  var plugin = 'gennady';

  seneca.add({ role: plugin, cmd: 'test' }, cmd_test);
  seneca.add({ role: plugin, cmd: 'generate' }, cmd_generate);

  function cmd_test(args, done) {
    var seneca = this;

    done(null, { res: 'Gennady is working'});
  }

  // TODO : optimize me
  function cmd_generate(args, done) {
    var seneca = this;
    var input = args.input;

    async.waterfall([
      validateInput,
      findInDataBase,
      trainBrain,
      getOutput
    ], done);

    function validateInput(cb) {
      // TODO : add validation for object(input)

      cb(null, input);
    }

    function findInDataBase(input, cb) {
      seneca.act({ role: 'db', cmd: 'get', input: input }, function (err, rules) {
        if (err) { return cb(err); }

        cb(null, rules);
      })
    }

    function trainBrain(rules, cb) {
      net.train(rules);

      cb();
    }

    function getOutput(cb) {
      var result = net.run(input);

      cb(null, result);
    }
  }

  return {
    name: plugin
  };
};