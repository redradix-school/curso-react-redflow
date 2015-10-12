'use strict';
var _ = require('mori');

// auxialiar para crear eventos aleatorios
function createEvent(){
  return _.hashMap(
    "timestamp", Math.round(Math.random()*1000),
    "message", "foo" + Math.random()*100);
}

// función de ordenación
function eventSort(a, b){
  return _.get(b, 'timestamp') - _.get(a, 'timestamp') ||
    (_.get(b, 'message') - _.get(a, 'message'));
}

// conjunto de eventos
var events = _.sortedSetBy(eventSort);
events = _.into(events, _.repeatedly(25, createEvent));
// 10 primeros eventos
var top10events = _.into(_.sortedSetBy(eventSort), _.take(10, events));
// 10 ultimos eventos
var last10events = _.into(_.sortedSetBy(eventSort), _.drop(15, events));
// eventos recientes
var recent = _.into(_.sortedSetBy(eventSort), _.filter(function(ev){
  return _.get(ev, 'timestamp') > 500;
}, events));
// estadísticas
var stats = _.reduce(function(acc, event){
  var tmp = acc;
  if(_.get(acc, 'longestmessage').length < _.get(event, 'message').length){
    tmp = _.assoc(tmp, 'longestmessage', _.get(event, 'message'));
  }
  tmp = _.assoc(tmp, 'sumtimestamp', _.get(acc, 'sumtimestamp') + _.get(event, 'timestamp'));
  return tmp;
}, _.hashMap('longestmessage', '', 'sumtimestamp', 0), events);
// resultados
console.log('Events\n', _.toJs(events));
console.log('Top 10 events\n', _.toJs(top10events));
console.log('Last 10 events\n', _.toJs(last10events));
console.log('Recent events\n', _.toJs(recent));
console.log('Stats\n', _.toJs(stats));