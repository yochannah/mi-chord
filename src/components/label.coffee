React = require 'react'
_ = require 'underscore'

{g, rect, text} = React.DOM

class Label extends React.Component

  constructor: (props) ->
    super props
    @state = {x: 0, y: 0, textWidth: 0, textHeight: 0, textX: 0, textY: 0}

  componentDidMount: ->
    {width, height, x, y} = @refs.text.getBBox()
    @setState {textWidth: width, textHeight: height, textX: x, textY: y}

  render: ->

    padding = 5
    {textWidth, textHeight, textX, textY} = @state

    textWidth += padding * 2
    textHeight += padding * 2
    textX -= padding
    textY -= padding

    alignLeft = @props.mouse.x > @props.rootsvg.width / 2

    adjusted =
      x: Math.min (-1 * ((@props.mouse.x + textWidth + (padding * 2)) - @props.rootsvg.width)), 0

    g {className: "tooltip", transform: "translate(" + @props.mouse.x + "," + @props.mouse.y + ")"},
      g {transform: "translate(#{adjusted.x}, 0)"},
        rect {className: "container", x: textX, y: textY, width: textWidth, height: textHeight}
        text {className: "labelHeading", ref: "text"}, @props.message


module.exports = Label
