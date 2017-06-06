var Label, React, _, g, rect, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

React = require('react');

_ = require('underscore');

ref = React.DOM, g = ref.g, rect = ref.rect;

Label = (function(superClass) {
  extend(Label, superClass);

  function Label(props) {
    Label.__super__.constructor.call(this, props);
  }

  Label.prototype.componentDidMount = function() {};

  Label.prototype.render = function() {
    return g({
      className: "mi-chord"
    }, rect({
      className: "label",
      x: 0,
      y: 0,
      width: 200,
      height: 75,
      fill: "red"
    }));
  };

  return Label;

})(React.Component);

module.exports = Label;
