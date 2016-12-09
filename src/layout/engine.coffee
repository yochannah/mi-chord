_ = require 'underscore'

Engine =

  layout: (participants) ->

    # Get all the lengths of our participants
    lengths = participants.map (p) -> p.get("interactor").get("length")

    # Get their total
    sum = _.reduce lengths, ((total, num) -> total + num), 0

    # Normalize the length in degrees
    scale = @scale([0, 360], [0, sum])

    # Place the participants around a circle with start and end angles
    views = []
    participants.map (p) ->
      previous = _.last views

      if previous
        views.push
          model: p,
          view:
            radius: 200
            startAngle: previous.view.endAngle
            endAngle: (scale.val p.get("interactor").get("length")) + previous.view.endAngle
      else
        views.push
          model: p,
          view:
            radius: 200
            startAngle: 0
            endAngle: scale.val p.get("interactor").get("length")

    return views

  scale: ([dmin, dmax], [rmin, rmax]) -> val: (val) -> (val - rmin) / (rmax - rmin) * (dmax - dmin) + dmin

  polarToCartesian: (radius, angle) ->
    rads = (angle - 90) * (Math.PI / 180.0)
    y: (radius * Math.sin rads),
    x: (radius * Math.cos rads)

module.exports = Engine
