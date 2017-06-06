var Chroma, Draw, Engine, Label, Link, Messenger, Participant, React, SVG, _, defs, g, path, ref, svg, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Participant = React.createFactory(require('./participant'));

Engine = require('../layout/engine');

Link = React.createFactory(require('./link'));

Chroma = require('chroma-js');

Draw = require('../layout/draw');

_ = require('underscore');

Label = React.createFactory(require('./label'));

Messenger = require('./messenger');

ref = React.DOM, svg = ref.svg, g = ref.g, text = ref.text, path = ref.path, defs = ref.defs;

SVG = (function(superClass) {
  extend(SVG, superClass);

  function SVG(props) {
    SVG.__super__.constructor.call(this, props);
    this.state = {
      label: null
    };
  }

  SVG.prototype.componentDidMount = function() {
    var cursorPoint, pt;
    Messenger.subscribe("label", (function(_this) {
      return function(m) {
        return _this.setState({
          label: m
        });
      };
    })(this));
    pt = this.refs.svg.createSVGPoint();
    cursorPoint = (function(_this) {
      return function(evt) {
        pt.x = evt.clientX;
        pt.y = evt.clientY;
        return pt.matrixTransform(_this.refs.svg.getScreenCTM().inverse());
      };
    })(this);
    return this.refs.svg.addEventListener("mousemove", (function(_this) {
      return function(evt) {
        var ref1, x, y;
        ref1 = cursorPoint(evt), x = ref1.x, y = ref1.y;
        return _this.setState({
          x: x,
          y: y
        });
      };
    })(this));
  };

  SVG.prototype.render = function() {
    var Links, Participants, defpaths, interaction, links, participants, s, views;
    interaction = this.props.model.get("interactions").at(0);
    participants = interaction.get("participants");
    links = interaction.get("links");
    views = Engine.layout(participants);
    defpaths = _.values(views).map(function(v) {
      var id;
      id = "tp" + v.model.get("id");
      return path({
        key: id,
        id: id,
        d: Draw.textDef(v.view)
      });
    });
    s = Chroma.scale('Spectral').domain([0, links.length - 1]);
    Participants = _.values(views).map(function(p) {
      p.key = p.model.get("id");
      return Participant(p);
    });
    Links = links.map(function(l, i) {
      return Link({
        model: l,
        views: views,
        view: {
          fill: s(i).hex()
        }
      });
    });
    return svg({
      className: "mi-chord",
      ref: "svg"
    }, defs({}, defpaths), g({
      style: {
        shapeRendering: "geometricPrecision"
      }
    }, g({
      className: "participants"
    }, Participants), g({
      className: "links",
      style: {
        transform: "translate(250px,250px)"
      }
    }, Links), this.state.label != null ? Label({
      message: this.state.label,
      x: this.state.x,
      y: this.state.y
    }) : void 0));
  };

  return SVG;

})(React.Component);

module.exports = SVG;
