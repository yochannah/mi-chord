var React, Tooltip, _, g, rect, ref, text, tspan,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

_ = require('underscore');

ref = React.DOM, g = ref.g, rect = ref.rect, text = ref.text, tspan = ref.tspan;

Tooltip = (function(superClass) {
  extend(Tooltip, superClass);

  function Tooltip(props) {
    Tooltip.__super__.constructor.call(this, props);
    this.state = {
      x: 0,
      y: 0,
      textWidth: 0,
      textHeight: 0,
      textX: 0,
      textY: 0
    };
  }

  Tooltip.prototype.componentDidMount = function() {
    var height, ref1, width, x, y;
    ref1 = this.refs.text.getBBox(), width = ref1.width, height = ref1.height, x = ref1.x, y = ref1.y;
    return this.setState({
      textWidth: width,
      textHeight: height,
      textX: x,
      textY: y
    });
  };

  Tooltip.prototype.render = function() {
    var adjusted, alignLeft, padding, ref1, textHeight, textWidth, textX, textY;
    padding = 5;
    ref1 = this.state, textWidth = ref1.textWidth, textHeight = ref1.textHeight, textX = ref1.textX, textY = ref1.textY;
    textWidth += padding * 2;
    textHeight += padding * 2;
    textX -= padding;
    textY -= padding;
    alignLeft = this.props.mouse.x > this.props.rootsvg.width / 2;
    adjusted = {
      x: Math.min(-1 * ((this.props.mouse.x + textWidth + (padding * 2)) - this.props.rootsvg.width), 0),
      y: Math.min(-1 * ((this.props.mouse.y + textHeight + (padding * 2)) - this.props.rootsvg.height), 0)
    };
    return g({
      className: "tooltip",
      transform: "translate(" + this.props.mouse.x + "," + this.props.mouse.y + ")"
    }, g({
      transform: "translate(" + adjusted.x + ", " + adjusted.y + ")"
    }, rect({
      className: "container",
      x: textX,
      y: textY,
      width: textWidth,
      height: textHeight
    }), text({
      className: "labelHeading",
      ref: "text"
    }, tspan({
      x: 0,
      dy: "1.4em"
    }, this.props.message))));
  };

  return Tooltip;

})(React.Component);

module.exports = Tooltip;
