var Draw, Engine, Participant, React, Region, circle, g, path, ref, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Engine = require('../layout/engine');

Draw = require("../layout/draw");

Region = React.createFactory(require('./region'));

ref = React.DOM, circle = ref.circle, g = ref.g, text = ref.text, path = ref.path;

Participant = (function(superClass) {
  extend(Participant, superClass);

  function Participant(props) {
    Participant.__super__.constructor.call(this, props);
  }

  Participant.prototype.render = function() {
    var Regions;
    Regions = [];
    this.props.model.get("features").map((function(_this) {
      return function(f) {
        var scale;
        scale = Engine.scale([_this.props.view.startAngle, _this.props.view.endAngle], [0, _this.props.model.get("interactor").get("length")]);
        return f.get("sequenceData").map(function(s) {
          return Regions.push(Region({
            model: s,
            key: s.cid,
            view: {
              radius: _this.props.view.radius + 1,
              startAngle: scale.val(s.get("start")),
              endAngle: scale.val(s.get("end"))
            }
          }));
        });
      };
    })(this));
    return g({}, path({
      className: "participant",
      d: Draw.arc(this.props.view)
    }), Regions);
  };

  return Participant;

})(React.Component);

module.exports = Participant;
