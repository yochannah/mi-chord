React = require 'react'

{circle} = React.DOM

class Participant extends React.Component

  constructor: (props) ->
    super(props)

    @state =
      banana: 123

  render: ->
    circle {className: "participant", cx: 50, cy: 50, fill: "red", r: 5}

module.exports = Participant
