{polarToCartesian} = require './engine'
ptc = polarToCartesian

Draw =

  arc: ({startAngle, endAngle, radius}, thickness = 20) ->

    {x: innerStartX, y: innerStartY} = ptc radius, startAngle
    {x: innerEndX, y: innerEndY} = ptc radius, endAngle

    {x: outerStartX, y: outerStartY} = ptc radius + thickness, startAngle
    {x: outerEndX, y: outerEndY} = ptc radius + thickness, endAngle

    largeArc = if endAngle - startAngle <= 180 then 0 else 1

    path = [
      "M", innerStartX, innerStartY
      "A", radius, radius, 0, largeArc, 1, innerEndX, innerEndY
      "L", outerEndX, outerEndY
      "A", radius + thickness, radius + thickness, 0, largeArc, 0, outerStartX, outerStartY
      "Z"
    ]

    path.join " "


  textDef: ({startAngle, endAngle, radius}, thickness = 20) ->

    {x: innerStartX, y: innerStartY} = ptc radius + 30, startAngle
    {x: innerEndX, y: innerEndY} = ptc radius + 30, endAngle

    largeArc = if endAngle - startAngle <= 180 then 0 else 1

    path = [
      "M", innerStartX, innerStartY
      "A", radius, radius, 0, largeArc, 1, innerEndX, innerEndY
    ]

    path.join " "


  link: (participants) ->

    pinch = (start, end) ->
      (end - start) * 0.4

    depth = 90

    parts = []

    # Sort the participants so that links between more than two regions
    # don't cross eachother
    participants = _.sortBy participants, "startAngle"

    participants.map ({startAngle, endAngle, radius}, i) ->

      next = if (i + 1) < participants.length then participants[i + 1] else participants[0]

      parts.push [

        if i is 0
          if startAngle is endAngle
            ["M", ptc(radius, startAngle).x, ptc(radius, startAngle).y]
          else
            ["M",
              ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x
              ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y]

        if startAngle is endAngle
          ["C",
            ptc(radius, startAngle).x, ptc(radius, startAngle).y
            ptc(radius, startAngle).x, ptc(radius, startAngle).y
            ptc(radius, startAngle).x, ptc(radius, startAngle).y]
        else
          ["C",
            # Start at
            ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).x
            ptc(radius - depth, startAngle + pinch(startAngle, endAngle)).y
            # Curve to
            ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).x
            ptc(radius - depth / 2, startAngle + pinch(startAngle, endAngle)).y
            # End
            ptc(radius, startAngle).x, ptc(radius, startAngle).y]

        ["A", radius, radius, 0,
          if endAngle - startAngle <= 180 then 0 else 1,
          1, ptc(radius, endAngle).x, ptc(radius, endAngle).y]

        if startAngle is endAngle
          ["C",
            ptc(radius, endAngle).x, ptc(radius, endAngle).y
            ptc(radius, endAngle).x, ptc(radius, endAngle).y
            ptc(radius, endAngle).x, ptc(radius, endAngle).y]
        else
          ["C",
            ptc(radius, endAngle).x, ptc(radius, endAngle).y
            ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).x
            ptc(radius - depth / 2, endAngle - pinch(startAngle, endAngle)).y
            ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).x
            ptc(radius - depth, endAngle - pinch(startAngle, endAngle)).y]

        if next
          if next.startAngle is next.endAngle
            ["Q", 0, 0
              ptc(next.radius, next.startAngle).x, ptc(next.radius, next.startAngle).y]
          else
            ["Q", 0, 0
              ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).x
              ptc(next.radius - depth, next.startAngle + pinch(next.startAngle, next.endAngle)).y]





        # if startAngle == endAngle
        #   ["Q", 0, 0
        #     ptc(radius, endAngle).x, ptc(radius, endAngle).y]
        # else
        #   ["Q", 0, 0
        #     ptc(radius - 30, endAngle - 10).x, ptc(radius - 30, endAngle - 10).y]
        #
        # ["A", radius, radius, 0,
        #   if endAngle - startAngle <= 180 then 0 else 1,
        #   1, ptc(radius, endAngle).x, ptc(radius, endAngle).y]
      ]


    _.flatten(parts).join " "


module.exports = Draw
