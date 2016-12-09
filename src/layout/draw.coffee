{polarToCartesian} = require './engine'

Draw =

  arc: ({startAngle, endAngle, radius}) ->

    thickness = 20

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
    ]

    path.join " "

module.exports = Draw
