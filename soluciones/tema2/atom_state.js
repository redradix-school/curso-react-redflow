'use strict';
var _ = require('mori');

var state;
var listeners = [];


function getIn(path){
  return _.getIn(state, path);
}

function assocIn(path, value){
  state = _.assocIn(state, path, value);
  notifyListeners();
}

function updateIn(path, fn){
  state = _.updateIn(state, path, fn);
  notifyListeners();
}

function swap(obj){
  state = _.toClj(obj);
  notifyListeners();
}

function getState(){
  return state;
}

function addListener(fn){
  listeners.push(fn);
}
function notifyListeners(){
  _.each(listeners, function(fn){
    fn(state);
  });
}

module.exports = {
  getState: getState,
  getIn: getIn,
  assocIn: assocIn,
  updateIn: updateIn,
  swap: swap,
  addListener: addListener
};