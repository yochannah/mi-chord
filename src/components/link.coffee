React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"
_ = require 'underscore'

{circle, g, text, path} = React.DOM


center = ([letter, values...]) ->
  console.log "LETTER", letter, values
  switch letter
    when "M" then x: values[0], y:values[1]
    when "C" then x: values[4], y:values[5]
    when "A" then x: values[5], y:values[6]
    when "L" then x: values[0], y:values[1]
    when "Q" then x: values[2], y:values[3]

parser = (path) ->
  parts = path.split(/(?=[A-Z])/)
  annotations = []
  parts.map (e, i) ->
    s = e.match(/\S+/g)
    c = center(s)
    c.idx = i
    annotations.push c
  annotations





class Link extends React.Component

  constructor: (props) ->
    super(props)

  render: ->

    views = []

    # Walk through each feature in the link
    @props.model.get("features").map (feature) =>

      # Get the view and model for the parent participant
      {view: participantView, model: ParticipantModel} = @props.views[feature.get("participant").get("id")]

      # Create a scale so we know where to start/stop our path
      scale = Engine.scale([participantView.startAngle, participantView.endAngle],
        [0, ParticipantModel.get("interactor").get("length")])

      # Walk through each sequenceData of the feature (could be more than one)
      sequenceData = feature.get("sequenceData").map (s) ->
        views.push
          radius: participantView.radius
          startAngle: scale.val s.get("start")
          endAngle: scale.val s.get("end")

    parsed = null
    # parsed = parser Draw.link(views)

    g {className: "linkGroup"},
      path {className: "link", d: Draw.link views}
      if parsed
        g {className: "annotation"},
          _.map parsed, (p) ->
            g {className: "x"},
              circle {cx: p.x, cy: p.y, r: 5 }
              text {dx: p.x + 15, dy: p.y + 15}, p.idx
      # path {className: "link", opacity: "0.9", fill: @props.view.fill, d: Draw.link views}

module.exports = Link
