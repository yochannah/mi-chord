React = require 'react'
# Engine = require '../layout/engine'
Draw = require "../layout/draw"

{g, circle, text} = React.DOM

class Unknown extends React.Component

  constructor: (props) ->
    super props

  render: ->

    {x, y} = Draw.startUnknown @props.view
    g {transform: "translate(250, 250)"},
      # circle {className: "unknown", r: 7, cx: x, cy: y}
      g {transform: "translate(#{x}, #{y})"},
        text {className: "unknownLabel"}, "?"

module.exports = Unknown
