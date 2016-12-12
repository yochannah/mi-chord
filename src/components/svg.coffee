React = require 'react'
Participant = React.createFactory require './participant'
Engine = require '../layout/engine'
Link = React.createFactory require './link'
Chroma = require 'chroma-js'

{svg, g, text} = React.DOM

class SVG extends React.Component

  constructor: (props) -> super props

  render: ->

    interaction = @props.model.get("interactions").at(0)
    participants = interaction.get "participants"
    links = interaction.get "links"
    views = Engine.layout participants

    s = Chroma.scale('Spectral').domain([0, links.length - 1]);

    Participants = _.values(views).map (p) ->
      p.key = p.model.get("id")
      return Participant p

    Links = links.map (l, i) ->
      return Link model: l, views: views, view: fill: s(i).hex()

    svg {className: "mi-chord"},
      g {style: shapeRendering: "geometricPrecision"},
        # text {}, @props.model.get("interactions").at(0).get("id")
        g {className: "participants"}, Participants
        g {className: "links", style: transform: "translate(250px,250px)"}, Links


module.exports = SVG
