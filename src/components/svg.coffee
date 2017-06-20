React = require 'react'
Participant = React.createFactory require './participant'
Engine = require '../layout/engine'
Link = React.createFactory require './link'
Chroma = require 'chroma-js'
Draw = require '../layout/draw'
_ = require 'underscore'
Tooltip = React.createFactory require './tooltip'
Messenger = require './messenger'
Unknown = React.createFactory require './unknown'


{svg, g, text, path, defs, radialGradient, stop, mask, circle, rect} = React.DOM

class SVG extends React.Component

  constructor: (props) ->
    super props
    @state = {label: null}

  componentDidMount: ->

    Messenger.subscribe "label", (m) => @setState {label: m}

    # https://stackoverflow.com/questions/10298658/mouse-position-inside-autoscaled-svg
    pt = @refs.svg.createSVGPoint()

    cursorPoint = (evt) =>
      pt.x = evt.clientX; pt.y = evt.clientY;
      pt.matrixTransform @refs.svg.getScreenCTM().inverse();

    @refs.svg.addEventListener "mousemove", (evt) =>
      {x, y} = cursorPoint(evt)
      @setState mouse: {x, y}


    @setState rootsvg: @refs.svg.getBBox()
    window.addEventListener "resize", (evt) =>
      @setState rootsvg: @refs.svg.getBBox()

  render: ->

    interaction = @props.model.get("interactions").at(0)
    participants = interaction.get "participants"
    links = interaction.get "links"
    views = Engine.layout participants

    defpaths = _.values(views).map (v) ->
      id = "tp" + v.model.get("id")
      return path {key: id, id: id, d: Draw.textDef v.view}

    defpaths.push radialGradient {id: "rgrad", cx: "50%", cy: "50%", r: "75%"},
      stop {offset: "0%", style: {stopColor: "rgb(255,255,255)", stopOpacity: 1}}
      stop {offset: "50%", style: {stopColor: "rgb(255,255,255)", stopOpacity: 1}}
      stop {offset: "62%", style: {stopColor: "rgb(0,0,0)", stopOpacity: 1}}
      stop {offset: "100%", style: {stopColor: "rgb(0,0,0)", stopOpacity: 1}}


    defpaths.push mask {id: "fademask", maskContentUnits: "objectBoundingBox"},
      rect {x: 0, y: 0, width: 1, height: 1, fill: "url(#rgrad)"}


    s = Chroma.scale('Spectral').domain([0, links.length - 1]);

    Participants = _.values(views).map (p) ->
      p.key = p.model.get("id")
      return Participant p

    Unknowns = _.values(views).map (p) ->
      if p.view.hasLength
        p.key = p.model.get("id")
        return Unknown p

    Links = links.map (l, i) ->
      return Link model: l, views: views, view: fill: s(i).hex()

    svg {className: "mi-chord", ref: "svg", viewBox: "0 0 500 500"},
      defs {}, defpaths
      g {style: shapeRendering: "geometricPrecision"},
        # text {}, @props.model.get("interactions").at(0).get("id")
        g {className: "participants"}, Participants
        g {className: "links", style: transform: "translate(250px,250px)"}, Links
        if @state.label? then Tooltip {rootsvg: @state.rootsvg, message: @state.label, mouse: @state.mouse}
      g {className: "unknowns"}, Unknowns
      # circle {cx: 250, cy: 250, r: 250, fill: "red", mask: "url(#fademask)"}


module.exports = SVG
