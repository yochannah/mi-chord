_ = require 'underscore'
{wind} = require './utils'

Engine =

  layout: (participants) ->

    # Get all the lengths of our participants
    lengths = participants.map (p) -> p.get("interactor").get("length")
    lengths = _.compact lengths

    nolength = participants.filter (p) ->
      length = p.get("interactor").get("length")
      length is undefined or length is null

    withlength = participants.filter (p) ->
      length = p.get("interactor").get("length")
      length isnt undefined and length isnt null

    molRadius = 20


    # Get their total
    sum = _.reduce lengths, ((total, num) -> total + num), 0


    # Normalize the length in degrees
    scale = @scale([0, 360 - (nolength.length * molRadius)], [0, sum])

    # Place the participants around a circle with start and end angles
    views = []

    nolengthviews = []

    # Get participants with no length





    # console.log "WITHLEN", withlength
    # console.log "NOLEN", nolength

    withlength.map (p) ->

      previous = _.last views

      if previous
        views.push
          model: p,
          view:
            hasLength: true
            radius: 200
            startAngle: previous.view.endAngle + 3
            endAngle: (scale.val p.get("interactor").get("length")) + previous.view.endAngle - 3
      else
        views.push
          model: p,
          view:
            hasLength: true
            radius: 200
            startAngle: 0 + 5
            endAngle: scale.val p.get("interactor").get("length")

    nolength.map (p, i) ->

      previous = _.last views

      views.push
        model: p,
        view:
          hasLength: false
          radius: 200
          startAngle: previous.view.endAngle + molRadius
          endAngle: previous.view.endAngle + molRadius

    return wind views, (d) -> d.model.get("id")

  scale: ([dmin, dmax], [rmin, rmax]) -> val: (val) -> (val - rmin) / (rmax - rmin) * (dmax - dmin) + dmin

  polarToCartesian: (radius, angle) ->
    rads = (angle - 90) * (Math.PI / 180.0)
    y: (radius * Math.sin rads),
    x: (radius * Math.cos rads)

module.exports = Engine
