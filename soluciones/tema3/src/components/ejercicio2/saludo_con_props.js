var React = require('react');

var Saludo = React.createClass({
  render: function(){
    var currentTime = new Date().toLocaleTimeString();
    return (
      <div>
        <h1>Hola {this.props.name}!</h1>
        <p>Ahora mismo son las { currentTime }</p>
      </div>
    )
  }
});

module.exports = Saludo;