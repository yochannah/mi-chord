React = require 'react'
# Engine = require '../layout/engine'
Draw = require "../layout/draw"

{text, path} = React.DOM

class Region extends React.Component

  constructor: (props) ->
    super props

  render: ->
    # console.log "INSIDE REGION ARC", @props.view
    if not isNaN(@props.view.endAngle)
      path {className: "region", d: Draw.arc @props.view, 7}

module.exports = Region
