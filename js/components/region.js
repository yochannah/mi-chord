var Draw, React, Region, path, ref, text,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

Draw = require("../layout/draw");

ref = React.DOM, text = ref.text, path = ref.path;

Region = (function(superClass) {
  extend(Region, superClass);

  function Region(props) {
    Region.__super__.constructor.call(this, props);
  }

  Region.prototype.render = function() {
    if (!isNaN(this.props.view.endAngle)) {
      return path({
        className: "region",
        d: Draw.arc(this.props.view, 7)
      });
    }
  };

  return Region;

})(React.Component);

module.exports = Region;
