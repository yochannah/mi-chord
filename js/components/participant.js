var Draw, Engine, Messenger, Participant, React, Region, circle, g, path, polarToCartesian, ptc, rect, ref, text, textPath,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Engine = require('../layout/engine');

Draw = require('../layout/draw');

Region = React.createFactory(require('./region'));

polarToCartesian = require('../layout/engine').polarToCartesian;

ref = React.DOM, rect = ref.rect, circle = ref.circle, g = ref.g, text = ref.text, textPath = ref.textPath, path = ref.path;

ptc = polarToCartesian;

Messenger = require('./messenger');

Participant = (function(superClass) {
  extend(Participant, superClass);

  function Participant(props) {
    this.focusMe = bind(this.focusMe, this);
    Participant.__super__.constructor.call(this, props);
  }

  Participant.prototype.componentDidMount = function() {
    return this.props.model.on('add change remove', this.forceUpdate.bind(this, null), this);
  };

  Participant.prototype.componentWillUnmount = function() {
    this.getBackboneModels().forEach((function(model) {
      model.off(null, null, this);
    }), this);
  };

  Participant.prototype.focusMe = function(bool) {
    var tt;
    if (bool === true) {
      tt = {
        title: "Participant",
        text: [this.props.model.get("interactor").get("label"), "(" + this.props.model.get("interactor").get("id") + ")"]
      };
      Messenger.publish("label", tt);
    } else {
      Messenger.publish("label", null);
    }
    return this.props.model.set({
      focus: bool
    });
  };

  Participant.prototype.render = function() {
    var Regions, cx, cy, mid, ref1, t;
    Regions = [];
    this.props.model.get("features").map((function(_this) {
      return function(f) {
        var ref1, scale;
        scale = Engine.scale([_this.props.view.startAngle, _this.props.view.endAngle], [0, _this.props.model.get("interactor").get("length")]);
        return (ref1 = f.get("sequenceData")) != null ? ref1.map(function(s) {
          if (s.get("start") !== null && s.get("end") !== null) {
            return Regions.push(Region({
              model: s,
              key: s.cid,
              view: {
                radius: _this.props.view.radius,
                startAngle: scale.val(s.get("start")),
                endAngle: scale.val(s.get("end"))
              }
            }));
          }
        }) : void 0;
      };
    })(this));
    return g({
      key: this.props.model.get("key")
    }, this.props.view.hasLength === true ? g({}, path({
      onMouseEnter: (function(_this) {
        return function() {
          return _this.focusMe(true);
        };
      })(this),
      onMouseLeave: (function(_this) {
        return function() {
          return _this.focusMe(false);
        };
      })(this),
      className: "participant" + (this.props.model.get("focus") === true ? " focused" : ""),
      d: Draw.arc(this.props.view)
    })) : ((ref1 = ptc(this.props.view.radius, this.props.view.endAngle), cx = ref1.x, cy = ref1.y, ref1), circle({
      cx: cx,
      cy: cy,
      className: "nolenpart",
      r: 10
    })), mid = (this.props.view.endAngle + this.props.view.startAngle) / 2, text({
      className: "participantLabel",
      x: Draw.center(this.props.view).x,
      y: Draw.center(this.props.view).y,
      textAnchor: mid <= 180 ? "start" : "end"
    }, this.props.model.get("interactor").get("label")), text({
      className: "length",
      x: Draw.radial(this.props.view.startAngle, 156).x,
      y: Draw.radial(this.props.view.startAngle, 156).y,
      textAnchor: "middle",
      alignmentBaseline: "middle"
    }, 1), text({
      className: "length",
      x: Draw.radial(this.props.view.endAngle, 156).x,
      y: Draw.radial(this.props.view.endAngle, 156).y,
      textAnchor: "middle",
      alignmentBaseline: "middle"
    }, this.props.model.get("interactor").get("length")), path({
      className: "tick",
      d: Draw.line(this.props.view.startAngle, 150, 20),
      pointerEvents: "none"
    }), path({
      className: "tick",
      d: Draw.line(this.props.view.endAngle, 150, 20),
      pointerEvents: "none"
    }), Regions, (function() {
      var i, len, ref2, results;
      if (this.props.view.hasLength) {
        ref2 = Draw.ticks(this.props.view, 5);
        results = [];
        for (i = 0, len = ref2.length; i < len; i++) {
          t = ref2[i];
          results.push(path({
            className: "tick",
            d: t,
            pointerEvents: "none"
          }));
        }
        return results;
      }
    }).call(this));
  };

  return Participant;

})(React.Component);

module.exports = Participant;
