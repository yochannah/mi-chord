var Draw, React, Unknown, circle, g, ref, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Draw = require("../layout/draw");

ref = React.DOM, g = ref.g, circle = ref.circle, text = ref.text;

Unknown = (function(superClass) {
  extend(Unknown, superClass);

  function Unknown(props) {
    Unknown.__super__.constructor.call(this, props);
  }

  Unknown.prototype.render = function() {
    var ref1, x, y;
    ref1 = Draw.center(this.props.view), x = ref1.x, y = ref1.y;
    return g({
      transform: "translate(250, 250)"
    }, circle({
      className: "unknown",
      r: 7,
      cx: x,
      cy: y
    }), g({
      transform: "translate(" + x + ", " + y + ")"
    }, text({
      className: "unknownLabel",
      textAnchor: "middle",
      dy: "4"
    }, "?")));
  };

  return Unknown;

})(React.Component);

module.exports = Unknown;

({
  startAngle: 123,
  endAngle: 345,
  radius: 50
});

({
  startAngle: 123,
  endAngle: 345,
  radius: 30
});
