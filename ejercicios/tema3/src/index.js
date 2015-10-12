//punto de entrada en la aplicación
'use strict';
var React = require('react');

//escoger el componente "padre" para renderizar
//ejemplos

//ejercicio1
var Saludo = require('./components/ejercicio1/saludo');
//ejercicio 2
var SaludoConProps = require('./components/ejercicio2/saludo_con_props');
//ejercicio 3
var Cronometro = require('./components/ejercicio3/cronometro');
//ejercicio 4
var Buscador = require('./components/ejercicio4/search_engine');
//ejercicio 5 - carro de la compra
var ShoppingCart = require('./components/ejercicio5/shopping_cart');


window.onload = function(){
  //uncomment React.render... to mount the desired app in the page

  //ejercicio 1
  React.render(<Saludo />, document.body);

  //ejercicio 2
  //React.render(<SaludoConProps name="Vito Corleone" />, document.body);

  //ejercicio 3
  //React.render(<Cronometro />, document.body);

  //ejercicio 4
  //React.render(<Buscador />, document.body);

  //ejercicio 5
  //React.render(<ShoppingCart />, document.body);
}