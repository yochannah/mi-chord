var Chroma, Draw, Engine, Link, Messenger, Participant, React, SVG, Tooltip, Unknown, _, circle, defs, g, mask, path, radialGradient, rect, ref, stop, svg, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Participant = React.createFactory(require('./participant'));

Engine = require('../layout/engine');

Link = React.createFactory(require('./link'));

Chroma = require('chroma-js');

Draw = require('../layout/draw');

_ = require('underscore');

Tooltip = React.createFactory(require('./tooltip'));

Messenger = require('./messenger');

Unknown = React.createFactory(require('./unknown'));

ref = React.DOM, svg = ref.svg, g = ref.g, text = ref.text, path = ref.path, defs = ref.defs, radialGradient = ref.radialGradient, stop = ref.stop, mask = ref.mask, circle = ref.circle, rect = ref.rect;

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
    this.refs.svg.addEventListener("mousemove", (function(_this) {
      return function(evt) {
        var ref1, x, y;
        ref1 = cursorPoint(evt), x = ref1.x, y = ref1.y;
        return _this.setState({
          mouse: {
            x: x,
            y: y
          }
        });
      };
    })(this));
    this.setState({
      rootsvg: this.refs.svg.getBBox()
    });
    return window.addEventListener("resize", (function(_this) {
      return function(evt) {
        return _this.setState({
          rootsvg: _this.refs.svg.getBBox()
        });
      };
    })(this));
  };

  SVG.prototype.render = function() {
    var Links, Participants, Unknowns, defpaths, interaction, interactionId, links, participants, views;
    interaction = this.props.model.get("interactions").at(0);
    interactionId = this.props.model.get("interactions").at(0).get("id");
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
    defpaths.push(radialGradient({
      id: "rgrad",
      cx: "50%",
      cy: "50%",
      r: "75%"
    }, stop({
      offset: "0%",
      style: {
        stopColor: "rgb(255,255,255)",
        stopOpacity: 1
      }
    }), stop({
      offset: "50%",
      style: {
        stopColor: "rgb(255,255,255)",
        stopOpacity: 1
      }
    }), stop({
      offset: "62%",
      style: {
        stopColor: "rgb(0,0,0)",
        stopOpacity: 1
      }
    }), stop({
      offset: "100%",
      style: {
        stopColor: "rgb(0,0,0)",
        stopOpacity: 1
      }
    })));
    defpaths.push(mask({
      id: "fademask",
      maskContentUnits: "objectBoundingBox"
    }, rect({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fill: "url(#rgrad)"
    })));
    Participants = _.values(views).map(function(p) {
      p.model.set("key", interactionId + ":" + p.model.get("id"));
      return Participant(p);
    });
    Unknowns = _.values(views).map(function(p) {
      if (p.view.hasLength) {
        p.model.set("key", interactionId + ":" + p.model.get("id"));
        return Unknown(p);
      }
    });
    Links = links.map(function(l, i) {
      l.set("key", interactionId + ":" + l.get("id"));
      return Link({
        model: l,
        views: views
      });
    });
    return svg({
      className: "mi-chord",
      ref: "svg",
      viewBox: "0 0 500 500"
    }, defs({}, defpaths), g({
      style: {
        shapeRendering: "geometricPrecision"
      }
    }, g({
      key: interactionId + ":links",
      className: "participants"
    }, Participants), g({
      className: "links",
      style: {
        transform: "translate(250px,250px)"
      }
    }, Links), this.state.label != null ? Tooltip({
      rootsvg: this.state.rootsvg,
      message: this.state.label,
      mouse: this.state.mouse
    }) : void 0), g({
      className: "unknowns"
    }, Unknowns));
  };

  return SVG;

})(React.Component);

module.exports = SVG;
