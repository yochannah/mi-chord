React = require 'react'
_ = require 'underscore'

{g, rect} = React.DOM

class Label extends React.Component

  constructor: (props) -> super props

  componentDidMount: ->
    # console.log "MOUNTED"

  render: ->

    g {className: "mi-chord"},
      rect {className: "label", x: 0, y: 0, width: 200, height: 75, fill: "red"}

module.exports = Label
