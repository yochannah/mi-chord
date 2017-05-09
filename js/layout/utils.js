var Utils, _;

_ = require('underscore');

Utils = {
  wind: function(col, f) {
    var obj;
    obj = {};
    _.map(col, (function(_this) {
      return function(i) {
        var k;
        k = f(i);
        return obj[k] = i;
      };
    })(this));
    return obj;
  }
};

module.exports = Utils;
