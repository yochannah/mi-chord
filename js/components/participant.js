var Draw, Engine, Participant, React, Region, circle, g, path, polarToCartesian, ptc, ref, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Engine = require('../layout/engine');

Draw = require("../layout/draw");

Region = React.createFactory(require('./region'));

polarToCartesian = require('../layout/engine').polarToCartesian;

ref = React.DOM, circle = ref.circle, g = ref.g, text = ref.text, path = ref.path;

ptc = polarToCartesian;

Participant = (function(superClass) {
  extend(Participant, superClass);

  function Participant(props) {
    Participant.__super__.constructor.call(this, props);
  }

  Participant.prototype.render = function() {
    var Regions, cx, cy, ref1;
    Regions = [];
    this.props.model.get("features").map((function(_this) {
      return function(f) {
        var ref1, scale;
        scale = Engine.scale([_this.props.view.startAngle, _this.props.view.endAngle], [0, _this.props.model.get("interactor").get("length")]);
        return (ref1 = f.get("sequenceData")) != null ? ref1.map(function(s) {
          return Regions.push(Region({
            model: s,
            key: s.cid,
            view: {
              radius: _this.props.view.radius + 1,
              startAngle: scale.val(s.get("start")),
              endAngle: scale.val(s.get("end"))
            }
          }));
        }) : void 0;
      };
    })(this));
    return g({}, this.props.view.hasLength === true ? path({
      className: "participant",
      d: Draw.arc(this.props.view)
    }) : ((ref1 = ptc(this.props.view.radius, this.props.view.endAngle), cx = ref1.x, cy = ref1.y, ref1), circle({
      cx: cx,
      cy: cy,
      className: "nolenpart",
      r: 10
    })), Regions);
  };

  return Participant;

})(React.Component);

module.exports = Participant;
