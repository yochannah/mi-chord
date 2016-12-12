React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"

{circle, g, text, path} = React.DOM

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

    g {className: "linkGroup"},
      path {className: "link", opacity: "0.9", fill: @props.view.fill, d: Draw.link views}

module.exports = Link
