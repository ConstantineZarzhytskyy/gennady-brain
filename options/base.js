'use strict';

module.exports = {
  main: {
    'timeout': 66666,
    strict: {
      result: false
    }
  },
  bodyparser: {
    json: { limit: '10mb' }
  }
};