var Engine, _, wind;

_ = require('underscore');

wind = require('./utils').wind;

Engine = {
  layout: function(participants) {
    var lengths, scale, sum, views;
    lengths = participants.map(function(p) {
      return p.get("interactor").get("length");
    });
    sum = _.reduce(lengths, (function(total, num) {
      return total + num;
    }), 0);
    scale = this.scale([0, 360], [0, sum]);
    views = [];
    participants.map(function(p) {
      var previous;
      previous = _.last(views);
      if (previous) {
        return views.push({
          model: p,
          view: {
            radius: 200,
            startAngle: previous.view.endAngle + 5,
            endAngle: (scale.val(p.get("interactor").get("length"))) + previous.view.endAngle - 5
          }
        });
      } else {
        return views.push({
          model: p,
          view: {
            radius: 200,
            startAngle: 0,
            endAngle: scale.val(p.get("interactor").get("length"))
          }
        });
      }
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
