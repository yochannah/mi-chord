React = require 'react'
Participant = React.createFactory require './participant'

{svg, g, text} = React.DOM


class SVG extends React.Component

  constructor: (props) ->
    super props
    @state =
      test: 123

  render: ->

    svg {className: "mi-chord"},
      g {},
        text {}, @props.model.get("interactions").at(0).get("id")
        (Participant({key: num}) for num in [1..5])


module.exports = SVG
