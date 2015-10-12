var React = require('react');

var Saludo = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Hola mundo</h1>
        <p>React funciona correctamente...</p>
      </div>
    )
  }
});

module.exports = Saludo;