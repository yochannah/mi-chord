Mediator = require("mediator-js").Mediator

mediator = new Mediator()

mediator.subscribe "test", (vals) ->
  # console.log "FIRED", vals

module.exports = mediator
