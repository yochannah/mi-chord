{polarToCartesian} = require './engine'

Draw =

  arc: ({startAngle, endAngle, radius}, thickness = 20) ->

    {x: innerStartX, y: innerStartY} = polarToCartesian radius, startAngle
    {x: innerEndX, y: innerEndY} = polarToCartesian radius, endAngle

    {x: outerStartX, y: outerStartY} = polarToCartesian radius + thickness, startAngle
    {x: outerEndX, y: outerEndY} = polarToCartesian radius + thickness, endAngle

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

    {x: innerStartX, y: innerStartY} = polarToCartesian radius + 30, startAngle
    {x: innerEndX, y: innerEndY} = polarToCartesian radius + 30, endAngle

    largeArc = if endAngle - startAngle <= 180 then 0 else 1

    path = [
      "M", innerStartX, innerStartY
      "A", radius, radius, 0, largeArc, 1, innerEndX, innerEndY
    ]

    path.join " "

  link: (participants) ->

    {startAngle, endAngle, radius} = _.first participants
    largeArc = if endAngle - startAngle <= 180 then 0 else 1

    # Use an array to store the bits of our path.
    # Start by moving to the very beginning of the first arc.
    parts = [
      ["M", polarToCartesian(radius, startAngle).x, polarToCartesian(radius, startAngle).y]

      ["A", radius, radius, 0, largeArc, 1,
      polarToCartesian(radius, endAngle).x, polarToCartesian(radius, endAngle).y]
    ]

    # Now loop through the remaining participants and link their features
    rest = _.rest participants

    # Loop through the remaining features
    rest.map (p) ->

      {startAngle, endAngle, radius} = p

      parts.push ["Q",
      0, 0,
      polarToCartesian(radius, startAngle).x, polarToCartesian(radius, startAngle).y]

      parts.push ["A",
      radius, radius, 0, largeArc, 1,
      polarToCartesian(radius, endAngle).x, polarToCartesian(radius, endAngle).y]


    {startAngle, endAngle, radius} = _.first participants

    # Close the path by curving back to our starting point
    parts.push ["Q",
      0, 0,
      polarToCartesian(radius, startAngle).x, polarToCartesian(radius, startAngle).y]

    _.flatten(parts).join " "


module.exports = Draw
