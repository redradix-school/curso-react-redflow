var React = require('react');

var Fecha = React.createClass({
  render: function(){
    return <p>En {this.props.country} son las {this.props.date.toTimeString()}</p>
  }
});

var FechasMundo = React.createClass({
  convertirZonaHoraria: function(fecha, deltaHoras){
    var d = new Date(fecha);
    d.setUTCHours(d.getUTCHours()+deltaHoras);
    return d;
  },
  render: function(){
    var zonasHorarias = [
      { country: 'España', difUTC: 2},
      { country: 'UK', difUTC: 0 },
      { country: 'Argentina', difUTC: -3 },
      { country: 'Mexico', difUTC: -5 },
      { country: 'Japon', difUTC: +5 },
      { country: 'Nueva Zelanda', difUTC: +12 },
    ];

    var ahora = new Date();
    var self = this; //dentro de map cambia el contexto
    var componentes = zonasHorarias.map(function(zona){
      return <Fecha key={ zona.country } country={ zona.country } date={ this.convertirZonaHoraria(ahora, zona.difUTC) } />;
    }, this);

    return (
      <div>
        { componentes }
      </div>
    );
  }
});

module.exports = FechasMundo;