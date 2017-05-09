_ = require 'underscore'

Utils =
  wind: (col, f) ->
    obj = {}
    _.map col, (i) =>
      k = f(i)
      obj[k] = i
    return obj

module.exports = Utils
