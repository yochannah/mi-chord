var Chroma, Draw, Engine, Link, Participant, React, SVG, _, defs, g, path, ref, svg, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Participant = React.createFactory(require('./participant'));

Engine = require('../layout/engine');

Link = React.createFactory(require('./link'));

Chroma = require('chroma-js');

Draw = require('../layout/draw');

_ = require('underscore');

ref = React.DOM, svg = ref.svg, g = ref.g, text = ref.text, path = ref.path, defs = ref.defs;

SVG = (function(superClass) {
  extend(SVG, superClass);

  function SVG(props) {
    SVG.__super__.constructor.call(this, props);
  }

  SVG.prototype.render = function() {
    var Links, Participants, interaction, links, participants, s, views;
    interaction = this.props.model.get("interactions").at(0);
    participants = interaction.get("participants");
    links = interaction.get("links");
    views = Engine.layout(participants);
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
      className: "mi-chord"
    }, g({
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
    }, Links)));
  };

  return SVG;

})(React.Component);

module.exports = SVG;
