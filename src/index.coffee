React = require 'react'
ReactDOM = require 'react-dom'
SVG = React.createFactory require './components/svg'

class Main

  constructor: (target, model) ->
    console.log "Using model", model
    ReactDOM.render SVG({model: model, key: new Date().getTime()}), document.getElementById "target"

module.exports = Main
