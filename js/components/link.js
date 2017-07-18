var Draw, Engine, Link, Messenger, React, _, center, circle, g, parser, path, ref, text,
  slice = [].slice,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Engine = require('../layout/engine');

Draw = require("../layout/draw");

_ = require('underscore');

Messenger = require('./messenger');

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
    this.focusParticipants = bind(this.focusParticipants, this);
    Link.__super__.constructor.call(this, props);
  }

  Link.prototype.componentDidMount = function() {
    return this.props.model.on('add change remove all *', this.forceUpdate.bind(this, null), this);
  };

  Link.prototype.componentWillUnmount = function() {
    this.getBackboneModels().forEach((function(model) {
      model.off(null, null, this);
    }), this);
  };

  Link.prototype.focusParticipants = function(bool) {
    var tooltipText;
    this.props.model.set({
      focus: bool
    });
    this.props.model.get("features").map(function(f) {
      return f.get("participant").set({
        focus: bool
      });
    });
    tooltipText = [];
    this.props.model.get("features").each(function(feature) {
      return feature.get("sequenceData").each(function(sd) {
        var interactorLabel, pos;
        interactorLabel = sd.get("feature").get("participant").get("interactor").get("label");
        pos = "(" + sd.get("pos") + ")";
        return tooltipText.push(interactorLabel + " " + pos);
      });
    });
    if (bool === true) {
      return Messenger.publish("label", {
        title: "Interaction",
        text: tooltipText
      });
    } else {
      return Messenger.publish("label", null);
    }
  };

  Link.prototype.render = function() {
    var parsed, views;
    views = [];
    this.props.model.get("features").map((function(_this) {
      return function(feature) {
        var ParticipantModel, participantView, ref1, scale, sequenceData;
        ref1 = _this.props.views[feature.get("participant").get("id")], participantView = ref1.view, ParticipantModel = ref1.model;
        scale = Engine.scale([participantView.startAngle, participantView.endAngle], [0, ParticipantModel.get("interactor").get("length")]);
        return sequenceData = feature.get("sequenceData").map(function(s) {
          var end, halfway, start;
          start = s.get("start");
          end = s.get("start");
          if (start === null && end === null) {
            halfway = (participantView.unknownStart + participantView.unknownEnd) / 2;
            return views.push({
              radius: participantView.radius,
              startAngle: participantView.unknownStart,
              endAngle: participantView.unknownEnd
            });
          } else {
            return views.push({
              radius: participantView.radius,
              startAngle: scale.val(s.get("start")),
              endAngle: scale.val(s.get("end"))
            });
          }
        });
      };
    })(this));
    parsed = null;
    return g({
      key: this.props.model.get("key"),
      className: "linkGroup",
      onMouseOver: (function(_this) {
        return function() {
          return _this.focusParticipants(true);
        };
      })(this),
      onMouseLeave: (function(_this) {
        return function() {
          return _this.focusParticipants(false);
        };
      })(this)
    }, path({
      className: "link",
      opacity: "0.9",
      fill: this.props.model.get("fill"),
      d: Draw.link(views),
      style: {
        opacity: 0.8
      }
    }));
  };

  return Link;

})(React.Component);

module.exports = Link;
