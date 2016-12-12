React = require 'react'
# Engine = require '../layout/engine'
Draw = require "../layout/draw"

{text, path} = React.DOM

class Region extends React.Component

  constructor: (props) ->
    super props

  render: ->
    path {className: "region", d: Draw.arc @props.view, 7}

module.exports = Region
