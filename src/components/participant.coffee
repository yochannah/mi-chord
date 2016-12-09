React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"

{circle, g, text, path} = React.DOM

class Participant extends React.Component

  constructor: (props) ->
    super(props)

  render: ->
    {x: startX, y: startY} = Engine.polarToCartesian @props.view.radius, @props.view.startAngle
    g {},
      path {className: "participant", d: Draw.arc @props.view}
      text {}, @props.model.get("interactor").get("label")

module.exports = Participant
