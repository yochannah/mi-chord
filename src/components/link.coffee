React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"
_ = require 'underscore'
Messenger = require './messenger'

{circle, g, text, path} = React.DOM


center = ([letter, values...]) ->
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

  componentDidMount: ->
    # Whenever there may be a change in the Backbone data, trigger a reconcile.

    @props.model.on 'add change remove all *', @forceUpdate.bind(this, null), this

  componentWillUnmount: ->
    # Ensure that we clean up any dangling references when the component is
    # destroyed.
    @getBackboneModels().forEach ((model) ->
      model.off null, null, this
      return
    ), this
    return

  focusParticipants: (bool) =>
    @props.model.set focus: bool
    @props.model.get("features").map (f) ->
      f.get("participant").set focus: bool

    tooltipText = []

    @props.model.get("features").each (feature) ->
      feature.get("sequenceData").each (sd) ->
        interactorLabel = sd.get("feature").get("participant").get("interactor").get("label")
        pos = "(" + sd.get("pos") + ")"

        tooltipText.push interactorLabel + " " + pos

    if bool is true
      Messenger.publish "label", {title: "Interaction", text: tooltipText}
    else
      Messenger.publish "label", null


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
        start = s.get("start")
        end = s.get("start")
        if start is null and end is null
          halfway = (participantView.unknownStart + participantView.unknownEnd) / 2
          views.push
            radius: participantView.radius
            startAngle: participantView.unknownStart + 2.5
            endAngle: participantView.unknownStart + 2.5
        else
          views.push
            radius: participantView.radius
            startAngle: scale.val s.get("start")
            endAngle: scale.val s.get("end")


    parsed = null
    # parsed = parser Draw.link(views)

    g
      key: @props.model.get("key")
      className: "linkGroup"
      onMouseOver: => @focusParticipants true
      onMouseLeave: => @focusParticipants false
      # path {className: "link", d: Draw.link views}
      # if parsed
      #   g {className: "annotation"},
      #     _.map parsed, (p) ->
      #       g {className: "x"},
      #         circle {cx: p.x, cy: p.y, r: 5 }
      #         text {dx: p.x + 15, dy: p.y + 15}, p.idx
      path
        className: "link"
        opacity: "0.9"
        # fill: if @props.model.get("focus") then "deepskyblue" else "#e5e5e5" # @props.view.fill
        fill: @props.model.get("fill")
        d: Draw.link views
        style: opacity: 0.8

module.exports = Link
