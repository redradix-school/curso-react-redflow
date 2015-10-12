'use strict';
var _ = require('mori');

function createPerson(id, first, last){
  return _.hashMap('id', id, 'firstName', first, 'lastName', last);
}

var people = _.vector(/*.... */);

// TODO...