'use strict';
var _ = require('mori');

function createPerson(id, first, last){
  return _.hashMap('id', id, 'firstName', first, 'lastName', last);
}

var people = _.vector(createPerson(1, 'Carlos', 'de la Orden'));

people = _.conj(people, createPerson(2, 'Michael', 'Jordan'));
people = _.conj(people, createPerson(3, 'Vincent', 'Vega'));

console.log('Todos', people);

console.log('Ultima', _.peek(people));
console.log('Primero', _.nth(people, 0));

var people2 = _.subvec(people, 1);
console.log('Otro vector', people2);