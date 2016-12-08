React = require 'react'
ReactDOM = require 'react-dom'
SVG = React.createFactory require './svg'

class Main

  constructor: (target, model) ->
    ReactDOM.render SVG({model: model}), document.getElementById "target"

module.exports = Main
