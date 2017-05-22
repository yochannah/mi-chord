var Main, React, ReactDOM, SVG;

React = require('react');

ReactDOM = require('react-dom');

SVG = React.createFactory(require('./components/svg'));

Main = (function() {
  function Main(target, model) {
    console.log("Using model", model);
    ReactDOM.render(SVG({
      model: model
    }), document.getElementById("target"));
  }

  return Main;

})();

module.exports = Main;
