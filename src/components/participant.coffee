React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"
Region = React.createFactory require './region'
{polarToCartesian} = require '../layout/engine'
{circle, g, text, path} = React.DOM
ptc = polarToCartesian

BackboneMixin =

  componentDidMount: ->
    # Whenever there may be a change in the Backbone data, trigger a reconcile.
    console.log "my model", @props.model

    @props.model.on 'add change remove', @forceUpdate.bind(this, null), this

  componentWillUnmount: ->
    # Ensure that we clean up any dangling references when the component is
    # destroyed.
    @getBackboneModels().forEach ((model) ->
      model.off null, null, this
      return
    ), this
    return


class Participant extends React.Component

  constructor: (props) ->
    super(props)

  componentDidMount: ->
    # Whenever there may be a change in the Backbone data, trigger a reconcile.

    @props.model.on 'add change remove', @forceUpdate.bind(this, null), this

  componentWillUnmount: ->
    # Ensure that we clean up any dangling references when the component is
    # destroyed.
    @getBackboneModels().forEach ((model) ->
      model.off null, null, this
      return
    ), this
    return

  focusMe: (bool) =>
    @props.model.set focus: bool

  render: ->

    Regions = []

    @props.model.get("features").map (f) =>

      # Create a scale from the beginning to the end of the arc angles
      # with a range of the length of the participant
      scale = Engine.scale([@props.view.startAngle, @props.view.endAngle],
        [0, @props.model.get("interactor").get("length")])

      f.get("sequenceData")?.map (s) =>

        # Generate a Region component using the scaled data from the
        # current view
        Regions.push Region
          model: s
          key: s.cid
          view:
            radius: @props.view.radius + 1
            startAngle: scale.val s.get("start")
            endAngle: scale.val s.get("end")

    # Generate the view
    g {},
      if @props.view.hasLength is true
        path
          fill: if @props.model.get("focus") is true then "deepskyblue" else "#a8a8a8"
          onMouseEnter: => @focusMe true
          onMouseLeave: => @focusMe false
          className: "participant",
          d: Draw.arc @props.view
      else
        {x: cx, y: cy} = ptc @props.view.radius, @props.view.endAngle
        circle {cx: cx, cy: cy, className: "nolenpart", r: 10 }
      # text {}, textPath {xlinkhref: "tp"}, "Testing" # DOESNT EXIST IN REACT.DOM
      Regions

module.exports = Participant
