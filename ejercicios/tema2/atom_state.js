'use strict';
var _ = require('mori');

var state;
var listeners = [];


function getIn(path){
  //TODO...
}

function assocIn(path, value){
  //TODO...
}

function updateIn(path, fn){
  //TODO...
}

function swap(obj){
  //TODO...
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