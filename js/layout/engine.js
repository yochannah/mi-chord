var Engine, _, wind;

_ = require('underscore');

wind = require('./utils').wind;

Engine = {
  layout: function(participants) {
    var lengths, molRadius, nolength, nolengthviews, questionMarkWidth, scale, sum, views, withlength;
    lengths = participants.map(function(p) {
      return p.get("interactor").get("length");
    });
    lengths = _.compact(lengths);
    nolength = participants.filter(function(p) {
      var length;
      length = p.get("interactor").get("length");
      return length === void 0 || length === null;
    });
    withlength = participants.filter(function(p) {
      var length;
      length = p.get("interactor").get("length");
      return length !== void 0 && length !== null;
    });
    molRadius = 12;
    sum = _.reduce(lengths, (function(total, num) {
      return total + num;
    }), 0);
    scale = this.scale([0, 360 - (nolength.length * molRadius)], [0, sum]);
    views = [];
    nolengthviews = [];
    questionMarkWidth = 3;
    views = _.reduce(withlength, (function(total, next, memo) {
      var previousLengths, t, v;
      previousLengths = _.reduce(total, (function(count, p) {
        return count + p.model.get("interactor").get("length");
      }), 0);
      t = {
        startAngle: scale.val(previousLengths),
        endAngle: scale.val(next.get("interactor").get("length") + previousLengths)
      };
      console.log("t", t);
      v = {
        model: next,
        view: {
          hasLength: true,
          radius: 200,
          startAngle: scale.val(previousLengths),
          endAngle: scale.val(next.get("interactor").get("length") + previousLengths),
          unknownStart: scale.val(previousLengths),
          unknownEnd: scale.val(next.get("interactor").get("length") + previousLengths)
        }
      };
      return total.concat([v]);
    }), []);
    console.log("views", views);
    return wind(views, function(d) {
      return d.model.get("id");
    });
  },
  scale: function(arg, arg1) {
    var dmax, dmin, rmax, rmin;
    dmin = arg[0], dmax = arg[1];
    rmin = arg1[0], rmax = arg1[1];
    return {
      val: function(val) {
        return (val - rmin) / (rmax - rmin) * (dmax - dmin) + dmin;
      }
    };
  },
  polarToCartesian: function(radius, angle) {
    var rads;
    rads = (angle - 90) * (Math.PI / 180.0);
    return {
      y: radius * Math.sin(rads),
      x: radius * Math.cos(rads)
    };
  }
};

module.exports = Engine;
