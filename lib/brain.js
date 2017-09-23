/'use strict';

var _ = require('lodash');

module.exports = function (options) {
  var seneca = this;
  var plugin = 'brain';

  seneca.add({ role: plugin, cmd: 'create' }, cmd_create);

  function cmd_create(args, done) {
    var seneca = this;

    done(null, { res: 'brain : cmd_create'});
  }

  return {
    name: plugin
  };
};