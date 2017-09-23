'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function (options) {
  var seneca = this;
  var plugin = 'db';
  var ENTITY = 'net';

  seneca.add({ role: plugin, cmd: 'get' }, cmd_get);

  function cmd_get(args, done) {
    var seneca = this;
    var input = args.input;

    async.waterfall([
      validateInput,
      findInDataBase
    ], function (err, res) {
      if (err) console.log(err);

      done(null, res);
    });

    function validateInput(cb) {
      // TODO : add validation for object(input)

      cb();
    }

    // TODO : optimize me
    function findInDataBase(cb) {
      seneca.make$(ENTITY).list$({} , function (err, rules) {
        if (err) { return cb(err); }
        if (_.isEmpty(rules)) return cb();

        var res  = [];

        _.each(rules, function (rule) {
          if (!rule.input || !rule.output) return;

          res.push(_.pick(rule, ['input', 'output']));
        });

        cb(null, res);
      })


    }
  }


  return {
    name: plugin
  };

};
