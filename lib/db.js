'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function (options) {
  var seneca = this;
  var plugin = 'db';
  var ENTITY = 'net';

  seneca.add({ role: plugin, cmd: 'get' }, cmd_get);
  seneca.add({ role: plugin, cmd: 'set' }, cmd_set);

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

  function cmd_set(args, done) {
    var seneca = this;
    var input = args.input;
    var output = args.output;

    async.waterfall([
      validateInput,
      validateOutput,
      _.partial(saveRule, { input: input, output: output })
    ], done);

    function validateInput(cb) {
      // TODO : add validation for object(input)

      cb();
    }

    function validateOutput(cb) {
      // TODO : add validation for object(output)

      cb();
    }

    function saveRule(rule, cb) {
      async.waterfall([
          isExistRule,
          saveRule
      ], function (err) {
        if (err) { return cb(err); }

        cb();
      });

      function isExistRule(cb) {
        seneca.act({ role: 'db', cmd: 'get', input: rule.input }, function (err, rules) {
          if (err) { return cb(err); }
          if (_.isEmpty(rules)) { return cb(null, []); }


          cb(null, _.filter(rules, rule.input));
        })
      }

      function saveRule(rules, cb) {
        if (_.isEmpty(rules)) return createRule(rule, cb);
        return mergeRule(rules, rule, cb);

        function createRule(rule, callback) {
          seneca.make$(ENTITY).save$(rule, callback);
        }

        function mergeRule(persistenceRules, rule, callback) {
          async.each(persistenceRules, function (persistenceRule, next) {
            persistenceRule.output = rule.output;

            seneca.make$(ENTITY).save$(persistenceRule, next);
          }, function (err) {
            if (err) { return callback(err); }

            callback();
          });

        }
      }
    }
  }

  return {
    name: plugin
  };

};
