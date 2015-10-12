'use strict';

var React = require('react');
//helper functions for dates!!!
var utils = require('../../lib/utils');


//Componente del encabezado
var Header = React.createClass({
  render: function(){
    return (
      <div className="header">
        <h2>Cronómetro</h2>
      </div>
    );
  }
});

//Componente de la pantalla
var Screen = React.createClass({
  propTypes: {
    time: React.PropTypes.number.isRequired
  },
  render: function(){
    /* TODO */
    return (
      <div className="timer">
        <span className="timer-hours">XX</span>:
        <span className="timer-minutes">XX</span>:
        <span className="timer-seconds">XX</span>.
        <span className="timer-mseconds">XXX</span>
      </div>
    );
  }
});

//Componente de los botones
var Buttons = React.createClass({
  propTypes: {
    /* TODO */
  },
  render: function(){
    return (
      null/* TODO */
    );
  }
});

//Componente "padre", el crónometro en si
var Cronometro = React.createClass({
  getInitialState: function() {
    return {
      //crono value
      ellapsedTime: 0,
      //running / stopped flag
      isRunning: false
    };
  },
  handleStart: function(e){
    /* TODO */
  },
  handleStop: function(e){
    /* TODO */
  },
  render: function() {
    return (
      <div className="crono">
        <Header />
        <div className="content">
          <Screen time={ null/* TODO */ }/>
          <Buttons
            onStart={ null/* TODO */ }
            onStop={ null/* TODO */ } />
        </div>
      </div>
    );
  }
});

module.exports = Cronometro;
