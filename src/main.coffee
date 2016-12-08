Backbone = require 'backbone'
eco = require 'eco'
Handlebars = require 'gulp-handlebars'

class Main extends Backbone.View

  # template: require "./templates/main"

  initialize: ->
    @render()

  render: ->
    console.log "TEML", @template
    obj =
      title: 123

    console.log "RENDER", eco.render "<h1>Test</h1>", obj

    @$el.html eco.render @template, obj


module.exports = Main
