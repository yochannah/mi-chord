var Draw, Engine, Link, React, _, center, circle, g, parser, path, ref, text,
  slice = [].slice,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Engine = require('../layout/engine');

Draw = require("../layout/draw");

_ = require('underscore');

ref = React.DOM, circle = ref.circle, g = ref.g, text = ref.text, path = ref.path;

center = function(arg) {
  var letter, values;
  letter = arg[0], values = 2 <= arg.length ? slice.call(arg, 1) : [];
  switch (letter) {
    case "M":
      return {
        x: values[0],
        y: values[1]
      };
    case "C":
      return {
        x: values[4],
        y: values[5]
      };
    case "A":
      return {
        x: values[5],
        y: values[6]
      };
    case "L":
      return {
        x: values[0],
        y: values[1]
      };
    case "Q":
      return {
        x: values[2],
        y: values[3]
      };
  }
};

parser = function(path) {
  var annotations, parts;
  parts = path.split(/(?=[A-Z])/);
  annotations = [];
  parts.map(function(e, i) {
    var c, s;
    s = e.match(/\S+/g);
    c = center(s);
    c.idx = i;
    return annotations.push(c);
  });
  return annotations;
};

Link = (function(superClass) {
  extend(Link, superClass);

  function Link(props) {
    Link.__super__.constructor.call(this, props);
  }

  Link.prototype.render = function() {
    var parsed, views;
    views = [];
    this.props.model.get("features").map((function(_this) {
      return function(feature) {
        var ParticipantModel, participantView, ref1, scale, sequenceData;
        ref1 = _this.props.views[feature.get("participant").get("id")], participantView = ref1.view, ParticipantModel = ref1.model;
        scale = Engine.scale([participantView.startAngle, participantView.endAngle], [0, ParticipantModel.get("interactor").get("length")]);
        return sequenceData = feature.get("sequenceData").map(function(s) {
          return views.push({
            radius: participantView.radius,
            startAngle: scale.val(s.get("start")),
            endAngle: scale.val(s.get("end"))
          });
        });
      };
    })(this));
    parsed = null;
    return g({
      className: "linkGroup"
    }, path({
      className: "link",
      d: Draw.link(views)
    }), parsed ? g({
      className: "annotation"
    }, _.map(parsed, function(p) {
      return g({
        className: "x"
      }, circle({
        cx: p.x,
        cy: p.y,
        r: 5
      }), text({
        dx: p.x + 15,
        dy: p.y + 15
      }, p.idx));
    })) : void 0, path({
      className: "link",
      opacity: "0.9",
      fill: this.props.view.fill,
      d: Draw.link(views)
    }));
  };

  return Link;

})(React.Component);

module.exports = Link;
