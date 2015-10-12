'use strict';
var _ = require('mori');

var data = _.hashMap('user', _.hashMap('name', 'Usain Bolt'));

data = _.assocIn(data, ['user', 'email'], 'usain@bolt.com');

data = _.assocIn(data, ['user', 'currentJob'], _.hashMap('position', 'CEO'));

data = _.assocIn(data, ['user', 'currentJob', 'position'], 'CTO');

data = _.updateIn(data, ['user'], function(map){
  return _.dissoc(map, 'email');
});

console.log(_.toJs(data));