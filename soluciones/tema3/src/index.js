//punto de entrada en la aplicación
'use strict';
var React = require('react');

//escoger el componente "padre" para renderizar
//ejemplos
var Lista = require('./components/ejemplos/lista_componentes');
var FechasMundo = require('./components/ejemplos/fechas_mundo');
var CicloVida = require('./components/ejemplos/ciclovida');

//ejercicio1
var Saludo = require('./components/ejercicio1/saludo');
//ejercicio2
var SaludoConProps = require('./components/ejercicio2/saludo_con_props');
//ejercicio3
var Cronometro = require('./components/ejercicio3/cronometro');
//ejercicio4
var Buscador = require('./components/ejercicio4/buscador_got');
//ejercicio5 - carro de la compra
var ShoppingCart = require('./components/ejercicio5/shopping_cart');


window.onload = function(){
  React.render(<ShoppingCart />, document.body);
}