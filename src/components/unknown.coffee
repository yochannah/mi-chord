React = require 'react'
# Engine = require '../layout/engine'
Draw = require "../layout/draw"

{g, circle, text} = React.DOM

class Unknown extends React.Component

  constructor: (props) ->
    super props

  render: ->

    {x, y} = Draw.center @props.view
    g {transform: "translate(250, 250)"},
      circle {className: "unknown", r: 7, cx: x, cy: y}
      g {transform: "translate(#{x}, #{y})"},
        text {className: "unknownLabel", textAnchor: "middle", dy: "4"}, "?"

module.exports = Unknown


{startAngle: 123
endAngle: 345
radius: 50}

{startAngle: 123
endAngle: 345
radius: 30}
