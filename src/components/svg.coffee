React = require 'react'
Participant = React.createFactory require './participant'
Engine = require '../layout/engine'

{svg, g, text} = React.DOM


class SVG extends React.Component

  constructor: (props) ->
    super props


  render: ->

    interaction = @props.model.get("interactions").at(0)
    participants = interaction.get "participants"

    views = Engine.layout participants


    Participants = views.map (p) ->
      p.key = p.model.get("id")
      return Participant p

    svg {className: "mi-chord"},
      g {style:
          transform: "translate(250px, 250px)",
          shapeRendering: "geometricPrecision"},
        text {}, @props.model.get("interactions").at(0).get("id")
        Participants


module.exports = SVG
