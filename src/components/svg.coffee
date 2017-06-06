React = require 'react'
Participant = React.createFactory require './participant'
Engine = require '../layout/engine'
Link = React.createFactory require './link'
Chroma = require 'chroma-js'
Draw = require '../layout/draw'
_ = require 'underscore'
Label = React.createFactory require './label'
Messenger = require './messenger'


{svg, g, text, path, defs} = React.DOM

class SVG extends React.Component

  constructor: (props) ->
    super props
    @state = {label: null}

  componentDidMount: ->
    Messenger.subscribe "label", (m) => @setState {label: m}

  render: ->

    interaction = @props.model.get("interactions").at(0)
    participants = interaction.get "participants"
    links = interaction.get "links"
    views = Engine.layout participants

    defpaths = _.values(views).map (v) ->
      id = "tp" + v.model.get("id")
      return path {key: id, id: id, d: Draw.textDef v.view}

    s = Chroma.scale('Spectral').domain([0, links.length - 1]);

    Participants = _.values(views).map (p) ->
      p.key = p.model.get("id")
      return Participant p

    Links = links.map (l, i) ->
      return Link model: l, views: views, view: fill: s(i).hex()

    # if @state.label?

    svg {className: "mi-chord"},
      defs {}, defpaths
      g {style: shapeRendering: "geometricPrecision"},
        # text {}, @props.model.get("interactions").at(0).get("id")
        g {className: "participants"}, Participants
        g {className: "links", style: transform: "translate(250px,250px)"}, Links
        # if @state.label? then Label {message: @state.label}


module.exports = SVG
