var Mediator, mediator;

Mediator = require("mediator-js").Mediator;

mediator = new Mediator();

mediator.subscribe("test", function(vals) {});

module.exports = mediator;
