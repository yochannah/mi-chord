React = require 'react'
# Engine = require '../layout/engine'
Draw = require "../layout/draw"

{text, path} = React.DOM

class Region extends React.Component

  constructor: (props) ->
    super props

  render: ->
    try
      if not isNaN(@props.view.endAngle)
        path {className: "region", d: Draw.arc @props.view, 15}
    catch error
      console.log "Error rendering region", error
    finally
      null


module.exports = Region
