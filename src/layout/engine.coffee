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

    molRadius = 14

    # Get their total
    sum = _.reduce lengths, ((total, num) -> total + num), 0

    # Normalize the length in degrees
    scale = @scale([0, 360 - (nolength.length * molRadius)], [0, sum])
    # scale = @scale([0, 360], [0, sum])



    # Place the participants around a circle with start and end angles
    views = []

    nolengthviews = []

    questionMarkWidth = 3

    views = _.reduce withlength, ((total, next, memo) ->

      previousLengths = _.reduce total, ((count, p) -> count + p.model.get("interactor").get("length")), 0

      # t =
      #   startAngle: scale.val(previousLengths),
      #   endAngle: scale.val(next.get("interactor").get("length") + previousLengths)
      #

      v =
        model: next
        view:
          hasLength: true
          radius: 150
          startAngle: scale.val(previousLengths) + 5
          endAngle: scale.val(next.get("interactor").get("length") + previousLengths) - 10

          # unknownStart: scale.val(previousLengths)
          unknownStart: scale.val(next.get("interactor").get("length") + previousLengths) - 10
          unknownEnd: scale.val(next.get("interactor").get("length") + previousLengths) - 5


      return total.concat [v]), []



    nlviews = _.reduce nolength, ((total, next, memo) ->


      previousParticipant = if memo is 0 then views[views.length - 1] else total[memo - 1]


      # t =
      #   startAngle: scale.val(previousLengths),
      #   endAngle: scale.val(next.get("interactor").get("length") + previousLengths)
      #



      v =
        model: next
        view:
          hasLength: false
          radius: 150 + molRadius / 2
          startAngle: previousParticipant.view.unknownEnd + 10
          endAngle: previousParticipant.view.unknownEnd + 12
          unknownStart: previousParticipant.view.unknownEnd + 10
          unknownEnd: previousParticipant.view.unknownEnd + 12

          # unknownStart: scale.val(previousLengths)
          # unknownStart: scale.val(next.get("interactor").get("length") + previousLengths) - 10
          # unknownEnd: scale.val(next.get("interactor").get("length") + previousLengths) - 5


      return total.concat [v]), []

    views = views.concat nlviews


    # console.log "views", views

    # withlength.map (p, i) ->
    #
    #   previous = _.last views
    #
    #   if previous
    #     views.push
    #       model: p
    #       view:
    #         hasLength: true
    #         radius: 200
    #         unknownStart: previous.view.endAngle + 3
    #         unknownEnd: previous.view.endAngle + 8
    #         startAngle: previous.view.endAngle + 8
    #         endAngle:
    #           if i = withlength.length - 1
    #             (scale.val p.get("interactor").get("length")) + previous.view.endAngle - 3
    #           else
    #             (scale.val p.get("interactor").get("length")) + previous.view.endAngle - 3
    #   else
    #     views.push
    #       model: p,
    #       view:
    #         unknownStart: 0
    #         unknownEnd: 5
    #         hasLength: true
    #         radius: 200
    #         startAngle: 5
    #         endAngle: scale.val p.get("interactor").get("length")
    #
    # nolength.map (p, i) ->
    #
    #   previous = _.last views
    #
    #   views.push
    #     model: p,
    #     view:
    #       hasLength: false
    #       radius: 210
    #       startAngle: previous.view.endAngle + molRadius
    #       endAngle: previous.view.endAngle + molRadius

    return wind views, (d) -> d.model.get("id")

  scale: ([dmin, dmax], [rmin, rmax]) -> val: (val) -> (val - rmin) / (rmax - rmin) * (dmax - dmin) + dmin

  polarToCartesian: (radius, angle) ->
    rads = (angle - 90) * (Math.PI / 180.0)
    y: (radius * Math.sin rads),
    x: (radius * Math.cos rads)

module.exports = Engine
