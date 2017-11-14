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
    var Regions;
    Regions = [];
    return this.props.model.get("features").map((function(_this) {
      return function(f) {
        var mid, ref1, scale;
        scale = Engine.scale([_this.props.view.startAngle, _this.props.view.endAngle], [0, _this.props.model.get("interactor").get("length")]);
        if ((ref1 = f.get("sequenceData")) != null) {
          ref1.map(function(s) {
            console.log("PPP", _this.props.model, s.cid);
            Regions.push(Region({
              model: s,
              key: s.cid,
              view: {
                radius: _this.props.view.radius + 1,
                startAngle: scale.val(s.get("start")),
                endAngle: scale.val(s.get("end"))
              }
            }));
            return console.log("REGIONS", Regions);
          });
        }
        mid = (_this.props.view.endAngle + _this.props.view.startAngle) / 2;
        text({
          className: "participantLabel",
          x: Draw.center(_this.props.view).x,
          y: Draw.center(_this.props.view).y,
          textAnchor: mid <= 180 ? "start" : "end"
        }, _this.props.model.get("interactor").get("label"));
        return Regions;
      };
    })(this));
  };

  return Participant;

})(React.Component);

module.exports = Participant;
