React = require 'react'
Engine = require '../layout/engine'
Draw = require "../layout/draw"
Region = React.createFactory require './region'
{polarToCartesian} = require '../layout/engine'
{circle, g, text, path} = React.DOM
ptc = polarToCartesian

class Participant extends React.Component

  constructor: (props) ->
    super(props)

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
        path {className: "participant", d: Draw.arc @props.view}
      else
        {x: cx, y: cy} = ptc @props.view.radius, @props.view.endAngle
        circle {cx: cx, cy: cy, className: "nolenpart", r: 10 }
      # text {}, textPath {xlinkhref: "tp"}, "Testing" # DOESNT EXIST IN REACT.DOM
      Regions

module.exports = Participant
