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
    withlength.map(function(p, i) {
      var previous;
      previous = _.last(views);
      if (previous) {
        return views.push({
          model: p,
          view: {
            hasLength: true,
            radius: 200,
            unknownStart: previous.view.endAngle + 3,
            unknownEnd: previous.view.endAngle + 8,
            startAngle: previous.view.endAngle + 8,
            endAngle: (i = withlength.length - 1) ? (scale.val(p.get("interactor").get("length"))) + previous.view.endAngle - 3 : (scale.val(p.get("interactor").get("length"))) + previous.view.endAngle - 3
          }
        });
      } else {
        return views.push({
          model: p,
          view: {
            unknownStart: 0,
            unknownEnd: 5,
            hasLength: true,
            radius: 200,
            startAngle: 5,
            endAngle: scale.val(p.get("interactor").get("length"))
          }
        });
      }
    });
    nolength.map(function(p, i) {
      var previous;
      previous = _.last(views);
      return views.push({
        model: p,
        view: {
          hasLength: false,
          radius: 210,
          startAngle: previous.view.endAngle + molRadius,
          endAngle: previous.view.endAngle + molRadius
        }
      });
    });
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
